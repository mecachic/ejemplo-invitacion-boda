import React, { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SUPPORTED_LANGS, Lang } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nContext";

function coerceLang(value: unknown): Lang {
  const v = String(value || "").toLowerCase();
  return (SUPPORTED_LANGS.includes(v as Lang) ? (v as Lang) : "es");
}

const LanguageSwitcher = () => {
  const { lang } = useI18n();
  const params = useParams();
  const location = useLocation();

  const restPath = useMemo(() => {
    // Keep anchor/section navigation if any later.
    const currentLang = coerceLang(params.lang ?? location.pathname.split("/").filter(Boolean)[0]);
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] === currentLang) parts.shift();
    return parts.length ? `/${parts.join("/")}` : "";
  }, [params.lang, location.pathname]);

  return (
    <div className="fixed top-4 right-4 z-[60]">
      <div className="inline-flex rounded-full border border-white/25 bg-charcoal/40 backdrop-blur px-1 py-1">
        {SUPPORTED_LANGS.map((l) => (
          <Link
            key={l}
            to={`/${l}${restPath}`}
            className={`px-3 py-1.5 text-xs font-medium tracking-[0.18em] uppercase rounded-full transition-colors ${
              lang === l ? "bg-white/90 text-charcoal" : "text-white/80 hover:text-white"
            }`}
            aria-label={`Switch language to ${l}`}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
