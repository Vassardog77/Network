//import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import { base_url } from "../../api";
const socket = io.connect(base_url);
const current_user = JSON.parse(localStorage.getItem('user'))

function MessageTest() {
  const [room, setRoom] = useState("");
  const [joinContent, setjoinContent] = useState(<div></div>);
  const [showChat, setShowChat] = useState(false);


  const joinRoom = (email1,email2) => { //join room function (Very Important)
    let room = email1+"/"+email2
    console.log(room)
    setRoom(room)
    socket.emit("join_room", room);
    setShowChat(true);
  }

  useEffect(() => {           
    axios.get(base_url+'/api/user/get')
    .then(response => {
      let user_array = []
        console.log(response.data)
        response.data.forEach(async user => {
          user_array.push(<div key={user.email}><button onClick={() => joinRoom(current_user.email,user.email)}>{user.email}</button></div>)
        })
        setjoinContent(<div>
              {user_array}
            </div>)
    })
}, [])


  return (
    <div className="chat_window_parent">
      <div className="join_chat_container">
          {joinContent}
          </div>
      {!showChat ? (
        <div></div>
      ) : (
        <Chat socket={socket} username={current_user.screen_name} room={room} />
      )}
    </div>
  );
}

export default MessageTest;
