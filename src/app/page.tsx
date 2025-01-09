
import {PeopleStoreProvider} from "@/providers/people-provider";
import { People } from "./users/people";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">Welcome to the Payroll App</h1>
      </header>
      <nav className="mb-8">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/users" className="text-blue-500 hover:underline">Users</Link>
          </li>
          <li>
            <Link href="/admin" className="text-blue-500 hover:underline">Admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
