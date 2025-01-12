import { createStore } from 'zustand/vanilla'
import { Person } from './types'
import fetcher from '@/lib/fetcher'

export type PeopleState = {
    people: Person[]
    person: Person
    pages: number
    page: number
}

export type PeopleActions = {
    fetchPeople: (page?: number) => Promise<void>
    createPerson: (formData: FormData) => Promise<void>
    deletePerson: (id: number) => void
    selectPerson: (person: Person) => void
    resetPerson: () => void
}

export type PeopleStore = PeopleState & PeopleActions

export const defaultPeopleState: PeopleState = {
    people: [],
    person: {
        id: 0,
        firstName: '',
        lastName: '',
        phoneNum: '',
        address: ''
    },
    pages: 1,
    page: 1
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createPeopleStore = (
    initState: PeopleState = defaultPeopleState,
) => createStore<PeopleStore>((set) => ({
    ...initState,
    fetchPeople: async (page?) => {
        if (page) {
            const res = await fetcher(`${apiUrl}/api/v1/people?page=${page}`)
            let peopleList: Person[] = []
            if (res._embedded) {
                peopleList = res._embedded.entityModelList
            } 
            set({ people: peopleList, pages: res?.page?.totalPages, page: page })
        } else {
            const res = await fetcher(`${apiUrl}/api/v1/people`)
            let peopleList: Person[] = []
            if (res._embedded) {
                peopleList = res._embedded.entityModelList
            } 
            set({ people: peopleList, pages: res?.page?.totalPages })
        }
    },
    createPerson: async (formData: FormData) => {
        const obj: any = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            phoneNum: formData.get("phoneNum"),
            address: formData.get("address"),
        };
        await fetcher(`${apiUrl}/api/v1/people`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
    },
    selectPerson: (person: Person) => set({ person }),
    resetPerson: () => set({ person: defaultPeopleState.person }),
    deletePerson: (id: number) => {
        fetch(`${apiUrl}/api/v1/person/${id}`, {
            method: "DELETE",
        });
    }
}))
