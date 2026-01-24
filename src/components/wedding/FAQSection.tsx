import { motion } from "framer-motion";
import {
  Car,
  Sparkles,
  UtensilsCrossed,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type IconProps = { className?: string };

// Minimal inline icon (Lucide-style) to avoid relying on a specific lucide name/version.
function ClownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* face */}
      <circle cx="12" cy="12" r="7" />
      {/* nose */}
      <circle cx="12" cy="12" r="1" />
      {/* eyes */}
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      {/* smile */}
      <path d="M9.5 14.5c1.6 1.6 3.4 1.6 5 0" />
      {/* hair tufts */}
      <path d="M6.2 8.2l-1.7-1.7" />
      <path d="M17.8 8.2l1.7-1.7" />
    </svg>
  );
}

type QuickItem = {
  icon: (props: IconProps) => JSX.Element;
  title: string;
  body: string;
};

const FAQSection = () => {
  const items: QuickItem[] = [
    {
      icon: Car,
      title: "Llegada y aparcamiento",
      body:
        "La masseria se encuentra en plena naturaleza y dispone de una amplia zona de aparcamiento privado dentro del recinto, para que podáis llegar con total comodidad y sin preocupaciones.",
    },
    {
      icon: Sparkles,
      title: "Dress Code",
      body:
        "Elegante, libre y con color. Nos encanta que cada invitado exprese su estilo: lo importante es que vengáis cómodos, guapos y vosotros mismos.",
    },
    {
      icon: UtensilsCrossed,
      title: "Menú",
      body:
        "El menú estará centrado principalmente en pescado y propuestas mediterráneas, con opciones variadas pensadas para que todos puedan disfrutar cómodamente de la cena.",
    },
    {
      icon: AlertTriangle,
      title: "Alergias o restricciones",
      body:
        "Indícanos cualquier alergia o restricción alimentaria al confirmar asistencia y la adaptaremos.",
    },
    {
      icon: ClownIcon,
      title: "Niños",
      body:
        "Nos encantan, pero queremos que esta celebración sea para adultos. Gracias por entenderlo.",
    },
    {
      icon: CheckCircle2,
      title: "Confirmación de asistencia",
      body:
        "Os agradeceremos que confirméis lo antes posible para poder organizarlo todo con calma.",
    },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-label text-accent mb-4">DETALLES RÁPIDOS</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground">
            Para que todo sea fácil
          </h2>
        </motion.div>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-2xl bg-white/60 border border-border p-6 md:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="heading-display text-lg md:text-xl text-foreground mb-2">
                    {item.title}
                  </p>
                  <p className="text-body text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
