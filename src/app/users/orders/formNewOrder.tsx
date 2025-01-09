"use client";

import { PartialOrder, Person } from "@/stores/types";
import Form from "next/form";

export const FormNewOrder = ({
  person,
  createOrder,
  closeModal,
}: {
  person: Person;
  createOrder: Function;
  closeModal: Function;
}) => {
  const createNewOrder = (formData: FormData) => {
    const retailer = formData.get("retailer");
    const data: PartialOrder = {
      retailer: retailer as string,
      userId: person.id,
    };
    createOrder(data);
    closeModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold justify-center flex">Creating order</h1>
      <p className="text-sm text-gray-500 justify-center flex">
        Creating order for {person.name}
      </p>
      <Form action={createNewOrder} className="flex flex-col">
        <label htmlFor="retailer">Retailer</label>
        <input type="text" id="retailer" name="retailer" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
