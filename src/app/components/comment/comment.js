'use client'

import React, { useEffect, useState } from 'react'
import './comment.scss'

import { Avatar, Box, Button, ListItemAvatar, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {format} from 'timeago.js'



export default function Comment({trackId, comment,setComments}) {

  const [editing, setEditing] = useState(false)
  const [newComment, setNewComment] = useState(comment)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [commentError, setCommentError] = useState('') 
  const [commentLength, setCommentLength] = useState(0)

  const [showOptions, setShowOptions] = useState(false)
  const [showFullComment, setShowFullComment] = useState(false)

  const isDesktop = useMediaQuery('(min-width:1400px)')
  const isTablet = useMediaQuery('(min-width:601px) and (max-width: 1399px)')


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isDesktop ? '50%': isTablet? '60%': '80%',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    color:'black',
    p: 3,
    maxHeight: '90vh',
    overflow:'scroll'
  }

  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      
    },
  })

  const commentInputTheme = createTheme({
    palette: {
      primary: {
        main: '#000000',
        },
      },
  })

  const handleEditBtnClick = (e) =>{
    e.stopPropagation()
    setEditing(prev => !prev)
    setCommentLength(newComment.text.length)
  }

  const handleDeleteBtnClick = (e) =>{
    e.stopPropagation()
    setShowDeleteModal(true)


  }

  const handleChange = (e) =>{

    const value = e.target.value

    if(value.length < 601){
      
      setCommentError('')
      setNewComment(prev => ({...prev, text: value}))
      setCommentLength(value.length)
      
    }else{
      setCommentError('Reviews cannot be longer than 600 characters')
      setShowOptions(false)
    }

  }

  const editComment = ()=>{

    if(commentLength > 0 && !commentError){

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
      setEditing(false)
      setCommentError('')
      setCommentLength(0)
      sessionStorage.setItem(trackId.toString(), JSON.stringify(exisitingComments))

    }else{
      if(commentLength === 0){
        setCommentError('Review cannot be empty')
      }else{
        setCommentError('Reviews cannot be longer than 600 characters')
      }

    }

  }

  const deleteComment = () =>{
    
    let newCommentsList = JSON.parse(sessionStorage.getItem(trackId.toString()))
    newCommentsList = newCommentsList.filter(item => item.id !== newComment.id)

    setComments(newCommentsList)
    setEditing(false)
    setShowDeleteModal(false)

    sessionStorage.setItem(trackId.toString(), JSON.stringify(newCommentsList))
  }

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
        onClick = {()=> setShowFullComment(true)}
  
      >
        <ListItemAvatar className = 'avatar_container'>
          <Avatar/>
        </ListItemAvatar>

        {editing?
          <ThemeProvider theme={commentInputTheme}>
            <TextField 
              value = {newComment?.text}
              variant = 'standard'
              sx = {{width: '60%'}}
              multiline
              error = {commentError === '' ? false: true}
              helperText = {commentError === '' ? `${commentLength} / 600` :commentError}
              color = "primary"
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
            primary = {newComment?.text}  
            secondary = {format(newComment?.timestamp)}
          />

        }

        {(showOptions || !isDesktop) &&
          <div className = 'icons_container'>
              <EditIcon onClick = {(e)=> handleEditBtnClick(e)} sx ={{fontSize:'medium'}}/>
              <DeleteIcon onClick = {(e)=> handleDeleteBtnClick(e)} sx ={{fontSize:'medium'}} />
          </div>
        }
        
      </ListItemButton>

      <Modal
        open={showFullComment}
        onClose={()=>{setShowFullComment(false)}}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comment
          </Typography>

          <ListItemText 
            className = 'modal_comment_text' 
            primary= {newComment?.text}  
            secondary = {format(newComment?.timestamp)}
          />
        </Box>
      </Modal>

      <Modal
        open={showDeleteModal}
        onClose={()=>{setShowDeleteModal(false)}}
      >
        <Box sx={modalStyle}>
          <Typography sx = {{textAlign:'center'}}id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this review?
          </Typography>

          <Box className = 'delete_modal_button_conatiner'>

            <ThemeProvider theme = {buttonTheme}>
              <Button color = "primary" variant="text" onClick = {deleteComment}>Yes</Button>
              <Button color = "primary" variant="text" onClick = {()=>setShowDeleteModal(false)}>No</Button>
            </ThemeProvider>
          </Box>

        </Box>

      </Modal>

      
      
    </>

  )
}