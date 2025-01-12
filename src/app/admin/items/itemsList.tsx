import { useItemsStore } from "@/providers/items-provider"
import { Invoice } from "@/stores/types"
import { useEffect } from "react"

const ItemsList = ({ invoice }: { invoice: Invoice }) => {
    const { items, fetchOCItems } = useItemsStore((state) => state)
    useEffect(() => {
        fetchOCItems(invoice.orderList)
    }, [])
    return (
        <div className="w-9/10">
            {items.length == 0 && <p>No items</p>}
            {items.length > 0 && (
                <div className="overflow-auto max-h-96">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-white">
                            <tr className="text-xs">
                                <th className="border-r border-black">Actions</th>
                                <th className="border-r border-black">Retailer</th>
                                <th className="border-r border-black">Responsible</th>
                                <th className="border-r border-black">Item Name</th>
                                <th className="border-r border-black">Quantity</th>
                                <th className="border-r border-black">Reported Price</th>
                                <th className="border-r border-black">Total Price</th>
                                <th className="border-r border-black">Quality 1</th>
                                <th className="border-r border-black">Quality 2</th>
                                <th className="border-r border-black">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: any) => (
                                <tr key={item.id} className="text-sm">
                                    <td>
                                        <button>Update</button>
                                    </td>
                                    <td className="border-r border-black">{item.retailer}</td>
                                    <td className="border-r border-black">{item.responsible}</td>
                                    <td className="border-r border-black">{item.itemName}</td>
                                    <td className="border-r border-black text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="border-r border-black text-right">
                                        {item.reportedPrice}
                                    </td>
                                    <td className="border-r border-black text-right">
                                        {item.totalPrice}
                                    </td>
                                    <td className="border-r border-black">{item.mainQuality}</td>
                                    <td className="border-r border-black">
                                        {item.alternateQuality}
                                    </td>
                                    <td className="border-r border-black">{item.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </div>
    )
}
export default ItemsList