import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/page";

const NotFound = lazy(() => import("../pages/NotFound"));
const ServiceDetailPage = lazy(() => import("../pages/services/page"));
const CleanersPage = lazy(() => import("../pages/cleaners/page"));
const GalleryPage = lazy(() => import("../pages/gallery/page"));
const BookingPage = lazy(() => import("../pages/booking/page"));

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
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
