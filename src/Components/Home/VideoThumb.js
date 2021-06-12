import React,{useContext} from 'react'
import './VideoThumb.css'
import  {Link} from 'react-router-dom' 
// import billi from '../../statics/img/a1.png'
import ReactPlayer from 'react-player'
//  import {PlayerVideoContext} from '../../Context/PlayerVideo'

 

function VideoThumb({title,desc,username,videolink,videoid}) {



   

    return (
        <Link  to={`/videos/${videoid}`}>
        <div className="videothumb">
           <div className="videothumb__video">
                {/* <img src={billi} alt="a1" /> */}
                <ReactPlayer 
                playing={false}
                width={'360px'}
                height={'200px'}
                url={videolink}
                 />
           </div>
           <div className="videothumb__info">
               <h2 className="videothumb__title">{title}</h2>
               <p className="videothumb__time">03:00 min</p>
               <p className="videothumb__views">100k views</p>
               
                <h3 className="videothumb__user">{username}</h3>
                <h3 className="videothumb__desc">{desc}</h3>
            </div>
        </div>
        </Link>
    )
}

export default VideoThumb
