import type { DishSummary } from "../types";
import DishCard from "./DishCard";

interface PopularDishesProps {
  dishes: DishSummary[];
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 skeleton w-3/4" />
        <div className="h-4 skeleton w-full" />
      </div>
    </div>
  );
}

export default function PopularDishes({ dishes, loading }: PopularDishesProps) {
  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-7 skeleton w-48 mb-2" />
            <div className="h-4 skeleton w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    );
  }

  if (dishes.length === 0) {
    return (
      <section className="text-center py-16 text-surface-400">
        <p className="text-5xl mb-4">🍲</p>
        <p className="text-lg">No recipes yet</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl text-surface-900">Popular Dishes</h2>
          <p className="text-surface-500 mt-1">Discover our most loved recipes</p>
        </div>
        <span className="text-sm text-surface-400 hidden sm:block">
          {dishes.length} recipes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dishes.map((dish, i) => (
          <DishCard key={dish.id} dish={dish} index={i} />
        ))}
      </div>
    </section>
  );
}