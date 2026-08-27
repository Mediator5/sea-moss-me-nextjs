export const ingredients = [
  {
    name: "Turmeric",
    copy: "Supports digestion and helps calm everyday inflammation.",
    color: "#d5992b",
  },
  {
    name: "Elderberry",
    copy: "Antioxidant-rich, a go-to for supporting your immune system.",
    color: "#7b3fa0",
  },
  {
    name: "Spirulina",
    copy: "A nutrient-dense algae packed with plant protein and minerals.",
    color: "#14806a",
  },
  {
    name: "Moringa",
    copy: "Rich in vitamins and minerals that support energy and vitality.",
    color: "#35b795",
  },
  {
    name: "Ashwagandha",
    copy: "An adaptogen that helps the body manage stress and stay steady.",
    color: "#b8842a",
  },
  {
    name: "Chlorella",
    copy: "A detoxifying, alkalising algae that supports whole-body balance.",
    color: "#1c9c80",
  },
  {
    name: "Ginger",
    copy: "Warming and settling — the oldest remedy for an unhappy stomach.",
    color: "#e6bd6a",
  },
  {
    name: "Beetroot",
    copy: "A classic for circulation, stamina and steady energy.",
    color: "#a2295f",
  },
];

export const faqs = [
  {
    q: "What exactly is sea moss, and where does yours come from?",
    a: "Sea moss (Irish moss) is a mineral-rich sea vegetable. Ours is wildcrafted — hand-harvested, never farmed — from clean coastal waters in Jamaica, then cleaned, sun-dried and gelled in small batches. Nothing is imported, pooled or bought from a broker.",
  },
  {
    q: "How do I take it, and how much should I use?",
    a: "Most customers take 1–2 tablespoons daily — blended into smoothies, stirred into tea, coffee or oatmeal, or eaten straight off the spoon. Start with one tablespoon and adjust to what feels right for you.",
  },
  {
    q: "How long does an order take to arrive?",
    a: "Orders are made fresh and leave us within 1–2 business days. Domestic delivery typically lands in 2–5 business days; international varies by destination and you'll get tracking either way. Every jar ships cold-packed.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship worldwide from Jamaica. Shipping is calculated at checkout, and any bundle of three jars or more ships free.",
  },
  {
    q: "Are there allergens or ingredients I should know about?",
    a: "Each flavour's full ingredient list is on its product page. Everything is vegan, gluten-free, dairy-free and free from added sugar, fillers and preservatives. If you have specific allergies, add a note at checkout and we'll confirm before anything ships.",
  },
  {
    q: "How should I store it, and how long does it last?",
    a: "Keep it refrigerated and it stays fresh for three to four weeks. It also freezes well — portion it into an ice cube tray and drop a cube into your morning smoothie. Always use a clean, dry spoon.",
  },
  {
    q: "Is sea moss safe while pregnant or on medication?",
    a: "Sea moss is a food, not a medicine, and most people can take it daily without issue. That said, it is naturally high in iodine — if you're pregnant, nursing, managing a thyroid condition or taking prescription medication, check with your doctor first.",
  },
  {
    q: "What's your returns policy?",
    a: "Because this is a fresh, perishable food product we can't accept returns on opened jars. If something arrives damaged, melted or not as described, email us within 48 hours of delivery and we'll replace it or refund you in full.",
  },
];

export const testimonials = [
  {
    quote:
      "I've tried four different sea moss brands and this is the only one that doesn't taste like the ocean floor. The Emerald goes into my smoothie every single morning.",
    name: "Danielle R.",
    detail: "Super Green Emerald · 16 oz",
  },
  {
    quote:
      "Bought the Golden Milk for my mother's joints and ended up ordering three more jars for the rest of us. You can tell it's actually fresh.",
    name: "Marcus T.",
    detail: "Golden Milk · 16 oz",
  },
  {
    quote:
      "Three weeks in and my energy in the afternoon is completely different. No crash at 3pm anymore. That alone is worth it.",
    name: "Ayo B.",
    detail: "Purple Power Bomb · 8 oz",
  },
];

