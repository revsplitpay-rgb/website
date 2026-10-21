import { Route, Routes } from "react-router-dom";
import AppShell from "./app-shell";
import BlogDashboard from "./pages/dashboard/blog";
import BlogEditor from "./pages/dashboard/blog/editor";
import ProfilePage from "./pages/dashboard/profile";
import LoginPage from "./pages/login";
import V2Boundary from "./v2/boundary";

/**
 * Every route, inside the shared shell. The marketing site (src/v2) owns
 * everything except the blog admin tools, which keep their own pages.
 */
const AppTree = () => (
  <AppShell>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      <Route path="/dashboard/blog" element={<BlogDashboard />} />
      <Route path="/dashboard/blog/new" element={<BlogEditor />} />
      <Route path="/dashboard/blog/edit/:id" element={<BlogEditor />} />
      <Route path="/*" element={<V2Boundary />} />
    </Routes>
  </AppShell>
);

export default AppTree;
