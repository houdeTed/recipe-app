import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Dish } from "../types";
import { fetchDishById } from "../services/api";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchDishById(Number(id))
      .then(setDish)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container-main py-8 animate-fade-in">
        <div className="h-[400px] skeleton rounded-3xl mb-8" />
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-8 skeleton w-2/3" />
          <div className="h-4 skeleton w-full" />
          <div className="h-4 skeleton w-3/4" />
        </div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="container-main py-20 text-center animate-fade-in">
        <p className="text-5xl mb-4">🍽️</p>
        <h1 className="font-display text-2xl text-surface-900 mb-2">Recipe not found</h1>
        <p className="text-surface-500 mb-6">The recipe you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-md"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const hasImage = dish.image_url && !dish.image_url.startsWith("http");

  return (
    <div className="animate-fade-in">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-surface-800 to-surface-900 overflow-hidden">
        {hasImage && (
          <>
            <img
              src={dish.image_url}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          {!hasImage && <span className="text-8xl opacity-30">🍽️</span>}
        </div>

        <Link
          to="/"
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md
                     flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 container-main pb-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">
              {dish.name}
            </h1>
            {dish.description && (
              <p className="text-surface-200 text-lg mt-3 max-w-xl leading-relaxed">
                {dish.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-main max-w-5xl -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main — Steps */}
          <div className="lg:col-span-2 space-y-10">
            {dish.steps && dish.steps.length > 0 && (
              <section className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 shadow-sm">
                <h2 className="font-display text-2xl text-surface-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold">
                    01
                  </span>
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {dish.steps.map((step) => (
                    <li
                      key={step.step_number}
                      className={`flex gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer
                        ${activeStep === step.step_number
                          ? "bg-brand-50 border border-brand-200"
                          : "hover:bg-surface-50 border border-transparent"
                        }`}
                      onClick={() =>
                        setActiveStep(
                          activeStep === step.step_number ? null : step.step_number
                        )
                      }
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          activeStep === step.step_number
                            ? "bg-brand-500 text-white"
                            : "bg-surface-100 text-surface-500"
                        }`}
                      >
                        {step.step_number}
                      </span>
                      <span
                        className={`text-sm leading-relaxed pt-1.5 ${
                          activeStep === step.step_number
                            ? "text-brand-900"
                            : "text-surface-700"
                        }`}
                      >
                        {step.instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          {/* Sidebar — Ingredients */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
              <h3 className="font-display text-lg text-surface-900 mb-4">
                Ingredients
              </h3>
              <ul className="space-y-3">
                {dish.ingredients && dish.ingredients.length > 0 ? (
                  dish.ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-surface-700 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                        {item.name}
                      </span>
                      <span className="text-surface-400 font-medium ml-4">
                        {item.amount}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-surface-400 text-sm">No ingredients listed</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}