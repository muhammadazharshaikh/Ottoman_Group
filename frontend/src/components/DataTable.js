"use client";
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function DataTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <input
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search records..."
          className="border border-gray-300 !p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto !mt-10 !mb-4 border border-gray-200 rounded-lg !p-4">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 uppercase text-sm font-semibold text-gray-600">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="!py-4 px-6 border-b cursor-pointer hover:text-indigo-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-300 bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-200 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 !py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-2xl text-center !py-10 text-gray-400">
                  Loading or No Data Found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Pagination Footer */}
      <div className="bg-gray-50 !px-6 !py-3 border border-gray-200 rounded-b-lg flex justify-between items-center text-xs text-gray-900">
        <div>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} entries
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => table.previousPage()} 
             disabled={!table.getCanPreviousPage()}
             className="!px-3 !py-1 border rounded  bg-white "
           > Prev </button>
           <button 
             onClick={() => table.nextPage()} 
             disabled={!table.getCanNextPage()}
             className="!px-3 !py-1 border rounded  bg-white"
           > Next </button>
        </div>
      </div>
    </div>
  );
}