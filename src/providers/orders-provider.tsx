'use client'

import { createOrdersStore, OrdersStore } from "@/stores/orders-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type OrdersStoreApi = ReturnType<typeof createOrdersStore>

export const OrdersStoreContext = createContext<OrdersStoreApi | undefined>(undefined,)

export interface OrdersStoreProviderProps {
    children: React.ReactNode
}

export const OrdersStoreProvider = ({
    children,
}: OrdersStoreProviderProps) => {
    const storeRef = useRef<OrdersStoreApi>(null)
    if (!storeRef.current) {
        storeRef.current = createOrdersStore()
    }
    return (
        <OrdersStoreContext.Provider value={createOrdersStore()}>
            {children}
        </OrdersStoreContext.Provider>
    )
}

export const useOrdersStore = <T,>(
    selector: (store: OrdersStore) => T,
): T => {
    const ordersStoreContext = useContext(OrdersStoreContext)

    if (!ordersStoreContext) {
        throw new Error('useOrdersStore must be used within a OrdersStoreProvider')
    }

    return useStore(ordersStoreContext, selector)
}