import { ItemsStoreProvider } from "@/providers/items-provider";
import { useOrdersStore } from "@/providers/orders-provider";
import { Items } from "../items/items";
import { LuChevronLeft } from "react-icons/lu";

export const OrderBreadcrumb = () => {
  const { order, resetOrder } = useOrdersStore((state) => state);
  return (
    <div className="flex flex-row">
      <div className="bg-gray-300 w-1/10 border-r border-black">
        <p>Order #{order.id}</p>
        <br />
        <button onClick={resetOrder}> <LuChevronLeft /> Back to Orders</button>
      </div>
      <div className="w-9/10">
        <ItemsStoreProvider>
          <Items />
        </ItemsStoreProvider>
      </div>
    </div>
  );
};
