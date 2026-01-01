interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    image: string;
    price?: number;
    unit?: string;
    badge?: string;
    onClick: () => void;
}

export const ProductCard = ({
    name,
    description,
    image,
    price,
    unit,
    badge,
    onClick,
}: ProductCardProps) => {
    return (
        <button
            onClick={onClick}
            className="group relative bg-card overflow-hidden text-left transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] w-full border border-border hover:border-primary/40"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain p-6 transition-all duration-500 group-hover:scale-105 group-hover:p-4"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                {badge && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 shadow-lg">
                        {badge}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 border-t border-border">
                {/* Title Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    {price !== undefined && (
                        <span className="flex-shrink-0 text-lg font-bold text-primary">
                            ₹{price}
                            {unit && (
                                <span className="text-xs text-muted-foreground font-normal">/{unit}</span>
                            )}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
        </button>
    );
};

export default ProductCard;
