import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

const Section = ({ children, id, className = '', containerClassName = '' }: SectionProps) => {
  return (
    <section id={id} className={`py-32 px-6 ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
