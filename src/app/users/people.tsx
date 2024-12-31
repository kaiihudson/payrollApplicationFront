"use client";

import { usePeopleStore } from "@/providers/people-provider";
import PeopleList from "./peopleList";
import { PersonBreadcrumb } from "./personBreadcrumb";

export const People = () => {
  const { person } = usePeopleStore((state) => state);
  return (
    <div className="bg-gray-200 w-full">
      {person.id == 0 && (
        <div>
          <h1>Select a person</h1>
          <br />
          <PeopleList />
        </div>
      )}
      {person.id != 0 && (
        <div>
          <div>
            <PersonBreadcrumb />
          </div>
        </div>
      )}
    </div>
  );
};
