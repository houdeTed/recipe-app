export interface Ingredient {
  name: string
  amount: string
}

export interface Step {
  step_number: number
  instruction: string
}

export interface Dish {
  id: number
  name: string
  image_url: string
  description: string
  ingredients: Ingredient[]
  steps: Step[]
}
