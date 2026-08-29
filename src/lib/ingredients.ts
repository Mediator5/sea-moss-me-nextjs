/**
 * The Sea Moss Me ingredient library.
 *
 * Sourced from the brand's own fruit and functional-herb guides. Each entry is
 * written the same way: who it suits, then the specific compounds and the
 * traditional uses behind the claim — never a vague "boosts wellness".
 *
 * `inJars` links an ingredient to the products it actually appears in.
 * Anything with an empty `inJars` is part of the wider formulation library
 * rather than a current jar, and is labelled that way on the site.
 */

export type IngredientGroup = "fruit" | "herb" | "green";

export type BenefitTag =
  | "Digestion"
  | "Immunity"
  | "Energy"
  | "Calm & sleep"
  | "Heart & circulation"
  | "Skin & hair"
  | "Joints & inflammation"
  | "Detox & liver"
  | "Focus & mood"
  | "Minerals";

export type Ingredient = {
  slug: string;
  name: string;
  group: IngredientGroup;
  /** Shown as the headline claim on the card. */
  summary: string;
  /** Who this ingredient is for, in plain language. */
  bestFor: string;
  benefits: { term: string; copy: string }[];
  tags: BenefitTag[];
  /** Product slugs this ingredient appears in. Empty = library ingredient. */
  inJars: string[];
  /** Not yet in any jar, but on the way. */
  pipeline?: boolean;
  /** Anything a customer genuinely needs to know before taking it. */
  caution?: string;
  color: string;
};

