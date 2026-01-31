import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

const TimelineSection = () => {
  const { t } = useI18n();
  const events = [
    {
      time: t('timeline.e1.time'),
      title: t('timeline.e1.title'),
      description: t('timeline.e1.desc'),
    },
    {
      time: t('timeline.e2.time'),
      title: t('timeline.e2.title'),
      description: t('timeline.e2.desc'),
    },
    {
      time: t('timeline.e3.time'),
      title: t('timeline.e3.title'),
      description: t('timeline.e3.desc'),
    },
    {
      time: t('timeline.e4.time'),
      title: t('timeline.e4.title'),
      description: t('timeline.e4.desc'),
    },
    {
      time: t('timeline.e5.time'),
      title: t('timeline.e5.title'),
      description: t('timeline.e5.desc'),
    },
    {
      time: t('timeline.e6.time'),
      title: t('timeline.e6.title'),
      description: t('timeline.e6.desc'),
    },
    {
      time: t('timeline.e7.time'),
      title: t('timeline.e7.title'),
      description: t('timeline.e7.desc'),
    },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label text-accent mb-4">{t('timeline.kicker')}</p>
          <h2 className="heading-display text-4xl md:text-5xl text-foreground">
            {t('timeline.title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Time */}
                <div
                  className={`hidden md:block w-1/2 ${
                    index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                  }`}
                >
                  <span className="heading-display text-2xl text-primary tracking-[0.12em]">
                    {event.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 border-2 border-background" />

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'
                  }`}
                >
                  <span className="md:hidden text-label text-primary mb-2 block tracking-[0.22em]">
                    {event.time}
                  </span>
                  <h3 className="heading-display text-xl md:text-[22px] text-foreground mb-1">
                    {event.title}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
