"use client";

import { DataTable } from "./table";
import { columns } from "./columns";
import { usePagination } from "@/hooks/use-pagination";
import { usePostsAPI } from "@/hooks/use-posts";

export default function UsersPage() {
  const { limit, onPaginationChange, skip, pagination } = usePagination();

  const { posts, totalPosts, loading, error } = usePostsAPI({
    pagination: { pageSize: limit, startPage: skip },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        loading....
      </div>
    );
  }

  if (error || !posts) {
    return <div>error getting posts...</div>;
  }

  const totalCount = Math.ceil(totalPosts / limit);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable
        data={posts}
        loading={loading}
        columns={columns}
        pageCount={totalCount}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </main>
  );
}
