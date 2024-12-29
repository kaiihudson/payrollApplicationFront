
import {PeopleStoreProvider} from "@/providers/people-provider";
import PeopleList from "./users/peopleList";

export default function Home() {
  return (
    <PeopleStoreProvider>
      <div className="items-center justify-center flex flex-col gap-4">
        <PeopleList />
      </div>
    </PeopleStoreProvider>
  );
}
