import { Link } from "wouter";
import { Shell } from "../components/layout/shell";
import { GlassCard } from "../components/ui/glass-card";
import { NeonButton } from "../components/ui/neon-button";
import { ShieldCheck, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function AccessMode() {
  return (
    <Shell className="items-center justify-center">
      <GlassCard lighter className="p-12 flex flex-col items-center text-center max-w-xl w-full mx-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full">
          <h2 className="text-3xl font-bold tracking-wider mb-2 text-white border-b border-white/20 pb-4 w-full uppercase">Access Mode</h2>
          <p className="text-white/70 font-mono text-xs mb-10 uppercase tracking-widest">Select authentication protocol</p>
          <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            <Link href="/auth/login" className="w-full">
              <NeonButton variant="blue" className="w-full h-16 text-lg flex items-center justify-center gap-4 group">
                <ShieldCheck className="w-6 h-6" /> SECURE LOGIN
              </NeonButton>
            </Link>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="flex-shrink-0 mx-4 text-white/50 text-xs font-mono uppercase">Or</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>
            <Link href="/auth/register" className="w-full">
              <NeonButton variant="outline" className="w-full h-14 flex items-center justify-center gap-4 group">
                <UserPlus className="w-5 h-5" /> CREATE ID
              </NeonButton>
            </Link>
          </div>
        </motion.div>
      </GlassCard>
    </Shell>
  );
}