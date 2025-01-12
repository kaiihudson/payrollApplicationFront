"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  LuArrowDownToLine,
  LuArrowUpFromLine,
  LuRefreshCw,
  LuCheckCheck,
  LuX,
} from "react-icons/lu";

import { useOrdersStore } from "@/providers/orders-provider";
import { usePeopleStore } from "@/providers/people-provider";
import Modal from "../../modal";
import { FormNewOrder } from "./orderModals/formNewOrder";
import { Order } from "@/stores/types";
import { ConfirmDeleteOrder } from "./orderModals/confirmDeleteOrder";

export const OrdersList = () => {
  const {
    orders,
    completedOrders,
    pages,
    fetchOrders,
    selectOrder,
    createOrder,
    fetchCompletedOrders,
    deleteOrder,
  } = useOrdersStore((state) => state);
  const { person } = usePeopleStore((state) => state);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const intialOrder: Order = {
    id: 0,
    creationDate: new Date(),
    orderStatus: "",
    executionDate: new Date(),
    retailer: "",
  };
  const [order, setOrder] = useState<Order>(intialOrder);

  useEffect(() => {
    fetchOrders(person.id);
    fetchCompletedOrders(person.id);
  }, []);

  const closeCreate = () => {
    setIsCreateOpen(false);
    fetchOrders(person.id);
  };
  const openDelete = (order: Order) => {
    setIsDeleteOpen(true);
    setOrder(order);
  };
  const closeDelete = () => {
    setIsDeleteOpen(false);
    fetchOrders(person.id);
  };

  return (
    <div className="w-full">
      <button
        onClick={() => {
          setIsCreateOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Create Order
      </button>
      {orders.length == 0 && <h1>No orders found</h1>}
      {orders?.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-r border-black">Status</th>
              <th className="border-r border-black">Order Number</th>
              <th className="border-r border-black">Creation Date</th>
              <th className="border-r border-black">Retailer</th>
              <th className="border-r border-black">Last Execution</th>
              <th className="border-r border-black">Actions</th>
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
                  {order.executionDate ? (
                    <td className="border-r border-black">
                      {format(order.executionDate, "dd/MM/yyyy")}
                    </td>
                  ) : (
                    <td className="border-r border-black">NOT EXECUTED</td>
                  )}
                  <td>
                    <button
                      onClick={() => openDelete(order)}
                      className="bg-red-100 text-red px-2 py-1 rounded-lg hover:bg-red-300"
                    >
                      Abort Order
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <br />
      <p>Previous Orders</p>
      <br />
      {pages > 1 && (
        <div className="flex flex-row">
          {Array.from({ length: pages }, (_, i) => (
            <div key={i}>
              <button
                onClick={() => fetchCompletedOrders(person.id, i)}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              >
                {i + 1}
              </button>
            </div>
          ))}
        </div>
      )}
      {completedOrders?.length == 0 && <h1>No orders found</h1>}
      {completedOrders?.length > 0 && (
        <table>
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
            {completedOrders.map((order: Order) => (
              <tr key={order.id}>
                <td>
                  {order.orderStatus == "COMPLETE" && (
                    <LuCheckCheck color="#37323E" strokeWidth={2} size={24} />
                  )}
                  {order.orderStatus == "ABORTED" && (
                    <LuX color="#DC143C" strokeWidth={2} size={24} />
                  )}
                </td>
                <td> Order #{order.id}</td>
                <td>{format(order.creationDate, "dd/MM/yyyy")}</td>
                <td>{order.retailer}</td>
                {order.executionDate ? (
                  <td>{format(order.executionDate, "dd/MM/yyyy")}</td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal isOpen={isCreateOpen} onClose={closeCreate}>
        <FormNewOrder
          person={person}
          createOrder={createOrder}
          closeModal={closeCreate}
        />
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <ConfirmDeleteOrder
          order={order}
          deleteOrder={deleteOrder}
          closeDelete={closeDelete}
        />
      </Modal>
    </div>
  );
};
