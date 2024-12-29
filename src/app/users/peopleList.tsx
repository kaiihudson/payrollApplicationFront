"use client";

import { usePeopleStore } from "@/providers/people-provider";
import React, { useState, useEffect } from "react";
import Modal from "../modal";
import Form from "next/form";

export default function PeopleList() {
  const { people, fetchPeople, createPerson } = usePeopleStore((state) => state);

  useEffect(() => {
    fetchPeople();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchPeople();
  }

  return (
    <div>
      <ul>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person: any) => (
              <tr key={person.id}>
                <td>
                  {person.firstName} {person.lastName}
                </td>
                {/* TODO: change this to an anchor to create the next view using this value
                as breadcrumb in order to come back here */}
                <td>{person.phoneNum}</td>
                <td>{person.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: PAGINATION on x results... 
        needs backend integration?
        how to manage coming back to the same view that the user left before? */}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-7/10"
        >
          Add Person
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h1
            className="text-2xl font-bold justify-center flex"
          >Add a person</h1>
          <p
            className="text-sm text-gray-500 justify-center flex"
          >
            Close this modal to check your new users</p>
        </div>
        <Form action={createPerson} className="flex flex-col">
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
        {/* TODO: add some sort of animation to signal that the user has saved
        correctly. does that need to change the void in the store to a promise?
        if so. how to handle? */}
      </Modal>
    </div>
  );
}
