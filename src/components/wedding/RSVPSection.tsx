import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/I18nContext';

interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  guests: string; // total personas (incluyéndote)
  companions: string; // nombres de acompañantes, si aplica
  dietary: string; // alergias / restricciones
  message: string; // notas opcionales
}

const RSVPSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();

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

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjpwooq';

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('attending', data.attending);
      formData.append('guests', data.guests);
      formData.append('companions', data.companions);
      formData.append('dietary', data.dietary);
      formData.append('message', data.message);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Formspree error ${res.status}: ${text}`);
      }

      toast.success(t('rsvp.toast.success'), {
        description: t('rsvp.toast.success.desc'),
      });

      reset();
    } catch (e) {
      console.error(e);
      toast.error(t('rsvp.toast.error'), {
        description: t('rsvp.toast.error.desc'),
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
          <p className="text-label text-accent mb-4">{t('rsvp.kicker')}</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-4">
            {t('rsvp.title')}
          </h2>
          <p className="text-body text-muted-foreground">
            {t('rsvp.deadline')}
            <span className="font-medium text-foreground">{t('rsvp.deadline.date')}</span>.
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
                  {t('rsvp.name.label')}
                </label>
                <input
                  {...register('name', { required: t('rsvp.err.name') })}
                  className="input-elegant"
                  placeholder={t('rsvp.name.placeholder')}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-label text-muted-foreground block mb-2">
                  {t('rsvp.email.label')}
                </label>
                <input
                  {...register('email', {
                    required: t('rsvp.err.email'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('rsvp.err.email.invalid'),
                    },
                  })}
                  type="email"
                  className="input-elegant"
                  placeholder={t('rsvp.email.placeholder')}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-2">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Attending */}
            <div>
                <label className="text-label text-muted-foreground block mb-4">
                  {t('rsvp.attending.label')}
                </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center justify-between gap-3 cursor-pointer rounded-xl border border-border px-4 py-3 bg-white/60">
                  <div className="flex items-center gap-3">
                    <input
                      {...register('attending', { required: t('rsvp.err.attending') })}
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-body">{t('rsvp.attending.yes')}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{t('rsvp.attending.yes.hint')}</span>
                </label>

                <label className="flex items-center justify-between gap-3 cursor-pointer rounded-xl border border-border px-4 py-3 bg-white/60">
                  <div className="flex items-center gap-3">
                    <input
                      {...register('attending', { required: t('rsvp.err.attending') })}
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-body">{t('rsvp.attending.no')}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{t('rsvp.attending.no.hint')}</span>
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
                      {t('rsvp.guests.label')}
                    </label>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('rsvp.guests.help')}
                    </p>
                    <select
                      {...register('guests')}
                      className="input-elegant bg-transparent cursor-pointer"
                    >
                      <option value="1">{t('rsvp.guests.1')}</option>
                      <option value="2">{t('rsvp.guests.2')}</option>
                      <option value="3">{t('rsvp.guests.3')}</option>
                      <option value="4">{t('rsvp.guests.4')}</option>
                      <option value="5">{t('rsvp.guests.5')}</option>
                      <option value="6">{t('rsvp.guests.6')}</option>
                    </select>
                  </motion.div>

                  {/* Dietary */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <label className="text-label text-muted-foreground block mb-2">
                      {t('rsvp.dietary.label')}
                    </label>
                    <input
                      {...register('dietary')}
                      className="input-elegant"
                      placeholder={t('rsvp.dietary.placeholder')}
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
                      {t('rsvp.companions.label')}
                    </label>
                    <textarea
                      {...register('companions')}
                      rows={3}
                      className="input-elegant resize-none"
                      placeholder={t('rsvp.companions.placeholder')}
                    />
                  </motion.div>
                )}
              </>
            )}

            {/* Message */}
            <div>
              <label className="text-label text-muted-foreground block mb-2">
                {t('rsvp.message.label')}
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="input-elegant resize-none"
                placeholder={t('rsvp.message.placeholder')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('rsvp.submitting') : t('rsvp.submit')}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
