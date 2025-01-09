'use client'

import { createInvoiceStore, InvoiceStore } from "@/stores/invoice-store"
import { createItemsStore } from "@/stores/items-store"
import { createContext, useContext, useRef } from "react"
import { useStore } from "zustand"

export type InvoiceStoreApi = ReturnType<typeof createInvoiceStore>

export const InvoiceStoreContext = createContext<InvoiceStoreApi | undefined>(undefined,)

export interface InvoiceStoreProviderProps {
    children: React.ReactNode
}

export const InvoiceStoreProvider = ({
    children,
}: InvoiceStoreProviderProps) => {
    const storeRef = useRef<InvoiceStoreApi>(null)
    if (!storeRef.current) {
        createItemsStore()
    }
    return (
        <InvoiceStoreContext.Provider value={createInvoiceStore()}>
            {children}
        </InvoiceStoreContext.Provider>
    )
}

export const useInvoiceStore = <T,>(
    selector: (store: InvoiceStore) => T,
): T => {
    const invoiceStoreContext = useContext(InvoiceStoreContext)
    if (!invoiceStoreContext) {
        throw new Error('useInvoiceStore must be used within a InvoiceStoreProvider')
    }
    return useStore(invoiceStoreContext, selector)
}