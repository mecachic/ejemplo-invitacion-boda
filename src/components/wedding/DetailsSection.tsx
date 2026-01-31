import { motion } from 'framer-motion';
import { MapPin, Clock, CalendarDays } from 'lucide-react';
import venueImage from '@/assets/venue.jpg';
import { useI18n } from '@/i18n/I18nContext';

const DetailsSection = () => {
  const { t } = useI18n();
  const details = [
    {
      icon: CalendarDays,
      title: t('details.date.title'),
      content: t('details.date.content'),
    },
    {
      icon: Clock,
      title: t('details.time.title'),
      content: t('details.time.content'),
    },
    {
      icon: MapPin,
      title: t('details.venue.title'),
      content: t('details.venue.content'),
      subcontent: t('details.venue.sub'),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label text-accent mb-4">{t('details.kicker')}</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground">
            {t('details.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Venue Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={venueImage}
                  alt={t('details.imgAlt')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/30 rounded-sm -z-10" />
          </motion.div>

          {/* Details List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {details.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-full bg-sage-light/30 flex items-center justify-center flex-shrink-0">
                  <detail.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-label text-muted-foreground mb-1">
                    {detail.title}
                  </h3>
                  <p className="heading-display text-xl text-foreground">
                    {detail.content}
                  </p>
                  {detail.subcontent && (
                    <p className="text-body text-muted-foreground mt-1">
                      {detail.subcontent}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map Link */}
            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Masseria%20Falco%2C%20Via%20Quintola%201%2C%2081030%20Cellole%20CE"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-primary hover:text-sage-dark transition-colors text-label mt-6"
            >
              <MapPin className="w-4 h-4" />
              {t('details.map')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
