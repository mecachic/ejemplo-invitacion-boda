import { motion } from 'framer-motion';
import { Palette, Sparkles, Sun, Info, Car, Fish, UtensilsCrossed } from 'lucide-react';

const FAQSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-label text-accent mb-4">INFORMACIÓN ÚTIL</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground">
            Dress Code
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Dress code card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-elegant p-8 md:p-10"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-5">
              <Sparkles className="w-5 h-5" />
              <span className="text-label">Ven como te sientas mejor</span>
            </div>

            <h3 className="heading-display text-2xl text-foreground text-center mb-5">
              Elegante, libre y con color
            </h3>

            <p className="text-body text-muted-foreground text-center max-w-xl mx-auto">
              Nos encanta que cada invitado exprese su estilo. No hay un código estricto:
              lo importante es que vengáis cómodos, guapos y vosotros mismos. Los looks
              coloridos son más que bienvenidos — incluso kaftanes marroquíes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full inline-flex items-center gap-2">
                <Palette className="w-4 h-4" /> Colorido bienvenido
              </span>
              <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full inline-flex items-center gap-2">
                <Sun className="w-4 h-4" /> Exterior y verano
              </span>
              <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> “Best version of you”
              </span>
            </div>

            <div className="mt-8 mx-auto max-w-xl rounded-xl bg-white/60 border border-border p-5">
              <p className="text-sm text-muted-foreground">
                Sugerencia práctica: la celebración será en una masseria y parte del evento es al aire libre.
                Recomendamos calzado cómodo (especialmente si llevas tacón).
              </p>
            </div>
          </motion.div>

          {/* Short practical info */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="card-elegant p-8 md:p-10"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-5">
              <Info className="w-5 h-5" />
              <span className="text-label">Detalles rápidos</span>
            </div>

            <h3 className="heading-display text-2xl text-foreground text-center mb-6">
              Para que todo sea fácil
            </h3>

            <div className="space-y-5 text-body text-muted-foreground">
                            <div className="rounded-xl bg-white/60 border border-border p-5">
                <p className="font-medium text-foreground mb-2 inline-flex items-center gap-2">
                  <Car className="w-4 h-4 text-accent" /> Llegada y aparcamiento
                </p>
                <p className="text-sm">
                  La masseria se encuentra en plena naturaleza y dispone de una amplia zona de aparcamiento privado dentro del recinto,
                  para que podáis llegar con total comodidad y sin preocupaciones.
                </p>
              </div>

              <div className="rounded-xl bg-white/60 border border-border p-5">
                <p className="font-medium text-foreground mb-2 inline-flex items-center gap-2">
                  <Fish className="w-4 h-4 text-accent" /> Menú
                </p>
                <p className="text-sm">
                  El menú estará centrado principalmente en pescado y propuestas mediterráneas, con opciones variadas pensadas
                  para que todos puedan disfrutar cómodamente de la cena.
                </p>
              </div>

              <div className="rounded-xl bg-white/60 border border-border p-5">
                <p className="font-medium text-foreground mb-2 inline-flex items-center gap-2">
                  <Fish className="w-4 h-4 text-accent" /> Menú
                </p>
                <p className="text-sm">
                  El menú será mayoritariamente de pescado, con opciones variadas. Si tienes una dieta
                  específica o restricciones, indícanoslo al confirmar asistencia y lo adaptaremos.
                </p>
              </div>

              <div className="rounded-xl bg-white/60 border border-border p-5">
                <p className="font-medium text-foreground mb-2 inline-flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-accent" /> Alergias o restricciones
                </p>
                <p className="text-sm">
                  Indícanos cualquier alergia o restricción alimentaria al confirmar asistencia.
                </p>
              </div>

              <div className="rounded-xl bg-white/60 border border-border p-5">
                <p className="font-medium text-foreground mb-1">Niños</p>
                <p className="text-sm">
                  Nos encantan, pero queremos que esta celebración sea para adultos.
                </p>
              </div>

              <div className="rounded-xl bg-white/60 border border-border p-5">
                <p className="font-medium text-foreground mb-1">Confirmación de asistencia</p>
                <p className="text-sm">
                  Os agradeceremos que confirméis lo antes posible para poder organizarlo todo con calma.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
