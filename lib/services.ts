import { images } from "./images";

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
  problem: string;
  benefits: string[];
  process: { step: string; description: string }[];
  metrics: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  content: string;
}

export const services: ServiceData[] = [
  {
    slug: "menu-engineering",
    title: "Menu Engineering & Pricing Strategy",
    shortTitle: "Menu Engineering",
    description:
      "Optimize your menu for maximum profitability with data-driven pricing, strategic item placement, and cost analysis.",
    icon: "UtensilsCrossed",
    image: images.services.menuEngineering,
    imageAlt: images.services.menuEngineeringAlt,
    problem:
      "Most restaurants leave 10-25% of potential profit on the table through poor menu design, incorrect pricing, and high food costs. Without data-driven analysis, you are guessing at what works.",
    benefits: [
      "Increase average check size by 15-25% through strategic menu design",
      "Reduce food costs to industry-optimal 28-32% range",
      "Identify and eliminate unprofitable menu items draining resources",
      "Create pricing strategies that customers accept and that maximize margins",
    ],
    process: [
      {
        step: "Menu Audit",
        description:
          "We analyze every item on your menu: food cost percentage, contribution margin, popularity, and placement. We identify your stars, plowhorses, puzzles, and dogs.",
      },
      {
        step: "Strategy Development",
        description:
          "Based on the audit, we redesign your menu layout, adjust pricing, recommend item additions or removals, and create a food cost control system.",
      },
      {
        step: "Implementation & Training",
        description:
          "We implement the new menu, train your kitchen and front-of-house staff, and set up tracking systems so you can monitor performance ongoing.",
      },
    ],
    metrics: [
      { label: "Avg. Revenue Increase", value: "22%" },
      { label: "Food Cost Reduction", value: "8-12%" },
      { label: "ROI Timeline", value: "2-3 months" },
    ],
    faqs: [
      {
        question: "How long does a menu engineering project take?",
        answer:
          "A typical menu engineering project takes 4-6 weeks from initial audit to implementation. This includes 1-2 weeks of data collection and analysis, 1-2 weeks of strategy development, and 1-2 weeks of implementation and staff training.",
      },
      {
        question: "Do I need to change my entire menu?",
        answer:
          "Not necessarily. Menu engineering often involves strategic adjustments rather than a complete overhaul. We might reposition items, adjust pricing on specific dishes, add 2-3 high-margin items, and remove underperformers. The goal is maximum impact with minimum disruption.",
      },
      {
        question: "How do you calculate the right price for menu items?",
        answer:
          "We use a combination of food cost analysis, contribution margin calculations, competitor pricing research, and customer willingness-to-pay data. The goal is finding the sweet spot where customers perceive value while you maintain healthy margins.",
      },
      {
        question: "What kind of restaurants benefit from menu engineering?",
        answer:
          "Every restaurant benefits, but the biggest gains come from restaurants with 20+ menu items, food costs above 33%, or menus that have not been strategically reviewed in over a year. Both fine dining and casual restaurants see significant improvements.",
      },
    ],
    content:
      "Menu engineering is the science of designing a restaurant menu to maximize profitability. It combines food cost analysis, pricing psychology, visual design principles, and customer behavior data to create a menu that drives both satisfaction and revenue.",
  },
  {
    slug: "concept-development",
    title: "Restaurant Concept Development",
    shortTitle: "Concept Development",
    description:
      "From initial idea to grand opening. We develop restaurant concepts that resonate with your target market and stand out in competitive landscapes.",
    icon: "Lightbulb",
    image: images.services.concept,
    imageAlt: images.services.conceptAlt,
    problem:
      "60% of restaurants fail within the first year, and the primary reason is a concept that does not resonate with the target market. Without proper research and planning, you are building on assumptions.",
    benefits: [
      "Launch with a concept validated by market research and competitive analysis",
      "Develop a brand identity that attracts your ideal customer profile",
      "Create an operational blueprint that guides every decision from design to staffing",
      "Reduce time-to-open by 30-40% with an experienced team guiding the process",
    ],
    process: [
      {
        step: "Discovery & Research",
        description:
          "We study your target market, analyze competitors, identify location demographics, and define the whitespace opportunity for your concept.",
      },
      {
        step: "Concept Design",
        description:
          "We develop your brand identity, menu direction, interior design brief, service style, and operational model. Every detail is documented in a comprehensive concept book.",
      },
      {
        step: "Pre-Opening Support",
        description:
          "We support you through vendor selection, kitchen design, staff hiring and training, soft opening, and grand opening to ensure a successful launch.",
      },
    ],
    metrics: [
      { label: "Success Rate", value: "92%" },
      { label: "Avg. Time to Open", value: "4-6 months" },
      { label: "Projects Completed", value: "30+" },
    ],
    faqs: [
      {
        question: "I have a vague idea for a restaurant. Is that enough to start?",
        answer:
          "Absolutely. Many of our best projects started as a rough idea. Our discovery process is designed to take your vision, validate it against market data, and shape it into a viable concept. We will help you define everything from cuisine and price point to target customer and brand personality.",
      },
      {
        question: "How much does it cost to develop a restaurant concept?",
        answer:
          "Concept development typically ranges from $5,000 to $25,000 depending on scope. A basic concept package (brand identity, menu direction, operational outline) starts around $5,000. A comprehensive package including market research, full brand book, interior design brief, and pre-opening support is at the higher end.",
      },
      {
        question: "Do you help with restaurant design and construction?",
        answer:
          "We create the design brief and concept direction, then work with architects and interior designers to bring it to life. We do not do construction directly, but we manage the design process and can recommend trusted partners in Bangkok and across Thailand.",
      },
      {
        question: "Can you help with an existing restaurant that needs rebranding?",
        answer:
          "Yes. Rebranding and concept pivots are a significant part of our work. Whether you need a full rebrand or strategic adjustments to your existing concept, we apply the same research-driven approach to identify what is working, what is not, and what changes will have the biggest impact.",
      },
    ],
    content:
      "Restaurant concept development is the foundation of every successful food business. It encompasses market research, brand identity, menu strategy, interior design direction, service style, and operational planning.",
  },
  {
    slug: "cloud-kitchen",
    title: "Cloud Kitchen & Ghost Kitchen Consulting",
    shortTitle: "Cloud Kitchen",
    description:
      "Launch or optimize a cloud kitchen operation with virtual brand strategy, delivery optimization, and multi-brand management.",
    icon: "Cloud",
    image: images.services.cloudKitchen,
    imageAlt: images.services.cloudKitchenAlt,
    problem:
      "Cloud kitchens promise low overhead and rapid scaling, but without proper strategy, most operators end up with thin margins, poor reviews, and platform dependency. The model requires a fundamentally different approach than traditional restaurants.",
    benefits: [
      "Launch multiple virtual brands from a single kitchen to maximize revenue per square meter",
      "Optimize delivery packaging and timing to maintain food quality scores above 4.5 stars",
      "Reduce dependency on third-party platforms with direct ordering capabilities",
      "Achieve break-even in 3-4 months instead of the typical 12-18 for traditional restaurants",
    ],
    process: [
      {
        step: "Market & Platform Analysis",
        description:
          "We analyze demand patterns on Grab, LINE MAN, Foodpanda, and Robinhood in your target area. We identify cuisine gaps, peak ordering times, and competitive pricing benchmarks.",
      },
      {
        step: "Brand & Menu Development",
        description:
          "We create 2-4 virtual brands optimized for delivery, each with a focused menu of 15-20 items designed for speed, consistency, and packaging durability.",
      },
      {
        step: "Operations & Launch",
        description:
          "We set up kitchen workflow for multi-brand operation, implement quality control systems, optimize packaging, and manage platform onboarding and launch promotions.",
      },
    ],
    metrics: [
      { label: "Avg. Brands per Kitchen", value: "3-4" },
      { label: "Break-Even Timeline", value: "3-4 months" },
      { label: "Order Volume Growth", value: "200%+" },
    ],
    faqs: [
      {
        question: "How many virtual brands can I run from one kitchen?",
        answer:
          "Most kitchens can efficiently operate 3-4 virtual brands simultaneously. The key constraint is kitchen workflow, not space. Each brand should share at least 40% of base ingredients to keep inventory manageable. We have seen kitchens successfully run up to 6 brands, but quality typically drops beyond 4.",
      },
      {
        question:
          "Is a cloud kitchen cheaper to start than a traditional restaurant?",
        answer:
          "Significantly. A cloud kitchen in Bangkok can launch for 500,000-1,500,000 THB ($15,000-$45,000), compared to 3,000,000-10,000,000 THB ($90,000-$300,000) for a traditional restaurant. The savings come from no dining room, minimal staff, and simpler buildout.",
      },
      {
        question:
          "Which delivery platforms should I prioritize in Thailand?",
        answer:
          "Grab Food and LINE MAN Wongnai are the dominant platforms in Bangkok, covering 70-80% of the market. Foodpanda and Robinhood are secondary. We recommend launching on all four but investing promotional budget primarily in Grab and LINE MAN for the first 3 months.",
      },
      {
        question: "How do you maintain food quality for delivery?",
        answer:
          "Quality in delivery is about three things: menu design (choosing items that travel well), packaging (investing in proper containers that maintain temperature and texture), and timing (optimizing kitchen workflow so orders go out within 8-12 minutes of preparation). We design all three during the concept phase.",
      },
    ],
    content:
      "Cloud kitchens represent the fastest-growing segment of the Thai F&B industry. With lower startup costs and the ability to test multiple concepts simultaneously, they offer an attractive entry point for both new operators and established restaurants looking to expand.",
  },
  {
    slug: "feasibility-study",
    title: "Feasibility Studies & Business Plans",
    shortTitle: "Feasibility Study",
    description:
      "Data-driven feasibility studies and business plans that give you clarity before you invest. Know your numbers before you sign a lease.",
    icon: "BarChart3",
    image: images.services.feasibility,
    imageAlt: images.services.feasibilityAlt,
    problem:
      "Most restaurant investors make decisions based on gut feeling and optimistic projections. Without a proper feasibility study, you cannot objectively assess whether a location, concept, or market will support your investment.",
    benefits: [
      "Make informed go/no-go decisions backed by real market data",
      "Present investor-ready business plans with realistic financial projections",
      "Identify risks and mitigation strategies before committing capital",
      "Negotiate better lease terms with landlords using professional documentation",
    ],
    process: [
      {
        step: "Site & Market Assessment",
        description:
          "We evaluate your proposed location: foot traffic patterns, demographic analysis, competitor mapping within a 2km radius, and rent benchmarking against comparable F&B spaces.",
      },
      {
        step: "Financial Modeling",
        description:
          "We build a detailed P&L projection with startup costs, monthly operating expenses, revenue scenarios (conservative/moderate/optimistic), break-even analysis, and 3-year cash flow forecast.",
      },
      {
        step: "Report & Recommendations",
        description:
          "We deliver a comprehensive feasibility report with a clear recommendation, key risk factors, and if the project is viable, an actionable roadmap with timeline and budget.",
      },
    ],
    metrics: [
      { label: "Studies Completed", value: "40+" },
      { label: "Accuracy of Projections", value: "85-90%" },
      { label: "Avg. Report Delivery", value: "3-4 weeks" },
    ],
    faqs: [
      {
        question: "When should I get a feasibility study done?",
        answer:
          "Before you sign a lease or commit any significant capital. The ideal time is when you have a concept idea and 1-3 potential locations shortlisted. A feasibility study costs a fraction of the total investment and can save you from a costly mistake.",
      },
      {
        question: "What does a feasibility study include?",
        answer:
          "Our feasibility studies include: location analysis (foot traffic, demographics, competition), market demand assessment, concept validation, full financial model (startup costs, P&L projection, break-even analysis), risk assessment, and a clear go/no-go recommendation with supporting data.",
      },
      {
        question: "Can I use the business plan to raise investment?",
        answer:
          "Yes. Our business plans are investor-ready and include the level of detail that banks and private investors expect: executive summary, market analysis, financial projections, management team overview, and exit strategy considerations.",
      },
      {
        question: "How accurate are your financial projections?",
        answer:
          "Our projections have historically been within 85-90% accuracy of actual results in the first year. We achieve this by using real market data, comparable restaurant benchmarks, and conservative assumptions. We always present three scenarios so you understand the range of outcomes.",
      },
    ],
    content:
      "A feasibility study is the most important document you will commission before opening a restaurant. It transforms assumptions into data and gives you the confidence to invest or the clarity to walk away.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
