import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: 'What is the dress code?',
      answer:
        'We kindly request formal attire. Gentlemen are encouraged to wear suits, and ladies may opt for cocktail or floor-length dresses. Please note the ceremony will take place outdoors on grass, so we recommend avoiding stiletto heels.',
    },
    {
      question: 'Can I bring a plus one?',
      answer:
        'Due to venue capacity, we can only accommodate those guests named on the invitation. If you have received a plus one, it will be noted on your invitation. Thank you for understanding.',
    },
    {
      question: 'Is there parking available?',
      answer:
        'Yes, complimentary valet parking will be available at the venue. Simply drive up to the main entrance and our team will assist you.',
    },
    {
      question: 'Will transportation be provided?',
      answer:
        'Shuttle buses will run between the recommended hotels and the venue throughout the evening. The schedule will be shared closer to the date.',
    },
    {
      question: 'What if I have dietary restrictions?',
      answer:
        'Please let us know of any dietary requirements when you RSVP, and our catering team will ensure you are well taken care of. Options for vegetarian, vegan, gluten-free, and other dietary needs will be available.',
    },
    {
      question: 'Are children welcome?',
      answer:
        'While we adore your little ones, we have chosen to make our wedding an adults-only celebration. We hope this will give you a night off to enjoy the festivities!',
    },
    {
      question: 'When should I RSVP by?',
      answer:
        'Please RSVP by August 1st, 2025 to help us finalize arrangements with our vendors. We truly appreciate your timely response.',
    },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label text-accent mb-4">Questions & Answers</p>
          <h2 className="heading-script text-4xl md:text-5xl text-foreground">
            Frequently Asked
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-elegant px-6 border-none"
              >
                <AccordionTrigger className="heading-display text-lg text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
