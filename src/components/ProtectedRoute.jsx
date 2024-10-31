import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (user?.role !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
