"use client";

import { Post } from "@/app/users/columns";
import { useQuery } from "@tanstack/react-query";

interface PaginationOptions {
  pageSize?: number;
  startPage?: number;
}

const fetchPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
};

export const usePostsAPI = ({
  pagination: { pageSize = 10, startPage = 1 } = {},
}: {
  pagination: PaginationOptions;
}) => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({ queryKey: ["posts"], queryFn: fetchPosts });

  // Calculate pagination
  const paginatedPosts = posts
    ? posts.slice(startPage, startPage + pageSize)
    : [];

  return {
    posts: paginatedPosts,
    totalPosts: posts?.length || 0,
    loading: isLoading,
    error: isError,
  };
};
