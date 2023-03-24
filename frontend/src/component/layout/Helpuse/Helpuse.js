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
        url= {user && user.role=="user" ? "https://youtu.be/znkemTAq2AA" : "https://youtu.be/sbiujBRjY3M"}
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
