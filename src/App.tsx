import { useState } from 'react'
import PokemonList from './components/Pokedex/PokemonList'
import PokemonDetail from './components/Pokedex/PokemonDetail'
import { usePokemonStore } from './store/pokemonStore'

type Page = 'pokedex' | 'battle' | 'pc' | 'compare' | 'meta' | 'dictionary'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('pokedex')
  const { selectedPokemon } = usePokemonStore()

  return (
    <div className="min-h-screen bg-bg">

      {/* 상단 헤더 */}
      <header className="bg-surface border-b-2 border-border shadow-pixel-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <h1 className="font-pixel text-ink text-sm">
            ⚔️ 포켓몬 챔피언스
          </h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {currentPage === 'pokedex' && (
          selectedPokemon ? <PokemonDetail /> : <PokemonList />
        )}
        {currentPage === 'battle'     && <div className="font-vt text-2xl">⚔️ 배틀 계산기 (준비 중)</div>}
        {currentPage === 'pc'         && <div className="font-vt text-2xl">💾 나의 PC (준비 중)</div>}
        {currentPage === 'compare'    && <div className="font-vt text-2xl">📊 포켓몬 비교 (준비 중)</div>}
        {currentPage === 'meta'       && <div className="font-vt text-2xl">📈 메타 트렌드 (준비 중)</div>}
        {currentPage === 'dictionary' && <div className="font-vt text-2xl">📚 필드/도구 사전 (준비 중)</div>}
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-border">
        <div className="max-w-4xl mx-auto flex">
          {[
            { id: 'pokedex',    label: '도감',   emoji: '📖' },
            { id: 'battle',     label: '계산기', emoji: '⚔️' },
            { id: 'pc',         label: 'PC',     emoji: '💾' },
            { id: 'compare',    label: '비교',   emoji: '📊' },
            { id: 'meta',       label: '메타',   emoji: '📈' },
            { id: 'dictionary', label: '사전',   emoji: '📚' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className={`
                flex-1 py-3 flex flex-col items-center gap-1
                font-pixel text-[8px] border-r-2 border-border
                transition-colors
                ${currentPage === item.id
                  ? 'bg-ink text-surface'
                  : 'bg-surface text-ink hover:bg-sunken'
                }
              `}
            >
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 네비게이션 높이만큼 하단 여백 */}
      <div className="h-20" />
    </div>
  )
}

export default App