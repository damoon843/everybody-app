import React, {useEffect, useState} from 'react';
import './Sidebar.css';

function Sidebar(props){
  /*
  1. may want to have all of the exercises intially rendered/displayed as a json object
  this way we can organize/display the keys
   */

    const [abs, setAbs] = useState(false);
    const [chest, setChest] = useState(false);
    const [legs, setLegs] = useState(false);

    const checkClick = (e)=> {
        var {name, checked} = e.target
        /*

         */

    }


  return (
      <div>
        <h1>Filters</h1>
        <hr/>
        <h3>BodyPart</h3>
        <input type = "checkbox" name = "abs" onChange={checkClick}/> abs &nbsp;&nbsp;
        <input type = "checkbox" name = "chest" onChange={checkClick}/> chest &nbsp;&nbsp;
        <input type = "checkbox" name = "legs" onChange={checkClick}/>legs &nbsp;&nbsp;
          <hr/>
        <h3>Ratings</h3>
        <input type = "checkbox" name = "1 Star" onChange={checkClick}/>1 Star &nbsp;&nbsp;
        <input type = "checkbox" name = "2 Star" onChange={checkClick}/>2 Star &nbsp;&nbsp;
        <input type = "checkbox" name = "3 Star" onChange={checkClick}/>3 Star &nbsp;&nbsp;

      </div>
  );
}
export default Sidebar