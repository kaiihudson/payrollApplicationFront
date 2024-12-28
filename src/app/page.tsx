
import Image from "next/image";
import Users from "./users/users";

export default function Home() {
  return (
    <div className="items-center justify-center flex flex-col gap-4">
      <Users />
    </div>
  );
}
