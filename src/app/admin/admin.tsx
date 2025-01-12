"use client";

import { useInvoiceStore } from "@/providers/invoice-provider";
import Invoices from "./invoices/invoices";
import { ItemsStoreProvider } from "@/providers/items-provider";
import { InvoiceBreadcrumb } from "./invoices/invoiceBreadcrumb";


const Admin = () => {
  const { invoice } = useInvoiceStore((state) => state)
  return (
    <div>
      {invoice.id == 0 && (
        <Invoices />
      )}
      {invoice.id != 0 && (
        <ItemsStoreProvider>
          <InvoiceBreadcrumb />
        </ItemsStoreProvider>
      )}
    </div>
  )

};

export default Admin;
