import { ArrowRight } from "lucide-react";

export interface HomeFeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
    accent?: boolean;
}

export const HomeFeatureCard = ({ title, description, icon, onClick, accent = false }: HomeFeatureCardProps) => (
    <button
        onClick={onClick}
        className={`group relative p-6 rounded-2xl border text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${accent
            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
            : "bg-card text-card-foreground border-border hover:border-primary/50"
            }`}
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${accent ? "bg-primary-foreground/20" : "bg-primary/10"
            }`}>
            {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className={`text-sm leading-relaxed ${accent ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}>
            {description}
        </p>
        <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${accent ? "text-primary-foreground" : "text-primary"
            }`}>
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
    </button>
);
