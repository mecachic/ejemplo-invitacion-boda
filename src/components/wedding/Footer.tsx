import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="py-16 px-6 bg-charcoal text-ivory">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative Element */}
          <div className="divider-ornate mb-8">
            <Heart className="w-5 h-5 text-gold fill-gold" />
          </div>

          {/* Names */}
          <h3 className="heading-script text-3xl md:text-4xl text-ivory mb-4">
            Giovanni & Sara
          </h3>

          {/* Date */}
          <p className="heading-display text-lg text-ivory/70 mb-8">
            {t('footer.dateLine')}
          </p>

          {/* Thank You Message */}
          <p className="text-body text-ivory/60 text-sm max-w-md mx-auto mb-8">
            {t('footer.thanks')}
          </p>

          {/* Copyright */}
          <p className="text-xs text-ivory/40">{t('footer.made')}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
