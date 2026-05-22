import type { Dish } from '../types'
import DishCard from './DishCard'

interface PopularDishesProps {
  dishes: Dish[]
  onDishClick: (id: number) => void
}

export default function PopularDishes({ dishes, onDishClick }: PopularDishesProps) {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">常见菜肴</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onClick={onDishClick} />
        ))}
      </div>
    </section>
  )
}
