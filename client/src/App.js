import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RequireAuth, useAuthUser, useIsAuthenticated } from "react-auth-kit"

import Login from "./register/Login"
import Homepage from "./home/Homepage"
import Register from "./register/Register"
import NotFoundPage from "./home/NotFound"
import HomePageAdmin from "./home/HomepageAdmin"
import { ProtectedRouteAdmin, ProtectedRouteHomepage, ProtectedRouteRegister } from "./services/ProtectedRoutes"

import './App.css'

function App() {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRouteHomepage isAuth={isAuthenticated()}>
            <Homepage />
          </ProtectedRouteHomepage>
        } />

        <Route path="/admin" element={
          <ProtectedRouteAdmin userRole={auth()?.role}>
            <RequireAuth loginPath="/login"><HomePageAdmin /></RequireAuth>
          </ProtectedRouteAdmin>
        } />

        <Route path="/login" element={
          <ProtectedRouteRegister isAuth={isAuthenticated()} userRole={auth()?.role}>
            <Login />
          </ProtectedRouteRegister>
        } />

        <Route path="/register" element={
          <ProtectedRouteRegister isAuth={isAuthenticated()} userRole={auth()?.role}>
            <Register />
          </ProtectedRouteRegister>
        } />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
