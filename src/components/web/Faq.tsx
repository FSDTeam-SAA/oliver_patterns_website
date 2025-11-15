'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Faq() {
  const faqs = [
    {
      question: 'Can I cancel my subscription?',
      answer:
        'Yes, you can cancel your subscription at any time. There are no long-term contracts or hidden fees. Simply go to your account settings and select the cancel option.',
    },
    {
      question: 'How often is the grant database updated?',
      answer:
        'Our grant database is updated regularly to ensure you have access to the latest funding opportunities. We continuously add new grants and update existing ones to reflect current availability and requirements.',
    },
    {
      question: 'Is there a free trial for Premium?',
      answer:
        'Yes, we offer a 14-day free trial for our Premium plan. No credit card is required to start your trial. You can upgrade or downgrade at any time.',
    },
    {
      question: 'Do you offer support for grant applications?',
      answer:
        'We provide comprehensive resources, guides, and templates to help you with your grant applications. Our expert team is also available for consultation to help guide you through the application process.',
    },
  ]

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-[147px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0C2661] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#424242] text-base">Find answers to common questions about our facilities</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="mb-3 border-0">
              <AccordionTrigger className="bg-[#DEEEFF] hover:bg-blue-200 rounded-lg  px-6 py-4 text-left font-semibold text-[#0C2661] text-xl transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="bg-blue-50 rounded-lg px-6 py-4 mt-0 text-gray-700 border-0">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
