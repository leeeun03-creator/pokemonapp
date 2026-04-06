import { typeColors } from '../../styles/colors'

interface Props {
  pokemon: {
    id: number
    name: string
    koreanName: string
    types: string[]
    sprite: string
  }
  onClick: () => void
}

function PokemonCard({ pokemon, onClick }: Props) {
  const mainType = pokemon.types[0]
  const typeColor = typeColors[mainType]

  return (
    <button
      onClick={onClick}
      className="w-full bg-surface border-2 border-border shadow-pixel hover:shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 transition-all p-3 flex flex-col items-center gap-2"
    >
      {/* 스프라이트 */}
      <img
        src={pokemon.sprite}
        alt={pokemon.koreanName}
        className="w-16 h-16 image-rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* 번호 */}
      <span className="font-vt text-ink-muted text-lg">
        No.{String(pokemon.id).padStart(3, '0')}
      </span>

      {/* 이름 */}
      <span className="font-vt text-ink text-xl">
        {pokemon.koreanName}
      </span>

      {/* 타입 배지 */}
      <div className="flex gap-1">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="font-pixel text-[8px] px-2 py-1 border-2"
            style={{
              backgroundColor: typeColors[type]?.bg,
              color: typeColors[type]?.text,
              borderColor: typeColors[type]?.border,
              boxShadow: `2px 2px 0px ${typeColors[type]?.border}`,
            }}
          >
            {typeKorean[type] ?? type}
          </span>
        ))}
      </div>
    </button>
  )
}

// 타입 한국어 이름
const typeKorean: Record<string, string> = {
  normal:   '노말',
  fire:     '불꽃',
  water:    '물',
  electric: '전기',
  grass:    '풀',
  ice:      '얼음',
  fighting: '격투',
  poison:   '독',
  ground:   '땅',
  flying:   '비행',
  psychic:  '에스퍼',
  bug:      '벌레',
  rock:     '바위',
  ghost:    '고스트',
  dragon:   '드래곤',
  dark:     '악',
  steel:    '강철',
  fairy:    '페어리',
}

export default PokemonCard