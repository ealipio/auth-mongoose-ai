import * as React from "react";

async function fetchRepos() {
  const options = {
    next: {
      revalidate: 10,
    },
  };

  const response = await fetch(process.env.GITHUB_REPOS as string, options);
  const json = await response.json();

  // await new Promise((resolve, _reject) => {
  //   setTimeout(resolve, 5000);
  // });

  return json;
}

interface IRepository {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface IReposProps {}

const Repository = ({ repository }: { repository: IRepository }) => {
  return (
    <div
      className="m-4 rounded-md border-2 border-green-500 bg-black p-4 text-indigo-400"
      key={repository.id}
    >
      <p>{repository.name}</p>
      <p>{repository.description}</p>
      <p>{repository.created_at}</p>
    </div>
  );
};

const RepositoryList = ({ repositories }: { repositories: IRepository[] }) => {
  return repositories.map((repository: IRepository) => {
    return <Repository key={repository.id} repository={repository} />;
  });
};

export default async function Repos(props: IReposProps) {
  const repositories: IRepository[] = await fetchRepos();

  return (
    <div className="h-screen bg-black p-4 text-lime-400">
      <h3>Welcome to my Repos</h3>
      <RepositoryList repositories={repositories} />
    </div>
  );
}
