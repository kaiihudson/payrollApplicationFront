import { useItemsStore } from "@/providers/items-provider";
import { useOrdersStore } from "@/providers/orders-provider";
import { tr } from "date-fns/locale";
import { useEffect } from "react";

export const Items = () => {
  const { items, fetchItems } = useItemsStore((state) => state);
  const { order } = useOrdersStore((state) => state);

  useEffect(() => {
    fetchItems(order.id);
  }, []);
  return (
    <div className="w-100">
      {items.length == 0 && <p>No items</p>}
      {items.length > 0 && (
        <table className="w-full text-left">
          <thead>
            <tr>
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
              <tr key={item.id}>
                <td className="border-r border-black">{item.responsible}</td>
                <td className="border-r border-black">{item.itemName}</td>
                <td className="border-r border-black text-right">{item.quantity}</td>
                <td className="border-r border-black text-right">{item.reportedPrice}</td>
                <td className="border-r border-black text-right">{item.totalPrice}</td>
                <td className="border-r border-black">{item.mainQuality}</td>
                <td className="border-r border-black">{item.alternateQuality}</td>
                <td className="border-r border-black">{item.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
