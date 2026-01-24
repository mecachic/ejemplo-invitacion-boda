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
            Alojamiento y traslado
          </h2>

          <div className="max-w-2xl mx-auto space-y-5">
            <p className="text-body text-muted-foreground">
              <strong>Para la noche del sábado, queremos que solo tengáis que disfrutar.</strong>
            </p>

            <p className="text-body text-muted-foreground">
              <span className="text-accent mr-2" aria-hidden="true">✦</span>
              Al llegar a Nápoles, nos encargaremos de organizar el traslado, si lo necesitáis.
            </p>

            <p className="text-body text-muted-foreground">
              <span className="text-accent mr-2" aria-hidden="true">✦</span>
              El alojamiento estará ubicado muy cerca del lugar de celebración, de modo que podáis concentraros únicamente en disfrutar del evento sin atender a horarios ni desplazamientos.
            </p>

            <p className="text-body text-muted-foreground">
              Todo lo coordinaremos personalmente con vosotros una vez confirmada la asistencia, para que no tengáis que preocuparos por nada.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationSection;
