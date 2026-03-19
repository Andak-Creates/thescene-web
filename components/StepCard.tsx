import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepCard = ({ number, title, description, icon }: StepCardProps) => {
  return (
    <div className="relative text-center group">
      <div className="w-20 h-20 bg-theme-surface border border-theme-border rounded-3xl flex items-center justify-center text-theme-purple mx-auto mb-8 relative transition-all duration-300 group-hover:-translate-y-1">
        {icon}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-theme-purple text-white text-xs font-bold flex items-center justify-center rounded-xl border border-theme-bg">
          0{number}
        </div>
      </div>
      <h3 className="text-xl font-heading font-semibold text-white mb-3">{title}</h3>
      <p className="text-theme-muted max-w-xs mx-auto font-medium">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
