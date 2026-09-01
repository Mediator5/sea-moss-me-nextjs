/* Ingredient data now lives in src/lib/ingredients.ts — the full library. */

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
    a: "Nothing is blended until you confirm, so we arrange the delivery day with you directly when we reply — usually within one business day of your order. Jars are kept chilled and handed over fresh, which is the advantage of delivering locally rather than posting anything.",
  },
  {
    q: "Where do you deliver?",
    a: "Local delivery only — Broward and Dade County. These are the only places we deliver to — we do not ship worldwide. The moss is still wildcrafted in Jamaica; the gel is blended and delivered here. Delivery is $8.95, free on any order of three jars or more. If you are outside the area, write to us and we will let you know when that changes.",
  },
  {
    q: "Are there allergens or ingredients I should know about?",
    a: "Each flavour's full ingredient list is on its product page. Everything is vegan, gluten-free, dairy-free and free from added sugar, fillers and preservatives. If you have specific allergies, add a note with your order and we'll confirm before we blend anything.",
  },
  {
    q: "How long does one jar last?",
    a: "Our 8 oz jar holds roughly 16 tablespoons — about two weeks at one tablespoon a day, or one week if you take two. Most people settle into a jar every two to three weeks once it becomes routine.",
  },
  {
    q: "Does it taste like the ocean?",
    a: "Properly prepared sea moss is close to neutral — faintly oceanic at most. What you actually taste is the fruit or spice blended into it. Alkaline Me is grassy with a lime finish, Golden Me is warm and spiced with a citrus lift, Beets and Berry Me is tart like a dark fruit compote, and Tropical Me tastes like holiday. If a sea moss gel tastes strongly of the sea, it usually wasn't rinsed properly.",
  },
  {
    q: "Why does sea moss come in different colours?",
    a: "Because the same plant adjusts its pigment to how much sunlight reaches it underwater — the same species can dry to deep purple, golden yellow or almost black. A natural spread of colours is a good sign. Uniform bleached white usually means the moss was pool-grown or over-processed.",
  },
  {
    q: "Gel, powder or capsules — does the form matter?",
    a: "Gel is the least processed of the three. It is simply cleaned, soaked and blended moss, so the mucilage that makes it soothing to digest is still intact. Powders and capsules are convenient, but they have been dried hard and milled, and they usually can't carry whole fruits and roots the way a gel can.",
  },
  {
    q: "Can children take it?",
    a: "Many families do, usually at a smaller amount — half a teaspoon to a teaspoon a day, blended into a smoothie. Tropical Me is the one children tend to accept without argument. As with any supplement, check with your paediatrician first, particularly because of the iodine.",
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
      "I've tried four different sea moss brands and this is the only one that doesn't taste like the ocean floor. Alkaline Me goes into my smoothie every single morning.",
    name: "Danielle R.",
    detail: "Alkaline Me · 8 oz",
  },
  {
    quote:
      "Bought Golden Me for my mother's joints and ended up ordering three more jars for the rest of us. You can tell it's actually fresh.",
    name: "Marcus T.",
    detail: "Golden Me · 8 oz",
  },
  {
    quote:
      "Three weeks in and my energy in the afternoon is completely different. No crash at 3pm anymore. That alone is worth it.",
    name: "Ayo B.",
    detail: "Beets and Berry Me · 8 oz",
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
    slug: "the-doctor-bird",
    title: "The Doctor Bird: Why There's a Hummingbird on Every Jar",
    date: "2026-08-24",
    readingTime: "4 min read",
    category: "Our story",
    excerpt:
      "A bird found nowhere else on earth but Jamaica, on a jar of sea moss cut from the same coastline. The reason it is there is not decoration.",
    body: [
      {
        type: "p",
        text: "Every Sea Moss Me jar carries a small illustration: a hummingbird with a long, elegant tail, encircled by sea moss and water. Two of nature's provisions, drawn together, because that is how they are meant to work.",
      },
      {
        type: "p",
        text: "The bird is the Doctor Bird, and like our sea moss it is found nowhere else in the world but Jamaica. Both are native to the same island, shaped by the same waters, and unavailable in this form anywhere else. We consider that rarity central to their value rather than incidental to it.",
      },
      { type: "h2", text: "A small bird with a large place" },
      {
        type: "p",
        text: "In Jamaica the Doctor Bird has long held a place of quiet distinction. It appears on the nation's currency, its coat of arms and its passport — a lasting symbol of something small in size but significant in meaning. Early Taino inhabitants called it the God Bird, believing it carried the spirits of the dead.",
      },
      { type: "h2", text: "What it actually is" },
      {
        type: "ul",
        items: [
          "Its full name is the Red-billed Streamertail — one of 28 bird species endemic to Jamaica.",
          "It weighs under six grams, lighter than a AAA battery, and beats its wings up to 80 times a second.",
          "It eats roughly half its own body weight in nectar every day just to fuel hovering flight.",
          "Its nest is about the size of a bottle cap — plant down stitched together with spider silk.",
        ],
      },
      { type: "h2", text: "Why it is on the label" },
      {
        type: "p",
        text: "Nothing wasted, nothing added, everything working. A bird that runs at that efficiency is a fair standard to hold a jar to, and a fair reminder that size is not the same as significance. We chose it because its story mirrors ours: rare, deeply rooted in Jamaica, and quietly significant in a way that has little to do with scale.",
      },
    ],
  },
  {
    slug: "how-our-sea-moss-is-harvested",
    title: "The South Coast, By Hand: How Our Sea Moss Is Harvested",
    date: "2026-08-17",
    readingTime: "5 min read",
    category: "Sourcing",
    excerpt:
      "From open rock to sealed jar, the whole method — and why the slow, expensive version is the only one that produces gel worth eating.",
    body: [
      {
        type: "p",
        text: "Our moss grows wild on rock in clear, moving water off the south coast of Jamaica. Nobody plants it and nobody feeds it. It takes what it needs straight from the sea, which is precisely why the water it grows in decides how good it turns out.",
      },
      { type: "h2", text: "Cut, not harvested wholesale" },
      {
        type: "p",
        text: "It is cut by hand at the right size, and the holdfast — the small anchor gripping the rock — is left behind so the plant grows back. That is how it has been taken here for generations, and it is the difference between a harvest and a strip-mine. Pool-grown moss skips all of this: it is fed salt in a tank, comes out pale and uniform, and carries a fraction of the mineral load.",
      },
      { type: "h2", text: "Sun, salt wind, spring water" },
      {
        type: "p",
        text: "From the rock it dries in open sun and salt wind on the shore. Then it is rinsed clean — properly clean, which is the step most sellers rush and the reason so much sea moss gel tastes of the ocean floor — and soaked in spring water with fresh lime.",
      },
      { type: "h2", text: "Blended in batches one person can watch" },
      {
        type: "p",
        text: "The soaked moss is blended whole, while it is still warm, and the fruits and roots go in as themselves. Never syrups, never concentrates, never colouring. Batches stay small enough that one person can watch every one of them from start to finish.",
      },
      {
        type: "p",
        text: "It takes longer and it costs more. It is also the only reason the gel sets firm, tastes clean, and carries the mineral profile people came to sea moss for in the first place.",
      },
    ],
  },
  {
    slug: "what-sea-moss-is-good-for",
    title: "What Sea Moss Is Actually Good For",
    date: "2026-08-10",
    readingTime: "5 min read",
    category: "Wellness",
    excerpt:
      "The honest version. Sea moss is a food, not a medicine — here is what it genuinely supports, and where the claims run ahead of the evidence.",
    body: [
      {
        type: "p",
        text: "Anyone telling you sea moss cures things is selling you something. It is a whole food with an unusually broad mineral profile, and that is a real and useful thing to be. Here is what that actually supports, area by area.",
      },
      { type: "h2", text: "Thyroid" },
      {
        type: "p",
        text: "Sea moss is naturally high in iodine, which the thyroid cannot make its hormones without. This is also the one genuine caution on the list: if you manage a thyroid condition, speak to your doctor before adding it, because more iodine is not automatically better.",
      },
      { type: "h2", text: "Digestion" },
      {
        type: "p",
        text: "The mucilage that makes sea moss gel thick is soft, soothing fibre. It is prebiotic — it feeds the bacteria your gut already relies on rather than adding new ones, which is why it pairs well with kefir or yoghurt rather than replacing them.",
      },
      { type: "h2", text: "Immune support" },
      {
        type: "p",
        text: "Trace minerals plus, in our fruit-forward blends, vitamins A and C. Pigment-rich fruits like elderberry and beetroot are doing as much work here as the moss itself.",
      },
      { type: "h2", text: "Skin and hair" },
      {
        type: "p",
        text: "Sulphur and zinc are both part of building collagen, which is why sea moss turns up in skincare as often as it does in smoothies.",
      },
      { type: "h2", text: "Joints and energy" },
      {
        type: "p",
        text: "Trace minerals are what connective tissue draws on, and iron and B vitamins support normal energy production. Not a stimulant, and not a fast effect — most people notice something in the second or third week rather than the second or third day.",
      },
      { type: "h2", text: "The honest caveat" },
      {
        type: "p",
        text: "Everything above is support, not treatment. These statements have not been evaluated by the Food and Drug Administration, and none of this is intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing or managing a medical condition, speak to your doctor first.",
      },
    ],
  },
  {
    slug: "ultimate-guide-to-sea-moss",
    title: "The Ultimate Guide to Sea Moss: Why It's the Superfood Your Body Needs",
    date: "2026-07-27",
    readingTime: "8 min read",
    category: "Guides",
    excerpt:
      "The full rundown on sea moss — its mineral profile, its 14,000-year history, and how to actually work it into your week.",
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
      { type: "h2", text: "The 92 minerals claim, explained" },
      {
        type: "p",
        text: "You'll see a mineral count repeated everywhere, and it deserves context. Sea moss is commonly cited as carrying up to 92 of the minerals and vitamins the human body needs — iodine, potassium, calcium, magnesium, iron, zinc, sulphur among them. It absorbs them straight through its fronds from the surrounding seawater, because it has no true roots at all, only a holdfast gripping the rock. That is exactly why water quality decides how rich a harvest turns out. It is not a multivitamin in a jar, and no honest seller should tell you it is. What it is: a whole food with an unusually wide mineral profile, in a form your body handles easily.",
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
        text: "Golden Me, with ginger and turmeric, is the one to reach for if bloating and inflammation are the issue. Tropical Me carries bromelain and papain — enzymes that help break down protein — which makes it a good fit after heavy meals.",
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
