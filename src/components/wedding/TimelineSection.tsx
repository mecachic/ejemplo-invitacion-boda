import { motion } from 'framer-motion';

const TimelineSection = () => {
  const events = [
    {
      time: '3:00 PM',
      title: 'Ceremony',
      description: 'Exchange of vows in the villa gardens',
    },
    {
      time: '4:00 PM',
      title: 'Cocktail Hour',
      description: 'Aperitivo with live music on the terrace',
    },
    {
      time: '5:30 PM',
      title: 'Reception',
      description: 'Dinner and toasts in the grand hall',
    },
    {
      time: '8:00 PM',
      title: 'First Dance',
      description: 'Followed by dancing under the stars',
    },
    {
      time: '11:00 PM',
      title: 'Late Night Bites',
      description: 'Italian street food and gelato',
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
          <p className="text-label text-accent mb-4">Schedule</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground">
            Order of the Day
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
                  <span className="heading-display text-2xl text-primary">
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
                  <span className="md:hidden text-label text-primary mb-2 block">
                    {event.time}
                  </span>
                  <h3 className="heading-display text-xl text-foreground mb-1">
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
