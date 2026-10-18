import type { DirectoryCleaner } from "@/mocks/cleanersDirectory";
import { specialtyMeta } from "@/mocks/cleanersDirectory";

type Props = {
  cleaner: DirectoryCleaner;
};

export default function CleanerCard({ cleaner }: Props) {
  return (
    <article className="group bg-background-50 rounded-2xl overflow-hidden border border-background-200/70 hover:border-primary-300 transition-colors flex flex-col">
      <div className="relative h-72 md:h-64 overflow-hidden">
        <img loading="lazy" decoding="async"
          src={cleaner.image}
          alt={`${cleaner.name}, ${cleaner.role} on the Lord Cleaning team`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-background-50/95 backdrop-blur-sm text-foreground-900 text-xs font-medium px-3 py-1.5 rounded-full">
          <i className="ri-star-fill text-secondary-500"></i>
          {cleaner.rating}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-primary-500 text-background-50 text-xs font-medium px-3 py-1.5 rounded-full">
          <i className="ri-shield-check-line"></i>
          Vetted
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="min-w-0">
          <h3 className="font-heading text-foreground-950 text-lg font-medium leading-tight truncate">
            {cleaner.name}
          </h3>
          <p className="text-foreground-600 text-sm mt-0.5">{cleaner.role}</p>
        </div>

        <p className="text-foreground-700 text-sm mt-3 leading-relaxed line-clamp-2">{cleaner.bio}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {cleaner.specialties.slice(0, 3).map((s) => {
            const meta = specialtyMeta[s];
            if (!meta) return null;
            return (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-background-100 text-foreground-800 text-[11px] px-2.5 py-1 rounded-full"
              >
                <i className={`${meta.icon} text-[12px]`}></i>
                {meta.label}
              </span>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-background-200 text-xs">
          <div>
            <p className="text-foreground-600">Jobs</p>
            <p className="font-medium text-foreground-950 mt-0.5">{cleaner.jobs}</p>
          </div>
          <div>
            <p className="text-foreground-600">Years</p>
            <p className="font-medium text-foreground-950 mt-0.5">{cleaner.yearsExperience}</p>
          </div>
          <div>
            <p className="text-foreground-600">City</p>
            <p className="font-medium text-foreground-950 mt-0.5 truncate">{cleaner.city}</p>
          </div>
        </div>
      </div>
    </article>
  );
}