import { Navigate  } from "react-router-dom"

export const ProtectedRouteAdmin = ({ userRole, children }) => {
  if (userRole != "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const ProtectedRouteRegister = ({ isAuth, userRole, children }) => {
  if (isAuth) {
    if (userRole == "admin"){
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export const ProtectedRouteHomepage = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};