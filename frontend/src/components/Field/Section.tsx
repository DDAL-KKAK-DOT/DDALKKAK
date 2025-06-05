import React from "react";

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

function Section({ title, description, children, ref }: SectionProps) {
  return (
    <section ref={ref}>
      <div className="bg-white rounded-2xl shadow p-7 mx-auto w-full">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>

        <hr className="border-t-2 border-blue-500 my-4" />

        <p className="mb-7 text-sm text-gray-500">{description}</p>

        <div className="space-y-5">{children}</div>
      </div>
    </section>
  );
}

export default Section;
