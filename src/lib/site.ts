export const site = {
  name: "GTS Media House",
  hero: {
    lines: [
      { before: "DIGITAL ", emphasis: "MARKETING" },
      { before: "FOR BRANDS ", emphasis: "READY TO SCALE" },
    ],
  },
  about: {
    paragraphs: [
      "I started GTS Media House, short for Get The Shot Media House, after working through nearly every role inside digital marketing.",
      "I've been the photographer, videographer, editor, content strategist, creative director, social media manager, brand builder, ad creative thinker, and marketing system developer. I've seen how every part connects, and that gave me a clear advantage.",
      "Most agencies only understand one piece. They make content. They run ads. They design logos. They post on social. GTS was built because I knew brands needed more than disconnected services.",
      "GTS Media House develops complete brand systems. We connect brand identity, visuals, content, and marketing into one clear direction. The goal is not just to make a brand look good. The goal is to make it look premium, capture attention, and turn that attention into customers.",
      "I built GTS for businesses that want more than random content. They want sharper visuals, stronger messaging, better brand presence, and marketing systems built to scale.",
      "That's what we do.",
      "We build brands people notice.",
    ],
  },
  description:
    "Digital marketing agency specializing in creative strategy, brand development, and lead generation. Claim your free marketing audit from GTS Media House.",
  url: "https://gtsmediahouse.com",
  email: "info@gtsmediahouse.com",
  logo: "/gts-main-logo.png",
  ogImage: "/og-image.png",
  social: {
    instagram: "https://instagram.com/gtsmediahouse",
    googleReviews: "https://share.google/mPXfcOUWZKjJcPpUy",
  },
  reviews: {
    rating: 5.0,
    count: 11,
    featuredQuote:
      "They know ads! Our reach exploded and our business is booming! 🚀",
  },
  nav: [
    { label: "Process", href: "/#process" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/contact" },
  ] as const,
  process: [
    {
      step: "01",
      title: "Audit",
      description:
        "We analyze your marketing, funnel, tracking, and competitive landscape to find the gaps.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "We map channels, positioning, creative angles, and campaign structure.",
    },
    {
      step: "03",
      title: "Launch",
      description:
        "We build and deploy campaigns across platforms with creative ready to run.",
    },
    {
      step: "04",
      title: "Optimize",
      description:
        "We test, refine, and scale winners while cutting what doesn't perform.",
    },
  ],
} as const;
