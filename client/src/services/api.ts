import type { Dish, DishSummary } from '../types'

const BASE = '/api'

export async function fetchAllDishes(): Promise<DishSummary[]> {
  const res = await fetch(`${BASE}/dishes`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function searchDishes(keyword: string): Promise<DishSummary[]> {
  const res = await fetch(`${BASE}/dishes?search=${encodeURIComponent(keyword)}`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function fetchDishById(id: number): Promise<Dish> {
  const res = await fetch(`${BASE}/dishes/${id}`)
  if (res.ok) return res.json()
  if (res.status === 404) throw new Error('NOT_FOUND')
  throw new Error('Failed to fetch')
}
