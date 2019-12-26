import React, { createContext, useReducer } from "react";
import io from 'socket.io-client';

export const CTX = createContext();

const initialState = {
    general: [
        {from: 'alan', msg: 'hello'},
        {from: 'alan', msg: 'hello2'},
        {from: 'alan', msg: 'hello3'},
    ],
    topic2: [
        {from: 'alan2', msg: 'hello4'},
        {from: 'alan2', msg: 'hello5'},
        {from: 'alan2', msg: 'hello6'},
    ]
}

const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic], //trae todos los mensasjes
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
};


let socket;

const sendChatAction = (value) => {
  socket.emit('chat message', value);
}
const Store = ({children}) => {

  if(!socket) {
    socket = io(':5000')
  }

  const user = 'alan' + Math.random(100).toFixed(2)

  const [allChats] = useReducer(reducer, initialState);
  return (
    <CTX.Provider value={{allChats, sendChatAction, user}}>
        {children}
    </CTX.Provider>
  );
};

export default Store;
