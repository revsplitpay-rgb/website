import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";

// Temporary local-development authentication bypass.
const DEV_AUTH_BYPASS = import.meta.env.DEV;

export const useIsAdmin = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      if (DEV_AUTH_BYPASS) return true;
      if (!user?.id) return false;
      
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin'
      });
      
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      
      return data === true;
    },
    enabled: !!user?.id,
  });
};
