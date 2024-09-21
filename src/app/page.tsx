import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils"
import { onDeletePost } from "./_actions/actions";

export default async function Home() {
  const {errors, data: posts} = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    //authMode: "apiKey"
    authMode: await isAuthenticated() ? "userPool" : "identityPool"
  })
  console.log('posts', posts)
  console.log('errors', errors)

  return (
    <div className="flex min-h-screen flex-col items-center p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10">List of All Titles</h1>
      {/*posts?.map(async (post, idx) => (
        <div key={idx}>
          <div>{post.title}</div>
        </div>
      ))*/}
      {posts?.map(async (post, idx) => (
        <Post key={idx} onDelete={onDeletePost} post={post} isSignedIn={await isAuthenticated()}/>
      ))}
    </div>
  );
}