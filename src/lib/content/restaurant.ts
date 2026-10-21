import type { LucideIcon } from "lucide-react";
import { Coffee, GlassWater, Sparkles, Wine } from "lucide-react";
import { IMAGES } from "@/lib/images";

export type FoodHighlight = {
  name: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

export type BeverageHighlight = {
  name: string;
  description: string;
  image: string;
  tag: string;
  icon: LucideIcon;
};

export const restaurantIntro = {
  eyebrow: "Culinary Experience",
  title: "Our Menu & Dining",
  intro:
    "Discover a delicious selection of locally inspired dishes, fresh seasonal ingredients, and flavorful meals crafted with care to satisfy every appetite at The Shrub Lodge.",
  body: "Whether you are gearing up for an early game drive in Zambezi National Park or returning from an exhilarating day at the Falls, our kitchen prepares wholesome, delectable breakfasts, light lunches, and hearty multi-course dinners tailored to your taste.",
  menuHref: "/the-shrub-lodge-menu.pdf",
} as const;

export const foodHighlights: FoodHighlight[] = [
  {
    name: "Grilled Safari Sirloin",
    category: "Main Course",
    description: "Tender prime steak cooked over open flame, served with roasted root vegetables and signature pepper jus.",
    image: IMAGES.foodSteak,
    alt: "Grilled prime steak at The Shrub Restaurant",
  },
  {
    name: "Chef's Catch of the Day",
    category: "Signature Dish",
    description: "Pan-seared Zambezi river bream infused with citrus herbs, wilted greens, and saffron baby potatoes.",
    image: IMAGES.restaurantDish,
    alt: "Signature plated fish dish at The Shrub Restaurant",
  },
  {
    name: "Lodge Breakfast Spread",
    category: "Morning Dining",
    description: "A hearty continental and cooked spread with farm-fresh eggs, tropical fruits, warm pastries, and artisan preserves.",
    image: IMAGES.foodBreakfast,
    alt: "Artisan breakfast spread at The Shrub Lodge",
  },
  {
    name: "Garden Fresh Zambezi Salad",
    category: "Salads & Light Fare",
    description: "Crisp local greens, avocado, roasted seeds, and sun-ripened tomatoes tossed in our house herb vinaigrette.",
    image: IMAGES.foodSalad,
    alt: "Fresh salad bowl with crisp greens and vinaigrette",
  },
  {
    name: "Gourmet Plated Creations",
    category: "Chef's Specials",
    description: "Seasonally inspired culinary artistry blending Zimbabwean flavors with contemporary international cuisine.",
    image: IMAGES.foodGourmet,
    alt: "Fine dining gourmet culinary dish",
  },
  {
    name: "Artisan Sweet Delights",
    category: "Desserts",
    description: "Handcrafted fruit tarts, chocolate ganache, and house-made sorbets to finish your meal in style.",
    image: IMAGES.foodDessert,
    alt: "Decadent dessert pastry at The Shrub Restaurant",
  },
];

export const beverageHighlights: BeverageHighlight[] = [
  {
    name: "Victoria Falls Signature Cocktails",
    description: "Craft cocktails including our famed Zambezi Sunset, spiced rum coolers, and classic Gin & Tonic with fresh botanicals.",
    image: IMAGES.drinkCocktail,
    tag: "Signature Bar",
    icon: GlassWater,
  },
  {
    name: "Curated Southern African Wines",
    description: "Carefully selected vintages from premier Cape vineyards, crisp Sauvignon Blancs, and bold Cabernet Sauvignons.",
    image: IMAGES.drinkWine,
    tag: "Wine Selection",
    icon: Wine,
  },
  {
    name: "Fresh Tropical Juices & Mocktails",
    description: "Refreshing cold-pressed juices, wild fruit coolers, and revitalizing smoothies prepared fresh each morning.",
    image: IMAGES.drinkJuice,
    tag: "Fresh & Healthy",
    icon: Sparkles,
  },
  {
    name: "Barista Espresso & Herbal Teas",
    description: "Single-origin African coffee beans roasted to perfection, rich cappuccinos, and organic herbal infusions.",
    image: IMAGES.drinkCoffee,
    tag: "Hot Beverages",
    icon: Coffee,
  },
];
