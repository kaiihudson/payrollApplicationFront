import {createStore} from 'zustand/vanilla'
import { Order } from './types'

export type OrdersState = {
    orders: Order[]
    order: Order
}

export type OrdersActions = {
    fetchOrders: (id: number) => void
    fetchCompletedOrders: (id: number) => void
    selectOrder: (order: Order) => void
    resetOrder: () => void
}

export type OrdersStore = OrdersState & OrdersActions

export const defaultOrdersState: OrdersState = {
    orders: [],
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
    fetchOrders: (id: number) => {
        fetch(`http://localhost:8080/api/v1/order?id=${id}`)
            .then((res) => res.json())
            .then((json)=> json._embedded.appOrderDTOList)
            .then((orders) => set({orders}))
    },
    fetchCompletedOrders: (id: number) => {
        fetch(`http://localhost:8080/api/v1/complete_order?id=${id}`)
            .then((res) => res.json())
            .then((json)=> json._embedded.appOrderDTOList)
            .then((orders) => set({orders}))
    },
    selectOrder: (order: Order) => set({order}),
    resetOrder: () => set({order: defaultOrdersState.order})
}))