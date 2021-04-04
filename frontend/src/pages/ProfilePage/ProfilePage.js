import React from 'react'; 
import './ProfilePage.css';
import UserProfile from "../HomePage/components/UserProfile/UserProfile";
import SubmitModal from '../../components/SubmitModal/SubmitModal'
import Main from "../HomePage/components/Main/Main";




function ProfilePage(props){
  return (
    <div className="profile-page">
      <h1>This is the profile page</h1>
      <SubmitModal />
    </div>
  );
}
export default ProfilePage
