import React, { createContext, useContext, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Lang, SUPPORTED_LANGS, TRANSLATIONS } from "./translations";

type I18nValue = {
  lang: Lang;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function coerceLang(value: unknown): Lang {
  const v = String(value || "").toLowerCase();
  return (SUPPORTED_LANGS.includes(v as Lang) ? (v as Lang) : "es");
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Prefer route param (:lang). Fallback to pathname.
  const params = useParams();
  const location = useLocation();

  const lang = useMemo(() => {
    if (params.lang) return coerceLang(params.lang);
    const seg = location.pathname.split("/").filter(Boolean)[0];
    return coerceLang(seg);
  }, [params.lang, location.pathname]);

  const value = useMemo<I18nValue>(() => {
    const dict = TRANSLATIONS[lang];
    return {
      lang,
      t: (key: string) => dict[key] ?? TRANSLATIONS.es[key] ?? key,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
