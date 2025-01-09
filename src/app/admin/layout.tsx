import { InvoiceStoreProvider } from "@/providers/invoice-provider"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <InvoiceStoreProvider>
            {children}
        </InvoiceStoreProvider>
    )
}

export default AdminLayout