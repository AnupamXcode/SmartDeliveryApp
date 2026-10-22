import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ChartCard({ 
  title, 
  subtitle, 
  children, 
  headerRight, 
  interpretation, 
  className = '' 
}) {
  const [showInterpretation, setShowInterpretation] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`bg-[#19192A] border border-[#34334B] rounded-xl p-5 shadow-sm hover:border-[#464563] transition-colors duration-200 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h3 className="text-sm font-bold font-display text-[#F8F7FF] tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#B8B6CC] mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {headerRight}
            {interpretation && (
              <button
                onClick={() => setShowInterpretation(!showInterpretation)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                  showInterpretation
                    ? 'bg-[#D6FF3F]/10 border-[#D6FF3F]/40 text-[#D6FF3F]'
                    : 'bg-[#23233A] border-[#34334B] text-[#B8B6CC] hover:text-[#F8F7FF]'
                }`}
                title="Faculty Explanation Guide"
              >
                <HelpCircle size={13} />
                <span className="hidden sm:inline text-[11px] font-mono">Guide</span>
                {showInterpretation ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            )}
          </div>
        </div>

        {/* Chart Content Area */}
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Faculty Educational Guide ("How to interpret this") */}
      <AnimatePresence>
        {showInterpretation && interpretation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-3 border-t border-[#34334B] text-xs text-[#B8B6CC] space-y-2 overflow-hidden"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#D6FF3F] font-mono">
              Faculty Evaluation Guide:
            </div>
            {interpretation.measuring && (
              <div>
                <strong className="text-[#F8F7FF]">1. What we are measuring:</strong> {interpretation.measuring}
              </div>
            )}
            {interpretation.shows && (
              <div>
                <strong className="text-[#F8F7FF]">2. What the chart shows:</strong> {interpretation.shows}
              </div>
            )}
            {interpretation.useful && (
              <div>
                <strong className="text-[#F8F7FF]">3. Why this insight is useful:</strong> {interpretation.useful}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
