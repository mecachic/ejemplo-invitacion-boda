import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plane, CreditCard, Copy, Check } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

/**
 * TODO: Sustituye este IBAN por el vuestro real antes de publicar.
 * Recomendación: si prefieres no dejarlo en abierto, puedes cargarlo desde una env var.
 */
const DEFAULT_IBAN = "IT12V0760103400001015114455";

function copyToClipboard(text: string) {
  // Clipboard API (preferente)
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  // Fallback
  return new Promise<void>((resolve, reject) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "true");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("Copy failed"));
    } catch (e) {
      reject(e);
    }
  });
}

const GiftsSection = () => {
  const { t } = useI18n();
  const IBAN = useMemo(() => {
    // Si defines VITE_GIFT_IBAN en .env, se usará automáticamente.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const envIban = (import.meta as any)?.env?.VITE_GIFT_IBAN as string | undefined;
    return (envIban && envIban.trim()) || DEFAULT_IBAN;
  }, []);

  const [showIban, setShowIban] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await copyToClipboard(IBAN);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // si falla, no rompemos la UX
      setCopied(false);
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label text-accent mb-4">{t('gifts.kicker')}</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-4">
            {t('gifts.title')}
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {t('gifts.intro')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Viaje futuro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-center p-8"
          >
            <div className="w-16 h-16 rounded-full bg-sage-light/30 flex items-center justify-center mx-auto mb-6">
              <Plane className="w-7 h-7 text-primary" />
            </div>

            <h3 className="heading-display text-xl text-foreground mb-3">{t('gifts.trip.title')}</h3>

            <p className="text-body text-muted-foreground text-sm">
              {t('gifts.trip.body')}
            </p>
          </motion.div>

          {/* Aportación / IBAN */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center p-8"
          >
            <div className="w-16 h-16 rounded-full bg-sage-light/30 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-7 h-7 text-primary" />
            </div>

            <h3 className="heading-display text-xl text-foreground mb-3">{t('gifts.contrib.title')}</h3>

            <p className="text-body text-muted-foreground text-sm mb-6">
              {t('gifts.contrib.body')}
            </p>

            <button
              type="button"
              className="button-outline"
              onClick={() => setShowIban((v) => !v)}
              aria-expanded={showIban}
            >
              {showIban ? t('gifts.iban.hide') : t('gifts.iban.show')}
            </button>

            {showIban && (
              <div className="mt-6 rounded-2xl bg-white/60 border border-border p-5 text-left">
                <p className="text-xs text-muted-foreground mb-2">IBAN</p>

                <div className="flex items-center gap-3">
                  <code className="flex-1 text-sm md:text-base text-foreground break-all">
                    {IBAN}
                  </code>

                  <button
                    type="button"
                    onClick={onCopy}
                    className="button-outline px-4 py-2"
                    aria-label={t('gifts.iban.aria')}
                  >
                    {copied ? (
                      <span className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4" /> {t('gifts.iban.copied')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <Copy className="w-4 h-4" /> {t('gifts.iban.copy')}
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground mt-3">{t('gifts.iban.ask')}</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="divider-ornate mt-16"
        >
          <span className="text-xl text-accent">✦</span>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftsSection;
