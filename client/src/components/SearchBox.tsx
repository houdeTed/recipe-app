interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function SearchBox({ value, onChange, onSearch }: SearchBoxProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="输入菜名搜索..."
        className="flex-1 px-5 py-3 rounded-xl border border-gray-300 text-lg outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
      />
      <button
        onClick={onSearch}
        className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 active:scale-95 transition-all cursor-pointer"
      >
        搜索
      </button>
    </div>
  )
}
