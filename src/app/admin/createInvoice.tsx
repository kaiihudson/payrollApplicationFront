"use client";

import { useOrdersStore } from "@/providers/orders-provider";
import { Order } from "@/stores/types";
import { format } from "date-fns";
import Form from "next/form";
import { useEffect, useState } from "react";

const CreateInvoice = () => {
  const { orders, fetchAllValidOrders } = useOrdersStore((state) => state);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0)
  useEffect(() => {
    fetchAllValidOrders();
  }, []);
  const saveAndClose = (formData: FormData) => {
    console.log("you did it!");
  };
  const handleAdd = (order: Order) => {
    if (selectedOrders.find((o) => o === order.id)) {
      setSelectedOrders(selectedOrders.filter((o) => o !== order.id));
      if (order.orderTotal) {
        setTotal(total - order.orderTotal)
      }
    } else {
      setSelectedOrders([...selectedOrders, order.id]);
      if (order.orderTotal) {
        setTotal(total + order.orderTotal)
      }
    }
  };
  return (
    
    <div>
      <div>
        <Form action={saveAndClose} className="flex flex-col">
          <label htmlFor="loader">Quien Carga?</label>
          <input type="text" name="loader" id="loader" required />
          <label htmlFor="total">Total de la orden</label>
          <p>{total}</p>
          <input type="text" name="total" id="total" hidden defaultValue={total} />
          <input type="text" name="orderList" id="orderList" hidden defaultValue={selectedOrders.toString()} />
          <button type="submit">Submit</button>
          <div>
            {orders.length == 0 && <p>No valid orders!</p>}
            {orders.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Selected?</th>
                    <th>Id</th>
                    <th>Retailer</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Created</th>
                    <th>Executed</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: Order) => (
                    <tr key={order.id}>
                      <td>
                        <button onClick={() => handleAdd(order)}>
                          {selectedOrders.find((p) => p === order.id)
                            ? "Remove"
                            : "Add"}
                        </button>
                      </td>
                      <td>{order.id}</td>
                      <td>{order.retailer}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.orderTotal}</td>
                      <td>{format(order.creationDate, "dd/MM/yyyy")}</td>
                      <td>
                        {order.executionDate
                          ? format(order.executionDate, "dd/MM/yyyy")
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateInvoice;
