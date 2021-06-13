import React from 'react'
import './Comment.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Comment({value,username}) {
    return (
        <div className="comment">
            <div className="comment__profile">
                <AccountCircleIcon fontSize='large' />
            </div>
            <div className="comment__info">
                <p className="comment__username">{username}</p>
                <p className="comment__message">{value}</p>
            </div>
           
        </div>
    )
}

export default Comment
