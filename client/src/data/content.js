export const profile = {
  name: "SA Ndilla",
  short: "Ndilla",
  site: "BecomingNdilla",
  tagline: "Building ideas. Creating opportunities. Becoming more.",
  role: "Developer · Designer · Brand Strategist · Creator",
  location: "Dar es Salaam, Tanzania",
  email: "samwelindila81@gmail.com",
  phone: "+255 770 374 380",
  github: "https://github.com/samwelindila",
  portfolio: "https://ndilatech.netlify.app",
  // add your real links here; empty ones are hidden automatically
  socials: [
    { label: "GitHub", href: "https://github.com/samwelindila" },
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
  ],
  intro:
    "I'm a developer, graphic designer and brand strategist who creates content. I turn ideas into software, brands and stories, and document the journey here.",
};

export const pillars = [
  {
    icon: "tech",
    title: "Technology",
    text: "Software development, web applications, AI and digital solutions built with the MERN stack.",
    to: "/projects",
    cta: "See my projects",
  },
  {
    icon: "biz",
    title: "Entrepreneurship",
    text: "Business development, startups, innovation and investments, from NdillaTech to MonaSoap and beyond.",
    to: "/ventures",
    cta: "Explore my ventures",
  },
  {
    icon: "content",
    title: "Content Creation",
    text: "Lifestyle, storytelling and personal growth, documenting the process of becoming more.",
    to: "/blog",
    cta: "Read the blog",
  },
];

export const projects = [
  {
    title: "GrowthGuard",
    category: "AI · Final-year thesis",
    status: "In development",
    description:
      "A platform that predicts SME growth with machine learning running in the browser, helping small businesses make data-driven decisions.",
    stack: ["MongoDB", "Express", "React", "Node.js", "TensorFlow.js"],
    demo: "",
    source: "",
  },
  {
    title: "VibeKits",
    category: "E-commerce",
    status: "Building",
    description:
      "A football jersey store for the Tanzanian market with a MERN storefront and Instagram-driven sales.",
    stack: ["React", "Node.js", "MongoDB", "Cloudinary", "Tailwind"],
    demo: "",
    source: "",
  },
  {
    title: "LevelUp",
    category: "Productivity app",
    status: "MVP",
    description:
      "A habit-tracking app with XP and levels that turns daily routines into a game.",
    stack: ["React", "Node.js", "MongoDB"],
    demo: "",
    source: "",
  },
  {
    title: "BrandKazi",
    category: "Marketplace",
    status: "Planning",
    description:
      "A digital talent marketplace connecting creatives and businesses in Dar es Salaam.",
    stack: ["MERN", "React Native"],
    demo: "",
    source: "",
  },
];

export const ventures = [
  {
    name: "NdillaTech",
    type: "Technology brand",
    status: "Active",
    description:
      "My freelance software brand. I design and build web applications, online stores and AI-powered features for businesses.",
    link: "https://ndilatech.netlify.app",
  },
  {
    name: "MonaSoap",
    type: "Product business",
    status: "Active",
    description:
      "A business that sells liquid multipurpose soap, made for everyday cleaning around the home.",
    link: "https://monasoap.netlify.app",
  },
  {
    name: "Agribusiness",
    type: "Future venture",
    status: "Planned",
    description:
      "My plan to start farming and livestock keeping, raising animals and growing into agriculture as a business.",
    link: "",
  },
];

export const journey = [
  {
    period: "2023 – Now",
    type: "Education",
    title: "B.Sc. Computer Science",
    place: "Kampala International University Tanzania",
    text: "Final year. My thesis, GrowthGuard, applies machine learning to SME growth prediction.",
  },
  {
    period: "2024 – 2025",
    type: "Work",
    title: "Network Support Technician",
    place: "Muhimbili University",
    text: "Maintained network infrastructure and provided IT support. This is where I learned how real systems stay reliable.",
  },
  {
    period: "2025",
    type: "Internship",
    title: "Field Network Intern & Customer Support",
    place: "GoFiber",
    text: "Installed fiber internet connections and configured customer networking equipment.",
  },
  {
    period: "2025 – Now",
    type: "Milestone",
    title: "Started NdillaTech",
    place: "Independent",
    text: "Began building and shipping MERN products as a freelance developer.",
  },
  {
    period: "Next",
    type: "Vision",
    title: "Growing businesses and an audience",
    place: "BecomingNdilla",
    text: "Launching ventures, finishing my degree and documenting every step publicly.",
  },
];

