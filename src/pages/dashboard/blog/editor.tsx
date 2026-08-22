import AdminGuard from "@/components/admin/admin-guard";
import BlogLayout from "@/components/admin/blog-layout";
import RichTextEditor from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import {
    useBlogPostById,
    useCategories,
    useCreateBlogPost,
    useUpdateBlogPost,
    useUploadBlogImage,
} from "@/hooks/use-blog";
import {
    calculateReadTime,
    generateSlug,
} from "@/lib/services/blog-service";
import { format } from "date-fns";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  date: z.string().min(1, "Date is required"),
  read_time: z.string().min(1, "Read time is required"),
  image: z.string().url("Valid image URL is required"),
  content: z.string().nullable(),
});

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isEditMode = !!id;

  const { data: existingPost, isLoading: loadingPost } = useBlogPostById(id || "");
  const { data: existingCategories } = useCategories();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const uploadMutation = useUploadBlogImage();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [author, setAuthor] = useState(profile?.full_name || "Admin");
  const [date, setDate] = useState(format(new Date(), "MMM dd, yyyy"));
  const [readTime, setReadTime] = useState("5 min read");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load existing post data in edit mode
  useEffect(() => {
    if (existingPost && isEditMode) {
      setTitle(existingPost.title);
      setSlug(existingPost.slug);
      setCategory(existingPost.category);
      setAuthor(existingPost.author);
      setDate(existingPost.date);
      setReadTime(existingPost.read_time);
      setImage(existingPost.image);
      setContent(existingPost.content || "");
    }
  }, [existingPost, isEditMode]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditMode]);

  // Auto-calculate read time from content
  useEffect(() => {
    if (content) {
      setReadTime(calculateReadTime(content));
    }
  }, [content]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      const url = await uploadMutation.mutateAsync(file);
      setImage(url);
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to upload image");
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl) {
      setImage(imageUrl);
      setImageUrl("");
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === "add-new") {
      setCategory("");
    } else {
      setCategory(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = category || newCategory;

    const formData = {
      title,
      slug,
      category: finalCategory,
      author,
      date,
      read_time: readTime,
      image,
      content: content || null,
    };

    const result = blogPostSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      if (isEditMode && id) {
        await updateMutation.mutateAsync({ id, post: formData });
        toast.success("Blog post updated successfully");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Blog post created successfully");
      }
      navigate("/dashboard/blog");
    } catch (err: any) {
      toast.error(err.message || "Failed to save blog post");
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isEditMode && loadingPost) {
    return (
      <AdminGuard>
        <BlogLayout>
          <div className="p-8 space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </BlogLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <BlogLayout>
        <div className="p-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard/blog">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {isEditMode ? "Edit Post" : "Create New Post"}
              </h1>
              <p className="text-muted-foreground">
                {isEditMode
                  ? "Update your blog post"
                  : "Write and publish a new blog post"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
                className={errors.slug ? "border-destructive" : ""}
              />
              {errors.slug && (
                <p className="text-sm text-destructive mt-1">{errors.slug}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <div className="flex gap-2">
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingCategories?.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="add-new">+ Add New Category</SelectItem>
                  </SelectContent>
                </Select>
                {!category && (
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1"
                  />
                )}
              </div>
              {errors.category && (
                <p className="text-sm text-destructive mt-1">{errors.category}</p>
              )}
            </div>

            {/* Author and Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  className={errors.author ? "border-destructive" : ""}
                />
                {errors.author && (
                  <p className="text-sm text-destructive mt-1">{errors.author}</p>
                )}
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Jan 28, 2026"
                  className={errors.date ? "border-destructive" : ""}
                />
                {errors.date && (
                  <p className="text-sm text-destructive mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            {/* Read Time */}
            <div>
              <Label htmlFor="readTime">Read Time (auto-calculated)</Label>
              <Input
                id="readTime"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
              />
            </div>

            {/* Featured Image */}
            <div>
              <Label>Featured Image</Label>
              <div className="space-y-4">
                {image ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt="Featured"
                      className="w-full h-64 object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-destructive/80 border-destructive text-white hover:bg-destructive"
                      onClick={() => setImage("")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <ImagePlus className="w-10 h-10 text-muted-foreground" />
                      <div className="space-y-2">
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer text-primary hover:underline"
                        >
                          Upload an image
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <p className="text-sm text-muted-foreground">
                          or paste a URL below
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!image && (
                  <div className="flex gap-2">
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button type="button" onClick={handleAddImageUrl}>
                      Add
                    </Button>
                  </div>
                )}

                {errors.image && (
                  <p className="text-sm text-destructive">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <Label>Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/blog">Cancel</Link>
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEditMode
                  ? "Update Post"
                  : "Publish Post"}
              </Button>
            </div>
          </form>
        </div>
      </BlogLayout>
    </AdminGuard>
  );
};

export default BlogEditor;
