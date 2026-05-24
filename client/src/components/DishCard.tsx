import { Link } from "react-router-dom";
import type { DishSummary } from "../types";

interface DishCardProps {
  dish: DishSummary;
  index?: number;
}

export default function DishCard({ dish, index = 0 }: DishCardProps) {
  return (
    <Link
      to={`/recipe/${dish.id}`}
      className="group block rounded-2xl bg-white border border-surface-200 overflow-hidden
                 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
        <img
          src={dish.image_url}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg text-surface-900 group-hover:text-brand-600 transition-colors line-clamp-1">
          {dish.name}
        </h3>
        <p className="text-sm text-surface-500 mt-1 line-clamp-2 leading-relaxed">
          {dish.description}
        </p>
      </div>
    </Link>
  );
}