import { createStore } from "zustand/vanilla"
import { Item } from "./types"

export type ItemsState = {
    items: Item[]
}

export type ItemsActions = {
    fetchItems: (id: number) => void
}

export type ItemsStore = ItemsState & ItemsActions

export const defaultItemState: ItemsState = {
    items: []
}

export const createItemsStore = (
    initState: ItemsState = defaultItemState,
) => createStore<ItemsStore>((set) => ({
    ...initState,
    fetchItems: (id: number) => {
        fetch(`http://localhost:8080/api/v1/order/${id}/items`)
            .then((res) => res.json())
            .then((items) => set({items}))
    },
}))