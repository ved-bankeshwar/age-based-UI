"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ageProfiles } from "@/personalization/ageProfiles";
import { mapAgeToGroup } from "@/personalization/mapAgeToGroup";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

type Status = "idle" | "starting" | "live" | "done" | "error";

export interface AgeCameraHandle {
  start: () => void;
}

export const AgeCamera = forwardRef<AgeCameraHandle, { onAccept: (age: number) => void; autoStart?: boolean }>(function AgeCamera({ onAccept, autoStart = false }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const running = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [edited, setEdited] = useState("");

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  useEffect(() => () => stopCamera(), []);

  const startRef = useRef(estimateAge);
  startRef.current = estimateAge;
  const started = useRef(false);
  useImperativeHandle(ref, () => ({ start: () => { void startRef.current(); } }));
  useEffect(() => {
    if (!autoStart || started.current) return;
    started.current = true;
    void startRef.current();
  }, [autoStart]);

  async function estimateAge() {
    if (running.current) return;
    running.current = true;
    setStatus("starting");
    setMessage("The camera stays on this device. The photo is not saved or uploaded.");
    setEstimate(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) {
        stopCamera();
        setStatus("error");
        setMessage("The camera could not start. Set the age on the admin page.");
        running.current = false;
        return;
      }
      video.srcObject = stream;
      await video.play();
      setStatus("live");

      const { default: Human } = (await import("../../../node_modules/@vladmandic/human/dist/human.esm.js")) as unknown as {
        default: new (config: object) => {
          load: () => Promise<void>;
          detect: (input: HTMLVideoElement) => Promise<{ face: { age?: number }[] }>;
        };
      };
      const human = new Human({
        modelBasePath: "https://cdn.jsdelivr.net/npm/@vladmandic/human@3.3.6/models/",
        backend: "webgl",
        debug: false,
        face: {
          enabled: true,
          detector: { enabled: true, rotation: false, maxDetected: 1, skipFrames: 0, skipTime: 0 },
          mesh: { enabled: false },
          iris: { enabled: false },
          emotion: { enabled: false },
          description: { enabled: true, skipFrames: 0, skipTime: 0 },
          attention: { enabled: false },
          antispoof: { enabled: false },
          liveness: { enabled: false },
        },
        body: { enabled: false },
        hand: { enabled: false },
        object: { enabled: false },
        gesture: { enabled: false },
      });
      await human.load();

      const samples: number[] = [];
      for (let attempt = 0; attempt < 4; attempt += 1) {
        const result = await human.detect(video);
        const age = result.face[0]?.age;
        if (typeof age === "number" && age > 0 && age <= 120) samples.push(age);
        await new Promise((resolve) => setTimeout(resolve, 280));
      }
      stopCamera();

      if (!samples.length) {
        setStatus("error");
        setMessage("No face was found. Set the age on the admin page, or try the camera again.");
        running.current = false;
        return;
      }
      const average = Math.round(samples.reduce((sum, age) => sum + age, 0) / samples.length);
      setEstimate(average);
      setEdited(String(average));
      setStatus("done");
      setMessage("");
      running.current = false;
    } catch (error) {
      running.current = false;
      stopCamera();
      setStatus("error");
      const denied = error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "NotFoundError" || error.name === "NotReadableError");
      setMessage(
        denied
          ? "Camera permission is needed. You can set the age on the admin page."
          : "The age model could not start. Set the age on the admin page.",
      );
    }
  }

  const corrected = /^\d+$/.test(edited.trim()) ? Number(edited.trim()) : null;
  const group = corrected === null ? null : mapAgeToGroup(corrected);

  return (
    <div className="stack">
      <p>The camera stays on this device. Bite reads an age, then turns the camera off.</p>
      {status === "live" || status === "starting" ? (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          style={{ width: "100%", borderRadius: "var(--radius-card)", transform: "scaleX(-1)", background: "#140e0a" }}
        />
      ) : (
        <video ref={videoRef} muted playsInline style={{ display: "none" }} />
      )}
      {status === "starting" || status === "live" ? <p>{message}</p> : null}
      {status === "error" ? <p>{message}</p> : null}
      {status === "done" && estimate !== null ? (
        <div className="stack">
          <p>The camera guessed about {estimate}. Change it if that is not your age.</p>
          <TextField label="Your age" value={edited} onChange={setEdited} inputMode="numeric" />
          <p>
            {group
              ? `That matches ${ageProfiles[group].label}.`
              : "Enter an age from 1 to 120."}
          </p>
          <Button variant="primary" type="button" disabled={corrected === null} onClick={() => corrected !== null && onAccept(corrected)}>
            Use this age
          </Button>
        </div>
      ) : null}
      {status !== "done" ? (
        <Button variant="secondary" type="button" disabled={status === "starting" || status === "live"} onClick={estimateAge}>
          {status === "starting" || status === "live" ? "Reading age…" : status === "error" ? "Try the camera again" : "Use camera"}
        </Button>
      ) : (
        <Button variant="quiet" type="button" onClick={estimateAge}>
          Try again
        </Button>
      )}
    </div>
  );
});
