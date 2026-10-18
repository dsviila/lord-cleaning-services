import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
const crewSteps = [
  {
    icon: "ri-home-4-line",
    title: "Tell us about your home",
    blurb: "Rooms, extras and the day that suits you — it takes under a minute.",
  },
  {
    icon: "ri-user-settings-line",
    title: "We build your crew",
    blurb: "We match the right pros and the right amount of time for your visit.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Our team shows up",
    blurb: "A vetted, insured Lord Cleaning crew arrives on time — every time.",
  },
];

export default function CleanersPage() {
  return (
    <main className="min-h-screen bg-background-50 text-foreground-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-4 md:px-10 bg-background-100 border-b border-background-200/70">
        <div className="max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 hover:text-primary-700 mb-5"
          >
            <i className="ri-arrow-left-line"></i>
            Back to home
          </Link>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Our cleaning team
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-foreground-950 leading-[1.05] max-w-3xl">
            Meet the team behind every clean.
          </h1>
          <p className="text-foreground-700 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
            Every Lord Cleaning pro is background-checked, trained in person and fully insured. You
            hire our team — we assign the right crew for your home, date and time.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 text-sm text-foreground-800">
            <span className="inline-flex items-center gap-2">
              <i className="ri-shield-check-line text-primary-600 text-lg"></i>
              Background-checked
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ri-graduation-cap-line text-primary-600 text-lg"></i>
              In-person assessed
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ri-bank-card-line text-primary-600 text-lg"></i>
              $2M insured
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ri-leaf-line text-primary-600 text-lg"></i>
              Fair-pay certified
            </span>
          </div>
        </div>
      </section>

      {/* How your crew works */}
      <section className="px-4 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground-950 leading-[1.1]">
            How your crew is put together.
          </h2>
          <p className="text-foreground-700 text-base mt-4 leading-relaxed">
            You don't pick a person — you hire our team, and we assign the right pros for your home.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {crewSteps.map((s, i) => (
            <div
              key={s.title}
              className="bg-background-100 border border-background-200/70 rounded-2xl p-6 md:p-7"
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-500 text-background-50 mb-5">
                <i className={`${s.icon} text-xl`}></i>
              </span>
              <p className="text-xs uppercase tracking-widest text-foreground-600 mb-2">
                Step {i + 1}
              </p>
              <h3 className="font-heading text-foreground-950 text-xl font-medium mb-2">{s.title}</h3>
              <p className="text-foreground-700 text-sm leading-relaxed">{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team showcase */}
      <section className="px-4 md:px-10 pb-14 md:pb-20">
        <div className="max-w-3xl mb-8 md:mb-10">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Our team
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground-950 leading-[1.1]">
            One team, trained and vetted.
          </h2>
          <p className="text-foreground-700 text-base mt-4 leading-relaxed">
            You don't get a random cleaner — you get our team. Every pro is background-checked,
            trained in person and fully insured, then matched to your home so the right crew shows up
            every single time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7">
          <div className="md:col-span-8 rounded-3xl overflow-hidden aspect-[16/11]">
            <img loading="lazy" decoding="async"
              src="/images/gallery/Living-Room.webp"
              alt="The Lord Cleaning team working together in a bright home"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-6 md:gap-7">
            <div className="rounded-3xl overflow-hidden aspect-square md:aspect-auto">
              <img loading="lazy" decoding="async"
                src="/images/team/Team-Crew-Photo.webp"
                alt="The Lord Cleaning team cleaning a bright kitchen together"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square md:aspect-auto">
              <img loading="lazy" decoding="async"
                src="/images/team/Lord-Team-Group.webp"
                alt="The Lord Cleaning team with their cleaning supplies"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-7 mt-6 md:mt-7">
          <div className="bg-background-100 border border-background-200/70 rounded-2xl p-6">
            <p className="font-heading text-foreground-950 text-3xl font-medium">24</p>
            <p className="text-foreground-700 text-sm mt-1">Trained pros on the team</p>
          </div>
          <div className="bg-background-100 border border-background-200/70 rounded-2xl p-6">
            <p className="font-heading text-foreground-950 text-3xl font-medium">4.9</p>
            <p className="text-foreground-700 text-sm mt-1">Average team rating</p>
          </div>
          <div className="bg-background-100 border border-background-200/70 rounded-2xl p-6">
            <p className="font-heading text-foreground-950 text-3xl font-medium">100%</p>
            <p className="text-foreground-700 text-sm mt-1">Background-checked &amp; insured</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 md:px-10 pb-20">
        <div className="rounded-3xl bg-primary-900 text-background-50 p-8 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-medium">
              Ready to hire our team?
            </h2>
            <p className="text-background-200/85 text-sm md:text-base mt-3 leading-relaxed">
              Tell us about your home and we'll assign the right crew for your date and time —
              trained, vetted and fully insured.
            </p>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-background-50 text-primary-900 hover:bg-background-100 pl-6 pr-2 py-2.5 rounded-full text-sm font-medium whitespace-nowrap self-start md:self-auto transition-colors"
          >
            Book your clean
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-background-50">
              <i className="ri-arrow-right-line"></i>
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}