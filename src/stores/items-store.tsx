import { createStore } from "zustand/vanilla"
import { Item } from "./types"
import fetcher from "@/lib/fetcher"

export type ItemsState = {
    items: Item[]
}

export type ItemsActions = {
    fetchItems: (id: number) => Promise<void>
    fetchOCItems: (idList: number[]) => Promise<void>
}

export type ItemsStore = ItemsState & ItemsActions

export const defaultItemState: ItemsState = {
    items: []
}

export const createItemsStore = (
    initState: ItemsState = defaultItemState,
) => createStore<ItemsStore>((set) => ({
    ...initState,
    fetchItems: async (id: number) => {
        const res = await fetcher(`http://localhost:8080/api/v1/order/${id}/items`)
        set({ items: res })
    },
    fetchOCItems: async (idList: number[]) => {
        const res = await fetcher(`http://localhost:8080/api/v1/items_collection`, {
            body: idList
        })
        set({ items: res })
    }
}))