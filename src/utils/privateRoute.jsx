import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }
  return children;
};
