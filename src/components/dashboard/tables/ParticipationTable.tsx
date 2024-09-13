"use client";
import React, { useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Participant } from '@/utils/constants/admin-dashboard';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


export const columns: ColumnDef<Participant>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "team_lead_name",
        header: ({ table }) => {
            const allRows = table.getRowModel().rows;
            let isSolo = true;

            allRows.forEach(row => {
                if (row.original.team_type !== "Solo") {
                    isSolo = false;
                }
            });

            return isSolo ? "Name" : "Team Name";
        },
        cell: ({ row }) => {
            const {
                team_type,
                team_lead_name,
                team_name
            } = row.original
            return (
                team_type === "Solo" ? (
                    <div className="capitalize">{team_lead_name}</div>
                ) : (
                    <div className="capitalize">{team_name}</div>
                )
            );
        },
    },
    {
        accessorKey: "team_lead_email",
        header: ({ table, column }) => {
            const allRows = table.getRowModel().rows;
            let isSolo = true;

            allRows.forEach(row => {
                if (row.original.team_type !== "Solo") {
                    isSolo = false;
                }
            });

            return isSolo ? (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Team Lead Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

        cell: ({ row }) => <div className="lowercase">{row.getValue("team_lead_email")}</div>,
    },
    {
        accessorKey: "event_name",
        header: "Event",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("event_name")}</div>
        ),
    },
    {
        accessorKey: "team_lead_roll",
        header: ({ table }) => {
            const allRows = table.getRowModel().rows;
            let isSolo = true;

            allRows.forEach(row => {
                if (row.original.team_type !== "Solo") {
                    isSolo = false;
                }
            });

            return isSolo ? "College Roll" : "Team Lead Roll";
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("team_lead_roll")}</div>
        ),
    },
    {
        accessorKey: "team_lead_phone",
        header: ({ table }) => {
            const allRows = table.getRowModel().rows;
            let isSolo = true;

            allRows.forEach(row => {
                if (row.original.team_type !== "Solo") {
                    isSolo = false;
                }
            });

            return isSolo ? "Phone Number" : "Team Lead Phone Number";
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("team_lead_phone")}</div>
        ),
    },
    {
        accessorKey: "team_members",
        header: ({ table }) => {
            const allRows = table.getRowModel().rows;
            let isSolo = true;

            allRows.forEach(row => {
                if (row.original.team_type !== "Solo") {
                    isSolo = false;
                }
            });

            return isSolo ? null : "Team Members";
        },
        cell: ({ row }) => {
            const { team_type, team_members } = row.original;

            if (team_type === "Solo") {
                return null;
            }

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Show Members
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Team Members
                            </DialogTitle>
                        </DialogHeader>
                        {team_members.length > 0 ? (
                            team_members.map((member: any, index) => (
                                <div key={member.id || index} className='capitalize'>
                                    {member.name}
                                </div>
                            ))
                        ) : (
                            <div>No team members</div>
                        )}
                    </DialogContent>
                </Dialog>
            );
        },
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const payment = row.original

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(payment.id)}
    //                     >
    //                         Copy payment ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>View payment details</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]

type Props = {
    data: Participant[];
    isAdmin: boolean;
}

const ParticipationTable = ({ data, isAdmin }: Props) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    const router = useRouter();

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("team_lead_email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("team_lead_email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="ml-auto flex gap-x-4">
                    <Button
                        onClick={() => router.push('/admin/manage-events/add-event')}
                    >
                        {isAdmin ? 'Add' : 'Edit'} Event
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    // Determine if the column should be visible
                                    const shouldShowColumn = !table.getRowModel().rows.some(row => row.original.team_type === "Solo" && header.column.id === "team_members");

                                    return (
                                        shouldShowColumn && (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        // Determine if the cell should be visible
                                        const shouldShowCell = row.original.team_type !== "Solo" || cell.column.id !== "team_members";

                                        return (
                                            shouldShowCell && (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ParticipationTable