import React, { useState ,useEffect} from 'react'
import './Video.css'
import ReactPlayer from 'react-player'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ShareIcon from '@material-ui/icons/Share';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    //   console.log(text.slice(0, 150).length);
    };
 
    return (
      <p className="video__decs__p">
        {isReadMore ? text.slice(0, 150) : text}
        {text.slice(0, 150).length > 149 ? 
        <span onClick={toggleReadMore} className="video__decs__show-more">
             {isReadMore ? "...read more" : " show less"} 
         
        </span>
        :null }
      </p>
    );
  };


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
    
    const [actionColor1,setActionColor1] = useState('action');
    const [actionColor2,setActionColor2] = useState('action');

    
    return (
        <div className="video">
            <div className="video__player">
                <ReactPlayer
               
                playing={false}
                width={playerstyle.width}
                height={playerstyle.height}
                url={playervideos?playervideos.videolink:"#"}
                pip
                controls
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
               
                />
            </div>
            <div className="video__features">
                <div className="video__features__like video__features__label">
                    <ThumbUpIcon onClick={()=>{actionColor1 === "action" ? setActionColor1("primary"):setActionColor1("action");setActionColor2("action") }}  color={actionColor1}/>
                    <label>10k</label>
                </div>

                <div className="video__features__dislike video__features__label">
                    <ThumbDownAltIcon   onClick={()=>{actionColor2 === "action" ? setActionColor2("primary"):setActionColor2("action");setActionColor1("action")  }}  color={actionColor2}/>
                    <label>2k</label>
                </div>

                <div className="video__features__share">
                 <ShareIcon />
                </div>
                
                
            </div>
            <div className="video__information">
                <div className="video__title">
                    <p>{(playervideos) ?playervideos.title:"Loading..." }</p>
                </div>
                <div className="video__username">
                    <AccountCircleIcon 
                    fontSize='large'
                    />
                    <p>{(playervideos) ? playervideos.username:"Loading..." }</p>
                </div>
                <div className="video__decs">
                    <ReadMore>
                    
                    {(playervideos) ? playervideos.description:"Loading..." }
                    </ReadMore>
                    
                </div>

                
               
            </div>

            <div className="video__commentBox">
                    <div className="video__heading">
                        <p>Comments</p>
                    </div>
                    <div className="video__commentInput">
                        <AccountCircleIcon fontSize='large'/>
                        <TextField
                            id="standard-full-width"
                            style={{ margin: 8 }}
                            placeholder="Add a public comment..."                         
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="video__commentButton">
                        <Button variant="contained">Cancel</Button>
                        <Button variant="contained" color="primary">Comment</Button>
                    </div>
                    <div className="video__commentSection">

                    </div>
                </div>
               
            
        </div>
    )
}

export default Video
