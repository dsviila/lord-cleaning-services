import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_IMAGE, SITE_URL, getSeo } from "./routes";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Keeps <title>, description, canonical, Open Graph and Twitter tags in sync with the current route. */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeo(pathname);
    if (!seo) {
      // Unknown route (404 page): keep it out of the index and drop the canonical.
      document.title = "Page Not Found | Lord Cleaning Services";
      setMeta("name", "robots", "noindex, nofollow");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      return;
    }

    const url = SITE_URL + (seo.path === "/" ? "/" : seo.path);
    const image = SITE_URL + (seo.image ?? DEFAULT_IMAGE);

    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setCanonical(url);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", image);

    const robots = document.head.querySelector('meta[name="robots"]');
    if (seo.noindex) setMeta("name", "robots", "noindex, nofollow");
    else robots?.remove();
  }, [pathname]);

  return null;
}
