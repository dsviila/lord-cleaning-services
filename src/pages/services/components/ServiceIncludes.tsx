import type { ServiceDetail } from "@/mocks/serviceDetails";

type Props = {
  detail: ServiceDetail;
};

export default function ServiceIncludes({ detail }: Props) {
  return (
    <section className="bg-background-50 px-4 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            What&rsquo;s included
          </p>
          <h2 className="font-heading text-foreground-950 text-3xl md:text-5xl font-medium leading-[1.08] mb-10 max-w-2xl">
            Every visit covers the details that matter.
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {detail.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 shrink-0">
                  <i className="ri-check-line text-sm"></i>
                </span>
                <span className="text-foreground-800 text-sm md:text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-secondary-100 border border-secondary-200/70 p-6 md:p-8 lg:sticky lg:top-28">
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-background-50 text-primary-700 mb-4">
              <i className="ri-add-circle-line text-lg"></i>
            </span>
            <h3 className="font-heading text-foreground-950 text-2xl font-medium mb-2">
              Popular add-ons
            </h3>
            <p className="text-foreground-700 text-sm leading-relaxed mb-6">
              Tailor your clean with any of these extras. Just mention them when you book.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {detail.addOns.map((addOn) => (
                <span
                  key={addOn}
                  className="inline-flex items-center gap-1.5 bg-background-50 text-foreground-900 text-sm px-4 py-2 rounded-full whitespace-nowrap border border-secondary-200/70"
                >
                  <i className="ri-add-line"></i>
                  {addOn}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}