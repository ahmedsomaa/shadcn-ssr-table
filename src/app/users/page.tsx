"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTablePagination } from "./pagination";
import { DataTable } from "./table";
import { columns } from "./columns";
import { usePagination } from "@/hooks/use-pagination";
import { usePostsAPI } from "@/hooks/use-posts";

export default function UsersPage() {
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const { posts, totalPosts, loading } = usePostsAPI({
    pagination: { pageSize: limit, startPage: skip },
  });

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
