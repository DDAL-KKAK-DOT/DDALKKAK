import React from "react";

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

function Section({
  title,
  description,
  children,
  ref,
  className,
}: SectionProps) {
  return (
    <section ref={ref} className={className}>
      <div className="bg-white rounded-2xl shadow p-7 w-full">
        <h2 className="mt-4 body-l-semibold text-gray-800">{title}</h2>

        <hr className="border-t-2 border-blue-500 my-4" />

        <p className="mb-7 caption-m-regular text-gray-500">{description}</p>

        <div className="space-y-5">{children}</div>
      </div>
    </section>
  );
}

export default Section;
