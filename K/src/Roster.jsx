import { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMember from './TeamMember';

function Roster() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchUsers() {
    setLoading(true);
    setError(null);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []); // run once on mount

  if (loading) return <p>Loading users...</p>;

  if (error) {
    return (
      <div>
        <p>Something went wrong: {error}</p>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    );
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
        {filteredUsers.map((user) => (
          <TeamMember
            key={user.id}
            name={user.name}
            role={user.company.name}
            photoUrl={`https://i.pravatar.cc/150?u=${user.id}`}
            bio={user.email}
          />
        ))}
      </div>
    </div>
  );
}

export default Roster;
