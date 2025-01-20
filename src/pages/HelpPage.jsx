/* eslint-disable no-unused-vars */
import React from 'react';
import { Book, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const HelpPage = () => {
  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      icon: Book,
      link: '#',
    },
    {
      title: 'Community Forum',
      description: 'Connect with other developers',
      icon: MessageCircle,
      link: '#',
    },
    {
      title: 'Support',
      description: 'Get help from our team',
      icon: Mail,
      link: '#',
    },
  ];

  const faqs = [
    {
      question: 'How do I get started?',
      answer: 'Begin by reviewing our quickstart guide in the documentation.',
    },
    {
      question: 'What are the API rate limits?',
      answer:
        'Free tier users have 1000 requests per day. Premium users have unlimited access.',
    },
    {
      question: 'How do I upgrade my plan?',
      answer:
        'Visit the billing section in your account settings to upgrade your subscription.',
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Resources Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.title}
              className='p-6 bg-white rounded-lg shadow-sm'
            >
              <div className='flex items-center'>
                <Icon className='w-6 h-6 text-purple-500' />
                <h3 className='ml-3 text-lg font-medium text-gray-900'>
                  {resource.title}
                </h3>
              </div>
              <p className='mt-2 text-sm text-gray-500'>
                {resource.description}
              </p>
              <a
                href={resource.link}
                className='inline-flex items-center mt-4 text-sm font-medium text-purple-600 hover:text-purple-500'
              >
                Learn more
                <ExternalLink className='w-4 h-4 ml-1' />
              </a>
            </div>
          );
        })}
      </div>

      {/* FAQs */}
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Frequently Asked Questions
          </h2>
        </div>
        <div className='border-t border-gray-200'>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`p-6 ${
                index !== faqs.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <h3 className='text-sm font-medium text-gray-900'>
                {faq.question}
              </h3>
              <p className='mt-2 text-sm text-gray-500'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
