"use client"
import { Schema } from "@/../amplify/data/resource";
import React, { useState } from 'react';

const AddComment = ({
  addComment,
  post,
  paramsId
}: {
  addComment: (content: string, post: Pick<Schema["Post"]["type"], 'title' | 'id'>, paramsId: string) => void;
  post: Pick<Schema["Post"]["type"], 'title' | 'id'>;
  paramsId: string;
}) => {
  const [comment, setComment] = useState("");

  const add = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComment("");
    addComment(comment, post, paramsId);
  };

  return (
    <form onSubmit={add} className="p-4 flex flex-col items-center gap-4">
      <input
        type="text"
        name="comment"
        id="comment"
        placeholder="add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="text-white bg-teal-600 rounded p-4">
        Submit
      </button>
    </form>
  );
};

export default AddComment;