export const process = [
  {
    step: "01",
    title: "Hand-harvested",
    copy: "Divers cut the moss from rock in clean Jamaican coastal water — never farmed on ropes, never pool-grown.",
  },
  {
    step: "02",
    title: "Sun-dried",
    copy: "It dries in open air and salt wind on the shore, the way it has been done here for generations.",
  },
  {
    step: "03",
    title: "Washed and soaked",
    copy: "Rinsed clean of sand and sea salt, then soaked in spring water with fresh lime until it blooms.",
  },
  {
    step: "04",
    title: "Blended in small batches",
    copy: "Gelled and folded with whole superfoods — no fillers, no gelatine, no preservatives, no shortcuts.",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  category: string;
  /** Simple paragraph/heading blocks — swap for MDX later if you want. */
  body: { type: "h2" | "p" | "ul"; text?: string; items?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "ultimate-guide-to-sea-moss",
    title: "The Ultimate Guide to Sea Moss: Why It's the Superfood Your Body Needs",
    date: "2026-07-27",
    readingTime: "8 min read",
    category: "Guides",
    excerpt:
      "The full rundown on sea moss — its 102 minerals, its history in Caribbean kitchens, and how to actually work it into your week.",
    body: [
      {
        type: "p",
        text: "Sea moss has had a strange decade. For most of its history it was an unglamorous Caribbean pantry staple — something your grandmother boiled down with cinnamon and condensed milk. Then it landed on the internet, and suddenly it was a miracle. The truth is somewhere more useful than either version.",
      },
      { type: "h2", text: "What sea moss actually is" },
      {
        type: "p",
        text: "Sea moss is a sea vegetable — a red algae that grows on rocks in shallow coastal water. In Jamaica the common species is Gracilaria, the slender golden-brown moss you'll see drying in the sun along the south coast. Soaked and blended, it turns into a neutral, faintly ocean-scented gel that thickens whatever you put it in.",
      },
      { type: "h2", text: "The 102 minerals claim, explained" },
      {
        type: "p",
        text: "You'll see \"102 of the body's 106 minerals\" repeated everywhere, and it deserves context. Sea moss absorbs trace minerals directly from seawater, so it carries a genuinely broad spectrum — iodine, potassium, calcium, magnesium, iron, zinc, sulphur. It is not a multivitamin in a jar, and no honest seller should tell you it is. What it is: a whole food with an unusually wide mineral profile, in a form your body handles easily.",
      },
      { type: "h2", text: "What people actually notice" },
      {
        type: "ul",
        items: [
          "Digestion — the mucilage in sea moss is soothing and acts as a prebiotic for gut bacteria.",
          "Steadier energy — a mineral-dense food fills gaps a processed diet leaves behind.",
          "Skin and hair — sulphur, zinc and vitamin-rich pairings are the reason sea moss shows up in skincare too.",
          "Immune support — especially in blends built around elderberry and dark fruit.",
        ],
      },
      { type: "h2", text: "How to take it" },
      {
        type: "p",
        text: "One to two tablespoons a day. Blend it into a smoothie, stir it into tea or coffee, whisk it into soup as a thickener, or eat it straight off the spoon. It does not need to be a ritual to work — it needs to be consistent. Most people notice something in the second or third week, not the second or third day.",
      },
      { type: "h2", text: "How to buy it well" },
      {
        type: "p",
        text: "Ask three questions: is it wildcrafted or pool-grown, where exactly was it harvested, and what else is in the jar. Pool-grown moss is fed salt in a tank and comes out mineral-poor. Fillers — gelatine, thickeners, sugar syrup — are common and easy to hide behind a pretty label. Every jar we make answers all three questions on the label itself.",
      },
    ],
  },
  {
    slug: "5-simple-ways-to-support-your-digestion",
    title: "5 Simple Ways to Support Your Digestion with Sea Moss",
    date: "2026-07-20",
    readingTime: "5 min read",
    category: "Wellness",
    excerpt:
      "Easy, everyday habits that pair perfectly with a daily scoop of sea moss gel — no overhaul required.",
    body: [
      {
        type: "p",
        text: "Digestion is the least glamorous part of wellness and the one that changes the most when you get it right. Sea moss helps because of its mucilage — the slippery, soothing fibre that coats the gut lining and feeds good bacteria. Here is how to give it a fair chance.",
      },
      { type: "h2", text: "1. Take it before food, not after" },
      {
        type: "p",
        text: "A tablespoon fifteen minutes before your first meal gives the mucilage time to settle. It also takes the edge off morning appetite, which tends to make the rest of the day's eating calmer.",
      },
      { type: "h2", text: "2. Drink more water than feels necessary" },
      {
        type: "p",
        text: "Any fibre — sea moss included — works with water and stalls without it. If you're adding a scoop a day, add a glass a day.",
      },
      { type: "h2", text: "3. Pair it with something fermented" },
      {
        type: "p",
        text: "Sea moss is a prebiotic; it feeds bacteria rather than adding them. Kefir, yoghurt, kimchi or sauerkraut supply the bacteria. Together they do far more than either alone.",
      },
      { type: "h2", text: "4. Choose a blend that matches your problem" },
      {
        type: "p",
        text: "Golden Milk, with ginger and turmeric, is the one to reach for if bloating and inflammation are the issue. Montego Tropical Fusion carries bromelain and papain — enzymes that help break down protein — which makes it a good fit after heavy meals.",
      },
      { type: "h2", text: "5. Give it three weeks" },
      {
        type: "p",
        text: "Gut change is slow change. Take it daily for twenty-one days before you judge it, and keep the rest of your routine boring enough that you can tell what did the work.",
      },
    ],
  },
  {
    slug: "why-you-should-choose-organic-superfoods",
    title: "Wildcrafted vs Pool-Grown: What the Labels Actually Mean",
    date: "2026-07-13",
    readingTime: "6 min read",
    category: "Sourcing",
    excerpt:
      "What \"certified organic\" and \"wildcrafted\" really mean on a sea moss jar, and why the difference shows up in the gel.",
    body: [
      {
        type: "p",
        text: "Two jars of sea moss gel can look identical and be completely different products. The difference is almost always how the moss was grown — and that word rarely appears on the front of the label.",
      },
      { type: "h2", text: "Wildcrafted" },
      {
        type: "p",
        text: "Wildcrafted means the moss grew on its own, on rock, in open sea, and was cut by hand. It draws its minerals from real seawater over months. It is harder to harvest, yields less, and costs more — and it is the only kind we buy.",
      },
      { type: "h2", text: "Pool-grown" },
      {
        type: "p",
        text: "Pool-grown moss is propagated in tanks or roped enclosures and fed table salt to mimic seawater. It grows fast and cheap. It also comes out pale, stringy and mineral-thin, and it is the reason a lot of people try sea moss once and never again.",
      },
      { type: "h2", text: "How to tell them apart" },
      {
        type: "ul",
        items: [
          "Colour: wildcrafted dries to a range of golds, purples and greys. Uniform bleached white is a warning sign.",
          "Salt: wildcrafted moss carries sea salt and fine sand you rinse away. Pool moss is often coated in visible salt crystals.",
          "Smell: a clean ocean smell is right. No smell at all usually means over-processing.",
          "Texture: real gel is firm and holds a spoon shape. Runny gel has been stretched with water.",
        ],
      },
      { type: "h2", text: "Where certification fits" },
      {
        type: "p",
        text: "Organic certification tells you what was not added — no synthetic inputs, no prohibited processing aids. It does not, on its own, tell you the moss was wild. That is why we say both, every time: certified organic, and wildcrafted in Jamaica. You should expect any seller to be able to tell you both, and to name the coast it came from.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
