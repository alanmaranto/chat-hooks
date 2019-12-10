import React, { createContext, useReducer } from "react";

const CTX = createContext();

const initialState = {
    general: [
        {from: 'alan', msg: 'hello'},
        {from: 'alan2', msg: 'hello2'},
        {from: 'alan3', msg: 'hello3'},
    ],
    topic2: [
        {from: 'alan4', msg: 'hello4'},
        {from: 'alan5', msg: 'hello5'},
        {from: 'alan6', msg: 'hello6'},
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

const Store = props => {
  const reducerHook = useReducer(reducer, initialState);
  return (
    <CTX.Provider value={reducerHook}>
        {props.children}
    </CTX.Provider>
  );
};

export default Store;
