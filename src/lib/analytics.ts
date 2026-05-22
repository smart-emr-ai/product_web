import { useEffect } from 'react';

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track: (eventName?: string, data?: EventData) => void;
    };
  }
}

export function installUmamiAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;

  if (!websiteId || typeof document === 'undefined') {
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[data-website-id="${websiteId}"]`,
  );

  if (existingScript) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = import.meta.env.VITE_UMAMI_SCRIPT_URL || 'https://www.medicore.org.cn/script.js';
  script.dataset.websiteId = websiteId;
  script.dataset.domains = 'medicore.org.cn,www.medicore.org.cn';
  document.head.appendChild(script);
}

export function trackEvent(eventName: string, data?: EventData) {
  window.umami?.track(eventName, data);
}

export function useSectionViewTracking(sectionIds: string[]) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const seenSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (!id || !entry.isIntersecting || seenSections.has(id)) {
            return;
          }

          seenSections.add(id);
          trackEvent('section-view', { section: id });
        });
      },
      { threshold: 0.45 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);
}
