import React from 'react';
import Section from '../Section';

const Testimonials = () => {
  const testimonials = [
    {
      initials: "JD",
      name: "John Doe",
      quote: "TheScene changed how I find parties. It's so easy to see what's happening near me and get tickets without any hassle."
    },
    {
      initials: "AS",
      name: "Alice Smith",
      quote: "As an event host, the platform provides me with all the tools I need to manage my events and reach a wider audience."
    },
    {
      initials: "MR",
      name: "Michael Ray",
      quote: "The real-time updates are a lifesaver. I always know exactly what's going on and never miss out on the best events."
    }
  ];

  return (
    <Section id="testimonials" className="bg-theme-surface">
      <div data-aos="fade-up" className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          What Our <span className="text-theme-purple">Users Say</span>
        </h2>
        <p className="text-theme-muted max-w-2xl mx-auto">
          Hear from the people who are already using TheScene to discover and host the best parties.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 150} className="bg-theme-bg border border-theme-border p-8 rounded-2xl hover:border-theme-purple/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-theme-purple rounded-full flex items-center justify-center text-white font-bold text-lg">
                {testimonial.initials}
              </div>
              <h4 className="font-heading font-semibold text-white">{testimonial.name}</h4>
            </div>
            <p className="text-theme-muted leading-relaxed italic">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
