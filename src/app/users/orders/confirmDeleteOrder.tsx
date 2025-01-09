import { Order } from "@/stores/types";

export const ConfirmDeleteOrder = ({
  deleteOrder,
  closeDelete,
  order,
}: {
  deleteOrder: Function;
  closeDelete: Function;
  order: Order;
}) => {
    const deleteAndClose = async (id: number) => {
        await deleteOrder(id)
        closeDelete()
    }
    return (
    <div>
      <h1>Are you sure you want to Abort this Order</h1>
      <p>This process is permanent and it cannot be revoked.</p>
      <br />
      <div>Deleting Order #{order.id}</div>
      <div
        className="flex flex-row gap-2"
      >
        <button
            className="bg-red-100 text-red px-2 py-1 rounded-lg hover:bg-red-300"
          onClick={() => {
            deleteAndClose(order.id);
          }}
        >
          Delete
        </button>
        <button
            className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300"
          onClick={() => {
            closeDelete();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
