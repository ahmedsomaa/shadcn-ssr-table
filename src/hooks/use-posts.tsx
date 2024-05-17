"use client";

import { Post } from "@/app/users/columns";
import { useQuery } from "@tanstack/react-query";

interface PaginationOptions {
  pageSize?: number;
  startPage?: number;
}

const fetchPosts = async ({ pageSize, startPage }: PaginationOptions) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${startPage}&_limit=${pageSize}`
  );
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
  } = useQuery<Post[]>({
    queryKey: ["posts", { startPage }],
    queryFn: () => fetchPosts({ pageSize, startPage }),
  });

  return {
    posts: posts,
    loading: isLoading,
    totalPosts: 100,
    error: isError,
  };
};
