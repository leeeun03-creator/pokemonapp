import { useState, useEffect } from 'react'
import { getPokemon, getKoreanName, getPokemonList, getPokemonByType } from '../../services/DataService'
import { usePokemonStore } from '../../store/pokemonStore'
import PokemonCard from './PokemonCard'

interface PokemonSummary {
  id: number
  name: string
  koreanName: string
  types: string[]
  sprite: string
}

const PER_PAGE = 20

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([])
  const [allNames, setAllNames] = useState<{ name: string }[]>([])
  const [baseNames, setBaseNames] = useState<{ name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const { searchQuery, setSearchQuery, selectedType, setSelectedType, setSelectedPokemon } = usePokemonStore()

  // 최초 — 전체 이름 목록 가져오기
  useEffect(() => {
    async function loadAllNames() {
      const data = await getPokemonList(1025)
      setAllNames(data.results)
      setBaseNames(data.results)
    }
    loadAllNames()
  }, [])

  // 타입 변경 시 해당 타입 전체 목록으로 교체
  useEffect(() => {
    if (allNames.length === 0) return
    setPage(0)
    if (!selectedType) {
      setBaseNames(allNames)
      return
    }
    async function loadByType() {
      setLoading(true)
      try {
        const names = await getPokemonByType(selectedType!)
        setBaseNames(names)
      } catch (err) {
        console.error('타입 로딩 실패:', err)
      }
    }
    loadByType()
  }, [selectedType, allNames])

  // 페이지 바뀔 때마다 해당 페이지 포켓몬 상세 로딩
  useEffect(() => {
    if (baseNames.length === 0) return
    loadPage(page)
  }, [page, baseNames])

  async function loadPage(pageNum: number) {
    try {
      setLoading(true)
      const slice = baseNames.slice(pageNum * PER_PAGE, (pageNum + 1) * PER_PAGE)

      const details = await Promise.all(
        slice.map(async (p) => {
          const data = await getPokemon(p.name)
          const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`)
          const species = await speciesRes.json()
          return {
            id: data.id,
            name: data.name,
            koreanName: getKoreanName(species.names),
            types: data.types.map((t: any) => t.type.name),
            sprite: data.sprites.front_default,
          }
        })
      )
      setPokemonList(details)
    } catch (err) {
      console.error('로딩 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(baseNames.length / PER_PAGE)

  // 검색 필터 (타입은 baseNames에서 이미 처리됨)
  const filtered = pokemonList.filter((p) =>
    p.koreanName.includes(searchQuery) || p.name.includes(searchQuery)
  )

  return (
    <div className="flex flex-col gap-4">

      {/* 검색창 */}
      <input
        type="text"
        placeholder="이름으로 검색..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setPage(0)
        }}
        className="w-full font-vt text-xl px-4 py-2 bg-surface border-2 border-border outline-none"
        style={{ boxShadow: 'inset 2px 2px 0px #e8e2d4' }}
      />

      {/* 타입 필터 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setSelectedType(null); setPage(0) }}
          className={`font-pixel text-[8px] px-2 py-1 border-2 border-border ${
            selectedType === null ? 'bg-ink text-surface' : 'bg-surface text-ink'
          }`}
        >
          전체
        </button>
        {typeList.map((type) => (
          <button
            key={type.en}
            onClick={() => { setSelectedType(type.en); setPage(0) }}
            className="font-pixel text-[8px] px-2 py-1 border-2"
            style={{
              backgroundColor: selectedType === type.en ? '#1a1a1a' : type.bg,
              color: selectedType === type.en ? '#ffffff' : type.text,
              borderColor: type.border,
              boxShadow: `2px 2px 0px ${type.border}`,
            }}
          >
            {type.ko}
          </button>
        ))}
      </div>

      {/* 로딩 중 */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="font-pixel text-xs animate-pulse">
            포켓몬 불러오는 중...
          </span>
        </div>
      ) : (
        <>
          {/* 포켓몬 그리드 */}
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="font-pixel text-[8px] px-3 py-2 border-2 border-border shadow-pixel bg-surface disabled:opacity-40"
            >
              ◀ 이전
            </button>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={page + 1}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (!isNaN(val)) setPage(Math.min(totalPages - 1, Math.max(0, val - 1)))
                }}
                className="font-vt text-xl w-16 text-center bg-surface border-2 border-border outline-none"
                style={{ boxShadow: 'inset 2px 2px 0px #e8e2d4' }}
              />
              <span className="font-vt text-xl">/ {totalPages}</span>
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="font-pixel text-[8px] px-3 py-2 border-2 border-border shadow-pixel bg-surface disabled:opacity-40"
            >
              다음 ▶
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// 타입 필터용 목록
const typeList = [
  { en: 'normal',   ko: '노말',   bg: '#A8A878', text: '#ffffff', border: '#6D6D4E' },
  { en: 'fire',     ko: '불꽃',   bg: '#F08030', text: '#ffffff', border: '#9C531F' },
  { en: 'water',    ko: '물',     bg: '#6890F0', text: '#ffffff', border: '#445E9C' },
  { en: 'electric', ko: '전기',   bg: '#F8D030', text: '#1a1a1a', border: '#A1871F' },
  { en: 'grass',    ko: '풀',     bg: '#78C850', text: '#ffffff', border: '#4E8234' },
  { en: 'ice',      ko: '얼음',   bg: '#98D8D8', text: '#1a1a1a', border: '#638D8D' },
  { en: 'fighting', ko: '격투',   bg: '#C03028', text: '#ffffff', border: '#7D1F1A' },
  { en: 'poison',   ko: '독',     bg: '#A040A0', text: '#ffffff', border: '#682A68' },
  { en: 'ground',   ko: '땅',     bg: '#E0C068', text: '#1a1a1a', border: '#927D44' },
  { en: 'flying',   ko: '비행',   bg: '#A890F0', text: '#ffffff', border: '#6D5E9C' },
  { en: 'psychic',  ko: '에스퍼', bg: '#F85888', text: '#ffffff', border: '#A13959' },
  { en: 'bug',      ko: '벌레',   bg: '#A8B820', text: '#ffffff', border: '#6D7815' },
  { en: 'rock',     ko: '바위',   bg: '#B8A038', text: '#ffffff', border: '#786824' },
  { en: 'ghost',    ko: '고스트', bg: '#705898', text: '#ffffff', border: '#493963' },
  { en: 'dragon',   ko: '드래곤', bg: '#7038F8', text: '#ffffff', border: '#4924A1' },
  { en: 'dark',     ko: '악',     bg: '#705848', text: '#ffffff', border: '#49392F' },
  { en: 'steel',    ko: '강철',   bg: '#B8B8D0', text: '#1a1a1a', border: '#787887' },
  { en: 'fairy',    ko: '페어리', bg: '#EE99AC', text: '#ffffff', border: '#9B6470' },
]

export default PokemonList