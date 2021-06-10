import React ,{ createContext, useState} from 'react'

export const VideosContext = createContext();

export const VideosProvider = (props)=> {
    const [videos,setVideos] = useState([
        

    ]);
    return (
        <VideosContext.Provider value={ [videos,setVideos]}>
            {props.children}
        </VideosContext.Provider>
    );
}


