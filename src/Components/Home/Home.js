import React,{useContext, useEffect} from 'react'
import './Home.css'
import VideoThumb from './VideoThumb'
import {VideosContext} from '../../Context/Videos'
import firebase from "firebase";
import {db} from '../../firebase'

function Home() {


    const [videos,setVideos] = useContext(VideosContext);

    useEffect(()=>{
        db.collection('videos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setVideos(snapshot.docs.map(doc=>({id:doc.id,video_info:doc.data()})))})
    },[]);

    return (
        <div className="home">
            <div className="home__filter">
            <h2>Filter BY</h2>
            <div className="home__dropdown">
                <button className="home__dropbtn">UPLOAD DATE</button>
                <div className="home__dropdown-content">
                    <a href="#">Last hour</a>
                    <a href="#">Today</a>
                    <a href="#">Last week</a>
                    <a href="#">Last month</a>
                </div>
            </div>

            <div className="home__dropdown">
                <button className="home__dropbtn">DURATION</button>
                <div className="home__dropdown-content">
                    <a href="#">Under 4 minutes</a>
                    <a href="#">4 - 20 minutes</a>
                    <a href="#">Over 20 minutes</a>
                </div>
            </div>
            </div>
            <div className="home__content">
               
                {videos.map(({id,video_info})=> <VideoThumb key={id} title={video_info.title} desc={video_info.description} username={video_info.username} videolink={video_info.videolink} videoid={id}/>)}
               
                
            </div>
        </div>
    )
}

export default Home
