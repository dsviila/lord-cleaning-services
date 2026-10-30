import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { business } from "@/mocks/landing";

const EFFECTIVE_DATE = "October 29, 2026";

type Section = {
  id: string;
  title: string;
  body: ReactNode;
};

const linkClass = "text-primary-700 underline underline-offset-2 hover:text-primary-600";

const sections: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        Lord Cleaning Services ("we", "us", "our") provides residential and commercial cleaning
        across Northern Virginia. This policy explains what information we collect through{" "}
        <a href="https://lordcleaningservices.com" className={linkClass}>
          lordcleaningservices.com
        </a>
        , how we use it and the choices you have.
      </p>
    ),
  },
  {
    id: "information-you-give-us",
    title: "Information you give us",
    body: (
      <>
        <p>When you request an estimate, book a cleaning or contact us, you may give us:</p>
        <ul>
          <li>Your name, email address and phone number.</li>
          <li>Your service address, city, state and ZIP code.</li>
          <li>
            Details about the service you want: type of cleaning, home size, frequency, preferred
            date and time, add-ons and any notes you write.
          </li>
          <li>
            What you tell our website assistant (the "Lord Cleaning Assistant" chat), by text or by
            voice.
          </li>
          <li>Anything you send us by phone, text message, WhatsApp or email.</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-collected-automatically",
    title: "Information collected automatically",
    body: (
      <p>
        When you visit the website, our analytics and advertising tools automatically collect
        information such as the pages you view, how you arrived at the site (for example, from an
        ad or a search), your browser and device type, an approximate location based on your IP
        address, and whether you submitted a form. This is collected with cookies and similar
        technologies, described below.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking technologies",
    body: (
      <>
        <p>
          The website itself does not need cookies to work. We use the following third-party tools,
          which set cookies or use similar technologies in your browser:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> (cookies such as <code>_ga</code>): helps us
            understand how visitors use the site so we can improve it.
          </li>
          <li>
            <strong>Meta Pixel</strong> (cookies such as <code>_fbp</code> and <code>_fbc</code>):
            helps us measure the results of our ads on Facebook and Instagram and show relevant ads
            to people who visited our site.
          </li>
          <li>
            <strong>Website assistant</strong>: our chat assistant, provided by Readdy, may store
            information in your browser so the conversation works correctly.
          </li>
        </ul>
        <p>
          These providers process information under their own privacy policies:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Google
          </a>{" "}
          and{" "}
          <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Meta
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To prepare your quote, schedule your cleaning and provide the service.</li>
        <li>To contact you about your request or appointment.</li>
        <li>To answer questions you send us or ask our website assistant.</li>
        <li>To understand how the website is used and improve it.</li>
        <li>To measure and improve our advertising on Google, Facebook and Instagram.</li>
        <li>To prevent spam and keep the website secure.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>We do not sell your personal information for money. We share information only with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that help us run the website and our business, such
            as our website host (Netlify), our form provider (Formspree), our website assistant
            provider (Readdy), Google and Meta.
          </li>
          <li>
            <strong>Our team</strong>, so they can prepare your quote and provide the cleaning.
          </li>
          <li>
            <strong>Authorities</strong>, when the law requires it or to protect our rights, our
            customers or our team.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "choices",
    title: "Your choices",
    body: (
      <>
        <ul>
          <li>
            You can block or delete cookies in your browser settings. The website will still work.
          </li>
          <li>
            You can stop Google Analytics from collecting your visits with the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Google Analytics opt-out add-on
            </a>
            .
          </li>
          <li>
            You can manage the ads you see on Facebook and Instagram in your{" "}
            <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Meta ad preferences
            </a>
            , and opt out of interest-based ads from many companies at{" "}
            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className={linkClass}>
              optout.aboutads.info
            </a>
            .
          </li>
          <li>
            You can ask us to access, correct or delete the personal information you gave us, or to
            stop contacting you, by emailing{" "}
            <a href={business.emailHref} className={linkClass}>
              {business.email}
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <p>
        We keep the information you give us for as long as we need it to provide our services,
        keep business records and meet legal obligations. Analytics and advertising data is kept
        according to the settings and policies of Google and Meta.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The website uses an encrypted connection (HTTPS), and we limit access to your information
        to the people who need it to serve you. No method of sending or storing information online
        is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Our website and services are intended for adults. We do not knowingly collect personal
        information from children under 13.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. When we do, we will change the effective date
        at the top of this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy or your information? Email{" "}
        <a href={business.emailHref} className={linkClass}>
          {business.email}
        </a>{" "}
        or call or text{" "}
        <a href={business.phoneHref} className={linkClass}>
          {business.phoneDisplay}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background-50 text-foreground-900">
      <Navbar />

      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-4 md:px-10 bg-background-100 border-b border-background-200/70">
        <div className="max-w-3xl">
          <Link
            to="/"
            className="flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 hover:text-primary-700 mb-5"
          >
            <i className="ri-arrow-left-line"></i>
            Back to home
          </Link>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Legal
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-foreground-950 leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="text-foreground-700 text-sm md:text-base mt-5">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="px-4 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl space-y-10">
          {sections.map((section, index) => (
            <article key={section.id} id={section.id}>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground-950 mb-4">
                {index + 1}. {section.title}
              </h2>
              <div className="text-foreground-800 text-base leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_code]:text-sm [&_code]:bg-background-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                {section.body}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
