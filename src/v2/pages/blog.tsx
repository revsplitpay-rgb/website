import { getBlogPostBySlug, getBlogPosts, type BlogPost } from "@/lib/services/blog-service";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CtaBand from "../components/cta-band";
import PageMeta from "../components/page-meta";
import PageHero from "../components/page-hero";
import { ButtonLink, Container, Grad, Section } from "../components/ui";
import { v2Path } from "../lib/paths";

const SANITIZE = {
  ALLOWED_TAGS: [
    "h2", "h3", "h4", "p", "br", "strong", "em", "u", "s", "b", "i", "ul", "ol", "li", "blockquote",
    "a", "img", "code", "pre", "hr", "table", "thead", "tbody", "tr", "td", "th",
  ],
  ALLOWED_ATTR: ["href", "src", "alt", "title"],
  ALLOW_DATA_ATTR: false,
};

const Meta = ({ post }: { post: BlogPost }) => (
  <p className="text-sm text-muted-foreground">
    {post.category}
    <span className="mx-2" aria-hidden="true">
      ·
    </span>
    {post.date}
    <span className="mx-2" aria-hidden="true">
      ·
    </span>
    {post.read_time}
  </p>
);

const Skeleton = () => (
  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
    {[0, 1, 2].map((n) => (
      <li key={n} className="v2-card overflow-hidden">
        <div className="v2-shimmer aspect-[16/9] bg-[linear-gradient(90deg,rgb(var(--muted)),rgb(232_240_252),rgb(var(--muted)))]" />
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/3 rounded-sm bg-muted" />
          <div className="h-5 w-4/5 rounded-sm bg-muted" />
        </div>
      </li>
    ))}
  </ul>
);

export const BlogIndex = () => {
  const { data: posts = [], isLoading } = useQuery({ queryKey: ["v2-blog-posts"], queryFn: () => getBlogPosts() });

  return (
    <>
      <PageMeta
        title="Blog | RevSplitPay"
        description="Notes on paying sales teams, commissions and payouts."
        path="/blog"
      />
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes on <Grad>getting teams paid</Grad>.
          </>
        }
        support="Commissions, payouts and running a sales team, from the RevSplitPay team."
      />
      <Section>
        <Container>
          {isLoading ? (
            <Skeleton />
          ) : posts.length === 0 ? (
            <div className="v2-card mx-auto max-w-[520px] p-10 text-center"><p className="text-lg font-semibold text-foreground">First posts are on the way.</p><p className="mt-2 text-muted-foreground">Check back soon.</p></div>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={v2Path(`/blog/${post.slug}`)}
                    className="v2-card v2-card-hover group block h-full overflow-hidden"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/9] w-full border-b border-border object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="p-6">
                      <Meta post={post} />
                      <h2 className="v2-h3 mt-2 text-foreground group-hover:underline group-hover:underline-offset-4">
                        {post.title}
                      </h2>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
};

export const BlogArticle = () => {
  const { slug = "" } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["v2-blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug),
  });
  const html = useMemo(() => DOMPurify.sanitize(post?.content ?? "", SANITIZE), [post?.content]);

  const back = (
    <Link
      to={v2Path("/blog")}
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
    </Link>
  );

  if (isLoading) {
    return (
      <Section>
        <Container className="max-w-[720px]" >
          {back}
          <div className="mt-8 space-y-4" aria-hidden="true">
            <div className="h-10 w-4/5 rounded-sm bg-muted" />
            <div className="h-4 w-1/3 rounded-sm bg-muted" />
          </div>
        </Container>
      </Section>
    );
  }

  if (!post) {
    return (
      <Section>
        <PageMeta title="Post not found | RevSplitPay" description="This post moved or never existed." path={`/blog/${slug}`} />
        <Container className="max-w-[720px]">
          {back}
          <h1 className="v2-h2 mt-8 text-foreground">This post moved or never existed.</h1>
          <ButtonLink href={v2Path("/blog")} variant="secondary" className="mt-8">
            See all posts
          </ButtonLink>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <PageMeta title={`${post.title} | RevSplitPay`} description={post.title} path={`/blog/${post.slug}`} />
      <article>
        <Section>
          <Container className="max-w-[720px]">
            {back}
            <h1 className="v2-display mt-8 text-foreground">{post.title}</h1>
            <div className="mt-5">
              <Meta post={post} />
            </div>
            {post.image && (
              <img src={post.image} alt="" className="mt-10 aspect-[16/9] w-full rounded-[20px] border border-border object-cover shadow-[0_30px_60px_-30px_rgb(0_58_130/0.35)]" />
            )}
            <div className="v2-prose mt-10" dangerouslySetInnerHTML={{ __html: html }} />
          </Container>
        </Section>
      </article>
      <CtaBand />
    </>
  );
};
