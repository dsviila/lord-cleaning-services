import { Link } from "react-router-dom";
import { business } from "@/mocks/landing";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-background-100">
      <div className="px-4 md:px-10 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <img loading="lazy" decoding="async"
                src="/images/brand/Lord-Logo.webp"
                alt="Lord Cleaning logo"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <span className="font-heading text-3xl font-semibold text-background-50">
                Lord Cleaning Services
              </span>
            </div>
            <p className="text-background-200/80 text-sm leading-relaxed max-w-md mb-8">
              Reliable, detailed cleaning for homes and businesses across Northern Virginia.
              We exist so your space always feels fresh, clean, organized and comfortable.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: "instagram-line", href: "https://www.instagram.com/lordcleaningservices" },
                { icon: "facebook-circle-line", href: "https://www.facebook.com/lordcleaningservice" },
                { icon: "tiktok-line", href: "#" },
                { icon: "linkedin-line", href: "#" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.icon}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-background-50/30 text-background-50 hover:bg-background-50 hover:text-primary-700 transition-colors"
                >
                  <i className={`ri-${social.icon} text-base`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-background-50 mb-4">
                Service area
              </h4>
              <p className="text-background-200/80 text-sm leading-relaxed">
                {business.cities.slice(0, 6).join(", ")}
                <br />
                {business.cities.slice(6).join(", ")}
                <br />&amp; nearby areas
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-background-50 mb-4">Contact</h4>
              <p className="text-background-200/80 text-sm leading-relaxed">
                <a href={business.phoneHref} className="hover:text-background-50">
                  {business.phoneDisplay}
                </a>
                <br />
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background-50"
                >
                  WhatsApp {business.whatsappDisplay}
                </a>
                <br />
                <a href={business.emailHref} className="hover:text-background-50 break-all">
                  {business.email}
                </a>
                <br />
                <span className="text-background-200/70">{business.hoursWeek}</span>
                <br />
                <span className="text-background-200/70">{business.hoursSunday}</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden h-64 lg:h-full">
              <img loading="lazy" decoding="async"
                src="/images/footer/Footer-Interior.webp"
                alt="Sunlit cozy living room"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-background-50/15 mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-background-200/70">
            © 2026 Lord Cleaning Services. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-6 text-xs text-background-200/70">
            <li><Link to="/gallery" className="hover:text-background-50">Gallery</Link></li>
            <li><a href="#" className="hover:text-background-50">Privacy</a></li>
            <li><a href="#" className="hover:text-background-50">Terms</a></li>
            <li><a href="#contact" className="hover:text-background-50">Get Free Estimate</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}