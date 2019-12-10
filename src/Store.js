import React, { createContext, useReducer } from "react";

const CTX = createContext();

/* {
    from: 'user'
    msg: 'hi'
    topic: 'general'
    }
    
    state = {
        general: [
            {msg}, {msg}, {msg}, {newmsg}
        ]
        topic2: [

        ]
    }

*/

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

const Store = props => {
  const reducerHook = useReducer(reducer, initialState);
  return <CTX.Provider value={}>{props.children}</CTX.Provider>;
};

export default Store;
