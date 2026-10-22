import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Sparkles, Navigation, Layers, ShieldCheck } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

export default function HeroSection() {
  const { setActiveTab } = useAnalytics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#19192A] border border-[#34334B] rounded-2xl overflow-hidden p-6 lg:p-8 relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6FF3F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FF6B57]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Editorial Text Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23233A] border border-[#34334B] text-xs font-semibold tracking-wider text-[#D6FF3F] uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-[#D6FF3F] animate-pulse" />
            Big Data Analytics Project • Hadoop & PySpark
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#F8F7FF] tracking-tight leading-[1.15]">
            Every Delivery <span className="text-[#D6FF3F]">Tells a Story.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#B8B6CC] leading-relaxed max-w-xl">
            A macroscopic empirical investigation into <strong>45,593 delivery transactions</strong>. Uncovering how traffic congestion, atmospheric conditions, vehicle modality, urban geometry, and cultural festival surges govern order fulfillment latency.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('kpi-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D6FF3F] text-[#10101B] font-bold text-xs uppercase tracking-wider hover:bg-[#b8e624] transition-all duration-150 shadow-lg shadow-[#D6FF3F]/20 active:scale-95"
            >
              <span>Explore Analytics</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => setActiveTab('data-explorer')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#23233A] border border-[#34334B] text-[#F8F7FF] font-semibold text-xs tracking-wider hover:bg-[#2c2c48] hover:border-[#D6FF3F]/40 transition-all duration-150 active:scale-95"
            >
              <Database size={15} className="text-[#48E5E0]" />
              <span>Inspect Data Marts</span>
            </button>
          </div>

          {/* Key Facts Pill Row */}
          <div className="pt-4 border-t border-[#34334B]/70 flex flex-wrap items-center gap-4 text-xs text-[#B8B6CC]">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[#D6FF3F] font-bold">45,593</span> Transactions
            </div>
            <span className="text-[#34334B]">•</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[#FF6B57] font-bold">26.29m</span> Mean Latency
            </div>
            <span className="text-[#34334B]">•</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[#48E5E0] font-bold">9 Marts</span> Partitioned
            </div>
          </div>
        </div>

        {/* Right 3D Visual Art Column */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-[#34334B] shadow-2xl group">
            <img
              src="/assets/hero_delivery.jpg"
              alt="Futuristic Food Delivery 3D Scooter Illustration"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Holographic Badge Overlays */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#10101B]/80 backdrop-blur-md border border-[#D6FF3F]/40 text-[10px] font-mono text-[#D6FF3F] flex items-center gap-1">
              <Navigation size={11} /> GPS ACTIVE • ROUTE #9773
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#10101B]/80 backdrop-blur-md border border-[#FF6B57]/40 text-[10px] font-mono text-[#FF6B57] flex items-center gap-1">
              <ShieldCheck size={11} /> 100% DISPATCH AUDIT
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
