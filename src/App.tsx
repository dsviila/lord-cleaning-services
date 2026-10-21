import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ScrollToTop from "./components/feature/ScrollToTop";
import WhatsAppFloat from "./components/feature/WhatsAppFloat";

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <AppRoutes />
      </Suspense>
      <WhatsAppFloat />
    </BrowserRouter>
  );
}

export default App;
