import { useInvoiceStore } from "@/providers/invoice-provider";
import { useOrdersStore } from "@/providers/orders-provider";
import { Invoice } from "@/stores/types";
import { useEffect } from "react";

const InvoiceList = ({openUpdate} : {openUpdate: Function}) => {
  const { invoices, fetchAllInvoices } = useInvoiceStore((state) => state);
  useEffect(() => {
    fetchAllInvoices();
  }, []);
  return (
    <div>
      {invoices.length == 0 && <div>No invoices!</div>}
      {invoices?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Account</th>
              <th>Status</th>
              <th>Total</th>
              <th>Clients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.length &&
              invoices.map((invoice: Invoice) => (
                <tr key={invoice.id}>
                  <td>OC #{invoice.id}</td>
                  <td>{invoice.loader}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.invoiceTotal}</td>
                  <td>{invoice.orderList.length}</td>
                  <th><button onClick={()=> {openUpdate()}}>Update</button></th>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;
