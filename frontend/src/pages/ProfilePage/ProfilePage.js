import React from 'react'; 
import './ProfilePage.css';
import SubmitModal from '../../components/SubmitModal/SubmitModal'

function ProfilePage(props){
  return (
    <div className="profile-page">
      <h1>This is the profile page</h1>
      <SubmitModal />
    </div>
  );
}
export default ProfilePage
