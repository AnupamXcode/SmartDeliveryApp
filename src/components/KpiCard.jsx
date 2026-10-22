import React from 'react';
import { motion } from 'framer-motion';

export default function KpiCard({ title, value, unit, subtitle, icon: Icon, color = 'lime', index = 0 }) {
  const colorMap = {
    lime: {
      border: 'hover:border-[#D6FF3F]/40',
      iconBg: 'bg-[#D6FF3F]/10 text-[#D6FF3F]',
      value: 'text-[#D6FF3F]',
      badge: 'border-[#D6FF3F]/30 text-[#D6FF3F]'
    },
    coral: {
      border: 'hover:border-[#FF6B57]/40',
      iconBg: 'bg-[#FF6B57]/10 text-[#FF6B57]',
      value: 'text-[#FF6B57]',
      badge: 'border-[#FF6B57]/30 text-[#FF6B57]'
    },
    cyan: {
      border: 'hover:border-[#48E5E0]/40',
      iconBg: 'bg-[#48E5E0]/10 text-[#48E5E0]',
      value: 'text-[#48E5E0]',
      badge: 'border-[#48E5E0]/30 text-[#48E5E0]'
    },
    violet: {
      border: 'hover:border-[#A78BFA]/40',
      iconBg: 'bg-[#A78BFA]/10 text-[#A78BFA]',
      value: 'text-[#A78BFA]',
      badge: 'border-[#A78BFA]/30 text-[#A78BFA]'
    },
  };

  const scheme = colorMap[color] || colorMap.lime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className={`bg-[#19192A] border border-[#34334B] rounded-xl p-5 shadow-sm transition-all duration-200 ${scheme.border} flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8B6CC]">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${scheme.iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline">
        <span className={`text-3xl sm:text-4xl font-bold font-display tracking-tight ${scheme.value}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className="ml-1.5 text-sm font-semibold text-[#F8F7FF]">
            {unit}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-2.5 text-xs text-[#B8B6CC] flex items-center gap-1.5 border-t border-[#34334B]/50 pt-2 font-mono">
          <span>{subtitle}</span>
        </div>
      )}
    </motion.div>
  );
}
