import { getBlogPosts } from "@/actions/data";
import BlogPost from "@/components/BlogPost";

export default async function Home() {
    const posts = await getBlogPosts();
    return (
        <main className="px-4 py-4 md:px-40">
            <div className="max-w-7xl">
                <div className="text-dark dark:text-white text-2xl sm:text-3xl font-semibold">
                    Blogs
                </div>
                <div className="mt-4">
                    <BlogPost posts={posts} />
                </div>
            </div>
        </main>
    );
}