import { photo } from "./images";
import type { MenuItem } from "./types";

function dish(
  restaurantId: string,
  slug: string,
  category: string,
  name: string,
  description: string,
  price: number,
  veg: boolean,
  image: string,
): MenuItem {
  return { id: `${restaurantId}-${slug}`, restaurantId, category, name, description, price, veg, image };
}

export const menu: MenuItem[] = [
  dish("chennai-spice", "chicken-biryani", "Recommended", "Chicken Biryani", "Sealed pot biryani with pepper chicken.", 220, false, photo.biryani),
  dish("chennai-spice", "paneer-butter", "Recommended", "Paneer Butter Masala", "Paneer in a tomato and cashew gravy.", 180, true, photo.paneer),
  dish("chennai-spice", "masala-dosa", "Recommended", "Masala Dosa", "Crisp dosa with spiced potato.", 100, true, photo.dosa),
  dish("chennai-spice", "veg-fried-rice", "Recommended", "Veg Fried Rice", "Wok-tossed rice with vegetables.", 150, true, photo.rice),
  dish("chennai-spice", "ghee-roast", "Mains", "Ghee Roast Dosa", "Ghee-roasted dosa with podi.", 120, true, photo.dosa),
  dish("chennai-spice", "chicken-65", "Mains", "Chicken 65", "Crisp fried chicken with curry leaves.", 190, false, photo.chicken),
  dish("chennai-spice", "filter-coffee", "Beverages", "Filter Coffee", "Decoction coffee with hot milk.", 40, true, photo.coffee),
  dish("chennai-spice", "payasam", "Desserts", "Payasam", "Warm vermicelli payasam.", 80, true, photo.dessert),

  dish("dum-and-co", "chicken", "Recommended", "Dum Chicken Biryani", "Slow dum biryani with raita.", 260, false, photo.biryani2),
  dish("dum-and-co", "mutton", "Recommended", "Dum Mutton Biryani", "Long-cooked mutton dum biryani.", 320, false, photo.biryani),
  dish("dum-and-co", "veg", "Recommended", "Veg Dum Biryani", "Vegetable dum biryani with mint.", 210, true, photo.biryani2),
  dish("dum-and-co", "raita", "Mains", "Boondi Raita", "Cool yogurt with boondi.", 40, true, photo.bowl),
  dish("dum-and-co", "salan", "Mains", "Mirchi Ka Salan", "Peanut and chilli gravy.", 70, true, photo.curry),
  dish("dum-and-co", "jamun", "Desserts", "Gulab Jamun", "Two warm jamuns.", 60, true, photo.dessert),

  dish("oven-olive", "margherita", "Recommended", "Margherita", "Tomato, mozzarella, and basil.", 220, true, photo.pizza),
  dish("oven-olive", "garden", "Recommended", "Garden Veg", "Peppers, olive, and sweet corn.", 260, true, photo.pizza2),
  dish("oven-olive", "tikka", "Recommended", "Chicken Tikka Pizza", "Tikka chicken and onion.", 300, false, photo.pizza),
  dish("oven-olive", "mushroom", "Mains", "Mushroom Olive", "Mushroom, olive, and cheese.", 270, true, photo.pizza2),
  dish("oven-olive", "garlic-bread", "Breads", "Garlic Bread", "Toasted bread with garlic butter.", 120, true, photo.fries),
  dish("oven-olive", "brownie", "Desserts", "Warm Brownie", "Chocolate brownie with a soft centre.", 90, true, photo.cake),

  dish("milos-slice", "cheese-burst", "Recommended", "Cheese Burst", "Cheese-filled crust and mozzarella.", 240, true, photo.pizza2),
  dish("milos-slice", "paneer", "Recommended", "Paneer Tikka Pizza", "Tandoori paneer and capsicum.", 280, true, photo.pizza),
  dish("milos-slice", "corn", "Mains", "Corn & Capsicum", "Sweet corn and capsicum.", 250, true, photo.pizza2),
  dish("milos-slice", "classic", "Mains", "Classic Margherita", "A thin slice with basil.", 210, true, photo.pizza),
  dish("milos-slice", "sticks", "Snacks", "Cheesy Sticks", "Baked cheese sticks.", 140, true, photo.fries),
  dish("milos-slice", "cola", "Beverages", "Cola", "Chilled cola.", 40, true, photo.juice),

  dish("stackhouse", "smash", "Recommended", "Classic Smash Burger", "Smashed patty, onion, and pickle.", 180, false, photo.burger),
  dish("stackhouse", "chicken", "Recommended", "Chicken Stack", "Crisp chicken and slaw.", 210, false, photo.burger2),
  dish("stackhouse", "paneer", "Recommended", "Paneer Burger", "Grilled paneer and mint chutney.", 170, true, photo.burger),
  dish("stackhouse", "fries", "Snacks", "Fries", "Salted fries.", 90, true, photo.fries),
  dish("stackhouse", "rings", "Snacks", "Onion Rings", "Crumb-fried onion rings.", 100, true, photo.fries),
  dish("stackhouse", "shake", "Beverages", "Chocolate Shake", "Thick chocolate milkshake.", 120, true, photo.ice),

  dish("pearl-coast", "dosa", "Recommended", "Masala Dosa", "Crisp dosa and potato masala.", 90, true, photo.dosa),
  dish("pearl-coast", "idli", "Recommended", "Ghee Podi Idli", "Idli with ghee and podi.", 80, true, photo.idli),
  dish("pearl-coast", "tiffin", "Recommended", "Mini Tiffin", "Idli, vada, and a small dosa.", 150, true, photo.idli),
  dish("pearl-coast", "coffee", "Beverages", "Filter Coffee", "South Indian filter coffee.", 40, true, photo.coffee),
  dish("pearl-coast", "vada", "Snacks", "Medu Vada", "Crisp lentil vada.", 70, true, photo.vada),
  dish("pearl-coast", "kesari", "Desserts", "Kesari", "Warm semolina kesari.", 60, true, photo.dessert),

  dish("wok-street", "noodles", "Recommended", "Veg Hakka Noodles", "Pepper noodles and vegetables.", 160, true, photo.noodles),
  dish("wok-street", "chicken-rice", "Recommended", "Chicken Fried Rice", "Wok rice with chicken.", 190, false, photo.rice),
  dish("wok-street", "chilli-paneer", "Recommended", "Chilli Paneer", "Crisp paneer in chilli sauce.", 180, true, photo.paneer),
  dish("wok-street", "kung-pao", "Mains", "Kung Pao Chicken", "Chicken, pepper, and roasted nuts.", 220, false, photo.chicken),
  dish("wok-street", "rolls", "Snacks", "Spring Rolls", "Crisp vegetable rolls.", 120, true, photo.samosa),
  dish("wok-street", "soup", "Mains", "Manchow Soup", "Hot pepper soup.", 90, true, photo.bowl),

  dish("night-market", "chicken-momo", "Recommended", "Chicken Momos", "Steamed chicken dumplings.", 140, false, photo.momo),
  dish("night-market", "veg-momo", "Recommended", "Veg Momos", "Steamed vegetable dumplings.", 120, true, photo.momo),
  dish("night-market", "potato", "Recommended", "Chilli Potato", "Crisp potato in chilli sauce.", 130, true, photo.fries),
  dish("night-market", "rice", "Rice", "Schezwan Fried Rice", "Hot schezwan fried rice.", 170, true, photo.rice),
  dish("night-market", "paneer-momo", "Mains", "Paneer Steam Momos", "Paneer-filled momos.", 140, true, photo.momo),
  dish("night-market", "tea", "Beverages", "Iced Tea", "Lemon iced tea.", 60, true, photo.juice),

  dish("sugar-lane", "cheesecake", "Recommended", "Gulab Jamun Cheesecake", "Baked cheesecake with jamun.", 160, true, photo.cake),
  dish("sugar-lane", "sundae", "Recommended", "Brownie Sundae", "Brownie, ice cream, and chocolate.", 140, true, photo.ice),
  dish("sugar-lane", "shrikhand", "Recommended", "Mango Shrikhand", "Hung curd with mango.", 90, true, photo.dessert),
  dish("sugar-lane", "truffle", "Desserts", "Chocolate Truffle", "Dense chocolate truffle.", 150, true, photo.cake),
  dish("sugar-lane", "tiramisu", "Desserts", "Filter Coffee Tiramisu", "Coffee-soaked dessert.", 170, true, photo.coffee),
  dish("sugar-lane", "kulfi", "Desserts", "Kulfi", "Pistachio kulfi.", 70, true, photo.ice),

  dish("filter-kaapi", "filter", "Recommended", "Filter Coffee", "Brass-tumbler filter coffee.", 40, true, photo.coffee),
  dish("filter-kaapi", "degree", "Recommended", "Madras Degree Coffee", "Strong decoction coffee.", 60, true, photo.coffee),
  dish("filter-kaapi", "chai", "Recommended", "Masala Chai", "Ginger and cardamom chai.", 30, true, photo.chai),
  dish("filter-kaapi", "badam", "Beverages", "Badam Milk", "Warm almond milk.", 70, true, photo.chai),
  dish("filter-kaapi", "bun", "Snacks", "Bun Butter Jam", "Toasted bun with butter and jam.", 50, true, photo.cake),
  dish("filter-kaapi", "rose", "Beverages", "Rose Milk", "Chilled rose milk.", 60, true, photo.juice),

  dish("green-bowl", "millet", "Recommended", "Millet Bowl", "Millets, greens, and pickle.", 220, true, photo.bowl),
  dish("green-bowl", "paneer-salad", "Recommended", "Grilled Paneer Salad", "Paneer, greens, and seeds.", 210, true, photo.salad),
  dish("green-bowl", "chicken-bowl", "Recommended", "Lemon Herb Chicken Bowl", "Grilled chicken and grains.", 250, false, photo.bowl),
  dish("green-bowl", "chaat", "Snacks", "Sprout Chaat", "Sprouts with lemon and onion.", 120, true, photo.salad),
  dish("green-bowl", "coconut", "Beverages", "Coconut Water", "Chilled coconut water.", 50, true, photo.juice),
  dish("green-bowl", "yogurt", "Desserts", "Fruit Yogurt", "Yogurt with seasonal fruit.", 90, true, photo.bowl),

  dish("tiffin-room", "rava", "Recommended", "Onion Rava Dosa", "Crisp rava dosa with onion.", 110, true, photo.dosa),
  dish("tiffin-room", "thatte", "Recommended", "Thatte Idli", "Plate idli with chutney.", 80, true, photo.idli),
  dish("tiffin-room", "vada", "Snacks", "Medu Vada", "Two crisp vadas.", 70, true, photo.vada),
  dish("tiffin-room", "samosa", "Snacks", "Mini Samosa", "Four small potato samosas.", 60, true, photo.samosa),
  dish("tiffin-room", "bajji", "Snacks", "Bajji Plate", "Chilli and potato bajji.", 70, true, photo.samosa),
  dish("tiffin-room", "coffee", "Beverages", "Filter Coffee", "Small filter coffee.", 40, true, photo.coffee),
];
