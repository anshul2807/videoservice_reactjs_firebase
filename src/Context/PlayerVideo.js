import React ,{ createContext, useState} from 'react'

export const PlayerVideoContext = createContext();

export const PlayerVideoProvider = (props)=> {
    const [playervideos,setPlayerVideos] = useState();
    return (
        <PlayerVideoContext.Provider value={[playervideos,setPlayerVideos]}>
            {props.children}
        </PlayerVideoContext.Provider>
    );
}


