import React from 'react';

type Developer = {
  id: number;
  name: string;
  role: string;
};

const developers: Developer[] = [
  { id: 1, name: 'Alice', role: 'Frontend Developer' },
  { id: 2, name: 'Bob', role: 'Backend Developer' },
  { id: 3, name: 'Charlie', role: 'Full Stack Developer' },
];

const DevelopersPage = () => {
  return (
    <div>
      <h1>Developers List</h1>
      <ul>
        {developers.map((dev) => (
          <li key={dev.id}>
            <a href={`/developers/${dev.id}`}>
              {dev.name} - {dev.role}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevelopersPage;

