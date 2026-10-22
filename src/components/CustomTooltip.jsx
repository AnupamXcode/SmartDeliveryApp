import React from 'react';

export default function CustomTooltip({ active, payload, label, unit = 'min', valuePrefix = '' }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[#23233A] border border-[#34334B] rounded-xl px-3.5 py-2.5 shadow-2xl backdrop-blur-md z-50 pointer-events-none">
      {label && (
        <div className="text-xs font-bold text-[#F8F7FF] font-display mb-1.5 border-b border-[#34334B] pb-1">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-[#B8B6CC]">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: item.color || '#D6FF3F' }}
              />
              {item.name || 'Value'}:
            </span>
            <span className="font-mono font-bold text-[#F8F7FF]">
              {valuePrefix}
              {typeof item.value === 'number'
                ? item.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                : item.value}{' '}
              <span className="text-[#D6FF3F] text-[10px] font-sans font-medium">{unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
