import { useEffect, useState } from 'react'
import { getPokemon, getPokemonSpecies, getKoreanName } from '../../services/DataService'
import { usePokemonStore } from '../../store/pokemonStore'
import { typeColors } from '../../styles/colors'

// 타입 한국어
const typeKorean: Record<string, string> = {
  normal: '노말', fire: '불꽃', water: '물', electric: '전기',
  grass: '풀', ice: '얼음', fighting: '격투', poison: '독',
  ground: '땅', flying: '비행', psychic: '에스퍼', bug: '벌레',
  rock: '바위', ghost: '고스트', dragon: '드래곤', dark: '악',
  steel: '강철', fairy: '페어리',
}

// 능력치 한국어
const statKorean: Record<string, string> = {
  hp: 'HP', attack: '공격', defense: '방어',
  'special-attack': '특공', 'special-defense': '특방', speed: '스피드',
}

function PokemonDetail() {
  const { selectedPokemon, setSelectedPokemon } = usePokemonStore()
  const [detail, setDetail] = useState<any>(null)
  const [species, setSpecies] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedPokemon) return
    loadDetail(selectedPokemon.id)
  }, [selectedPokemon])

  async function loadDetail(id: number) {
    try {
      setLoading(true)
      const [pokemonData, speciesData] = await Promise.all([
        getPokemon(id),
        getPokemonSpecies(id),
      ])
      setDetail(pokemonData)
      setSpecies(speciesData)
    } catch (err) {
      console.error('상세 로딩 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPokemon) return null

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="font-pixel text-xs animate-pulse">불러오는 중...</span>
      </div>
    )
  }

  if (!detail) return null

  const koreanName = species ? getKoreanName(species.names) : selectedPokemon.name
  const flavorText = species?.flavor_text_entries
    ?.find((f: any) => f.language.name === 'ko')
    ?.flavor_text?.replace(/\f/g, ' ') ?? '도감 설명 없음'

  const totalStat = detail.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0)

  return (
    <div className="flex flex-col gap-4">

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => setSelectedPokemon(null)}
        className="font-pixel text-[8px] px-3 py-2 border-2 border-border shadow-pixel bg-surface w-fit"
      >
        ◀ 목록으로
      </button>

      {/* 헤더 카드 */}
      <div className="bg-surface border-2 border-border shadow-pixel p-4 flex gap-4 items-center">
        <img
          src={detail.sprites.other['official-artwork'].front_default ?? detail.sprites.front_default}
          alt={koreanName}
          className="w-24 h-24"
        />
        <div className="flex flex-col gap-2">
          <span className="font-vt text-ink-muted text-lg">
            No.{String(detail.id).padStart(3, '0')}
          </span>
          <span className="font-pixel text-ink text-sm">{koreanName}</span>
          <div className="flex gap-1">
            {detail.types.map((t: any) => (
              <span
                key={t.type.name}
                className="font-pixel text-[8px] px-2 py-1 border-2"
                style={{
                  backgroundColor: typeColors[t.type.name]?.bg,
                  color: typeColors[t.type.name]?.text,
                  borderColor: typeColors[t.type.name]?.border,
                  boxShadow: `2px 2px 0px ${typeColors[t.type.name]?.border}`,
                }}
              >
                {typeKorean[t.type.name] ?? t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 도감 설명 */}
      <div className="bg-surface border-2 border-border shadow-pixel p-4">
        <h2 className="font-pixel text-[10px] text-ink mb-2">도감 설명</h2>
        <p className="font-vt text-xl text-ink">{flavorText}</p>
      </div>

      {/* 종족값 */}
      <div className="bg-surface border-2 border-border shadow-pixel p-4">
        <h2 className="font-pixel text-[10px] text-ink mb-3">종족값</h2>
        <div className="flex flex-col gap-2">
          {detail.stats.map((s: any) => (
            <div key={s.stat.name} className="flex items-center gap-2">
              <span className="font-vt text-lg text-ink w-16 shrink-0">
                {statKorean[s.stat.name] ?? s.stat.name}
              </span>
              <span className="font-vt text-lg text-ink w-8 text-right shrink-0">
                {s.base_stat}
              </span>
              <div className="flex-1 bg-sunken border border-border h-4">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.min(100, (s.base_stat / 255) * 100)}%`,
                    backgroundColor: typeColors[detail.types[0].type.name]?.bg ?? '#A8A878',
                  }}
                />
              </div>
            </div>
          ))}
          {/* 합계 */}
          <div className="flex items-center gap-2 border-t-2 border-border pt-2 mt-1">
            <span className="font-vt text-lg text-ink w-16 shrink-0">합계</span>
            <span className="font-vt text-lg text-ink w-8 text-right shrink-0">{totalStat}</span>
          </div>
        </div>
      </div>

      {/* 특성 */}
      <div className="bg-surface border-2 border-border shadow-pixel p-4">
        <h2 className="font-pixel text-[10px] text-ink mb-3">특성</h2>
        <div className="flex flex-col gap-2">
          {detail.abilities.map((a: any) => (
            <div key={a.ability.name} className="flex items-center gap-2">
              <span className="font-vt text-xl text-ink">{a.ability.name}</span>
              {a.is_hidden && (
                <span className="font-pixel text-[8px] px-2 py-1 border-2 border-border bg-sunken">
                  숨겨진 특성
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default PokemonDetail