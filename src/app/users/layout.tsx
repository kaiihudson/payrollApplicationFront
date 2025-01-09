import { PeopleStoreProvider } from "@/providers/people-provider";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return <PeopleStoreProvider>{children}</PeopleStoreProvider>;
};

export default UsersLayout;
