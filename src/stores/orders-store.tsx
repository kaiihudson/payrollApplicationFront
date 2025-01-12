import { createStore } from 'zustand/vanilla'
import { Order, PartialOrder } from './types'
import fetcher from '@/lib/fetcher'

export type OrdersState = {
    orders: Order[]
    completedOrders: Order[]
    order: Order
    pages: number
}

export type OrdersActions = {
    fetchOrders: (id: number) => Promise<void>
    fetchCompletedOrders: (id: number, page?: number) => void
    selectOrder: (order: Order) => void
    resetOrder: () => void
    createOrder: (data: PartialOrder) => Promise<void>
    deleteOrder: (id: number) => Promise<void>
    fetchAllValidOrders: () => Promise<void>
}

export type OrdersStore = OrdersState & OrdersActions

export const defaultOrdersState: OrdersState = {
    orders: [],
    completedOrders: [],
    pages: 1,
    order: {
        id: 0,
        creationDate: new Date(),
        orderStatus: '',
        executionDate: new Date(),
        retailer: ''
    }
}

export const createOrdersStore = (
    initState: OrdersState = defaultOrdersState,
) => createStore<OrdersStore>((set) => ({
    ...initState,
    fetchOrders: async (id: number) => {
        const res = await fetcher(`${apiUrl}/api/v1/order?id=${id}`)
        if (res?._embedded) {
            set({ orders: res?._embedded?.appOrderDTOList })
        }

    },
    fetchCompletedOrders: async (id: number, page?: number) => {
        if (page) {
            const res = await fetcher(`${apiUrl}/api/v1/complete_order?id=${id}&page=${page}`)
            set({ completedOrders: res?._embedded?.entityModelList, pages: res?.page?.totalPages })
        } else {
            const res = await fetcher(`${apiUrl}/api/v1/complete_order?id=${id}`)
            set({ completedOrders: res?._embedded?.entityModelList, pages: res?.page?.totalPages })
        }
    },
    fetchAllValidOrders: async () => {
        const res = await fetcher(`${apiUrl}/api/v1/orders`)
        set({ orders: res?._embedded?.appOrderDTOList })
    },
    selectOrder: (order: Order) => set({ order }),
    resetOrder: () => set({ order: defaultOrdersState.order }),
    createOrder: async (data: PartialOrder) => {
        await fetch("${apiUrl}/api/v1/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    },
    deleteOrder: async (id: number) => {
        const res = await fetcher(`${apiUrl}/api/v1/order/${id}`, {
            method: "DELETE",
        })
        console.log("Order Deleted " + id)
        console.log(res)
    }
}))