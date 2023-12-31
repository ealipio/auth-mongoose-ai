import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import Chat from "@/components/chat-mendable";
import { LoginButton, LogoutButton } from "@/components/auth/buttons";

const LinkList = () => {
  return (
    <ul className="flex justify-between gap-2">
      <li className="">
        <Link className="font-semibold " href="/auth">
          Auth
        </Link>
      </li>
      <li>
        <Link className="font-semibold " href="/profile/student">
          Student
        </Link>
      </li>
      <li>
        <Link className="font-semibold " href="/profile/teacher">
          Teacher
        </Link>
      </li>
      <li>
        <Link className="font-semibold " href="/repos">
          Repos
        </Link>
      </li>
    </ul>
  );
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LinkList />
      <p className="font-nunito">{session?.user?.name}</p>
      <div className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          Hello
        </button>

        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          Hello
        </button>
        {/*
        <button className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Hello</button>
         */}
      </div>
      <div className="flex gap-2">
        <LoginButton />
        <LogoutButton />
      </div>
      <Chat />
    </main>
  );
}
