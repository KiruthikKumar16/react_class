import Avatar from './Avatar';
import ProfileInfo from './ProfileInfo';
import TeamMember from './TeamMember';
import './App.css';

function App() {
  return (
    <div className="page">
      {/* Part 1: single profile card built from Avatar + ProfileInfo */}
      <div className="card">
        <h1>Team Roster</h1>
       {/* <Avatar src="https://images.pexels.com/photos/32116697/pexels-photo-32116697.jpeg" />
        <ProfileInfo name="Kiruthik Kumar" role="Full-Stack Trainer" />*/}
      </div>

      <hr />

      {/* Part 1: single profile card built from Avatar + ProfileInfo*/}
      <div className="card">
      <Avatar src="https://images.pexels.com/photos/32116697/pexels-photo-32116697.jpeg" />
      <ProfileInfo />
      </div>

      <hr />

      {/* Part 2: reusable ProfileInfo, 3 different people from same component 
      <div className="roster-row">
        <ProfileInfo name="Kiruthik Kumar" mjkiop-o99oo----------------------------------Anish" role="Developer" />
        <ProfileInfo name="Priya" role="Designer" />
      </div>
      */}

      <hr />

      {/* Part 3: hands-on lab solution — TeamMember roster 
      <h2>Team Roster</h2>
      <div className="roster-row">
        <TeamMember
          name="Kiruthik Kumar"
          role="Full-Stack Trainer"
          photoUrl="https://images.pexels.com/photos/32116697/pexels-photo-32116697.jpeg"
          bio="Covers Spring Boot + React"
        />
        <TeamMember
          name="Anish"
          role="Backend Developer"
          photoUrl="https://images.pexels.com/photos/32116697/pexels-photo-32116697.jpeg"
          bio="Java + Spring specialist"
        />
        <TeamMember
          name="Priya"
          role="UI/UX Designer"
          photoUrl="https://images.pexels.com/photos/32116697/pexels-photo-32116697.jpeg"
        />
        <TeamMember
          name="Ravi"
          role="QA Engineer"
          photoUrl="https://images.pexels.com/photos/32116697/pexels-photo-32116697.jpeg"
          bio="Automation + manual testing"
        />
      </div>*/}
    </div>
  );
}

export default App;
