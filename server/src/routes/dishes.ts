import { Router } from 'express'
import pool from '../database.js'

const router = Router()

router.get('/', async (req, res) => {
  const search = req.query.search as string | undefined

  let rows
  if (search) {
    const [result] = await pool.query(
      'SELECT id, name, image_url, description FROM dishes WHERE name LIKE ?',
      [`%${search}%`]
    )
    rows = result
  } else {
    const [result] = await pool.query(
      'SELECT id, name, image_url, description FROM dishes'
    )
    rows = result
  }

  res.json(rows)
})

router.get('/:id', async (req, res) => {
  const [dishes] = await pool.query(
    'SELECT id, name, image_url, description FROM dishes WHERE id = ?',
    [req.params.id]
  )
  const dish = (dishes as any[])[0]

  if (!dish) {
    res.status(404).json({ error: '未找到该菜肴' })
    return
  }

  const [ingredients] = await pool.query(
    'SELECT name, amount FROM ingredients WHERE dish_id = ?',
    [req.params.id]
  )

  const [steps] = await pool.query(
    'SELECT step_number, instruction FROM steps WHERE dish_id = ? ORDER BY step_number',
    [req.params.id]
  )

  res.json({ ...dish, ingredients, steps })
})

export default router
