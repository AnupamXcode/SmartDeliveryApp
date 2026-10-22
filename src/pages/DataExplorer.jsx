import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Download, Search, Database, ArrowUpDown, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';
import { DATASET_METADATA } from '../utils/dataLoader';

export default function DataExplorer() {
  const { datasets } = useAnalytics();
  const [selectedKey, setSelectedKey] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentDataset = datasets[selectedKey] || [];
  const meta = DATASET_METADATA[selectedKey] || {};

  // Extract columns
  const columns = useMemo(() => {
    if (!currentDataset || currentDataset.length === 0) return [];
    return Object.keys(currentDataset[0]);
  }, [currentDataset]);

  // Filter & Sort
  const processedData = useMemo(() => {
    let result = [...currentDataset];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(row =>
        Object.values(row).some(val => String(val).toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [currentDataset, searchQuery, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize) || 1;
  const paginatedData = processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (col) => {
    if (sortField === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(col);
      setSortAsc(true);
    }
  };

  // CSV Download handler
  const handleDownload = () => {
    const csvContent = Papa.unparse(currentDataset);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', meta.filename || `${selectedKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Selector & Metadata Card */}
      <div className="bg-[#141D32] border border-[#233152] rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A6B3C8] mb-1.5">
              Select Analytical Data Mart
            </label>
            <select
              value={selectedKey}
              onChange={(e) => {
                setSelectedKey(e.target.value);
                setCurrentPage(1);
                setSearchQuery('');
                setSortField(null);
              }}
              className="w-full bg-[#0E1528] border border-[#233152] rounded-lg px-3 py-2 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#38D9F8] cursor-pointer"
            >
              {Object.entries(DATASET_METADATA).map(([k, m]) => (
                <option key={k} value={k}>
                  {m.title} ({m.filename})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#38D9F8]/10 border border-[#38D9F8]/30 text-[#38D9F8] rounded-lg text-xs font-semibold hover:bg-[#38D9F8]/20 transition-colors"
            >
              <Download size={14} />
              <span>Export {meta.filename}</span>
            </button>
          </div>
        </div>

        {/* Dataset Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#233152] text-xs">
          <div>
            <span className="text-[#64748B]">Table Rows:</span>
            <div className="text-sm font-bold font-mono text-[#F1F5F9]">{currentDataset.length}</div>
          </div>
          <div>
            <span className="text-[#64748B]">Columns:</span>
            <div className="text-sm font-bold font-mono text-[#F1F5F9]">{columns.length}</div>
          </div>
          <div>
            <span className="text-[#64748B]">Memory Estimate:</span>
            <div className="text-sm font-bold font-mono text-[#38D9F8]">
              {(JSON.stringify(currentDataset).length / 1024).toFixed(1)} KB
            </div>
          </div>
          <div>
            <span className="text-[#64748B]">Source File:</span>
            <div className="text-sm font-mono text-[#34D399] truncate">{meta.filename}</div>
          </div>
        </div>
      </div>

      {/* Table & Controls Card */}
      <div className="bg-[#141D32] border border-[#233152] rounded-xl p-5">
        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search table rows..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#0E1528] border border-[#233152] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#38D9F8]"
            />
          </div>

          <div className="text-xs text-[#A6B3C8] font-mono">
            Showing {processedData.length} entries {searchQuery && `(filtered from ${currentDataset.length})`}
          </div>
        </div>

        {/* Tabular Grid */}
        <div className="overflow-x-auto border border-[#233152] rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0E1528] text-[#A6B3C8] uppercase font-mono border-b border-[#233152]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="py-2.5 px-4 cursor-pointer hover:text-[#38D9F8] transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col}</span>
                      <ArrowUpDown size={12} className={sortField === col ? 'text-[#38D9F8]' : 'text-[#64748B]'} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#233152] text-[#F1F5F9]">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-[#1A2540] transition-colors">
                    {columns.map((col) => (
                      <td key={col} className="py-2.5 px-4 font-mono">
                        {typeof row[col] === 'number'
                          ? row[col].toLocaleString()
                          : String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-center text-[#64748B]">
                    No matching records found for "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#233152] text-xs">
            <span className="text-[#64748B] font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 bg-[#0E1528] border border-[#233152] rounded text-[#A6B3C8] hover:text-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 bg-[#0E1528] border border-[#233152] rounded text-[#A6B3C8] hover:text-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
