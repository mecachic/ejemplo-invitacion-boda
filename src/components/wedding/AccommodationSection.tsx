import { motion } from 'framer-motion';

const AccommodationSection = () => {
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
          <p className="text-label text-accent mb-4">DÓNDE ALOJARSE</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-6">
            Alojamiento
          </h2>

          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Para la noche del sábado, nos encargaremos de todo: si no venís con vehículo, organizaremos el traslado y os recogeremos.
            Además, gestionaremos vuestro alojamiento para esa noche. Tras confirmar vuestra asistencia, os escribiremos para coordinarlo de forma sencilla.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationSection;
