import { createItemsStore, ItemsStore } from "@/stores/items-store";
import { useContext, useRef, createContext } from "react";
import { useStore } from "zustand";

export type ItemsStoreApi = ReturnType<typeof createItemsStore>

export const ItemsStoreContext = createContext<ItemsStoreApi | undefined>(undefined, )

export interface ItemsStoreProviderProps{
    children: React.ReactNode
}

export const ItemsStoreProvider = ({
    children,
}: ItemsStoreProviderProps ) => {
    const storeRef = useRef<ItemsStoreApi>()
    if(!storeRef.current) {
        createItemsStore()
    }
    return (
        <ItemsStoreContext.Provider value={createItemsStore()}>
            {children}
        </ItemsStoreContext.Provider>
    )
}

export const useItemsStore = <T, >(
    selector: (store: ItemsStore) => T,
): T => {
    const itemsStoreContext = useContext(ItemsStoreContext)

    if(!itemsStoreContext) {
        throw new Error('useItemsStore must be used within a ItemsStoreProvider')
    }

    return useStore(itemsStoreContext, selector)
}