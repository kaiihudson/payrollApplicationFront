import { createStore } from "zustand/vanilla"
import { Item } from "./types"
import fetcher from "@/lib/fetcher"

export type ItemsState = {
    items: Item[]
}

export type ItemsActions = {
    fetchItems: (id: number) => Promise<void>
    fetchOCItems: (id: number) => Promise<void>
}

export type ItemsStore = ItemsState & ItemsActions

export const defaultItemState: ItemsState = {
    items: []
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createItemsStore = (
    initState: ItemsState = defaultItemState,
) => createStore<ItemsStore>((set) => ({
    ...initState,
    fetchItems: async (id: number) => {
        const res = await fetcher(`${apiUrl}/api/v1/order/${id}/items`)
        set({ items: res })
    },
    fetchOCItems: async (invoiceId: number) => {
        const res = await fetcher(`${apiUrl}/api/v1/items_collection/${invoiceId}`)
        set({ items: res })
    }
}))