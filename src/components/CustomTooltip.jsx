import React from 'react';

export default function CustomTooltip({ active, payload, label, unit = 'min', valuePrefix = '' }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[#1A2540] border border-[#334155] rounded-lg px-3.5 py-2.5 shadow-xl backdrop-blur-md z-50 pointer-events-none">
      {label && (
        <div className="text-xs font-semibold text-[#F1F5F9] mb-1.5 border-b border-[#2A3756] pb-1">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-[#A6B3C8]">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: item.color || '#38D9F8' }}
              />
              {item.name || 'Value'}:
            </span>
            <span className="font-mono font-medium text-[#F1F5F9]">
              {valuePrefix}
              {typeof item.value === 'number'
                ? item.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                : item.value}{' '}
              <span className="text-[#38D9F8] text-[10px] font-sans">{unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
