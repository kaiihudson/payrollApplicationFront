import { ItemsStoreProvider } from "@/providers/items-provider"
import { useOrdersStore } from "@/providers/orders-provider"
import { Items } from "../items/items"

export const OrderBreadcrumb = () => {
    const {order, resetOrder} = useOrdersStore((state) => state)    
    return (
        <div
            className="flex flex-row"
        >
            <div
                className="pr-5 bg-gray-300 w-1/10"
            >
            <p>Order #{order.id}</p>
            <button
                onClick={resetOrder}
            >
                Back to Orders
            </button>
            </div>
            <div
                className="w-9/10"
            >
                <ItemsStoreProvider>
                    <Items />
                </ItemsStoreProvider>
            </div>
        </div>
    )
}