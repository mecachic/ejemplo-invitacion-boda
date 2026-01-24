import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Car } from 'lucide-react';

const AccommodationSection = () => {
  const hotels = [
    {
      name: 'Baia Domizia (area hotels)',
      description: 'A convenient seaside area with many hotels and holiday rentals.',
      distance: 'Approx. 15–25 min by car',
      amenities: ['Free WiFi', 'Parking', 'Beach access'],
      link: '#',
    },
    {
      name: 'Cellole & Sessa Aurunca (area stays)',
      description: 'Local B&Bs and agriturismi close to the venue.',
      distance: 'Approx. 5–20 min by car',
      amenities: ['Free WiFi', 'Breakfast', 'Parking'],
      link: '#',
    },
    {
      name: 'Gaeta / Formia (area hotels)',
      description: 'More options and nightlife, great if you plan a longer weekend.',
      distance: 'Approx. 35–55 min by car',
      amenities: ['Free WiFi', 'Parking', 'Transport links'],
      link: '#',
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
          <p className="text-label text-accent mb-4">Where to Stay</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-4">
            Accommodation
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Here are a few practical areas to stay near Masseria Falco.
            Book early as late June is a popular period in Campania.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elegant p-8 group hover:shadow-[var(--shadow-medium)] transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>

              <h3 className="heading-display text-xl text-foreground mb-2">
                {hotel.name}
              </h3>

              <p className="text-body text-muted-foreground text-sm mb-4">
                {hotel.description}
              </p>

              <div className="flex items-center gap-2 text-primary text-sm mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-body">{hotel.distance}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {hotel.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <a
                href={hotel.link}
                className="text-label text-primary hover:text-sage-dark transition-colors"
              >
                View Details →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
