import React, {useState, createContext} from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
    const [tracking, setTracking] = useState(false);

    return (
        <StateContext.Provider value={[tracking, setTracking]}>
            {props.children}
        </StateContext.Provider>
    );
};