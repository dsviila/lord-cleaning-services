import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { serviceDetails } from "@/mocks/serviceDetails";
import ServiceHero from "./components/ServiceHero";
import ServiceFacts from "./components/ServiceFacts";
import ServiceIncludes from "./components/ServiceIncludes";
import ServiceProcess from "./components/ServiceProcess";
import ServiceGallery from "./components/ServiceGallery";
import ServiceFaq from "./components/ServiceFaq";
import RelatedServices from "./components/RelatedServices";
import ServiceCta from "./components/ServiceCta";

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const detail = serviceDetails.find((d) => d.id === serviceId);

  if (!detail) {
    return (
      <main className="min-h-screen bg-background-50 text-foreground-900 flex flex-col">
        <Navbar />
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-40">
          <span className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary-100 text-foreground-800 mb-6">
            <i className="ri-search-line text-2xl"></i>
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950 mb-4">
            We couldn&rsquo;t find that service.
          </h1>
          <p className="text-foreground-700 text-base max-w-md mb-8 leading-relaxed">
            The service you&rsquo;re looking for isn&rsquo;t available. Browse everything we clean
            and pick the one that fits your space.
          </p>
          <Link
            to="/#services"
            className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
          >
            View all services
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50">
              <i className="ri-arrow-right-line text-primary-600"></i>
            </span>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-50 text-foreground-900">
      <Navbar />
      <ServiceHero detail={detail} />
      <ServiceFacts detail={detail} />
      <ServiceIncludes detail={detail} />
      <ServiceProcess detail={detail} />
      <ServiceGallery detail={detail} />
      <ServiceFaq detail={detail} />
      <RelatedServices currentId={detail.id} />
      <ServiceCta detail={detail} />
      <Footer />
    </main>
  );
}