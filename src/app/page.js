import { getPosts } from "@/actions/actions";

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Feed</h1>
    </main>
  );
}
