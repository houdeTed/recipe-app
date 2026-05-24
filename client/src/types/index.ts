export interface Ingredient {
  name: string
  amount: string
}

export interface Step {
  step_number: number
  instruction: string
}

export interface DishSummary {
  id: number
  name: string
  image_url: string
  description: string
}

export interface Dish extends DishSummary {
  ingredients: Ingredient[]
  steps: Step[]
}