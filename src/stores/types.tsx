export type Person = {
    id: number
    firstName: string
    lastName: string
    phoneNum: string
    address: string
    name?: string
}

export type Order = {
    id: number
    creationDate: Date
    orderStatus: string
    executionDate: Date
    retailer: string
    orderTotal?: number
}

export type PartialOrder = {
    retailer: string
    userId: number
}

export type Item = {
    id: number
    responsible: string
    itemName: string
    quantity: number
    reportedPrice: number
    totalPrice: number
    mainQuality: string
    alternateQuality: string
    source: string
    retailer: string
}

export type Invoice = {
    id: number
    loader: string
    status: string
    orderList: number[]
    invoiceTotal: number
}