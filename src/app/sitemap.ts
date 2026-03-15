import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gtsmediahouse.com",
      lastModified: new Date(),
    },
  ];
}