import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  guests: string;
  dietary: string;
  message: string;
}

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
      dietary: '',
      message: '',
    },
  });

  const attending = watch('attending');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Thank you for your RSVP!', {
      description: 'We have received your response and will be in touch soon.',
    });
    
    reset();
    setIsSubmitting(false);
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
          <p className="text-label text-accent mb-4">We Hope You Can Join Us</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground mb-4">
            RSVP
          </h2>
          <p className="text-body text-muted-foreground">
            Please respond by August 1st, 2025
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
            {/* Name */}
            <div>
              <label className="text-label text-muted-foreground block mb-2">
                Full Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="input-elegant"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-2">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-label text-muted-foreground block mb-2">
                Email Address *
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="input-elegant"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-2">{errors.email.message}</p>
              )}
            </div>

            {/* Attending */}
            <div>
              <label className="text-label text-muted-foreground block mb-4">
                Will You Be Attending? *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register('attending', { required: 'Please select an option' })}
                    type="radio"
                    value="yes"
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-body">Joyfully Accept</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register('attending', { required: 'Please select an option' })}
                    type="radio"
                    value="no"
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-body">Regretfully Decline</span>
                </label>
              </div>
              {errors.attending && (
                <p className="text-destructive text-sm mt-2">{errors.attending.message}</p>
              )}
            </div>

            {/* Conditional fields for attending guests */}
            {attending === 'yes' && (
              <>
                {/* Number of Guests */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-label text-muted-foreground block mb-2">
                    Number of Guests
                  </label>
                  <select
                    {...register('guests')}
                    className="input-elegant bg-transparent cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </motion.div>

                {/* Dietary Restrictions */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="text-label text-muted-foreground block mb-2">
                    Dietary Restrictions
                  </label>
                  <input
                    {...register('dietary')}
                    className="input-elegant"
                    placeholder="Vegetarian, vegan, allergies, etc."
                  />
                </motion.div>
              </>
            )}

            {/* Message */}
            <div>
              <label className="text-label text-muted-foreground block mb-2">
                Message for the Couple (Optional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="input-elegant resize-none"
                placeholder="Share your wishes or ask any questions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
