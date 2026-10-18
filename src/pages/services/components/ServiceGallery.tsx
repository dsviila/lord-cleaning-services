import type { ServiceDetail } from "@/mocks/serviceDetails";

type Props = {
  detail: ServiceDetail;
};

export default function ServiceGallery({ detail }: Props) {
  return (
    <section className="bg-background-50 px-4 md:px-10 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Gallery
          </p>
          <h2 className="font-heading text-foreground-950 text-3xl md:text-5xl font-medium leading-[1.08] max-w-2xl">
            See the standard, up close.
          </h2>
        </div>
        <p className="text-foreground-700 text-sm md:text-base max-w-sm leading-relaxed">
          A look at the finish quality our team delivers on every {detail.eyebrow.toLowerCase()} job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {detail.gallery.map((shot) => (
          <figure key={shot.caption} className="group">
            <div className="relative overflow-hidden rounded-2xl h-64 md:h-72 w-full">
              <img loading="lazy" decoding="async"
                src={shot.image}
                alt={shot.caption}
                title={shot.caption}
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption className="mt-4 text-foreground-800 text-sm font-medium">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}