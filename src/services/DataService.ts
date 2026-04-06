// PokeAPI 기본 URL
const POKEAPI = 'https://pokeapi.co/api/v2'

// 포켓몬 데이터 가져오기
export async function getPokemon(idOrName: string | number) {
  const res = await fetch(`${POKEAPI}/pokemon/${idOrName}`)
  if (!res.ok) throw new Error(`포켓몬을 찾을 수 없어요: ${idOrName}`)
  return res.json()
}

// 포켓몬 종 데이터 가져오기 (한국어 이름, 도감 설명 등)
export async function getPokemonSpecies(idOrName: string | number) {
  const res = await fetch(`${POKEAPI}/pokemon-species/${idOrName}`)
  if (!res.ok) throw new Error(`종 데이터를 찾을 수 없어요: ${idOrName}`)
  return res.json()
}

// 기술 데이터 가져오기
export async function getMove(idOrName: string | number) {
  const res = await fetch(`${POKEAPI}/move/${idOrName}`)
  if (!res.ok) throw new Error(`기술을 찾을 수 없어요: ${idOrName}`)
  return res.json()
}

// 타입 상성 데이터 가져오기
export async function getType(typeName: string) {
  const res = await fetch(`${POKEAPI}/type/${typeName}`)
  if (!res.ok) throw new Error(`타입을 찾을 수 없어요: ${typeName}`)
  return res.json()
}

// 특성 데이터 가져오기
export async function getAbility(idOrName: string | number) {
  const res = await fetch(`${POKEAPI}/ability/${idOrName}`)
  if (!res.ok) throw new Error(`특성을 찾을 수 없어요: ${idOrName}`)
  return res.json()
}

// 한국어 이름 추출 헬퍼
export function getKoreanName(
  names: { language: { name: string }; name: string }[]
): string {
  return names.find(n => n.language.name === 'ko')?.name ?? '알 수 없음'
}

// 포켓몬 전체 목록 가져오기 (도감용)
export async function getPokemonList(limit = 1025) {
  const res = await fetch(`${POKEAPI}/pokemon?limit=${limit}`)
  if (!res.ok) throw new Error('포켓몬 목록을 불러올 수 없어요')
  return res.json()
}

// 타입별 포켓몬 목록 가져오기
export async function getPokemonByType(type: string): Promise<{ name: string }[]> {
  const res = await fetch(`${POKEAPI}/type/${type}`)
  if (!res.ok) throw new Error(`타입을 찾을 수 없어요: ${type}`)
  const data = await res.json()
  return data.pokemon.map((p: { pokemon: { name: string } }) => ({ name: p.pokemon.name }))
}