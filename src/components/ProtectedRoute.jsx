import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  // Check if the user is an admin
  if (user !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
