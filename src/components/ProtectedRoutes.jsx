import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("tokenClient")) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoutes;