// Old simple skills list (no longer used by the About page, kept so nothing breaks)
export const skills = [
  { group: "Frontend", items: ["React.js", "Tailwind CSS", "Framer Motion", "React Native"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"] },
  { group: "Data & AI", items: ["MongoDB", "TensorFlow.js", "Cloudinary"] },
  { group: "Networking", items: ["Fiber installation", "Network support", "IT troubleshooting"] },
];

export const values = [
  { title: "Build in public", text: "I share the process, including the mistakes, not only the results." },
  { title: "Discipline over motivation", text: "Consistent small actions beat occasional big efforts." },
  { title: "Solve real problems", text: "I build for local businesses and real users, not for demos." },
];

export const interests = ["Software & AI", "Startups", "Football", "Agriculture", "Personal growth", "Storytelling"];

// ---------- BLOG ----------
// type: "article" or "video"
// cover: optional image in client/public/blog/  (e.g. "/blog/my-cover.jpg")
// body: paragraphs of the article. Start a line with "## " for a heading.
// video (only for type "video", optional on articles):
//   { kind: "youtube", id: "dQw4w9WgXcQ" }                 (id = the part after v= in the URL)
//   { kind: "instagram", id: "ABC123xyz", type: "reel" }   (type: "reel" or "p")
//   { kind: "file", src: "/videos/my-video.mp4", poster: "/blog/my-video.jpg" }
// vertical: true  -> shows the video in 9:16 (reels, TikTok style)
export const posts = [
  {
    slug: "why-becomingndilla",
    type: "article",
    title: "Why I started BecomingNdilla",
    category: "Personal Growth",
    date: "2026-11-01",
    excerpt: "The story behind this site and what I plan to document here.",
    cover: "",
    body: [
      "EDIT ME: write your story here. Each line in this list is one paragraph.",
      "## A heading looks like this",
      "Then continue with another paragraph.",
    ],
  },
  {
    slug: "from-networks-to-code",
    type: "article",
    title: "From fiber cables to full-stack code",
    category: "Technology",
    date: "2026-10-15",
    excerpt: "How a networking background shaped the way I build software.",
    cover: "",
    body: ["EDIT ME: write this article."],
  },
  {
    slug: "first-business-lessons",
    type: "article",
    title: "First lessons from running small businesses",
    category: "Entrepreneurship",
    date: "2026-10-01",
    excerpt: "What I learned starting out, and what I would do differently.",
    cover: "",
    body: ["EDIT ME: write this article."],
  },

  // ---- VIDEO TEMPLATE: remove the // and fill in, then save ----
  // {
  //   slug: "my-first-video",
  //   type: "video",
  //   title: "My first video",
  //   category: "Lifestyle",
  //   date: "2026-11-12",
  //   excerpt: "One line about what the video is about.",
  //   video: { kind: "youtube", id: "PASTE_YOUTUBE_ID" },
  // },
];

export const postCategories = [
  "All",
  "Videos",
  "Technology",
  "Entrepreneurship",
  "Personal Growth",
  "Lifestyle",
];

// ---------- About page ----------

export const roles = [
  {
    icon: "dev",
    title: "Developer",
    text: "Full-stack MERN applications, from online stores to AI-powered dashboards.",
  },
  {
    icon: "design",
    title: "Graphic Designer",
    text: "Logos, brand visuals and social media graphics that look consistent and professional.",
  },
  {
    icon: "strategy",
    title: "Marketing & Branding Strategist",
    text: "Positioning, messaging and content plans that help brands get noticed and trusted.",
  },
  {
    icon: "creator",
    title: "Content Creator",
    text: "Short-form video and storytelling, mainly on Instagram, edited with CapCut, Videoleap and InShot.",
  },
];

// Skills with logos. "icon" must match a key in SkillIcon.jsx.
// Optional: add image: "/skills/name.png" to any item to use your own logo file.
export const techSkills = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React.js", icon: "react" },
      { name: "React Native", icon: "reactnative" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
      { name: "Vite", icon: "vite" },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Cloudinary", icon: "cloudinary" },
    ],
  },
  {
    group: "AI & Dev Tools",
    items: [
      { name: "TensorFlow.js", icon: "tensorflow" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    group: "Networking",
    items: [
      { name: "Fiber installation", icon: "fiber" },
      { name: "Network support", icon: "network" },
      { name: "Equipment setup", icon: "router" },
      { name: "IT troubleshooting", icon: "troubleshoot" },
    ],
  },
];

export const designSkills = [
  {
    group: "Design Tools",
    items: [
      { name: "Adobe Photoshop", icon: "design", image: "/skills/photoshop.png" },
      { name: "Canva", icon: "design", image: "/skills/canva.png" },
    ],
  },
  {
    group: "Graphic Design",
    items: [
      { name: "Graphic design", icon: "design" },
      { name: "Logo design", icon: "logo" },
      { name: "Social media graphics", icon: "social" },
      { name: "Brand identity", icon: "brand" },
    ],
  },
  {
    group: "Marketing & Strategy",
    items: [
      { name: "Branding strategy", icon: "strategy" },
      { name: "Digital marketing", icon: "marketing" },
      { name: "Content strategy", icon: "content" },
      { name: "Audience growth", icon: "growth" },
    ],
  },
];
export const creatorSkills = [
  {
    group: "Editing & Publishing",
    items: [
      { name: "Instagram", icon: "instagram", main: true },
      { name: "CapCut", icon: "capcut" },
      { name: "Videoleap", icon: "videoleap" },
      { name: "InShot", icon: "inshot" },
    ],
  },
  {
    group: "Filming Gear",
    items: [
      { name: "Ring light", icon: "ringlight" },
      { name: "AI tripod stand", icon: "tripod" },
      { name: "Microphone", icon: "mic" },
      { name: "DJI Osmo", icon: "dji" },
    ],
  },
];

// ---------- MARKETPLACE ----------
// type: "Course", "E-book" or "Product"
// image: optional, a file in client/public/products/ (e.g. "/products/my-ebook.jpg")
// price: a number in TZS. Use 0 to show "Free", or leave price out to show "Ask for price"
// badge: optional small label on the card (e.g. "New", "Best seller")
export const productCategories = ["All", "Courses", "E-books", "Products"];

export const products = [
  // ---------- Courses ----------
  {
    slug: "mern-bootcamp",
    type: "Course",
    title: "MERN Stack Bootcamp",
    description:
      "Build and ship full web apps with MongoDB, Express, React and Node.js. Beginner friendly, project based.",
    price: 120000,
    image: "/products/mern-bootcamp.jpg",
    badge: "Best seller",
  },
  {
    slug: "graphic-design-basics",
    type: "Course",
    title: "Graphic Design for Beginners",
    description:
      "Learn layout, color, typography and logo design, and make professional graphics for any brand.",
    price: 60000,
    image: "/products/graphic-design.jpg",
  },
  {
    slug: "content-creation-course",
    type: "Course",
    title: "Instagram Content Creation",
    description:
      "Plan, film and edit short videos that grow an audience, using only your phone and free apps.",
    price: 45000,
    image: "/products/content-creation.jpg",
    badge: "New",
  },

  // ---------- E-books ----------
  {
    slug: "build-in-public-ebook",
    type: "E-book",
    title: "Build in Public",
    description:
      "A practical guide to sharing your journey online, building trust and attracting opportunities.",
    price: 15000,
    image: "/products/build-in-public.jpg",
  },
  {
    slug: "small-business-branding-ebook",
    type: "E-book",
    title: "Branding for Small Business",
    description:
      "Everything you need to name, position and present your business so customers remember it.",
    price: 20000,
    image: "/products/branding-ebook.jpg",
  },
  {
    slug: "discipline-playbook-ebook",
    type: "E-book",
    title: "The Discipline Playbook",
    description:
      "Simple daily systems to stay consistent when motivation runs out, from habits to weekly reviews.",
    price: 10000,
    image: "/products/discipline-playbook.jpg",
  },

  // ---------- Products ----------
  {
    slug: "monasoap-multipurpose",
    type: "Product",
    title: "MonaSoap Multipurpose Liquid Soap",
    description:
      "Liquid soap for everyday cleaning around the home, from dishes to surfaces.",
    price: 8000,
    image: "/products/monasoap.jpg",
    badge: "Popular",
  },
  {
    slug: "social-media-templates",
    type: "Product",
    title: "Social Media Template Pack",
    description:
      "50 editable post and story templates, so your brand looks consistent every day.",
    price: 25000,
    image: "/products/social-templates.jpg",
  },
  {
    slug: "logo-starter-kit",
    type: "Product",
    title: "Brand Starter Kit",
    description:
      "A custom logo, color palette and font pairing for your new business, delivered as ready-to-use files.",
    price: 80000,
    image: "/products/brand-starter-kit.jpg",
    badge: "Limited",
  },
];

// ---------- NAVBAR NOTIFICATIONS ----------
// Each notice needs a unique id. Add a new one whenever you launch something:
// visitors who haven't seen it get a red badge on the bell.
export const notices = [
  {
    id: "marketplace-open",
    title: "Marketplace is open",
    text: "Courses, e-books and products you can order on WhatsApp.",
    to: "/marketplace",
  },
  {
    id: "chat-with-me",
    title: "Njoo tuchat",
    text: "Have a question? Tap the chat button for quick answers.",
    to: "/contact",
  },
];

// ---------- SERVICES ----------
// category: "Technology" | "Design" | "Marketing" | "Content"
// price: a number in TZS, 0 for free, or leave it out to show "Request a quote"
// priceNote: small text next to the price (e.g. "per project")
// badge: optional small label on the card


export const serviceCategories = ["All", "Technology", "Design", "Marketing", "Content"];

export const services = [
  {
    slug: "web-development",
    title: "Website & Web App Development",
    category: "Technology",
    icon: "code",
    badge: "Popular",
    description:
      "A fast, modern website or web application built around your business goals, so customers can find you, trust you and contact you from any device.",
    includes: [
      "Responsive design for phone, tablet and desktop",
      "Custom pages, forms and an admin area you control",
      "Secure database and user login where needed",
      "Deployment, domain setup and a handover guide",
    ],
  },
  {
    slug: "ecommerce-stores",
    title: "Online Store & E-commerce",
    category: "Technology",
    icon: "cart",
    description:
      "A complete online shop where customers browse products, place orders and pay, with an easy dashboard for you to manage stock and sales.",
    includes: [
      "Product catalogue with categories and search",
      "Cart, checkout and order management",
      "Mobile money and WhatsApp order options",
      "Product photo optimisation and fast loading",
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning Solutions",
    category: "Technology",
    icon: "brain",
    description:
      "Practical AI features that turn your business data into predictions and decisions, such as sales forecasts, growth analysis and smart recommendations.",
    includes: [
      "Data review and problem definition",
      "Prediction or analysis model for your use case",
      "Simple dashboard to view the results",
      "Plain-language explanation of what the numbers mean",
    ],
  },
  {
    slug: "network-fiber",
    title: "Network & Fiber Internet Setup",
    category: "Technology",
    icon: "network",
    description:
      "Reliable internet and office networking, from fiber connection and router configuration to troubleshooting, so your team stays online.",
    includes: [
      "Fiber connection and equipment configuration",
      "Wi-Fi planning for full coverage",
      "Office network setup and security basics",
      "Fault finding and technical support",
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic & Brand Design",
    category: "Design",
    icon: "design",
    description:
      "A professional visual identity that makes your business look credible and memorable everywhere customers see it.",
    includes: [
      "Logo design with colour and font guidelines",
      "Business cards, flyers and posters",
      "Social media templates in your brand style",
      "Final files ready for print and digital use",
    ],
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy & Positioning",
    category: "Marketing",
    icon: "strategy",
    description:
      "A clear plan for who your brand speaks to, what makes it different and how it should sound, so your marketing stops guessing.",
    includes: [
      "Audience and competitor review",
      "Brand message, voice and positioning",
      "Launch or growth plan for your channels",
      "Content ideas aligned to your goals",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Social Media",
    category: "Marketing",
    icon: "marketing",
    description:
      "Consistent online presence and campaigns that bring in enquiries, using the platforms your customers already use.",
    includes: [
      "Social media account setup and optimisation",
      "Monthly content calendar and post design",
      "Campaign planning for Instagram, Facebook and WhatsApp",
      "Simple performance report with next steps",
    ],
  },
  {
    slug: "video-content",
    title: "Video & Content Creation",
    category: "Content",
    icon: "video",
    description:
      "Engaging videos, photos and written content that tell your story and keep your audience coming back.",
    includes: [
      "Short-form videos for Reels, TikTok and YouTube",
      "Editing with captions, music and branding",
      "Product and promotional photography",
      "Content planning and posting schedule",
    ],
  },
];

// ---------- PORTFOLIO ----------
// Only items with an image are shown on the site, so you can fill these in gradually.
// To publish an item: save the image in client/public/portfolio/ and set
// image: "/portfolio/your-file.jpg"
// category must be one of: "Logos", "Posters", "Instagram", "Branding"
// problem / result: ONE short line each. Use only true results.
export const portfolioCategories = ["All", "Logos", "Posters", "Instagram", "Branding"];

export const portfolio = [
  {
    slug: "logo-1",
    category: "Logos",
    title: "Logo for [client or business name]",
    image: "/portfolio/logo-1.jpg",
    problem: "What the client needed or struggled with.",
    result: "What changed after your work.",
  },
  {
    slug: "logo-2",
    category: "Logos",
    title: "Logo for [client or business name]",
    image: "",
    problem: "What the client needed or struggled with.",
    result: "What changed after your work.",
  },
  {
    slug: "poster-1",
    category: "Posters",
    title: "Poster for [event or product]",
    image: "",
    problem: "What the client needed or struggled with.",
    result: "What changed after your work.",
  },
  {
    slug: "poster-2",
    category: "Posters",
    title: "Poster for [event or product]",
    image: "",
    problem: "What the client needed or struggled with.",
    result: "What changed after your work.",
  },
  {
    slug: "instagram-1",
    category: "Instagram",
    title: "Instagram posts for [page name]",
    image: "",
    problem: "What the client needed or struggled with.",
    result: "What changed after your work.",
  },
  {
    slug: "branding-1",
    category: "Branding",
    title: "Brand kit for [business name]",
    image: "",
    problem: "What the client needed or struggled with.",
    result: "What changed after your work.",
  },
];

export const testimonials = [
  {
    name: "Amina Hassan",
    role: "Founder, Zuri Fashion (Dar es Salaam)",
    quote:
      "Ndilla built our online store from scratch and it was ready faster than I expected. Orders now come in through the website instead of endless WhatsApp chats.",
    photo: "",
  },
  {
    name: "Joseph Mushi",
    role: "Owner, JM Agro Supplies",
    quote:
      "He took the time to understand my business before designing anything. The branding and the web app are clean, professional and easy for my team to use.",
    photo: "",
  },
  {
    name: "Neema Kimaro",
    role: "Marketing Lead, Pwani Creatives",
    quote:
      "Great communication, fair pricing and solid work. Ndilla delivered on time and kept improving the design until we were happy.",
    photo: "",
  },
];
