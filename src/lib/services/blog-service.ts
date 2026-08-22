import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  content: string | null;
}

/**
 * Generate a URL-friendly slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Calculate read time from content (HTML string)
 */
export const calculateReadTime = (content: string | null): string => {
  if (!content) return "1 min read";
  
  // Strip HTML tags and count words
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  
  return `${minutes} min read`;
};

/**
 * Get all blog posts with optional category filtering
 */
export const getBlogPosts = async (category?: string): Promise<BlogPost[]> => {
  let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  
  if (category) {
    query = query.eq("category", category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  
  return data || [];
};

/**
 * Get a single blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
  
  return data;
};

/**
 * Get a single blog post by ID
 */
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
  
  return data;
};

/**
 * Get all unique categories
 */
export const getCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .order("category");
  
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  
  const categories = data?.map((post) => post.category) || [];
  return Array.from(new Set(categories)).sort();
};

/**
 * Get featured blog posts (first 2)
 */
export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2);
  
  if (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
  
  return data || [];
};

/**
 * Get related blog posts (excluding current post)
 */
export const getRelatedPosts = async (currentSlug: string, limit: number = 3): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
  
  return data || [];
};

/**
 * Create a new blog post
 */
export const createBlogPost = async (post: BlogPostInput): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
  
  return data;
};

/**
 * Update an existing blog post
 */
export const updateBlogPost = async (id: string, post: Partial<BlogPostInput>): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
  
  return data;
};

/**
 * Delete a blog post
 */
export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

/**
 * Upload image to blog-images bucket
 */
export const uploadBlogImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `posts/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

/**
 * Get paginated blog posts
 */
export const getPaginatedBlogPosts = async (
  page: number = 1,
  pageSize: number = 10,
  category?: string,
  search?: string
): Promise<{ posts: BlogPost[]; total: number }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching paginated posts:", error);
    return { posts: [], total: 0 };
  }

  return { posts: data || [], total: count || 0 };
};
