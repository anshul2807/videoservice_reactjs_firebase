import React, { useState ,useEffect} from 'react'
import './Video.css'
import ReactPlayer from 'react-player'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ShareIcon from '@material-ui/icons/Share';
import axios from 'axios'
import {useParams} from 'react-router-dom'

function Video() {


    const [playervideos,setPlayerVideos] = useState()
    const {id} = useParams();

    useEffect( async ()=>{

       
          await axios.get(`https://youtube-backend-2807.herokuapp.com/api/videos/id/${id}`)
          .then(video=>{
            setPlayerVideos(video.data)
          })
          .catch(err=>{
              console.log(err);
          })

       
    },[id]);

   const [playerstyle,setPlayerstyle] = useState({
       width: "1309px",
       height : "460px"
   })
   let x = window.matchMedia("(max-width: 1042px)")
    useEffect(() =>{
       
        console.log(window.innerWidth );
        x.matches?setPlayerstyle({width:"370px",height:"200px"}): setPlayerstyle({width:"1309px",height:"460px"})
    },[])

    return (
        <div className="video">
            <div className="video__player">
                <ReactPlayer
               
                playing={false}
                width={playerstyle.width}
                height={playerstyle.height}
                url={playervideos?playervideos.videolink:"#"}
                controls
               
                />
            </div>
            <div className="video__features">
                <div className="video__features__like video__features__label">
                    <ThumbUpIcon />
                    <label>10k</label>
                </div>

                <div className="video__features__dislike video__features__label">
                    <ThumbDownAltIcon />
                    <label>2k</label>
                </div>

                <div className="video__features__share">
                 <ShareIcon />
                </div>
                
                
            </div>
            <div className="video__information">
                <h1>{(playervideos) ? playervideos.username:"Loading..." }</h1>
                <h2>Title : {(playervideos) ?playervideos.title:"Loading..." }</h2>
                <h4>Description : {(playervideos) ? playervideos.description:"Loading..." }</h4>
            </div>
        </div>
    )
}

export default Video
