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

const sendChatAction = (socket, value) => {
  socket.emit('chat message', value);
}

let socket;

const Store = ({children}) => {

  if(!socket) {
    socket = io(':5000')
  }

  const [allChats, dispatch] = useReducer(reducer, initialState);
  return (
    <CTX.Provider value={{allChats, sendChatAction}}>
        {children}
    </CTX.Provider>
  );
};

export default Store;
