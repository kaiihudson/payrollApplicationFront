import { createStore } from 'zustand/vanilla'
import { Invoice } from './types'
import fetcher from '@/lib/fetcher'

export type InvoiceState = {
    invoices: Invoice[]
    invoice: Invoice
}

export type InvoiceActions = {
    fetchAllInvoices: () => Promise<void>
    selectInvoice: (invoice: Invoice) => void
    resetInvoice: () => void
}

export type InvoiceStore = InvoiceState & InvoiceActions

export const defaultInvoiceState: InvoiceState = {
    invoices: [],
    invoice: {
        id: 0,
        loader: '',
        status: '',
        orderList: [],
        invoiceTotal: 0
    }
}

export const createInvoiceStore = (
    initState: InvoiceState = defaultInvoiceState,
) => createStore<InvoiceStore>((set) => ({
    ...initState,
    fetchAllInvoices: async () => {
        const res = await fetcher(`http://localhost:8080/api/v1/invoices`)
        set({ invoices: res })
    },
    selectInvoice: (invoice: Invoice) => set({ invoice }),
    resetInvoice: () => set({ invoice: defaultInvoiceState.invoice })
}))