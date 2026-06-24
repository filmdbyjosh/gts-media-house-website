export const site = {
  name: "GTS Media House",
  hero: {
    headline: "Digital Marketing Agency",
    subheadline: "Specializing in",
    specialties:
      "creative strategy, brand development, lead generation, and content production.",
  },
  description:
    "Digital marketing agency specializing in creative strategy, brand development, lead generation, and content production. Claim your free marketing audit from GTS Media House.",
  url: "https://gtsmediahouse.com",
  email: "info@gtsmediahouse.com",
  logo: "/gts-main-logo.png",
  ogImage: "/og-image.png",
  social: {
    instagram: "https://instagram.com/gtsmediahouse",
    googleReviews: "https://share.google/mPXfcOUWZKjJcPpUy",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      title: "Paid Social Ads",
      description:
        "Scroll-stopping creative and campaign strategy built to convert cold traffic into customers.",
    },
    {
      title: "UGC & Content Production",
      description:
        "Authentic, platform-native content that showcases your product and builds brand trust.",
    },
    {
      title: "Marketing Audits",
      description:
        "A clear breakdown of what's working, what's not, and where to invest next.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery",
      description: "We learn your brand, audience, and goals.",
    },
    {
      step: "02",
      title: "Strategy",
      description: "We map creative angles and campaign structure.",
    },
    {
      step: "03",
      title: "Production",
      description: "We shoot, edit, and deliver assets ready to run.",
    },
    {
      step: "04",
      title: "Scale",
      description: "We iterate on winners and grow what works.",
    },
  ],
} as const;
