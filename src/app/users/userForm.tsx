"use client";

import Form from "next/form";
import { createPerson } from "./actions";
import { useState } from "react";

export default function UserForm({people}: any): any {
  const [isOpen, setOpen] = useState(false);
  const [newPeople, setPeople] = useState(people);
  function toggleForm () {
    // llamar a la API
    // const fetchData = async () => {
    //   const data = await fetch("http://localhost:8080/api/v1/people");
    //   const peopleResponse = await data.json();
    //   setPeople(peopleResponse._embedded.personList)
    // }
    // refrescar el valor de la lista
    // fetchData()
    setOpen(!isOpen)
  };

  return (
    <div>
      <button onClick={toggleForm} className="button">Create new Person</button>
      {isOpen && (
        <Form action={createPerson} className="flex flex-col gap-2 gray-bg p-4">
          <label htmlFor="first_name">Name</label>
          <input type="text" id="first_name" name="first_name" />
          <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" name="last_name" />
          <label htmlFor="phoneNum">Phone Number</label>
          <input type="text" id="phoneNum" name="phoneNum" />
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" />
          <button 
          type="submit"
          onClick={toggleForm}
          >Submit</button>
        </Form>
      )}
    </div>
  );
}
