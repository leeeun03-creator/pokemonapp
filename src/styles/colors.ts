// 베이스 컬러 (라이트 테마)
export const base = {
  bg:       '#f8f4e8',  // 메인 배경
  surface:  '#ffffff',  // 카드 / 패널
  sunken:   '#e8e2d4',  // 인풋, 비활성 영역
  border:   '#2d2d2d',  // 픽셀 보더
  ink:      '#1a1a1a',  // 기본 텍스트
  inkMuted: '#6b6b6b',  // 보조 텍스트
}

// 포켓몬 타입 18종 컬러
export const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  normal:   { bg: '#A8A878', text: '#ffffff', border: '#6D6D4E' },
  fire:     { bg: '#F08030', text: '#ffffff', border: '#9C531F' },
  water:    { bg: '#6890F0', text: '#ffffff', border: '#445E9C' },
  electric: { bg: '#F8D030', text: '#1a1a1a', border: '#A1871F' },
  grass:    { bg: '#78C850', text: '#ffffff', border: '#4E8234' },
  ice:      { bg: '#98D8D8', text: '#1a1a1a', border: '#638D8D' },
  fighting: { bg: '#C03028', text: '#ffffff', border: '#7D1F1A' },
  poison:   { bg: '#A040A0', text: '#ffffff', border: '#682A68' },
  ground:   { bg: '#E0C068', text: '#1a1a1a', border: '#927D44' },
  flying:   { bg: '#A890F0', text: '#ffffff', border: '#6D5E9C' },
  psychic:  { bg: '#F85888', text: '#ffffff', border: '#A13959' },
  bug:      { bg: '#A8B820', text: '#ffffff', border: '#6D7815' },
  rock:     { bg: '#B8A038', text: '#ffffff', border: '#786824' },
  ghost:    { bg: '#705898', text: '#ffffff', border: '#493963' },
  dragon:   { bg: '#7038F8', text: '#ffffff', border: '#4924A1' },
  dark:     { bg: '#705848', text: '#ffffff', border: '#49392F' },
  steel:    { bg: '#B8B8D0', text: '#1a1a1a', border: '#787887' },
  fairy:    { bg: '#EE99AC', text: '#ffffff', border: '#9B6470' },
}