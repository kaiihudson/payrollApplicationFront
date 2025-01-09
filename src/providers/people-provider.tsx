'use client'

import { type PeopleStore, createPeopleStore } from "../stores/people-store"
import { type ReactNode, useContext, createContext, useRef } from "react"
import { useStore } from 'zustand'

export type PeopleStoreApi = ReturnType<typeof createPeopleStore>

export const PeopleStoreContext = createContext<PeopleStoreApi | undefined>(undefined,)

export interface PeopleStoreProviderProps {
    children: ReactNode
}

export const PeopleStoreProvider = ({
    children,
}: PeopleStoreProviderProps) => {
    const storeRef = useRef<PeopleStoreApi>(null)
    if (!storeRef.current) {
        storeRef.current = createPeopleStore()
    }
    return (
        <PeopleStoreContext.Provider value={storeRef.current}>
            {children}
        </PeopleStoreContext.Provider>
    )
}

export const usePeopleStore = <T,>(
    selector: (store: PeopleStore) => T,
): T => {
    const peopleStoreContext = useContext(PeopleStoreContext)

    if (!peopleStoreContext) {
        throw new Error('usePeopleStore must be used within a PeopleStoreProvider')
    }

    return useStore(peopleStoreContext, selector)
}