import React from 'react'; 
import './ProfilePage.css';
import ExpandedUserProfile from "./ExpandedUserProfile/ExpandedUserProfile";
import SubmitModal from '../../components/SubmitModal/SubmitModal'
import Main from "../HomePage/components/Main/Main";
import {Button} from "react-bootstrap";




function ProfilePage(props){
  return (
    <div className="profile-page">
        <div id = "prof-card">
            <ExpandedUserProfile/>
        </div>

      <SubmitModal />
        <hr/>
    </div>
  );
}
export default ProfilePage
