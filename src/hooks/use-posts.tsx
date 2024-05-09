"use client";

import { Post } from "@/app/users/columns";
import { useEffect, useState } from "react";

export const usePostsAPI = ({
  pagination: { limit = 10, skip = 0 } = {},
} = {}) => {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        setData(posts.slice(skip, skip + limit));
        setCount(posts.length);
      })
      .finally(() => setLoading(false));
  }, [limit, skip, setData, setLoading]);

  return { posts: data, count, loading };
};
