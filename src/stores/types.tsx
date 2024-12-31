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
}