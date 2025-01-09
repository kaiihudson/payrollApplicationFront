import { useItemsStore } from "@/providers/items-provider";
import { useOrdersStore } from "@/providers/orders-provider";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";
import UploadFile from "./uploadFile";
import Modal from "@/app/modal";

export const Items = () => {
  const { items, fetchItems } = useItemsStore((state) => state);
  const { order } = useOrdersStore((state) => state);
  const [isOpenUpload, setIsOpenUpload] = useState(false)

  useEffect(() => {
    fetchItems(order.id);
  }, []);

  const setNewItems = () => {
    setIsOpenUpload(false)
    fetchItems(order.id)
  }

  return (
    <div className="flex flex-col">
      <div className="w-1/10 py-1">
        <button
          onClick={() => setIsOpenUpload(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload Items
        </button>
      </div>
      <div className="w-9/10">
        {items.length == 0 && <p>No items</p>}
        {items.length > 0 && (
          <div className="overflow-auto max-h-96">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs">
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
        )}
      </div>
      <Modal isOpen={isOpenUpload} onClose={setNewItems}>
        <UploadFile order={order} onClose={setNewItems} />
      </Modal>
    </div>
  );
};
