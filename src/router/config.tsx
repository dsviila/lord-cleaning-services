import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/page";

const NotFound = lazy(() => import("../pages/NotFound"));
const ServiceDetailPage = lazy(() => import("../pages/services/page"));
const CleanersPage = lazy(() => import("../pages/cleaners/page"));
const GalleryPage = lazy(() => import("../pages/gallery/page"));
const BookingPage = lazy(() => import("../pages/booking/page"));
const PrivacyPage = lazy(() => import("../pages/privacy/page"));
// Private pages: not linked anywhere, not in the sitemap, served with noindex.
const AgreementPage = lazy(() => import("../pages/agreement/page"));
const AgreementBuilderPage = lazy(() => import("../pages/agreement/new/page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services/:serviceId",
    element: <ServiceDetailPage />,
  },
  {
    path: "/cleaners",
    element: <CleanersPage />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/booking",
    element: <BookingPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/service-agreement",
    element: <AgreementPage />,
  },
  {
    path: "/service-agreement/new",
    element: <AgreementBuilderPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
