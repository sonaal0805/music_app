'use client'

import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material';
import {format} from 'timeago.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './comment.scss'

export default function Comment({trackId, comment,setComments}) {

  const [editing, setEditing] = useState(false)
  const [newComment, setNewComment] = useState(comment)

  const [showOptions, setShowOptions] = useState(false)

  const handleEditBtnClick = () =>{
    setEditing(prev => !prev)
  }

  const handleChange = (e) =>{

    const value = e.target.value
    setNewComment(prev => ({...prev, text: value}))

  }

  const editComment = ()=>{

    if(newComment.text !== ''){

      let exisitingComments = JSON.parse(sessionStorage.getItem(trackId))

      exisitingComments = exisitingComments.map(item => {

        if(item.id === newComment.id){
          return {...item, text: newComment.text}
        }else{
          return item
        }
      })

      exisitingComments.sort((a,b) => b.timestamp - a.timestamp)

      sessionStorage.setItem(trackId, JSON.stringify(exisitingComments));
    }
    setEditing(false)

  }

  const deleteComment = () =>{
    let newCommentsList = JSON.parse(sessionStorage.getItem(trackId))
    newCommentsList = newCommentsList.filter(item => item.id !== newComment.id)

    setComments(newCommentsList)

    sessionStorage.setItem(trackId, JSON.stringify(newCommentsList));
  }

  useEffect(()=>{
    setNewComment(comment)
  },[comment])


  return (

      <ListItemButton 
        sx ={{pl: 0, pr: 0, width:'100%'}} 
        disableRipple 
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <ListItemAvatar>
          <Avatar/>
        </ListItemAvatar>

        {editing? 
          <TextField 
            value = {newComment.text}
            variant = 'standard'
            multiline
            color= "warning"
            onChange={(e)=>handleChange(e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                editComment()
              }
            }}

          />
        :
          <ListItemText sx = {{maxWidth:'70%', overflow:'hidden'}}primary= {newComment.text}  secondary = {format(newComment.timestamp)}/>
        }

        {showOptions &&
          <>
            <IconButton onClick = {handleEditBtnClick}>
              <EditIcon sx ={{fontSize:'medium'}}/>
            </IconButton>

            <IconButton onClick = {deleteComment}>
              <DeleteIcon sx ={{fontSize:'medium'}}/>
            </IconButton>
          </>

        }
        
      </ListItemButton>

  );
}