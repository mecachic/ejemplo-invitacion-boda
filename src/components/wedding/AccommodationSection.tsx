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
          className="text-center mb-12"
        >
          <p className="text-label text-accent mb-4">DÓNDE ALOJARSE</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-5">
            Alojamiento
          </h2>

          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Para la noche del sábado, queremos que solo tengáis que disfrutar. Al llegar a Nápoles,
            nos encargaremos de organizar el traslado (si lo necesitáis) y vuestro alojamiento para esa noche.
            Lo coordinaremos personalmente con vosotros tras la confirmación de asistencia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl mx-auto"
        >
          <div className="card-elegant p-8 md:p-10">
            <h3 className="heading-display text-2xl text-foreground text-center mb-6">
              Sobre vuestra estancia la noche del sábado
            </h3>

            <div className="space-y-4 text-body text-muted-foreground max-w-2xl mx-auto">
              <p>
                A vuestra llegada, nos ocuparemos de organizar tanto el traslado (si lo necesitáis) como el alojamiento,
                para que no tengáis que preocuparos de nada.
              </p>
              <p>
                Una vez confirmada vuestra asistencia, os escribiremos para coordinarlo todo de forma sencilla y personalizada.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationSection;
