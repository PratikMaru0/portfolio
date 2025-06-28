import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ title, children, className = "" }: SectionProps) => {
  return (
    <section
      className={`flex-1 bg-themeText/10 rounded-xl p-6 shadow mb-4 md:mb-0 ${className}`}
    >
      <h2 className="text-xl font-bold mb-4 text-themeText">{title}</h2>
      {children}
    </section>
  );
};

export default Section;
