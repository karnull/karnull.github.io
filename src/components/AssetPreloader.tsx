import { useEffect } from "react";
import { routePreloadBatches } from "@/lib/preloadManifest";

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      resolve();
    }
  });

const preloadImages = async (sources: string[], loadedSources: Set<string>) => {
  const pending = [...new Set(sources.filter(Boolean))].filter((source) => !loadedSources.has(source));

  if (pending.length === 0) {
    return;
  }

  await Promise.all(pending.map((source) => preloadImage(source)));

  pending.forEach((source) => {
    loadedSources.add(source);
  });
};

const getCurrentPageImages = () => {
  const images = Array.from(document.images)
    .map((img) => img.currentSrc || img.src)
    .filter(Boolean);

  return [...new Set(images)];
};

const waitForHomeLoad = async () => {
  if (document.readyState === "complete") {
    return;
  }

  await new Promise<void>((resolve) => {
    const onLoad = () => {
      window.removeEventListener("load", onLoad);
      resolve();
    };

    window.addEventListener("load", onLoad, { once: true });
  });
};

const AssetPreloader = () => {
  useEffect(() => {
    let cancelled = false;
    const loadedSources = new Set<string>();

    const run = async () => {
      await waitForHomeLoad();

      if (cancelled) {
        return;
      }

      await preloadImages(getCurrentPageImages(), loadedSources);

      for (const batch of routePreloadBatches) {
        if (cancelled) {
          break;
        }

        const images = await batch.loadImages();

        if (cancelled) {
          break;
        }

        await preloadImages(images, loadedSources);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

export default AssetPreloader;
