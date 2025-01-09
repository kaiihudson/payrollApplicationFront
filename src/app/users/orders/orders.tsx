import { useOrdersStore } from "@/providers/orders-provider";
import { OrderBreadcrumb } from "./orderBreadcrumb";
import { OrdersList } from "./ordersList";

export const Orders = () => {
  const { order } = useOrdersStore((state) => state);
  return (
    <div className="bg=gray-100">
      {order.id == 0 && (
        <div>
          <h1>Select an order</h1>
          <br />
          <OrdersList />
        </div>
      )}
      {order.id != 0 && (
        <div>
          <div>
            <OrderBreadcrumb />
          </div>
        </div>
      )}
    </div>
  );
};
