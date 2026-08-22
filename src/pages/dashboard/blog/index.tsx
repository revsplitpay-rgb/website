import AdminGuard from "@/components/admin/admin-guard";
import BlogLayout from "@/components/admin/blog-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useCategories,
    useDeleteBlogPost,
    usePaginatedBlogPosts,
} from "@/hooks/use-blog";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const BlogDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  const [searchInput, setSearchInput] = useState(search || "");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = usePaginatedBlogPosts(page, 10, category, search);
  const { data: categories } = useCategories();
  const deleteMutation = useDeleteBlogPost();

  const totalPages = Math.ceil((data?.total || 0) / 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Blog post deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete blog post");
    }
  };

  return (
    <AdminGuard>
      <BlogLayout>
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Blog Posts</h1>
              <p className="text-muted-foreground">
                Manage your blog content
              </p>
            </div>
            <Button asChild variant="primary">
              <Link to="/dashboard/blog/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or author..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            <Select
              value={category || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Post
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Author
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-16 h-12 rounded" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <Skeleton className="h-6 w-20" />
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="px-4 py-4">
                        <Skeleton className="h-8 w-16 ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : data?.posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      No blog posts found
                    </td>
                  </tr>
                ) : (
                  data?.posts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/5">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-12 rounded object-cover"
                          />
                          <span className="font-medium truncate max-w-xs">
                            {post.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <Badge variant="secondary">{post.category}</Badge>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell text-muted-foreground">
                        {post.author}
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell text-muted-foreground">
                        {post.date}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                          >
                            <Link to={`/dashboard/blog/edit/${post.id}`} aria-label={`Edit ${post.title}`}>
                              <Edit className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Delete ${post.title}`}
                            onClick={() => setDeleteId(post.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Blog Post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this blog post? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive hover:text-white"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </BlogLayout>
    </AdminGuard>
  );
};

export default BlogDashboard;
