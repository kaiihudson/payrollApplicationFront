"use client";

import { usePeopleStore } from "@/providers/people-provider";
import React, { useState, useEffect } from "react";
import Modal from "../modal";
import Form from "next/form";
import { FormNewPerson } from "./formNewPerson";
import { ConfirmDelete } from "./confirmDelete";
import { Person } from "@/stores/types";

export default function PeopleList() {
  const { people, fetchPeople, selectPerson, pages, page } = usePeopleStore(
    (state) => state
  );

  useEffect(() => {
    fetchPeople();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const initialPerson: Person = {
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    phoneNum: "",
  };
  const [person, setPerson] = useState<Person>(initialPerson);

  const openModal = () => setIsModalOpen(true);
  const openDeleteModal = (person: Person) => {
    setPerson(person);
    setConfirmModalOpen(true);
  };
  const closeDeleteModal = () => {
    setConfirmModalOpen(false);
    fetchPeople(page);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    fetchPeople(page);
  };

  return (
    <div className="w-full">
      <div className="flex mt-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-7/10"
        >
          Add Person
        </button>
      </div>
      <br />
      {pages > 1 && (
        <div className="flex flex-row">
          {Array.from({ length: pages }, (_, i) => (
            <div key={i}>
              <button
                onClick={() => fetchPeople(i)}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              >
                {i + 1}
              </button>
            </div>
          ))}
        </div>
      )}
      {/* TODO: add search function */}
      <table>
        <thead>
          <tr>
            {/* TODO: erase this */}
            <th className="border-r border-black">ID</th>
            <th className="border-r border-black">Name</th>
            <th className="border-r border-black">Phone Number</th>
            <th className="border-r border-black">Address</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: any) => (
            <tr key={person.id}>
              <td className="border-r border-black">{person.id}</td>
              <td className="border-r border-black">
                <button
                  value={person.id}
                  onClick={() => {
                    selectPerson(person);
                  }}
                >
                  {person.name}
                </button>
              </td>
              <td className="border-r border-black align-right">
                {person.phoneNum}
              </td>
              <td className="border-r border-black">{person.address}</td>
              <td className="border-r border-black">
                <button
                  className="bg-red-100 text-red px-2 py-1 rounded-lg hover:bg-red-300"
                  onClick={() => openDeleteModal(person)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormNewPerson closeModal={closeModal} />
      </Modal>
      <Modal isOpen={isConfirmModalOpen} onClose={closeDeleteModal}>
        <ConfirmDelete person={person} closeModal={closeDeleteModal} />
      </Modal>
    </div>
  );
}
