import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import DetailPage from "./pages/DetailPage";
// import NaturalPage from "./pages/NaturalPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navar";
import Footer from "./components/Footer";
// import OrchidTable from "./pages/OrchidManagement";
import NotFoundPage from "./pages/NotFoundPage";

import Loader from "./components/Loader";
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const NaturalPage = lazy(() => import("./pages/NaturalPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const OrchidTable = lazy(() => import("./pages/OrchidManagement"));

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/natural" element={<NaturalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/add"
            element={
              <QueryClientProvider client={queryClient}>
                <OrchidTable />
              </QueryClientProvider>
            }
          />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
