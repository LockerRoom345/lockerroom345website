import {React,useState} from "react";
import "./Helpuse.css";
import { Button } from "@material-ui/core";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

const Helpuse = () => {

const { user } = useSelector((state) => state.user);
  return (
    // <div className="helpuseContainer">
    //  <ReactPlayer url='https://youtu.be/2LFjBufoBz8' />
    // </div>
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url= {user && user.role=="user" ? "https://www.youtube.com/watch?v=V7Zy23qiQOk" : "https://www.youtube.com/watch?v=E5QQME6si1Q"}
        playing= "false"
        playIcon     
        controls="true"  
        config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }          
          }}
      />
    </div>
  );
};

export default Helpuse;