export const ingredientLibrary: Ingredient[] = [
  /* ------------------------------------------------------------------ */
  /* The foundation                                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "sea-moss",
    name: "Sea Moss",
    group: "green",
    summary: "The wildcrafted Jamaican foundation of every jar we make.",
    bestFor: "Everyone — this is the base every other ingredient is folded into.",
    benefits: [
      {
        term: "Mineral-dense",
        copy: "Naturally rich across a wide range of essential minerals, absorbed straight from clean seawater.",
      },
      {
        term: "Thyroid & metabolic support",
        copy: "Its natural iodine content is the reason sea moss has long been valued for metabolic function.",
      },
      {
        term: "Gut & digestive support",
        copy: "The gel-like mucilage that makes sea moss set is also what makes it soothing to the digestive tract.",
      },
      {
        term: "Caribbean heritage",
        copy: "Used across generations of Caribbean households long before it was a wellness trend.",
      },
    ],
    tags: ["Minerals", "Digestion", "Energy"],
    inJars: [
      "alkaline-me",
      "beets-and-berry-me",
      "golden-me",
      "tropical-me",
    ],
    color: "#0f5b6c",
  },

  /* ------------------------------------------------------------------ */
  /* Greens & algae — Alkaline Me                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "chlorophyll",
    name: "Chlorophyll",
    group: "green",
    summary: "The green pigment that gives plants their colour — and Alkaline Me its depth.",
    bestFor: "Anyone eating a diet heavy on processed food and light on greens.",
    benefits: [
      {
        term: "Alkalising",
        copy: "Chlorophyll-rich foods are traditionally used to help balance a heavily acidic, processed diet.",
      },
      {
        term: "Antioxidant support",
        copy: "Contributes to the body's everyday defence against oxidative stress.",
      },
      {
        term: "Freshness",
        copy: "Long used as a natural internal deodoriser — one of its oldest folk uses.",
      },
    ],
    tags: ["Detox & liver", "Energy"],
    inJars: ["alkaline-me"],
    color: "#1f5e3c",
  },
  {
    slug: "moringa",
    name: "Moringa",
    group: "green",
    summary: "The 'miracle tree' leaf — one of the most nutrient-dense greens on earth.",
    bestFor: "Shoppers wanting steady, food-based energy rather than stimulants.",
    benefits: [
      {
        term: "Vitamin-rich",
        copy: "A natural source of vitamins A, C and E alongside calcium and potassium.",
      },
      {
        term: "Plant protein",
        copy: "Contains all nine essential amino acids, unusual for a leafy green.",
      },
      {
        term: "Everyday vitality",
        copy: "Traditionally used across Africa and South Asia to support energy and endurance.",
      },
      {
        term: "Anti-inflammatory compounds",
        copy: "Rich in isothiocyanates, studied for their role in calming inflammation.",
      },
    ],
    tags: ["Energy", "Minerals", "Joints & inflammation"],
    inJars: ["alkaline-me"],
    color: "#3f8a5f",
  },
  {
    slug: "spirulina",
    name: "Spirulina",
    group: "green",
    summary: "A blue-green algae that is roughly 60% complete plant protein by weight.",
    bestFor: "Active customers and anyone building a plant-forward diet.",
    benefits: [
      {
        term: "Complete protein",
        copy: "Provides all essential amino acids in a highly digestible form.",
      },
      {
        term: "Iron & B vitamins",
        copy: "Supports oxygen transport and the conversion of food into usable energy.",
      },
      {
        term: "Phycocyanin",
        copy: "The pigment behind its blue-green colour, studied for antioxidant activity.",
      },
    ],
    tags: ["Energy", "Minerals", "Immunity"],
    inJars: ["alkaline-me"],
    color: "#12667a",
  },
  {
    slug: "chlorella",
    name: "Chlorella",
    group: "green",
    summary: "A freshwater algae with a cell wall that binds to heavy metals.",
    bestFor: "Shoppers interested in gentle, everyday detox support.",
    benefits: [
      {
        term: "Binding capacity",
        copy: "Its tough cell wall is the reason chlorella is studied for binding to heavy metals.",
      },
      {
        term: "Nutrient density",
        copy: "Carries chlorophyll, iron, magnesium and B vitamins in a single whole food.",
      },
      {
        term: "Digestive support",
        copy: "Traditionally used to support regularity and healthy gut bacteria.",
      },
    ],
    tags: ["Detox & liver", "Digestion", "Minerals"],
    inJars: ["alkaline-me"],
    color: "#256b4f",
  },

  /* ------------------------------------------------------------------ */
  /* Fruits — Beets and Berry Me                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "elderberry",
    name: "Elderberry",
    group: "fruit",
    summary: "The most recognised immune-support berry on the shelf, and the oldest.",
    bestFor: "Immune-focused shoppers, especially through cold and flu season.",
    benefits: [
      {
        term: "Vitamin C & flavonoids",
        copy: "A well-established combination for supporting normal immune function.",
      },
      {
        term: "Antioxidants",
        copy: "Studied for anti-inflammatory and antiviral properties.",
      },
      {
        term: "Traditional use",
        copy: "Used for centuries in herbal immune preparations across Europe and the Caribbean.",
      },
      {
        term: "Seasonal staple",
        copy: "The berry most people already reach for when the weather turns.",
      },
    ],
    tags: ["Immunity"],
    inJars: ["beets-and-berry-me"],
    color: "#4c1428",
  },
  {
    slug: "beetroot",
    name: "Beetroot",
    group: "fruit",
    summary: "A natural nitrate source, long used before physical effort.",
    bestFor: "Active customers and heart-health-focused shoppers.",
    benefits: [
      {
        term: "Natural nitrates",
        copy: "Converted by the body into nitric oxide, which supports healthy blood flow.",
      },
      {
        term: "Folate",
        copy: "Supports cell function and the metabolism that turns food into energy.",
      },
      { term: "Fibre", copy: "Contributes to digestive health and regularity." },
      {
        term: "Stamina support",
        copy: "Commonly taken ahead of physical activity for exactly this reason.",
      },
    ],
    tags: ["Heart & circulation", "Energy", "Digestion"],
    inJars: ["beets-and-berry-me"],
    color: "#7a2540",
  },
  {
    slug: "dragonfruit",
    name: "Dragonfruit",
    group: "fruit",
    summary: "A light, low-calorie fruit carrying prebiotic fibre.",
    bestFor: "Trend-forward shoppers wanting an everyday, easy-going option.",
    benefits: [
      { term: "Vitamin C", copy: "A light, easy source of everyday immune support." },
      {
        term: "Prebiotic fibre",
        copy: "Feeds the healthy bacteria already living in your gut.",
      },
      { term: "Low calorie", copy: "Nutrient-dense without being heavy." },
      {
        term: "Visual standout",
        copy: "The vivid colour that makes the Beets and Berry Me jar what it is.",
      },
    ],
    tags: ["Digestion", "Immunity"],
    inJars: ["beets-and-berry-me"],
    color: "#a44766",
  },

  {
    slug: "blueberry",
    name: "Blueberry",
    group: "fruit",
    summary: "The berry most associated with memory and focus, and deservedly so.",
    bestFor: "Brain-health and heart-health-focused shoppers.",
    benefits: [
      {
        term: "Anthocyanins",
        copy: "One of the highest antioxidant levels of any common fruit.",
      },
      {
        term: "Vitamin C & K",
        copy: "Supports immune function and bone health.",
      },
      { term: "Fibre", copy: "Supports gut and digestive health." },
      {
        term: "Cognitive support",
        copy: "Widely recognised for supporting memory and focus.",
      },
    ],
    tags: ["Focus & mood", "Heart & circulation", "Immunity"],
    inJars: ["beets-and-berry-me"],
    color: "#3f4a8a",
  },
  {
    slug: "raspberry",
    name: "Raspberry",
    group: "fruit",
    summary: "One of the highest-fibre, lowest-glycemic fruits you can eat.",
    bestFor: "Blood-sugar-conscious shoppers and everyday antioxidant seekers.",
    benefits: [
      {
        term: "Fibre",
        copy: "One of the highest fibre contents of any common fruit.",
      },
      {
        term: "Vitamin C & manganese",
        copy: "Supports immunity and healthy skin.",
      },
      {
        term: "Ellagic acid & anthocyanins",
        copy: "Antioxidant compounds that help fight oxidative stress.",
      },
      { term: "Low glycemic", copy: "A lower-sugar fruit option." },
    ],
    tags: ["Digestion", "Immunity", "Skin & hair"],
    inJars: ["beets-and-berry-me"],
    color: "#a82f4a",
  },

  /* ------------------------------------------------------------------ */
  /* Fruits — Tropical Me                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "mango",
    name: "Mango",
    group: "fruit",
    summary: "The friendliest way into sea moss — and a full day of vitamin C.",
    bestFor: "Health-conscious households wanting a kid-friendly entry point.",
    benefits: [
      { term: "Vitamin A", copy: "Supports eye health and skin renewal." },
      {
        term: "Vitamin C",
        copy: "A full day's worth in a single serving.",
      },
      {
        term: "Beta-carotene",
        copy: "An antioxidant that helps the body handle oxidative stress.",
      },
      {
        term: "Natural sweetness",
        copy: "Satisfies a sweet craving with no added sugar anywhere in the jar.",
      },
    ],
    tags: ["Immunity", "Skin & hair"],
    inJars: ["tropical-me"],
    color: "#d9812a",
  },
  {
    slug: "coconut",
    name: "Coconut",
    group: "fruit",
    summary: "Nature's electrolyte drink, in fruit form.",
    bestFor: "Active and fitness-minded customers seeking natural hydration.",
    benefits: [
      {
        term: "Potassium & manganese",
        copy: "Natural electrolyte replenishment after heat or exertion.",
      },
      {
        term: "MCTs",
        copy: "Medium-chain triglycerides, used by the body for quick, clean energy.",
      },
      {
        term: "Digestive comfort",
        copy: "Traditionally used across the Caribbean to settle an unhappy gut.",
      },
      { term: "Naturally hydrating", copy: "Supports healthy fluid balance." },
    ],
    tags: ["Energy", "Digestion", "Minerals"],
    inJars: ["tropical-me"],
    color: "#c9b48a",
  },
  {
    slug: "pineapple",
    name: "Pineapple",
    group: "fruit",
    summary: "Carries bromelain, one of nature's best-known digestive enzymes.",
    bestFor: "Gut-health shoppers and recovery-focused customers.",
    benefits: [
      {
        term: "Bromelain",
        copy: "A natural enzyme that helps the body break protein down.",
      },
      {
        term: "Vitamin C & manganese",
        copy: "Supports immunity and healthy metabolism together.",
      },
      {
        term: "Anti-bloating support",
        copy: "Traditionally used to ease digestive discomfort after a heavy meal.",
      },
      {
        term: "Post-activity recovery",
        copy: "Commonly taken after exercise or hard physical work.",
      },
    ],
    tags: ["Digestion", "Immunity", "Joints & inflammation"],
    inJars: ["tropical-me"],
    color: "#d68f26",
  },
  {
    slug: "papaya",
    name: "Papaya",
    group: "fruit",
    summary: "Gentle enough for every day, with more vitamin C than an orange.",
    bestFor: "Digestive-health shoppers wanting something mild and daily.",
    benefits: [
      {
        term: "Papain",
        copy: "A digestive enzyme that eases the breakdown of protein.",
      },
      {
        term: "Vitamin C",
        copy: "Often higher per serving than an orange.",
      },
      {
        term: "Skin support",
        copy: "Its antioxidant profile is why papaya turns up in skincare as often as smoothies.",
      },
      {
        term: "Gentle on the stomach",
        copy: "One of the mildest fruits you can take daily.",
      },
    ],
    tags: ["Digestion", "Skin & hair", "Immunity"],
    inJars: ["tropical-me"],
    color: "#ea7c50",
  },

  /* ------------------------------------------------------------------ */
  /* Herbs & roots — Golden Me                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "turmeric",
    name: "Turmeric",
    group: "herb",
    summary: "The cornerstone anti-inflammatory spice, carried by curcumin.",
    bestFor: "Joint-health and inflammation-focused shoppers.",
    benefits: [
      {
        term: "Curcumin",
        copy: "Turmeric's primary compound, widely studied for anti-inflammatory effects.",
      },
      {
        term: "Joint comfort",
        copy: "Used to support mobility and ease everyday stiffness.",
      },
      {
        term: "Heart & liver support",
        copy: "Linked in research to healthy circulation and liver function.",
      },
      {
        term: "Traditional use",
        copy: "A cornerstone of South Asian and Caribbean herbal medicine alike.",
      },
    ],
    tags: ["Joints & inflammation", "Heart & circulation", "Detox & liver"],
    inJars: ["golden-me"],
    color: "#c98a1e",
  },
  {
    slug: "ginger",
    name: "Ginger",
    group: "herb",
    summary: "The oldest remedy there is for an unhappy stomach.",
    bestFor: "Shoppers seeking digestive comfort and warming everyday support.",
    benefits: [
      {
        term: "Gingerol",
        copy: "The compound behind ginger's anti-inflammatory and antioxidant activity.",
      },
      {
        term: "Digestive support",
        copy: "Eases nausea, bloating and general digestive discomfort.",
      },
      {
        term: "Blood sugar support",
        copy: "Studies link regular ginger intake to healthier blood sugar levels.",
      },
      {
        term: "Traditional use",
        copy: "A long-standing household remedy through cold and flu season.",
      },
    ],
    tags: ["Digestion", "Joints & inflammation", "Immunity"],
    inJars: ["golden-me"],
    color: "#e5af52",
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    group: "herb",
    summary: "An adaptogen — it helps the body hold its line under pressure.",
    bestFor: "Stress-management, sleep and focus-focused shoppers.",
    benefits: [
      {
        term: "Adaptogen",
        copy: "May help the body manage and regulate stress hormones such as cortisol.",
      },
      {
        term: "Sleep support",
        copy: "Associated with improved sleep quality and easier relaxation.",
      },
      {
        term: "Cognitive support",
        copy: "Studied for potential benefits to focus and brain function.",
      },
      {
        term: "Athletic recovery",
        copy: "Linked in some studies to improved strength and recovery.",
      },
    ],
    tags: ["Calm & sleep", "Focus & mood", "Energy"],
    inJars: ["golden-me"],
    color: "#b0791d",
  },
  {
    slug: "lemon",
    name: "Lemon",
    group: "fruit",
    summary: "The bright citrus lift that makes a warming blend easy to drink.",
    bestFor: "Anyone who wants vitamin C and a cleaner finish on a spiced blend.",
    benefits: [
      {
        term: "Vitamin C",
        copy: "A dependable everyday source, supporting immunity and collagen formation.",
      },
      {
        term: "Citrus flavonoids",
        copy: "Antioxidant compounds long associated with circulation and vessel health.",
      },
      {
        term: "Digestive lift",
        copy: "Traditionally taken warm in the morning to wake the digestive system up.",
      },
      {
        term: "Balances the blend",
        copy: "Cuts the earthiness of turmeric and ginger so the jar stays drinkable.",
      },
    ],
    tags: ["Immunity", "Digestion", "Skin & hair"],
    inJars: ["golden-me"],
    color: "#d8a521",
  },

  /* ------------------------------------------------------------------ */
  /* Wider herbal library                                                */
  {
    slug: "acai",
    name: "Acai",
    group: "fruit",
    summary: "Among the highest antioxidant levels measured in any fruit.",
    bestFor: "Superfood shoppers and antioxidant-focused customers.",
    benefits: [
      {
        term: "Anthocyanins",
        copy: "The deep purple pigment responsible for acai's antioxidant reputation.",
      },
      {
        term: "Healthy fats",
        copy: "Unusual for a berry, and helpful for absorbing fat-soluble nutrients.",
      },
      { term: "Fibre", copy: "Supports digestion and a healthy gut environment." },
      {
        term: "Established superfruit",
        copy: "Strong existing recognition — most customers already know why they want it.",
      },
    ],
    tags: ["Immunity", "Digestion", "Heart & circulation"],
    inJars: [],
    color: "#3d1a4a",
  },
  {
    slug: "black-pepper",
    name: "Black Pepper",
    group: "herb",
    summary: "Not for flavour — it is what makes the turmeric work.",
    bestFor: "Anyone taking turmeric who wants their body to actually use it.",
    benefits: [
      {
        term: "Piperine",
        copy: "Dramatically increases how much curcumin the body can absorb — which is why the two are always paired.",
      },
      {
        term: "Digestive stimulation",
        copy: "Traditionally used to encourage healthy digestive secretions.",
      },
      {
        term: "Antioxidant activity",
        copy: "Carries its own antioxidant compounds alongside its absorption role.",
      },
    ],
    tags: ["Digestion", "Joints & inflammation"],
    inJars: [],
    color: "#5a4632",
  },
  {
    slug: "cinnamon",
    name: "Cinnamon",
    group: "herb",
    summary: "Warming, faintly sweet, and one of the most antioxidant-dense spices measured.",
    bestFor: "Blood-sugar-conscious shoppers who want warmth without sugar.",
    benefits: [
      {
        term: "Blood sugar support",
        copy: "One of the most researched spices for supporting healthy blood sugar levels.",
      },
      {
        term: "Antioxidant density",
        copy: "Consistently ranks among the highest-scoring spices for antioxidant capacity.",
      },
      {
        term: "Natural sweetness",
        copy: "Adds perceived sweetness to the Golden Me jar without a gram of added sugar.",
      },
    ],
    tags: ["Digestion", "Heart & circulation"],
    inJars: [],
    color: "#8a5a12",
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "cloves",
    name: "Cloves",
    group: "herb",
    summary: "One of the highest-scoring spices on earth for antioxidant capacity.",
    bestFor: "Shoppers seeking oral health, digestive and antioxidant support.",
    benefits: [
      {
        term: "Eugenol",
        copy: "A potent antioxidant compound and the source of clove's distinctive warmth.",
      },
      {
        term: "Traditional use",
        copy: "Long used to ease tooth and gum discomfort — the original dental remedy.",
      },
      {
        term: "Blood sugar support",
        copy: "Early research suggests a role in healthy blood sugar regulation.",
      },
      {
        term: "Antimicrobial properties",
        copy: "Traditionally valued for its natural antibacterial qualities.",
      },
    ],
    tags: ["Digestion", "Immunity"],
    inJars: [],
    color: "#6b4423",
  },
  {
    slug: "nettle",
    name: "Nettle",
    group: "herb",
    summary: "A genuinely mineral-rich green, and a traditional allergy remedy.",
    bestFor: "Seasonal allergy sufferers and shoppers seeking natural mineral support.",
    benefits: [
      {
        term: "Rich in minerals",
        copy: "A natural source of iron, calcium and other trace minerals.",
      },
      {
        term: "Traditional use",
        copy: "Long used to ease seasonal allergy symptoms.",
      },
      {
        term: "Gentle diuretic",
        copy: "Supports the body's own natural detox processes.",
      },
      {
        term: "Blood sugar support",
        copy: "Traditionally used to help maintain healthy blood sugar levels.",
      },
    ],
    tags: ["Minerals", "Detox & liver", "Immunity"],
    inJars: [],
    color: "#2f6b3f",
  },
  {
    slug: "lemon-balm",
    name: "Lemon Balm",
    group: "herb",
    summary: "A calming member of the mint family, often paired with valerian.",
    bestFor: "Shoppers seeking calm, better sleep and digestive ease.",
    benefits: [
      {
        term: "Calming properties",
        copy: "Traditionally used to ease stress and occasional anxiety.",
      },
      {
        term: "Sleep support",
        copy: "Often paired with valerian to support restful sleep.",
      },
      {
        term: "Digestive comfort",
        copy: "May help relieve bloating and indigestion.",
      },
      {
        term: "Mood & focus",
        copy: "Early research suggests support for memory and mood.",
      },
    ],
    tags: ["Calm & sleep", "Focus & mood", "Digestion"],
    inJars: [],
    color: "#5c8a4a",
  },
  {
    slug: "valerian",
    name: "Valerian",
    group: "herb",
    summary: "The most recognised herb for sleep onset — strictly an evening ingredient.",
    bestFor: "Shoppers specifically seeking nighttime sleep support.",
    benefits: [
      {
        term: "Sleep support",
        copy: "One of the most recognised herbs for supporting sleep onset and quality.",
      },
      {
        term: "Valerenic acid",
        copy: "The calming compound behind valerian's ability to ease restlessness.",
      },
      {
        term: "Menstrual comfort",
        copy: "Traditionally used to ease PMS and menstrual discomfort.",
      },
    ],
    tags: ["Calm & sleep"],
    inJars: [],
    caution:
      "Evening use only — valerian's sedative effect makes it a nighttime-formula ingredient, never a daytime one.",
    color: "#4a5a6b",
  },
  {
    slug: "dandelion",
    name: "Dandelion",
    group: "herb",
    summary: "The classic liver tonic, and far more nutritious than its reputation suggests.",
    bestFor: "Shoppers interested in liver support and gentle everyday detox.",
    benefits: [
      {
        term: "Nutrient-dense",
        copy: "A strong natural source of vitamins A, C and K.",
      },
      {
        term: "Traditional liver tonic",
        copy: "Long used to support liver and digestive function.",
      },
      {
        term: "Natural diuretic",
        copy: "Supports the body's gentle detox processes.",
      },
      {
        term: "Rich in antioxidants",
        copy: "Contributes to overall cellular protection.",
      },
    ],
    tags: ["Detox & liver", "Digestion", "Minerals"],
    inJars: [],
    color: "#8a9a2f",
  },
  {
    slug: "mullein",
    name: "Mullein",
    group: "herb",
    summary: "A centuries-old remedy for coughs and irritated airways.",
    bestFor: "Shoppers seeking respiratory and throat comfort.",
    benefits: [
      {
        term: "Saponins & mucilage",
        copy: "Traditionally used to soothe airways and support mucus clearance.",
      },
      { term: "Flavonoids", copy: "Provide antioxidant support." },
      {
        term: "Traditional use",
        copy: "A centuries-old remedy for coughs and throat irritation.",
      },
      {
        term: "Gentle profile",
        copy: "Well tolerated across a wide range of everyday users.",
      },
    ],
    tags: ["Immunity", "Calm & sleep"],
    inJars: [],
    color: "#a8925c",
  },
  {
    slug: "black-seed-oil",
    name: "Black Seed Oil",
    group: "herb",
    summary: "Nigella sativa — carried by thymoquinone, its signature compound.",
    bestFor: "Shoppers seeking broad immune, skin and anti-inflammatory support.",
    benefits: [
      {
        term: "Thymoquinone",
        copy: "The key antioxidant and anti-inflammatory compound in black seed.",
      },
      {
        term: "Immune balance",
        copy: "Supports overall immune system function rather than simply stimulating it.",
      },
      {
        term: "Traditional use",
        copy: "Long used to support skin conditions and clearer-looking skin.",
      },
      {
        term: "Blood sugar support",
        copy: "Studied for its role in healthy blood sugar regulation.",
      },
    ],
    tags: ["Immunity", "Skin & hair", "Joints & inflammation"],
    inJars: [],
    color: "#2f2f38",
  },
  {
    slug: "lavender",
    name: "Lavender",
    group: "herb",
    summary: "Calm in plant form — and gentler on digestion than most people expect.",
    bestFor: "Shoppers seeking calm, better sleep and stress relief.",
    benefits: [
      {
        term: "Calming aromatic compounds",
        copy: "Support relaxation and ease physical tension.",
      },
      {
        term: "Traditional use",
        copy: "Long used to ease anxiety and promote restful sleep.",
      },
      {
        term: "Antioxidant & anti-inflammatory",
        copy: "Contributes to overall wellness support.",
      },
      {
        term: "Digestive comfort",
        copy: "May help ease occasional bloating and indigestion.",
      },
    ],
    tags: ["Calm & sleep", "Focus & mood", "Digestion"],
    inJars: [],
    color: "#7b6ba8",
  },
  {
    slug: "chamomile",
    name: "Chamomile",
    group: "herb",
    summary: "The most widely tolerated calming herb there is.",
    bestFor: "Shoppers seeking gentle relaxation and sleep support.",
    benefits: [
      {
        term: "Apigenin",
        copy: "A compound linked to relaxation and improved sleep quality.",
      },
      {
        term: "Traditional use",
        copy: "Long used to soothe digestive discomfort as well as nerves.",
      },
      {
        term: "Anti-inflammatory & antioxidant",
        copy: "Supports overall wellness alongside its calming reputation.",
      },
      {
        term: "Gentle, everyday use",
        copy: "One of the most widely tolerated calming herbs available.",
      },
    ],
    tags: ["Calm & sleep", "Digestion"],
    inJars: [],
    color: "#d9c26b",
  },
  {
    slug: "bilberry",
    name: "Bilberry",
    group: "herb",
    summary: "Among the richest antioxidant sources of any berry, and a traditional eye tonic.",
    bestFor: "Shoppers focused on eye health and antioxidant support.",
    benefits: [
      {
        term: "Anthocyanins",
        copy: "Among the richest antioxidant sources of any berry.",
      },
      {
        term: "Traditional use",
        copy: "Long valued for supporting eye and vision health.",
      },
      {
        term: "Circulatory support",
        copy: "Supports healthy blood flow.",
      },
      {
        term: "Mood & cognitive support",
        copy: "Early research suggests benefits for mood and mental clarity.",
      },
    ],
    tags: ["Heart & circulation", "Focus & mood", "Immunity"],
    inJars: [],
    color: "#3a3a6b",
  },
  {
    slug: "raspberry-leaf",
    name: "Raspberry Leaf",
    group: "herb",
    summary: "A traditional women's tonic — the leaf, not the fruit.",
    bestFor: "Women's-health-focused shoppers.",
    benefits: [
      {
        term: "Nutrient-rich",
        copy: "A source of vitamins C and E alongside iron and magnesium.",
      },
      {
        term: "Traditional use",
        copy: "Long used as a women's health and uterine tonic.",
      },
      {
        term: "Reproductive wellness",
        copy: "Supports overall reproductive health.",
      },
    ],
    tags: ["Minerals", "Calm & sleep"],
    inJars: [],
    caution:
      "Historically used in the third trimester of pregnancy only, not earlier. Speak to your midwife or doctor first.",
    color: "#7a5a6b",
  },
  {
    slug: "hibiscus",
    name: "Hibiscus",
    group: "herb",
    summary: "Tart, deep red, and one of the best-studied herbs for blood pressure.",
    bestFor: "Heart-health and antioxidant-focused shoppers.",
    benefits: [
      {
        term: "Antioxidants & vitamin C",
        copy: "Supports overall cellular protection.",
      },
      {
        term: "Traditional use",
        copy: "Long used to support healthy blood pressure.",
      },
      {
        term: "Metabolic support",
        copy: "Studied for benefits to healthy blood sugar and lipid levels.",
      },
    ],
    tags: ["Heart & circulation", "Immunity"],
    inJars: [],
    caution:
      "Not recommended during pregnancy — its blood-pressure-lowering effect warrants caution for that group.",
    color: "#a8243f",
  },
  {
    slug: "rosehips",
    name: "Rosehips",
    group: "herb",
    summary: "Up to twenty times more vitamin C than oranges, weight for weight.",
    bestFor: "Shoppers seeking immune support and joint comfort.",
    benefits: [
      {
        term: "Exceptionally high vitamin C",
        copy: "Up to 20 times more than oranges by weight.",
      },
      {
        term: "Antioxidant-rich",
        copy: "Supports overall cellular protection.",
      },
      {
        term: "Traditional use",
        copy: "Long used to support joint comfort.",
      },
      {
        term: "Skin & immune support",
        copy: "A well-rounded, gentle everyday ingredient.",
      },
    ],
    tags: ["Immunity", "Joints & inflammation", "Skin & hair"],
    inJars: [],
    color: "#c2472f",
  },

  /* ------------------------------------------------------------------ */
  /* In development                                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "strawberry",
    name: "Strawberry",
    group: "fruit",
    pipeline: true,
    summary: "A full day's vitamin C in a single serving, and universally loved.",
    bestFor: "Broad, universal appeal — skin and immune-focused customers.",
    benefits: [
      {
        term: "Vitamin C",
        copy: "One serving can meet a full day's recommended amount.",
      },
      {
        term: "Manganese",
        copy: "Supports bone health and blood sugar regulation.",
      },
      {
        term: "Ellagic acid & flavonoids",
        copy: "Antioxidant compounds linked to heart health.",
      },
    ],
    tags: ["Immunity", "Skin & hair", "Heart & circulation"],
    inJars: [],
    color: "#c2334a",
  },
  {
    slug: "soursop",
    name: "Soursop",
    group: "fruit",
    pipeline: true,
    summary: "A Caribbean favourite you won't find in most wellness brands.",
    bestFor: "Caribbean-heritage shoppers seeking something authentic and less common.",
    benefits: [
      {
        term: "Vitamin C",
        copy: "A single fruit can provide well over a full day's recommended amount.",
      },
      {
        term: "Potassium & magnesium",
        copy: "Supports healthy blood pressure and muscle function.",
      },
      { term: "Fibre", copy: "Supports digestion and gut health." },
      {
        term: "A real differentiator",
        copy: "A distinctive tropical fruit most wellness brands simply don't carry.",
      },
    ],
    tags: ["Immunity", "Heart & circulation", "Digestion"],
    inJars: [],
    color: "#4a7a3f",
  },
];

export const benefitTags: BenefitTag[] = [
  "Digestion",
  "Immunity",
  "Energy",
  "Calm & sleep",
  "Heart & circulation",
  "Skin & hair",
  "Joints & inflammation",
  "Detox & liver",
  "Focus & mood",
  "Minerals",
];

export const groupLabels: Record<IngredientGroup, string> = {
  fruit: "Fruits",
  herb: "Herbs & roots",
  green: "Greens & sea vegetables",
};

export const getIngredient = (slug: string) =>
  ingredientLibrary.find((i) => i.slug === slug);

/** Ingredients used in a given product, in label order. */
export const ingredientsForProduct = (productSlug: string) =>
  ingredientLibrary.filter((i) => i.inJars.includes(productSlug));
