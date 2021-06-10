import React,{useState,useContext} from 'react'
import './Upload.css'
import { useDropzone } from "react-dropzone"
import ReactPlayer from 'react-player'
import {db, storage} from '../../firebase'
import {UserContext} from '../../Context/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from "firebase";

function Upload() {

    const [user,setUser] = useContext(UserContext);
    
    const [files, setFiles] = useState([])
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
   
    const [progress,setprogress]=useState(0);
    const file = files[0];
  const handlePosts =   () =>{
    setprogress(0)
     if(title === '' || desc === '')
      {
         
          toast("🦄 Enter All your Details!!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
      }
      else{
        // Storage
        
        const metadata = { contentType: file.type };
        const uploadtask =  storage.ref(`videos/${file.name}`).put(file,metadata);

         uploadtask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setprogress(progress);
                console.log(progress);

            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            ()=>{
                storage
                    .ref("videos")
                    .child(`${file.name}`)
                    .getDownloadURL()
                    .then(url=>
                        {
                          db.collection("videos").add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            username: user.names,
                            title: title,
                            description: desc,
                            videolink: url,
                            thumbnail : '#'
                        })
                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                            
                            toast("🦄 Posted Successfully", {
                              position: "top-left",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              })
                           
                            console.log(file);
                        }).catch(error => console.log("my error"))
                        
                    })
            }

        )

        // FireStore
            

       
      }
       
      setFiles([])
      setTitle('')
      setDesc('')
      setprogress(0)
  }  

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const videos = files.map((file) => (
    <div key={file.name}>
      <div>
      
        
        <ReactPlayer
          playing={false}
          url={file.preview}
          width='300px'
          height='200px'
          controls
        //   light="https://i.stack.imgur.com/zw9Iz.png"
        //   onClick={()=> setPlay(!play)}
        />

        
      </div>
    </div>
  ))

  
    return (
      <>
     
       <ToastContainer 
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                
        <div className="upload">
           <div className="upload__file">

           <div className="upload__drop" {...getRootProps()}>
                <input {...getInputProps()} />
                <h2>Click/Drop a Video here</h2>
           </div>
           {files[0]?<div className="upload__video">{videos}</div>:<div style={{display : `none`}} className="upload__video">{videos}</div>}
               
           </div>
           <div className="upload__information">
                <h2>Enter the Detail's Here</h2>
                <div className="upload__desc1">
                    <label>Title</label>
                    <input value={title} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div className="upload__desc1">
                    <label>Description for the Video</label>  
                    <textarea  value={desc} onChange={e=>setDesc(e.target.value)}  rows="4" cols="50" />
                </div>
                
                <progress  value={progress} max="100" />
                <a onClick={handlePosts}>Post</a>
           </div>
        </div>
       
        </>
    )
}

export default Upload
