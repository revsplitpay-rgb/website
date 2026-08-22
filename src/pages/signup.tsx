import Container from "@/components/container";
import AuthNavbar from "@/components/sections/auth/auth-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen brand-ambient-bg flex flex-col">
      <Helmet>
        <title>Sign Up | Paymark</title>
      </Helmet>
      <AuthNavbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-20">
        <Container className="max-w-[480px]">
          <div className="text-center mb-10">
            <h1 className="h2 mb-4">Create Account</h1>
            <p className="text-muted-foreground">Join Paymark and start managing your payments today.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 text-left">
              <label className="text-white text-sm font-medium ml-1">Full Name</label>
              <Input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#121212] border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-white text-sm font-medium ml-1">Work Email</label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#121212] border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-white text-sm font-medium ml-1">Password</label>
              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#121212] border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-white font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
};

export default SignupPage;
