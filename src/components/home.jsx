import React, {useState} from 'react';
import thumbnail from "../images/thumbnail.png";
import backgroundImage from "../images/background.jpg";
import { Link, useNavigate } from 'react-router-dom';
import Gamepage from './gamepage';

const home=()=>{
    const [name, setName] = useState('binit');
    const [difficulty,setdifficulty]=useState('Easy');
    
    const navigate = useNavigate();
    function validate(){
        if(name.length ==0 || name.trim() ==""){
            alert ('Name not Entered');
            return;
        }
        else{
          // console.log("game page");
          // <Link to='/gamepage'>Game Page</Link>
            // <Link to={{pathname: '/gamepage', state:{level:difficulty, user: name}}}></Link>
            navigate('/gamepage',{state:{level:difficulty, user:name}} );
        }
    }
     
    return(
        <div
      className="background"
      
    >
      <img id='thumbnail' src={thumbnail} alt="Thumbnail of game" />
      <div className="title">Fast Finger</div>
      <div className="subtitle">
        -------------------the ultimate typing game----------------
      </div>
      
      {/* <input id="name" type="text" required placeholder="Enter your Name" onclick={navigate('/gamepage')} /> */}
      <input id="name" type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)}  />
      <div></div>
      <select name="difficulty" id="difficulty"  onChange={(e)=>setdifficulty(e.target.value)}  >
        <option value="Easy">Easy Level</option>
        <option value="Medium">Medium Level</option>
        <option value="Difficult">Difficult Level</option>
      </select>
      <br />
      <button id="enter" style={{cursor:'pointer'}} onClick={() => {
            validate()
          }} > Start Game</button>
      
     
    </div>
    );
};

export default home;