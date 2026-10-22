import React from 'react';
import { motion } from 'framer-motion';

export default function ChartCard({ title, subtitle, children, headerRight, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`bg-[#141D32] border border-[#233152] rounded-xl p-5 shadow-sm hover:border-[#2A3C64] transition-colors duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F5F9] tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-[#A6B3C8] mt-0.5">{subtitle}</p>}
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
}
