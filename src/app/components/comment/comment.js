'use client'

import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, ListItemAvatar, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material';
import {format} from 'timeago.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './comment.scss'
import { Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Comment({trackId, comment,setComments}) {

  const [editing, setEditing] = useState(false)
  const [newComment, setNewComment] = useState(comment)

  const [showOptions, setShowOptions] = useState(false)
  const [showFullComment, setShowFullComment] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)');


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isDesktop? '50%':'80%',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    color:'black',
    p: 3,
    maxHeight: '90vh',
    overflow:'scroll'
  };

  const handleEditBtnClick = (e) =>{
    e.stopPropagation()
    setEditing(prev => !prev)
  }

  const handleChange = (e) =>{

    const value = e.target.value
    setNewComment(prev => ({...prev, text: value}))

  }

  const editComment = ()=>{

    if(newComment.text !== ''){

      let exisitingComments = JSON.parse(sessionStorage.getItem(trackId.toString()))

      exisitingComments = exisitingComments.map(item => {

        if(item.id === newComment.id){
          return {...item, text: newComment.text}
        }else{
          return item
        }
      })

      exisitingComments.sort((a,b) => b.timestamp - a.timestamp)
      setComments(exisitingComments)

      sessionStorage.setItem(trackId.toString(), JSON.stringify(exisitingComments));
    }
    setEditing(false)

  }

  const deleteComment = (e) =>{
    e.stopPropagation()
    let newCommentsList = JSON.parse(sessionStorage.getItem(trackId.toString()))
    newCommentsList = newCommentsList.filter(item => item.id !== newComment.id)

    setComments(newCommentsList)

    sessionStorage.setItem(trackId.toString(), JSON.stringify(newCommentsList));
  }
  const commentInputTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      },
      
    },
  });

  useEffect(()=>{
    setNewComment(comment)
  },[comment])


  return (

    <>
      <ListItemButton       
        disableRipple 

        className = 'comment'

        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        onClick = {()=>setShowFullComment(true)}
        
      
      >
        <ListItemAvatar className = 'avatar_container'>
          <Avatar/>
        </ListItemAvatar>

        {editing?
          <ThemeProvider theme={commentInputTheme}>

            <TextField 
              value = {newComment?.text}
              variant = 'standard'
              multiline
              color= "primary"
              onChange={(e)=>handleChange(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  editComment()
                }
              }}
              onClick={(e) =>e.stopPropagation()}
            />
          </ThemeProvider> 
        :
          <ListItemText 
            className = 'comment_text'
            primary= {newComment?.text}  
            secondary = {format(newComment?.timestamp)}
            />

        }

        {showOptions &&
          <div className = 'icons_container'>
              <EditIcon  onClick = {(e)=> handleEditBtnClick(e)} className = 'edit_icon' sx ={{fontSize:'medium'}}/>

              <DeleteIcon onClick = {(e)=> deleteComment(e)} className = 'delete_icon' sx ={{fontSize:'medium'}} />
          </div>

        }
        
      </ListItemButton>

        <Modal
          open={showFullComment}
          onClose={()=>{setShowFullComment(false)}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Comment
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2,wordWrap: 'break-word'}}>
              {newComment?.text}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2,wordWrap: 'break-word'}}>
              {format(newComment?.timestamp)}
            </Typography> */}
            <ListItemText primary= {newComment?.text}  secondary = {format(newComment?.timestamp)}/>

          
          </Box>
        </Modal>
      
    </>





  );
}