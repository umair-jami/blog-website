import { components } from "@/components/CustomeComponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const revalidate = 10; //number of seconds

export async function generateStaticParams() {
  const querry = `*[_type=='post']{
  "slug":slug.current
}`;
const slug=await client.fetch(querry);
const slugRoutes:string[]=slug.map((slug:{slug:string})=>(slug.slug))
return slugRoutes.map((slug:string)=>({slug}))
}
export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const query = `*[_type=='post' && slug.current=='${slug}']{title,summary,image,content,
  author->{bio,image,name}}[0]`;

  const posts = await client.fetch(query);
  console.log(posts);

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {posts.title}
      </h1>

      {/* Featured Image */}
      <Image
        src={urlFor(posts.image).url()}
        width={500}
        height={500}
        alt="AI for everyone"
        className="rounded"
      />

      {/* Blog Summary Section */}
      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {posts.summary}
        </p>
      </section>

      {/* Author Section (Image & Bio) */}
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        <Image
          src={urlFor(posts.author.image).url()}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-dark dark:text-light">
            {posts.author.name}
          </h3>
          <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
            {posts.author.bio}
          </p>
        </div>
      </section>

      {/* Main Body of Blog */}
      <section className="text-lg leading-normal text-dark/80 dark:text-light/80">
        <PortableText value={posts.content} components={components} />
      </section>
    </article>
  );
}
