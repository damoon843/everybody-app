import React from 'react'; 
import Main from './components/Main/Main';
import UserProfile from './components/UserProfile/UserProfile';
import './HomePage.css';

function Home() {
  return (
    <div className="home">
      <UserProfile />
      <Main />
    </div>
  );
}

export default Home;
