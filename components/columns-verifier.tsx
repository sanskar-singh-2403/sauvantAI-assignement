"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Verified",
    label: "Verified",
  },
  {
    value: "Rejected",
    label: "Rejected",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

export type LoanApplication = {
  id: number;
  userId: number;
  fullName: string;
  amount: number;
  tenure: string;
  reason: string;
  empStatus: boolean;
  empAddr: string;
  status: string;
  officer: number;
  createdAt: string;
  paid: boolean;
};

export const columnsVerifier: ColumnDef<LoanApplication>[] = [

  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fullName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("userId")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("createdAt")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div
          className={`flex w-[100px] items-center px-2 py-1 rounded ${
            status.value === "Pending"
              ? "bg-yellow-400"
              : status.value === "Verified"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          <span>{status.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions role="verify" row={row} />,
  },
];
