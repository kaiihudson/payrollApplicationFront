import { useInvoiceStore } from "@/providers/invoice-provider"
import { ItemsStoreProvider } from "@/providers/items-provider"
import { LuChevronLeft } from "react-icons/lu"
import ItemsList from "../items/itemsList"

export const InvoiceBreadcrumb = () => {
    const { invoice, resetInvoice } = useInvoiceStore((state) => state)
    return (
        <div className="flex flex-row">
            <div>
                <p>OC#{invoice.id}</p>
                <br />
                <p>Total: {invoice.invoiceTotal}</p>
                <br />
                <p>Clients: {invoice.orderList.length}</p>
                <br />
                <button onClick={resetInvoice}>
                    <LuChevronLeft /> Back to Invoices
                </button>
            </div>
            <div>
                <ItemsStoreProvider>
                    <ItemsList invoice={invoice} />
                </ItemsStoreProvider>
            </div>
        </div>
    )
}