import { motion } from 'framer-motion';
import { Gift, CreditCard, Home } from 'lucide-react';

const GiftsSection = () => {
  const giftOptions = [
    {
      icon: Home,
      title: 'Honeymoon Fund',
      description:
        'Help us create unforgettable memories as we embark on our first adventure as a married couple.',
    },
    {
      icon: Gift,
      title: 'Gift Registry',
      description:
        'We have curated a selection of items at our favorite stores to help build our home together.',
    },
    {
      icon: CreditCard,
      title: 'Cash Gift',
      description:
        'Your presence is the greatest gift, but if you wish to contribute, we would be truly grateful.',
    },
  ];

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
          <p className="text-label text-accent mb-4">Your Generosity</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-4">
            Gift Registry
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you
            wish to honor us with a gift, we have a few options below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {giftOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 rounded-full bg-sage-light/30 flex items-center justify-center mx-auto mb-6">
                <option.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="heading-display text-xl text-foreground mb-3">
                {option.title}
              </h3>

              <p className="text-body text-muted-foreground text-sm mb-6">
                {option.description}
              </p>

              <button className="button-outline">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="divider-ornate mt-16"
        >
          <span className="text-xl text-accent">✦</span>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftsSection;
