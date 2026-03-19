import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-theme-surface/50 border border-theme-border p-8 rounded-3xl hover:bg-theme-surface transition-all duration-300 group">
      <div className="w-12 h-12 text-theme-purple mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-semibold text-white mb-3">{title}</h3>
      <p className="text-theme-muted leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
