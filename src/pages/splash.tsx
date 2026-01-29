import { Link } from "wouter";
import { Shell } from "../components/layout/shell";
import { GlassCard } from "../components/ui/glass-card";
import { NeonButton } from "../components/ui/neon-button";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Splash() {
  return (
    <Shell className="items-center justify-center">
      <GlassCard className="p-12 md:p-20 flex flex-col items-center text-center max-w-3xl w-full mx-4 relative group">
        <motion.div 
          className="absolute top-0 left-0 w-full h-[2px] bg-neon-blue/50"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-neon-blue/20 blur-xl rounded-full animate-pulse" />
                <Cpu className="w-16 h-16 text-neon-blue relative z-10" />
            </div>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">AGV LINE FOLLOWER</h1>
        <p className="text-white/50 mb-12 uppercase">BERBASIS IoT</p>
        <Link href="/access"><NeonButton variant="blue" className="w-64">Initialize System</NeonButton></Link>
      </GlassCard>
    </Shell>
  );
}