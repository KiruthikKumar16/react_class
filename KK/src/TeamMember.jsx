function TeamMember({ name, role, photoUrl, bio }) {
  return (
    <div className="team-card">
      <img src={photoUrl} width="100" style={{ borderRadius: '50%' }} />
      <h3>{name}</h3>
      <p className="role">{role}</p>
      {bio && <p className="bio">{bio}</p>}
    </div>
  );
}

export default TeamMember;
