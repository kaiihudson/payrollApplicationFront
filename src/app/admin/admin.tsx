"use client";

import { useState } from "react";
import CreateInvoice from "./createInvoice";
import InvoiceList from "./invoiceList";
import UpdateInvoice from "./udpateInvoice";
import { OrdersStoreProvider } from "@/providers/orders-provider";
import Modal from "../modal";

const Admin = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(true);
  const closeCreate = () => {
    setIsOpenCreate(false);
  };
  const openUpdate = () => {
    setIsOpenUpdate(!isOpenUpdate)
  }
  return (
    <div>
      <div>
        <InvoiceList openUpdate={openUpdate} />
      </div>
      <button
      className="bg-blue-500 text-white rounded-lg px-2 py-1 hover:bg-blue-300"
        onClick={() => {
          setIsOpenCreate(!isOpenCreate);
        }}
      >
        Create OC
      </button>
      <br />
      <Modal isOpen={isOpenCreate} onClose={closeCreate}>
        <OrdersStoreProvider>
          <CreateInvoice />
        </OrdersStoreProvider>
      </Modal>
      <div hidden={isOpenUpdate}>
        <UpdateInvoice />
      </div>
    </div>
  );
};

export default Admin;
