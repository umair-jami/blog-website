import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

export const revalidate=10
export default async function Home() {
  const query = `*[_type=='post'] | order(_createdAt desc) {
  summary,title,image,
    "slug":slug.current
}`;

  const posts: Post[] = await client.fetch(query);
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col ">
      <h1 className="text-2xl font-bold uppercase my-12 text-center text-dark dark:text-light sm:text-3xl lg:text-5xl ">
        Most Recent blogs
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post: Post) => {
          return <BlogCard key={post.slug} post={post} />;
        })}
      </section>
    </main>
  );
}
