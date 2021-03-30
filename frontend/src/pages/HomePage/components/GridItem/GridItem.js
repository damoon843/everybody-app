import React, {useState, useRef, useEffect} from 'react';
import './GridItem.css';

function GridItem(props) {
  const renderWorkout = () => {
    const workout = document.createElement('div');
    const imageElt = document.createElement('img');
    const titleElt = document.createElement('p');
    const durationElt = document.createElement('p');
    const userElt = document.createElement('p');

    const imageSrc = "https://media1.s-nbcnews.com/j/newscms/2021_05/1668898/runningshoes-210202-bd-2x1_086fea1a6326b8c7828617d9df71a35a.fit-1240w.jpg"
    const titleText = props.title;
    const durationText = props.duration;
    const userText = props.user;

    imageElt.src = imageSrc;
    titleElt.innerText = titleText;
    durationElt.innerText = durationText;
    userElt.innerText = userText;

    imageElt.className = 'grid-image';
    titleElt.className = 'grid-title';
    durationElt.className = 'grid-duration';
    userElt.className = 'grid-user';

    workout.append()
  }

  return (
    <div className="grid-item">
      
    </div>
  );
}

export default GridItem;