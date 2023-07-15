import Chat from '@/components/chat/chat-box';

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

const fetchOptions = { next: { revalidate: 10 } };

//To fetch fresh data on every fetch request, use the cache: 'no-store' option.
//const fetchOptions = { cache: 'no-store' };

async function getUsersLogged() {
  const response = await fetch('http://localhost:3000/api/auth', fetchOptions);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function Home() {
  const users = await getUsersLogged();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen items-center justify-center">
      <div className="bg-slate-400 p-4 rounded-md text-white antialiased w-72 text-sm">
        <h2 className="text-lg font-semibold">Users logged:</h2>
        {users.map((user: User) => {
          return <div key={user._id}>{user.name}</div>;
        })}
      </div>

      <Chat />
    </div>
  );
}
