import { Factory, Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export const BulkWastePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center space-y-10"
        >
          {/* Minimal Icon */}
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-3xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-sm">
              <Factory className="w-12 h-12 stroke-[1.5]" />
            </div>
          </div>

          {/* Simple Messaging */}
          <div className="space-y-4">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-4 py-1 text-[10px] uppercase font-black tracking-widest rounded-full">
              Industrial Pipeline
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Connecting Large Scale <br />
              <span className="text-primary italic">Industrial Waste Streams</span>
            </h1>
            <p className="text-base text-muted-foreground font-medium leading-relaxed px-4">
              Our upcoming Industrial Pipeline will allow large manufacturing hubs to directly list high-volume materials for circular processing.
              Currently, Punarnavah administrators are working with industrial partners to bridge this gap.
            </p>
          </div>

          {/* Minimal Footer Info */}
          <div className="flex flex-col items-center gap-6 pt-6 border-t border-border">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-tighter cursor-default">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Feature in Active Development
            </div>

            <div className="flex items-center gap-2 text-muted-foreground/60 max-w-sm">
              <Info className="w-4 h-4 shrink-0" />
              <p className="text-[11px] font-medium leading-tight lowercase first-letter:uppercase">
                Industrial waste listings are managed directly through strategic partnerships and validated by our admin team before public listing.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};