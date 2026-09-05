"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "./input";
import { Pagination } from "./pagination";
import { EmptyState } from "./empty-state";
import { Skeleton } from "./skeleton";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  loading = false,
  emptyStateTitle = "No data found",
  emptyStateDescription = "There are no records to display at this time.",
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  pagination,
  onRowClick,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {searchable && (
        <div className="flex justify-between items-center">
          <div className="w-full max-w-sm">
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8F5F0] text-[#1B4D3E] text-xs uppercase font-semibold border-b border-gray-200">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => col.sortable && col.accessorKey && handleSort(col.accessorKey)}
                  >
                    <div className={`flex items-center gap-1 ${col.sortable ? "cursor-pointer select-none hover:text-[#C9A96E] transition-colors" : ""}`}>
                      {col.header}
                      {col.sortable && col.accessorKey && sortConfig.key === col.accessorKey && (
                        sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    {columns.map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <Skeleton className="h-4 w-full max-w-[200px]" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12">
                    <EmptyState
                      title={emptyStateTitle}
                      description={emptyStateDescription}
                      className="border-none bg-transparent min-h-[200px]"
                    />
                  </td>
                </tr>
              ) : (
                sortedData.map((row, i) => (
                  <tr
                    key={row.id || i}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                  >
                    {columns.map((col, j) => (
                      <td key={j} className="px-6 py-4 text-gray-700">
                        {col.cell ? col.cell(row) : col.accessorKey ? String(row[col.accessorKey] ?? "") : ""}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && !loading && data.length > 0 && (
        <div className="mt-2">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}
