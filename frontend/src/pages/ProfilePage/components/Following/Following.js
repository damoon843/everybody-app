import React, {useEffect, useState} from 'react';
import {getAllExercises, getRecommendations} from '../../../../api';
import Workout from '../../../../components/Workout/Workout';
import './Following.css';
import axios from "axios";
import {getFollowing} from '../../../../api'
import {unfollowUser} from "../../../../api";
import ExerciseItem from "../../../HomePage/components/WorkoutModal/ExerciseItem";

function Following(props) {
    //const [following, setFollowing] = useState(props.following);
    let following = props.following
    const sampleData = [{id: 1, title: "Workout 1", duration: "15 min", user: "chrissy", thumbnail: "https://blog.fitbit.com/wp-content/uploads/2018/08/0816-summer-workouts-HERO.jpg", category: "cardio", tags: ["arms", "abs"]}, {id: 2, title: "Workout 2", duration: "30 min", user: "Spike", thumbnail: "https://cdn10.phillymag.com/wp-content/uploads/2016/12/running-shoe-cecilie-arcurs-istock-940x540.jpg", category: "bodyweight", tags: ["legs"]},
        {id: 3, title: "Workout 3", duration: "20 min", user: "Andy Van Dam", thumbnail: "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-carousel.jpg", category: "weights", tags: ["legs", "abs"]}];
    //const anchor = document.getElementById("following")
    //setFollowing(props.following)
    useEffect(() => {
        //getAllFollowing()
        console.log(props.following)
        renderFollowing()



    });//maybe update some according some
    // sort of boolean variable that changes when a user clicks unfollow
    //props.user
    const unfollow = (user) => {
        
        unfollowUser(user).then(result=>{
                console.log("unfollowed")
        }


        )

    }

    const renderFollowing=()=>{
        const anchor = document.getElementById("anchor")
        //anchor.innerHTML = '';
        if (following){
            following.forEach(user => {
                console.log(user)
                const container = document.createElement("div")
                const name = document.createElement("p")
                const followBtn = document.createElement("button")

                container.className = "f-container"
                name.className = "n-container"
                followBtn.innerText = "unfollow"
                followBtn.onclick = () =>{
                    unfollow(user)
                }
                followBtn.value = "unfollow"
                name.innerText = user
                container.append(name)
                container.append(followBtn)
                anchor.append(container)


                }
            );
        }

    }



     //*/
    /*
    const getAllFollowing = async () => {
        console.log(props.user)
        getFollowing(props.user).then(result => {
            console.log(result)
            //
            const data = Object.values(result)
            const keys = Object.keys(result)
            let exerciseList = [];
            for (let i = 0; i < keys.length; i++) {
                // const item = <ExerciseItem key={keys[i]} data={data[i]}/>
                const opt = <option value={keys[i]}>{data[i][6]}</option>
                exerciseList.push(opt)
            }
            console.log(exerciseList)
            //

            //assuming it returns an array of usernames
            setFollowing(result)
            renderFollowing()

        });
    }

     */


    /*

    const getFollowing = async () => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        await axios.get(
            "http://localhost:4567/publicExercises",
            config
        )
            .then(response => {
                const data = Object.values(response.data)
                const keys = Object.keys(response.data)
                let result = [];
                for (let i = 0; i < keys.length; i++) {
                    const item = <ExerciseItem key={keys[i]} data={data[i]}/>
                    result.push(item)
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

     */


    // sets state variable


    return (
        <div className = "following-pane" >
            <div id = "anchor">
            <h3 >FOLLOWING</h3>
            <div id="following"></div>
            </div>

        </div>
    );
}

export default Following;