"use server"

import { cookieBasedClient } from "@/utils/amplify-utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Schema } from "@/../amplify/data/resource"

export async function deleteComment(formData: FormData) {
  const id = formData.get("id")?.toString()
  if(!id) return;
  const {data: deletedComment, errors} = await cookieBasedClient.models.Comment.delete({
    id
  })
  console.log("deleted comment: ", deletedComment);
  console.log("errors deleting comment: ", errors);
}

export async function addComment(content: string, post: Pick<Schema["Post"]["type"], 'title' | 'id'>, paramsId: string) {
  if(content.trim().length == 0) return;
  const {data: comment, errors} = await cookieBasedClient.models.Comment.create({
    postId: post.id,
    content
  })
  console.log("got comment: ", comment)
  console.log("errors getting comment: ", errors)
  revalidatePath(`/post/${paramsId}`)
}

export async function onDeletePost(id: string) {
  const {data, errors} = await cookieBasedClient.models.Post.delete({id})
  console.log("data deleted", data, errors)
  revalidatePath("/")
}

export async function createPost(formData: FormData) {
  const {errors, data} = await cookieBasedClient.models.Post.create({
    title: formData.get("title")?.toString() || ""
  })
  console.log("create post data", data);
  console.log("create post errors", errors);
  redirect("/")
}