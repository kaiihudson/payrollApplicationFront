'use client'

import { usePeopleStore } from "@/providers/people-provider"
import { Person } from "@/stores/types"
import { useState } from "react"

export const ConfirmDelete = ({person, closeModal}:{person: Person, closeModal: Function}) => {
    const { deletePerson, fetchPeople} = usePeopleStore((state) => (state))
    return(
        <div>
            <p>Are you sure you want to erase</p>
            {person.name}
            <br />
            <div
                className="flex flex-row gap-2"
            >
                <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg"
                    onClick={() => {deletePerson(person.id); fetchPeople(); closeModal()}}
                >Confirm</button>
                <button
                    className="py-2 px-4 rouded-lg"
                    onClick={() => closeModal()}
                >Cancel</button>
            </div>
        </div>
    )
}