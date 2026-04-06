import { create } from 'zustand'

interface SelectedPokemon {
  id: number
  name: string
}

interface PokemonState {
  selectedPokemon: SelectedPokemon | null
  setSelectedPokemon: (pokemon: SelectedPokemon | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedType: string | null
  setSelectedType: (type: string | null) => void
}

export const usePokemonStore = create<PokemonState>((set) => ({
  selectedPokemon: null,
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),
}))
