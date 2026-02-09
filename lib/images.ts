// Centralized image registry
// Every placeholder image lives here. To replace with real photos:
// 1. Add your image to /public/images/
// 2. Change the path here
// 3. That's it — all components reference this file

export const images = {
  hero: "/images/blog-fine-dining.jpg",
  heroAlt: "Fine dining restaurant interior with warm ambient lighting",

  about: {
    portrait: "/images/blog-staffing.jpg",
    portraitAlt: "Professional chef in restaurant kitchen",
    kitchen: "/images/blog-cloud-kitchen.jpg",
    kitchenAlt: "Professional restaurant kitchen in action",
  },

  services: {
    menuEngineering: "/images/service-menu-engineering.jpg",
    menuEngineeringAlt: "Restaurant menu and food presentation",
    concept: "/images/service-concept.jpg",
    conceptAlt: "Modern restaurant interior design concept",
    cloudKitchen: "/images/service-cloud-kitchen.jpg",
    cloudKitchenAlt: "Commercial kitchen setup for cloud kitchen operations",
    feasibility: "/images/service-feasibility.jpg",
    feasibilityAlt: "Business planning and financial analysis documents",
  },

  caseStudies: {
    italianBistro: "/images/blog-menu-engineering.jpg",
    italianBistroAlt: "Italian restaurant interior with elegant decor",
    cloudKitchen: "/images/case-study-cloud-kitchen.jpg",
    cloudKitchenAlt: "Cloud kitchen food preparation and packaging",
  },

  blog: {
    defaultCover: "/images/blog-default-cover.jpg",
    defaultCoverAlt: "Beautifully plated fine dining dish",
    openRestaurant: "/images/blog-open-restaurant.jpg",
    openRestaurantAlt: "Restaurant storefront with inviting entrance",
    costBreakdown: "/images/blog-cost-restaurant.jpg",
    costBreakdownAlt: "Financial documents and calculator for restaurant budgeting",
  },

  testimonial: "/images/testimonial.jpg",
  testimonialAlt: "Professional business portrait",
} as const;
