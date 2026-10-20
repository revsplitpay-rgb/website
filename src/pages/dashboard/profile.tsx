import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, profile, loading: authLoading, updateProfile, uploadAvatar } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Temporary local bypass; production still requires a real user.
    if (import.meta.env.PROD && !authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    const { error } = await updateProfile({ full_name: fullName });
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated!");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    const { url, error: uploadError } = await uploadAvatar(file);

    if (uploadError) {
      toast.error(uploadError.message);
      setUploading(false);
      return;
    }

    if (url) {
      const { error: updateError } = await updateProfile({ avatar_url: url });
      if (updateError) {
        toast.error(updateError.message);
      } else {
        toast.success("Avatar updated!");
      }
    }
    setUploading(false);
  };

  const handleRemoveAvatar = async () => {
    setSaving(true);
    const { error } = await updateProfile({ avatar_url: null as unknown as string });
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Avatar removed!");
      // Reset file input so user can upload a new image
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen brand-ambient-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen brand-site-shell flex flex-col">
      <Helmet>
        <title>Profile Settings | RevSplitPay</title>
      </Helmet>

      <main className="flex-1 relative pt-12 md:pt-20 pb-20 brand-ambient-bg">
        <Container className="max-w-[800px] relative z-10">
          <StaggerContainer className="space-y-8">
            <AnimateOnView blur>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-left text-foreground">
                  <h1 className="h1 mb-3">My Profile</h1>
                  <p className="text-muted-foreground text-lg font-normal">Manage your profile settings and information</p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/" className="flex items-center gap-2 px-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </AnimateOnView>

            <AnimateOnView y={20} blur delay={0.1}>
              <div className="bg-card rounded-[34px] border border-white/10 p-8 md:p-12 overflow-hidden relative">
                <div className="space-y-10 relative z-10">
                  {/* Profile Photo Section */}
                  <div className="space-y-6">
                    <h2 className="h3">Profile Photo</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative group">
                        <Avatar className="w-32 h-32 border-4 border-white/5 shadow-glow">
                          <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
                          <AvatarFallback className="bg-primary/20 text-primary text-4xl font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <button
                          onClick={handleAvatarClick}
                          disabled={uploading}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          {uploading ? (
                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                          ) : (
                            <Camera className="w-8 h-8 text-white" />
                          )}
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Button variant="primary" onClick={handleAvatarClick} disabled={uploading}>
                          {uploading ? "Uploading..." : "Change Photo"}
                        </Button>
                        {profile?.avatar_url && (
                          <Button
                            variant="outline"
                            onClick={handleRemoveAvatar}
                            disabled={saving}
                            className="border-white/10 text-white px-4"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Information Form */}
                  <form className="space-y-8" onSubmit={handleSave}>
                    <div className="space-y-3">
                      <label className="text-white font-medium ml-1">Full Name</label>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-black/40 border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                        disabled={saving}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-white font-medium ml-1">Email</label>
                      <Input
                        readOnly
                        value={user?.email || ""}
                        className="bg-black/20 border-none text-muted-foreground rounded-2xl h-14 px-6 cursor-not-allowed w-full focus-visible:ring-1 focus-visible:ring-white/10 focus-visible:ring-offset-0"
                      />
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="px-12 rounded-2xl shadow-glow"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </AnimateOnView>
          </StaggerContainer>
        </Container>
      </main>
    </div>
  );
};

export default ProfilePage;
