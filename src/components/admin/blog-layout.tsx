import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
    ArrowLeft,
    FileText,
    LayoutDashboard,
    PenSquare,
    User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import revSplitPayLogo from "../../../LOGO BLUE.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "All Posts", href: "/dashboard/blog" },
  { icon: PenSquare, label: "Create Post", href: "/dashboard/blog/new" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const location = useLocation();
  const { profile, user } = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen brand-site-shell flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <img src={revSplitPayLogo} alt="RevSplitPay" className="h-8 w-8 rounded-lg object-cover" />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Site
          </Link>

          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {profile?.full_name || user?.email}
              </p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default BlogLayout;
