import { OrdersStoreProvider } from "@/providers/orders-provider";
import { usePeopleStore } from "@/providers/people-provider";
import { Orders } from "../orders/orders";

export const PersonBreadcrumb = () => {
  const { person, resetPerson } = usePeopleStore((state) => state);
  return (
    <div className="flex flex-row w-screen">
      <div className="pr-5 bg-gray-300 w-1/10">
        <p>{person.firstName + " " + person.lastName}</p>
        <button onClick={resetPerson}>Back to People</button>
      </div>
      <div className="w-9/10">
        <OrdersStoreProvider>
          <Orders />
        </OrdersStoreProvider>
      </div>
    </div>
  );
};
