import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navar";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import Loader from "./components/Loader";
// import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorized from "./pages/NotAuthorized";
import { useAuth } from "./context/AuthContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const NaturalPage = lazy(() => import("./pages/NaturalPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const OrchidTable = lazy(() => import("./pages/OrchidManagement"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

function App() {
  const queryClient = new QueryClient();
  const { user } = useAuth();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/natural" element={<NaturalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <QueryClientProvider client={queryClient}>
                  <OrchidTable />
                </QueryClientProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
