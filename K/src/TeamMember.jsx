import { useState } from 'react';

function TeamMember({ name, role, photoUrl, bio }) {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="team-card">
      <img src={photoUrl} width="100" style={{ borderRadius: '50%' }} />
      <h3>{name}</h3>
      <p className="role">{role}</p>

      {bio && (
        <button onClick={() => setShowBio(!showBio)}>
          {showBio ? 'Hide bio' : 'Show bio'}
        </button>
      )}

      {showBio && <p className="bio">{bio}</p>}
    </div>
  );
}

export default TeamMember;
