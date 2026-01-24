
import { motion } from 'framer-motion';

const AccommodationSection = () => {
  return (
    <section id="accommodation" className="section-padding bg-ivory">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-2">DÓNDE ALOJARSE</p>
          <h2 className="section-title mb-6">Alojamiento</h2>

          <p className="mx-auto max-w-2xl text-muted mb-10">
            Para la noche del sábado, queremos que solo tengáis que disfrutar. Al llegar a Nápoles,
            nos encargaremos de organizar el traslado, si lo necesitáis, y vuestro alojamiento para
            esa noche. Lo coordinaremos personalmente con vosotros tras la confirmación de asistencia.
          </p>

          <div className="mx-auto max-w-2xl rounded-2xl border border-sage/20 bg-white/70 px-8 py-8 shadow-sm">
            <h3 className="font-serif text-xl mb-4">Sobre vuestra estancia la noche del sábado</h3>
            <p className="text-muted mb-4">
              Queremos que esa noche solo tengáis que disfrutar.
            </p>
            <p className="text-muted mb-4">
              Una vez lleguéis a Nápoles, nos ocuparemos de organizar tanto el traslado, si lo necesitáis,
              como vuestro alojamiento para esa noche, para que no tengáis que preocuparos de nada.
            </p>
            <p className="text-muted">
              Lo coordinaremos personalmente con vosotros tras la confirmación de asistencia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationSection;
