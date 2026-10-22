import React from 'react';
import { motion } from 'framer-motion';

export default function KpiCard({ title, value, unit, subtitle, icon: Icon, color = 'cyan', index = 0 }) {
  const colorMap = {
    cyan: {
      border: 'hover:border-[#38D9F8]/40',
      iconBg: 'bg-[#38D9F8]/10 text-[#38D9F8]',
      unit: 'text-[#38D9F8]',
    },
    emerald: {
      border: 'hover:border-[#34D399]/40',
      iconBg: 'bg-[#34D399]/10 text-[#34D399]',
      unit: 'text-[#34D399]',
    },
    violet: {
      border: 'hover:border-[#8B7CFF]/40',
      iconBg: 'bg-[#8B7CFF]/10 text-[#8B7CFF]',
      unit: 'text-[#8B7CFF]',
    },
    rose: {
      border: 'hover:border-[#FB7185]/40',
      iconBg: 'bg-[#FB7185]/10 text-[#FB7185]',
      unit: 'text-[#FB7185]',
    },
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={`bg-[#141D32] border border-[#233152] rounded-xl p-5 shadow-sm transition-all duration-200 ${scheme.border} flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A6B3C8]">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${scheme.iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline">
        <span className="text-3xl font-bold font-mono tracking-tight text-[#F1F5F9]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className={`ml-1.5 text-sm font-semibold ${scheme.unit}`}>
            {unit}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-2 text-xs text-[#64748B] flex items-center gap-1.5">
          <span>{subtitle}</span>
        </div>
      )}
    </motion.div>
  );
}
