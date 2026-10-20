import { useEffect } from "react";

// Client-side mirror of the vercel.json redirects for URLs outside this site.
const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
};

export default ExternalRedirect;
