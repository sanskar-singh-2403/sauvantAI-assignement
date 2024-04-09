"use client";

import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

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

import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
const LoanApplicationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fullName: z.string(),
  amount: z.number(),
  tenure: z.string(),
  reason: z.string(),
  empStatus: z.boolean(),
  empAddr: z.string(),
  status: z.string(),
  officer: z.number(),
  createdAt: z.string(),
  paid: z.boolean(),
});

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  role: string;
}

const adminStatuses = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Rejected",
    label: "Reject",
  },
  {
    value: "Approved",
    label: "Approved",
  },
];

const verifierStatuses = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Verified",
    label: "Verify",
  },
  {
    value: "Rejected",
    label: "Reject",
  },
];
export function DataTableRowActions<TData>({
  row,
  role,
}: DataTableRowActionsProps<TData>) {
  const task = LoanApplicationSchema.parse(row.original);

  const [statuses, setStatuses] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  useEffect(() => {
    // console.log(role);

    if (role === "admin") {
      setStatuses(adminStatuses);
    } else {
      setStatuses(verifierStatuses);
    }
  }, [role]);

  const handleAdmin = async (label: string, id: number) => {
    console.log(label, id);
    let paramRole = "";
    if (label === "Verified") {
      paramRole = "Verifier";
      await axios.get(`api/approval/verification?role=${paramRole}&id=${id}`);
    } else if (label === "Approved") {
      paramRole = "Admin";
      await axios.get(`api/approval/verification?role=${paramRole}&id=${id}`);
    } else if( label === 'Rejected'){
      paramRole = "Verifier";
      await axios.get(`api/approval/rejection?role=${paramRole}&id=${id}`);
    }

    toast.success("status updated successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {statuses
          .filter((status) => status.value !== task.status)
          .map((status) => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => handleAdmin(status.value, task.id)}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
