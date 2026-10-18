export default function StepCleaner() {
  const teamPoints = [
    {
      icon: "ri-user-star-line",
      title: "Trained & background-checked in person",
      text: "Every pro on our team passes a face-to-face evaluation and a full background check before ever stepping into a home.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Fully insured on every visit",
      text: "Our team arrives covered, equipped and accountable. If something's not right, Lord Cleaning makes it right.",
    },
    {
      icon: "ri-magic-line",
      title: "Matched to your home, date and time",
      text: "No choosing and no freelancers. We assign the right crew based on your space, the service and your schedule.",
    },
    {
      icon: "ri-leaf-line",
      title: "Eco & pet-friendly by default",
      text: "Our team uses plant-based, family-safe products, with specialist crews when you need deep-clean power.",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          Meet the team coming to you.
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          Every visit is handled by our own trained, background-checked and insured pros. You hire
          our team, and we assign the right crew for your home, date and time.
        </p>
      </div>

      <div className="rounded-2xl bg-primary-50 border border-primary-200 p-5 flex items-start gap-4">
        <span className="w-11 h-11 flex items-center justify-center rounded-full bg-primary-500 text-background-50 flex-shrink-0">
          <i className="ri-team-line text-lg"></i>
        </span>
        <div>
          <p className="font-heading text-foreground-950 text-base font-medium mb-1">
            You're hiring our team — not a stranger.
          </p>
          <p className="text-foreground-700 text-sm leading-relaxed">
            No freelancers and no middlemen. Your home is cleaned by Lord Cleaning pros we train,
            vet and stand behind on every single visit.
          </p>
        </div>
      </div>

      <article className="rounded-2xl overflow-hidden border border-background-200 bg-background-50 grid md:grid-cols-2">
        <div className="h-64 md:h-full">
          <img loading="lazy" decoding="async"
            src="/images/team/Lord-Team-Group.webp"
            alt="The Lord Cleaning team of trained professionals"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="p-6 md:p-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] bg-secondary-100 text-secondary-900 px-2.5 py-1 rounded-full whitespace-nowrap mb-4">
            <i className="ri-shield-check-line"></i>
            Vetted & insured
          </span>
          <h3 className="font-heading text-foreground-950 text-xl md:text-2xl font-medium mb-3">
            One team. Fully accountable.
          </h3>
          <p className="text-foreground-700 text-sm leading-relaxed mb-6">
            You're not booking a one-off freelancer — you're hiring a real, local team that shows
            up in uniform, follows a proven checklist and answers to us. Every time, no exceptions.
          </p>

          <ul className="space-y-4">
            {teamPoints.map((point) => (
              <li key={point.title} className="flex items-start gap-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 flex-shrink-0">
                  <i className={`${point.icon} text-base`}></i>
                </span>
                <div>
                  <p className="font-heading text-foreground-950 text-sm font-medium">
                    {point.title}
                  </p>
                  <p className="text-foreground-700 text-xs leading-relaxed">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className="rounded-2xl bg-secondary-50 border border-secondary-200 p-5 flex items-start gap-4">
        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-500 text-background-50 flex-shrink-0">
          <i className="ri-message-3-line text-lg"></i>
        </span>
        <div>
          <p className="font-heading text-foreground-950 text-sm font-medium mb-1">
            Your crew is confirmed by text before the visit.
          </p>
          <p className="text-foreground-700 text-sm leading-relaxed">
            We'll match the best available team to your booking and let you know who's coming — no
            need to choose.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground-800">
        <span className="inline-flex items-center gap-2">
          <i className="ri-shield-check-line text-primary-600 text-lg"></i>
          Background-checked
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="ri-graduation-cap-line text-primary-600 text-lg"></i>
          Trained in person
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="ri-bank-card-line text-primary-600 text-lg"></i>
          Fully insured
        </span>
      </div>
    </div>
  );
}