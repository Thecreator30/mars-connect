import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

export function useSEO({ title, description, path = "" }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} — Mars Group`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `https://mars-lgc.com${path}`, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
  }, [title, description, path]);
}
