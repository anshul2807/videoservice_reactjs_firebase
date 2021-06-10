import React, { useContext } from 'react'
import './Video.css'
import ReactPlayer from 'react-player'
import video from '../../statics/video/video1.mp4'
import {PlayerVideoContext} from '../../Context/PlayerVideo'


function Video() {

    const [playervideos,setPlayerVideos] = useContext(PlayerVideoContext)

    return (
        <div className="video">
            <div className="video__player">
                <ReactPlayer
                playing={false}
                width={'1309px'}
                height={'460px'}
                url={playervideos.videolink}
                controls
               
                />
            </div>
            <div className="video__information">
                <h1>VIdeo description</h1>
            </div>
        </div>
    )
}

export default Video
