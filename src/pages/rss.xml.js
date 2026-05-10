import rss from "@astrojs/rss";
import { getSortedPosts } from "../lib/posts";

export async function GET(context) {
  const posts = await getSortedPosts();

  return rss({
    title: "Shad Khan",
    description: "AI, programming, and practical field notes from Shad Khan.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
    })),
  });
}
