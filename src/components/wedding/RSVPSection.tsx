import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  guests: string; // total personas (incluyéndote)
  companions: string; // nombres de acompañantes, si aplica
  dietary: string; // alergias / restricciones
  message: string; // notas opcionales
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjpwooq";

const RSVPSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RSVPFormData>({
    defaultValues: {
      name: '',
      email: '',
      attending: '',
      guests: '1',
      companions: '',
      dietary: '',
      message: '',
    },
  });

  const attending = watch('attending');
  const guests = watch('guests');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("attending", data.attending);
      formData.append("guests", data.guests);
      formData.append("companions", data.companions);
      formData.append("dietary", data.dietary);
      formData.append("message", data.message);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Formspree error ${res.status}: ${text}`);
      }

      toast.success("¡Gracias por confirmar!", {
        description:
          "Hemos recibido vuestra respuesta. Si hace falta, os contactaremos para coordinar los detalles.",
      });

      reset();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo enviar el RSVP", {
        description:
          "Revisa tu conexión e inténtalo de nuevo. Si persiste, avísanos por WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="section-padding bg-secondary">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label text-accent mb-4">CONFIRMACIÓN</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-4">
            RSVP
          </h2>
          <p className="text-body text-muted-foreground">
            Por favor, responded antes del <span className="font-medium text-foreground">1 de abril de 2026</span>.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="card-elegant p-8 md:p-12"
        >
          <div className="space-y-8">
            {/* Name + Email */}
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label className="text-label text-muted-foreground block mb-2">
                  Nombre y apellidos *
                </label>
                <input
                  {...register('name', { required: 'Indica tu nombre' })}
                  className="input-elegant"
                  placeholder="Escribe tu nombre"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-label text-muted-foreground block mb-2">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Indica tu email',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email no válido',
                    },
                  })}
                  type="email"
                  className="input-elegant"
                  placeholder="nombre@correo.com"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-2">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Attending */}
            <div>
              <label className="text-label text-muted-foreground block mb-4">
                ¿Asistirás? *
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center justify-between gap-3 cursor-pointer rounded-xl border border-border px-4 py-3 bg-white/60">
                  <div className="flex items-center gap-3">
                    <input
                      {...register('attending', { required: 'Selecciona una opción' })}
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-body">Sí, asistiré</span>
                  </div>
                  <span className="text-muted-foreground text-sm">Confirmo</span>
                </label>

                <label className="flex items-center justify-between gap-3 cursor-pointer rounded-xl border border-border px-4 py-3 bg-white/60">
                  <div className="flex items-center gap-3">
                    <input
                      {...register('attending', { required: 'Selecciona una opción' })}
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-body">No podré asistir</span>
                  </div>
                  <span className="text-muted-foreground text-sm">Lo siento</span>
                </label>
              </div>

              {errors.attending && (
                <p className="text-destructive text-sm mt-2">{errors.attending.message}</p>
              )}
            </div>

            {/* Conditional fields when attending */}
            {attending === 'yes' && (
              <>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Number of Guests */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="text-label text-muted-foreground block mb-2">
                      ¿Cuántas personas vendréis? *
                    </label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Incluye tu asistencia en el total.
                    </p>
                    <select
                      {...register('guests')}
                      className="input-elegant bg-transparent cursor-pointer"
                    >
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 personas</option>
                      <option value="4">4 personas</option>
                      <option value="5">5 personas</option>
                      <option value="6">6 personas</option>
                    </select>
                  </motion.div>

                  {/* Dietary */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <label className="text-label text-muted-foreground block mb-2">
                      Alergias o restricciones (opcional)
                    </label>
                    <input
                      {...register('dietary')}
                      className="input-elegant"
                      placeholder="Vegetariano, vegan, intolerancias, etc."
                    />
                  </motion.div>
                </div>

                {/* Companion names only if guests > 1 */}
                {Number(guests) > 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="text-label text-muted-foreground block mb-2">
                      Nombres de los acompañantes (opcional)
                    </label>
                    <textarea
                      {...register('companions')}
                      rows={3}
                      className="input-elegant resize-none"
                      placeholder="Ej.: Marta López, Carlos Pérez..."
                    />
                  </motion.div>
                )}
              </>
            )}

            {/* Message */}
            <div>
              <label className="text-label text-muted-foreground block mb-2">
                Nota para los novios (opcional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="input-elegant resize-none"
                placeholder="Dejadnos aquí cualquier comentario..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar confirmación'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
