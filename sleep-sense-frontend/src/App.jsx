import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Welcome from "./pages/Welcome";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";

import AuthRedirect from "./components/AuthRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";

function App({ toggleTheme, mode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 🌟 Public */}
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Protected */}
          {[
            { path: "/home", element: <Home /> },
            { path: "/analyze", element: <Analyze /> },
            { path: "/result", element: <Result /> },
            { path: "/dashboard", element: <Dashboard /> },
          ].map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <ProtectedLayout
                    toggleTheme={toggleTheme}
                    mode={mode}
                  >
                    {element}
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
