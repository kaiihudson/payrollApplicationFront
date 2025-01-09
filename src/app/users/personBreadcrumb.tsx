import { OrdersStoreProvider } from "@/providers/orders-provider";
import { usePeopleStore } from "@/providers/people-provider";
import { Orders } from "./orders/orders";
import { LuChevronLeft } from "react-icons/lu";

export const PersonBreadcrumb = () => {
  const { person, resetPerson } = usePeopleStore((state) => state);
  return (
    <div className="flex flex-row">
      <div className="px-2 border-r border-black bg-gray-300 rounded-l-lg">
        <p>{person.name}</p>
        <br />
        <button onClick={resetPerson}> <LuChevronLeft/> Back to People</button>
      </div>
      <div className="w-9/10">
        <OrdersStoreProvider>
          <Orders />
        </OrdersStoreProvider>
      </div>
    </div>
  );
};
