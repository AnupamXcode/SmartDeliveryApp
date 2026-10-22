import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Download, Search, Database, ArrowUpDown, ChevronLeft, ChevronRight, FileSpreadsheet, Check } from 'lucide-react';
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

  const handleDownload = () => {
    if (!processedData || processedData.length === 0) return;
    const csv = Papa.unparse(processedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedKey}_filtered.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Card */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6FF3F]/10 border border-[#D6FF3F]/30 text-[#D6FF3F] text-xs font-mono font-bold tracking-wider uppercase mb-2">
              <Database size={14} /> PySpark Analytical Marts
            </div>
            <h2 className="text-xl font-bold font-display text-[#F8F7FF] tracking-tight">
              Interactive Data Mart Explorer
            </h2>
            <p className="text-xs text-[#B8B6CC] mt-1">
              Inspect and export the 9 aggregated PySpark data tables produced from Apache HDFS distributed data.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#D6FF3F] text-[#10101B] font-bold text-xs rounded-xl hover:bg-[#c2eb32] transition-colors duration-150 shrink-0 font-display shadow-md shadow-[#D6FF3F]/20"
          >
            <Download size={15} />
            <span>Export Filtered CSV</span>
          </button>
        </div>

        {/* Dataset Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#34334B]">
          {Object.entries(DATASET_METADATA).map(([key, item]) => {
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedKey(key);
                  setSearchQuery('');
                  setSortField(null);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#23233A] text-[#D6FF3F] border border-[#D6FF3F]/40 font-bold shadow-sm'
                    : 'bg-[#10101B] text-[#8E8CA6] hover:text-[#F8F7FF] border border-[#34334B]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] opacity-60">({datasets[key]?.length || 0})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table & Search Card */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-2xl p-6">
        {/* Table Search & Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={16} className="text-[#D6FF3F]" />
            <span className="text-xs font-mono text-[#F8F7FF] font-bold">{meta.label}</span>
            <span className="text-xs text-[#8E8CA6]">• {meta.description}</span>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8CA6]" />
            <input
              type="text"
              placeholder="Search table values..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F8F7FF] placeholder-[#8E8CA6] focus:outline-none focus:border-[#D6FF3F]"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-lg border border-[#34334B]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#10101B] text-[#8E8CA6] font-mono border-b border-[#34334B]">
                {columns.map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="p-3 font-semibold cursor-pointer hover:text-[#D6FF3F] transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col}</span>
                      <ArrowUpDown size={12} className={sortField === col ? 'text-[#D6FF3F]' : 'opacity-40'} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#34334B]/60 text-[#B8B6CC]">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length || 1} className="p-8 text-center text-xs text-[#8E8CA6]">
                    No records matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#23233A]/50 transition-colors">
                    {columns.map((col) => {
                      const val = row[col];
                      const isNumeric = typeof val === 'number';
                      return (
                        <td key={col} className={`p-3 ${isNumeric ? 'font-mono text-[#F8F7FF]' : ''}`}>
                          {val !== null && val !== undefined ? String(val) : '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8E8CA6] font-mono">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-[#10101B] border border-[#34334B] text-[#B8B6CC] hover:text-[#F8F7FF] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-[#10101B] border border-[#34334B] text-[#B8B6CC] hover:text-[#F8F7FF] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
