"use client";

import { useEffect } from "react";
import { format } from "date-fns";
import {
  LuArrowDownToLine,
  LuArrowUpFromLine,
  LuRefreshCw,
  LuCheckCheck,
} from "react-icons/lu";

import { useOrdersStore } from "@/providers/orders-provider";
import { usePeopleStore } from "@/providers/people-provider";

export const OrdersList = () => {
  const { orders, fetchOrders, selectOrder } = useOrdersStore((state) => state);
  const { person } = usePeopleStore((state) => state);
  useEffect(() => {
    fetchOrders(person.id);
  }, []);

  return (
    <div className="w-full">
      {orders.length == 0 && <h1>No orders found</h1>}
      {orders.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-r border-black">Status</th>
              <th className="border-r border-black">Order Number</th>
              <th className="border-r border-black">Creation Date</th>
              <th className="border-r border-black">Retailer</th>
              <th className="border-r border-black">Last Execution</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order: any) => (
                <tr key={order.id}>
                  <td className="border-r border-black">
                    {order.orderStatus == "CREATED" && (
                      <LuArrowUpFromLine
                        color="#6D6A75"
                        strokeWidth={2}
                        size={24}
                      />
                    )}
                    {order.orderStatus == "IN_PROGRESS" && (
                      <LuRefreshCw color="#DEB841" strokeWidth={2} size={24} />
                    )}
                    {order.orderStatus == "RECIEVED" && (
                      <LuArrowDownToLine
                        color="#DE9E36"
                        strokeWidth={2}
                        size={24}
                      />
                    )}
                    {order.orderStatus == "COMPLETE" && (
                      <LuCheckCheck color="#37323E" strokeWidth={2} size={24} />
                    )}
                  </td>
                  <td className="border-r border-black">
                    <button
                      value={order.id}
                      onClick={() => {
                        selectOrder(order);
                      }}
                    >
                      Order #{order.id}
                    </button>
                  </td>
                  {order.creationDate && (
                    <td className="border-r border-black">
                      {format(order.creationDate, "dd/MM/yyyy")}
                    </td>
                  )}
                  <td className="border-r border-black">{order.retailer}</td>
                  {order.executionDate? (
                    <td className="border-r border-black">
                      {format(order.executionDate, "dd/MM/yyyy")}
                    </td>
                  ) : <td className="border-r border-black">NOT EXECUTED</td>}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
