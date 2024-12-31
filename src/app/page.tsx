
import {PeopleStoreProvider} from "@/providers/people-provider";
import { People } from "./users/people";

export default function Home() {
  return (
    <PeopleStoreProvider>
      <People />
    </PeopleStoreProvider>
  );
}
