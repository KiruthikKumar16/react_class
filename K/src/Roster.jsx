import { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMember from './TeamMember';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9878';

function Roster() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchUsers() {
    setLoading(true);
    setError(null);
    axios.get(`${API_URL}/api/people`)
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
  }, []);

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
            role={user.role}
            photoUrl={`https://i.pravatar.cc/150?u=${user.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Roster;