import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center relative brand-ambient-bg">
      <Container>
        <div className="text-center max-w-[260px] relative z-10">
          <h1 className="mb-2 h3">
            Page error!
          </h1>
          <p className="mb-4">
            The page you are looking for could not be found
          </p>
          <Button asChild>
            <Link to="/">
              Back to Homepage
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-center pointer-events-none">
          <img src="/images/common/404.svg" alt="404" />
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
