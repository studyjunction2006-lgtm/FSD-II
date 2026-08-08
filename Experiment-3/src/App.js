import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import EditorPage from "./pages/EditorPage";
import ViewerPage from "./pages/ViewerPage";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminPage />
            </RoleRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <RoleRoute allowedRoles={["Admin", "Editor"]}>
              <EditorPage />
            </RoleRoute>
          }
        />

        <Route
          path="/viewer"
          element={
            <RoleRoute allowedRoles={["Admin", "Editor", "Viewer"]}>
              <ViewerPage />
            </RoleRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;