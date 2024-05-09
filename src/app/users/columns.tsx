import { ColumnDef } from "@tanstack/react-table";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "Id",
    // cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "title",
    header: "Name",
    // cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "body",
    header: "Body",
  },
];
