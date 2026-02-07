// Centralized image registry
// Every placeholder image lives here. To replace with real photos:
// 1. Add your image to /public/images/
// 2. Change the path here
// 3. That's it — all components reference this file

export const images = {
  hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
  heroAlt: "Fine dining restaurant interior with warm ambient lighting",

  about: {
    portrait:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
    portraitAlt: "Professional chef in restaurant kitchen",
    kitchen:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    kitchenAlt: "Professional restaurant kitchen in action",
  },

  services: {
    menuEngineering:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    menuEngineeringAlt: "Restaurant menu and food presentation",
    concept:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    conceptAlt: "Modern restaurant interior design concept",
    cloudKitchen:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
    cloudKitchenAlt: "Commercial kitchen setup for cloud kitchen operations",
    feasibility:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    feasibilityAlt: "Business planning and financial analysis documents",
  },

  caseStudies: {
    italianBistro:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    italianBistroAlt: "Italian restaurant interior with elegant decor",
    cloudKitchen:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=80",
    cloudKitchenAlt: "Cloud kitchen food preparation and packaging",
  },

  blog: {
    defaultCover:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    defaultCoverAlt: "Beautifully plated fine dining dish",
    openRestaurant:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80",
    openRestaurantAlt: "Restaurant storefront with inviting entrance",
    costBreakdown:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    costBreakdownAlt: "Financial documents and calculator for restaurant budgeting",
  },

  testimonial:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  testimonialAlt: "Professional business portrait",
} as const;
