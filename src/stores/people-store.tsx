import {createStore} from 'zustand/vanilla'

export type PeopleState = {
    people: object[] 
}

export type PeopleActions = {
    fetchPeople: () => void
    createPerson: (formData: FormData) => void
}

export type PeopleStore = PeopleState & PeopleActions

export const defaultPeopleState: PeopleState = {
    people: []
}

export const createPeopleStore = (
    initState: PeopleState = defaultPeopleState,
) => createStore<PeopleStore>((set) => ({
    ...initState,
    fetchPeople: () => {
        fetch('http://localhost:8080/api/v1/people')
            .then((res) => res.json())
            .then((json)=> json._embedded.personList)
            .then((people) => set({people}))
    },
    createPerson: (formData: FormData) => {
        const obj: any = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            phoneNum: formData.get("phoneNum"),
            address: formData.get("address"),
        };
        fetch("http://localhost:8080/api/v1/people", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
    }
}))
