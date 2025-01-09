"use client";

import { usePeopleStore } from "@/providers/people-provider";
import Form from "next/form";

export const FormNewPerson = ({closeModal}:{closeModal: Function}) => {
  const { createPerson } = usePeopleStore((state) => state);

  const createPersonAndCloseModal = async (formData: FormData)=> {
    await createPerson(formData)
    closeModal()
  }


  //TODO: add some sort of animation to confirm the creation of the user
  //^ means promises?
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold justify-center flex">Add a person</h1>
        <p className="text-sm text-gray-500 justify-center flex">
          Close this modal to check your new users
        </p>
      </div>
      <Form action={createPersonAndCloseModal} className="flex flex-col">
        <label htmlFor="firstName">Name</label>
        <input type="text" id="firstName" name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" />
        <label htmlFor="phoneNum">Phone Number</label>
        <input type="text" id="phoneNum" name="phoneNum" />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
