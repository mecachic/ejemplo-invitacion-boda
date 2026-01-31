import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

const AccommodationSection = () => {
  const { t } = useI18n();
  return (
    <section id="accommodation" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-label text-accent mb-4">{t('acc.kicker')}</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-6">
            {t('acc.title')}
          </h2>

          <div className="max-w-2xl mx-auto space-y-5">
            <p className="text-body text-muted-foreground">
              <strong>{t('acc.p1')}</strong>
            </p>

            <p className="text-body text-muted-foreground">
              <span className="text-accent mr-2" aria-hidden="true">✦</span>
              {t('acc.b1')}
            </p>

            <p className="text-body text-muted-foreground">
              <span className="text-accent mr-2" aria-hidden="true">✦</span>
              {t('acc.b2')}
            </p>

            <p className="text-body text-muted-foreground">
              {t('acc.p2')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationSection;
