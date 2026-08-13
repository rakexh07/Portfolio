import { education, publication, extraCurricular } from "@/lib/data";

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-20 bg-bg px-4 sm:px-6 md:px-[8vw] py-12 sm:py-16 md:py-20 lg:py-24 border-t border-line grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-5 sm:gap-8 md:gap-12 lg:gap-16"
    >
      <div>
        <span className="font-mono text-accent text-[10px] sm:text-[11px] md:text-[13px] tracking-[1.3px] sm:tracking-[1.5px] md:tracking-[2px]">
          04 — Education
        </span>
        <div className="mt-5 sm:mt-6 md:mt-8">
          {education.map((e) => (
            <div
              key={e.title}
              className="border-l-2 border-line pl-3.5 sm:pl-5 md:pl-6 mb-6 sm:mb-7 md:mb-9 relative"
            >
              <span className="absolute -left-[6px] sm:-left-[7px] top-1 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-bg border-2 border-accent rounded-full" />
              <div className="font-mono text-accent text-[10.5px] sm:text-[11px] md:text-xs">
                {e.years}
              </div>
              <h4 className="text-[13.5px] sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-1.5 leading-snug font-semibold">
                {e.title}
              </h4>
              <p className="text-muted text-[11.5px] sm:text-[12.5px] md:text-sm mt-0.75 sm:mt-1 leading-relaxed">
                {e.place}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-line p-4 sm:p-5 md:p-7 rounded-sm bg-panel h-fit">
        <span className="font-mono text-[10px] sm:text-[10.5px] md:text-[11px] text-accent tracking-wide uppercase">
          Publication
        </span>
        <p className="text-muted text-[12px] sm:text-[13px] md:text-[14.5px] leading-relaxed mt-2 sm:mt-2.5 md:mt-3.5">
          {publication}
        </p>
        <span className="font-mono text-[10px] sm:text-[10.5px] md:text-[11px] text-accent tracking-wide uppercase block mt-4 sm:mt-5 md:mt-7">
          Extra-Curricular
        </span>
        <p className="text-muted text-[12px] sm:text-[13px] md:text-[14.5px] leading-relaxed mt-2 sm:mt-2.5 md:mt-3.5">
          {extraCurricular}
        </p>
      </div>
    </section>
  );
}
