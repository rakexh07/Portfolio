import { certifications } from "@/lib/data";

export default function Ticker() {
  const headingItem = { name: "Certificates", org: "", isHeading: true };

  function buildList() {
    const list: (typeof certifications[number] | typeof headingItem)[] = [];
    certifications.forEach((c) => {
      list.push(headingItem);
      list.push(c);
    });
    return list;
  }

  const oneCycle = buildList();
  const items = [...oneCycle, ...oneCycle, ...oneCycle];

  return (
    <div className="relative z-20 border-t border-b border-line py-3.5 sm:py-5 md:py-6 overflow-hidden bg-bg2">
      <div className="ticker-track flex gap-8 sm:gap-10 md:gap-14 whitespace-nowrap">
        {items.map((c, i) => (
          <span
            key={i}
            className={`font-mono text-[11.5px] sm:text-[12.5px] md:text-sm after:content-['//'] after:text-accent after:ml-8 sm:after:ml-10 md:after:ml-14 ${"isHeading" in c && c.isHeading
                ? "text-accent font-bold uppercase tracking-[1.5px] sm:tracking-[2px]"
                : "text-muted"
              }`}
          >
            <b
              className={`${"isHeading" in c && c.isHeading ? "text-accent" : "text-fg"
                } font-semibold`}
            >
              {c.name}
            </b>
            {c.org && <> — {c.org}</>}
          </span>
        ))}
      </div>
    </div>
  );
}
