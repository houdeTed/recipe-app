import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import DishCard from "../components/DishCard";
import PopularDishes from "../components/PopularDishes";
import type { Dish } from "../types";
import { fetchAllDishes, searchDishes } from "../services/api";

export default function HomePage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    (searchQuery ? searchDishes(searchQuery) : fetchAllDishes())
      .then(setDishes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchParams(query ? { search: query } : {});
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-olive-900">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-olive-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-2xl" />
        </div>

        <div className="relative container-main py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
              Discover & Cook Amazing Recipes
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
              Find Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
                Favorite Dish
              </span>
            </h1>
            <p className="text-surface-300 text-lg mt-4 max-w-lg mx-auto leading-relaxed">
              Explore thousands of recipes from around the world. Cook like a chef at home.
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <SearchBox onSearch={handleSearch} variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="container-main py-16 md:py-20">
        {searchQuery ? (
          <>
            <div className="mb-8">
              <h2 className="font-display text-3xl text-surface-900">
                Results for "{searchQuery}"
              </h2>
              <p className="text-surface-500 mt-1">
                {loading ? "Searching..." : `${dishes.length} recipes found`}
              </p>
            </div>
            {!loading && dishes.length === 0 && (
              <div className="text-center py-16 text-surface-400">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-xl mb-2">No recipes found</p>
                <p className="text-surface-500">Try a different search term</p>
              </div>
            )}
            {!loading && dishes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dishes.map((dish, i) => (
                  <div
                    key={dish.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                  >
                    <DishCard dish={dish} index={i} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}

        {/* Always show popular dishes when no search */}
        {!searchQuery && <PopularDishes dishes={dishes} loading={loading} />}
      </section>

      {/* Features strip */}
      {!searchQuery && (
        <section className="border-t border-surface-200/60 bg-surface-100/30">
          <div className="container-main py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: "👨‍🍳", title: "Expert Recipes", desc: "Curated by top chefs" },
                { icon: "⚡", title: "Quick & Easy", desc: "Step-by-step guides" },
                { icon: "🌍", title: "Global Cuisine", desc: "From all over the world" },
                { icon: "📱", title: "Any Device", desc: "Cook on the go" },
              ].map((f) => (
                <div key={f.title} className="text-center">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="font-display text-surface-900 mt-2">{f.title}</h3>
                  <p className="text-sm text-surface-500 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}