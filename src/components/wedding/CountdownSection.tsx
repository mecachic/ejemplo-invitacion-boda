import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

const CountdownSection = () => {
  const { t } = useI18n();
  const weddingDate = new Date('2026-06-27T17:30:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t('countdown.days') },
    { value: timeLeft.hours, label: t('countdown.hours') },
    { value: timeLeft.minutes, label: t('countdown.minutes') },
    { value: timeLeft.seconds, label: t('countdown.seconds') },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-label text-primary mb-4"
        >
          {t('countdown.kicker')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-script text-4xl md:text-5xl text-foreground mb-12"
        >
          {t('countdown.title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 gap-4 md:gap-8"
        >
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="text-center">
              <div className="card-elegant p-4 md:p-6 mb-3">
                <span className="heading-display text-3xl md:text-5xl text-primary">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-label text-muted-foreground">{unit.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;
