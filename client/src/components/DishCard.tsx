import type { Dish } from '../types'

interface DishCardProps {
  dish: Dish
  onClick: (id: number) => void
}

export default function DishCard({ dish, onClick }: DishCardProps) {
  return (
    <div
      onClick={() => onClick(dish.id)}
      className="group cursor-pointer rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={dish.image_url}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dish.description}</p>
      </div>
    </div>
  )
}
