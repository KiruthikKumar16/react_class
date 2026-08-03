import { useState } from 'react';
import TeamMember from './TeamMember';
import './App.css';
import Counter from './Counter';

const initialPeople = [
  {
    id: 1,
    name: 'Kiruthik Kumar',
    role: 'Full-Stack Trainer',
    photoUrl: 'https://placekitten.com/101/101',
    bio: 'Covers Spring Boot + React',
  },
  {
    id: 2,
    name: 'Anish',
    role: 'Backend Developer',
    photoUrl: 'https://placekitten.com/102/102',
    bio: 'Java + Spring specialist',
  },
  {
    id: 3,
    name: 'Priya',
    role: 'UI/UX Designer',
    photoUrl: 'https://placekitten.com/103/103',
    bio: '',
  },
  {
    id: 4,
    name: 'Ravi',
    role: 'QA Engineer',
    photoUrl: 'https://placekitten.com/104/104',
    bio: 'Automation + manual testing',
  },
];

function App() {
  const [people, setPeople] = useState(initialPeople);
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');

  // Bonus: filter by name as you type
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  // Bonus 2: add a new member to the array (never mutate directly)
  function handleAddMember(event) {
    event.preventDefault();
    if (!newName.trim() || !newRole.trim()) return;

    const newPerson = {
      id: Date.now(), // simple unique id for a classroom demo
      name: newName,
      role: newRole,
      photoUrl: 'https://placekitten.com/105/105',
      bio: '',
    };

    setPeople([...people, newPerson]);
    setNewName('');
    setNewRole('');
  }

  return (
    <div className="page">
      <h2>Team Roster</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="roster-row">
        {filteredPeople.map((person) => (
          <TeamMember
            key={person.id}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            bio={person.bio}
          />
        ))}
      </div>

      <h3>Add Member</h3>
      <form onSubmit={handleAddMember} className="add-form">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button type="submit">Add Member</button>
      </form>
      <Counter/ >
    </div>
  );
}

export default App;
