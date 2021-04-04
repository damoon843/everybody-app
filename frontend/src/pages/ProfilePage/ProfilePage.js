import React from 'react'; 
import SubmitModal from '../SubmitModal/SubmitModal'
import './ProfilePage.css';

function ProfilePage(props){
  return (
    <div className="profile-page">
      <h1>This is the profile page</h1>
      <SubmitModal />
    </div>
  );
}
export default ProfilePage
