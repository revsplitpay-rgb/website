import Container from "@/components/container";
import AuthNavbar from "@/components/sections/auth/auth-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen brand-ambient-bg flex flex-col">
      <Helmet>
        <title>Login | Paymark</title>
      </Helmet>
      <AuthNavbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-20">
        <Container className="max-w-[480px]">
          <div className="text-center mb-10">
            <h1 className="h2 mb-4">Welcome Back!</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 text-left">
              <label className="text-white text-sm font-medium ml-1">Enter your Email</label>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#121212] border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-white text-sm font-medium ml-1">Enter your Password</label>
              <Input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#121212] border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>

            <div className="flex justify-start">
              <span className="text-muted-foreground text-sm">
                Trouble signing in? Contact <a href="mailto:support@paymark.dev" className="text-white hover:text-primary transition-colors">support@paymark.dev</a>
              </span>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Log in"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-white font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
};

export default LoginPage;
