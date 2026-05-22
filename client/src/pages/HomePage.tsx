import { useState } from 'react'
import SearchBox from '../components/SearchBox'
import PopularDishes from '../components/PopularDishes'
import { popularDishes } from '../data/dishes'

export default function HomePage() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    // TODO: 接入后端后实现搜索跳转
    console.log('搜索:', query)
  }

  const handleDishClick = (id: number) => {
    // TODO: 接入路由后跳转详情页
    console.log('点击菜肴:', id)
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          🍳 今天想吃什么？
        </h1>
        <p className="text-gray-500 text-lg">搜一搜，找到你最想做的菜</p>
      </div>

      <div className="mb-14 w-full flex justify-center">
        <SearchBox value={query} onChange={setQuery} onSearch={handleSearch} />
      </div>

      <PopularDishes dishes={popularDishes} onDishClick={handleDishClick} />
    </div>
  )
}
