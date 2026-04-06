import { create } from 'zustand'

interface PokemonBuild {
  id: number
  nickname?: string
  ap: {
    hp: number; atk: number; def: number
    spa: number; spd: number; spe: number
  }
  nature: string
  item: string
  teraType: string
  moves: string[]
  ability: string
}

interface Box {
  id: number
  name: string
  pokemon: (PokemonBuild | null)[]  // 30칸, 빈 칸은 null
}

interface PCState {
  boxes: Box[]
  activeParty: number[]  // 파티에 있는 포켓몬 인덱스

  addPokemon: (boxId: number, slot: number, pokemon: PokemonBuild) => void
  removePokemon: (boxId: number, slot: number) => void
  sendToCalc: (pokemon: PokemonBuild) => void
}

export const usePCStore = create<PCState>((set) => ({
  boxes: [
    { id: 1, name: '박스 1', pokemon: Array(30).fill(null) },
    { id: 2, name: '박스 2', pokemon: Array(30).fill(null) },
    { id: 3, name: '박스 3', pokemon: Array(30).fill(null) },
  ],
  activeParty: [],

  addPokemon: (boxId, slot, pokemon) =>
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.id === boxId
          ? {
              ...box,
              pokemon: box.pokemon.map((p, i) => (i === slot ? pokemon : p)),
            }
          : box
      ),
    })),

  removePokemon: (boxId, slot) =>
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.id === boxId
          ? {
              ...box,
              pokemon: box.pokemon.map((p, i) => (i === slot ? null : p)),
            }
          : box
      ),
    })),

  sendToCalc: (pokemon) => {
    // battleStore의 setAttacker 호출은 컴포넌트에서 처리
    console.log('계산기로 보내기:', pokemon)
  },
}))