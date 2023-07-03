'use client'

import React, { useEffect, useRef, useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import './trackCard.scss'
import { CardActionArea, CardActions } from '@material-ui/core';
import {Avatar, Collapse, List, ListItemAvatar, TextField } from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import Comment from '../comment/comment';
import FlipMove from "react-flip-move";
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function TrackCard({trackData,setModalData,setModalOpen}) {

    const [showInput, setShowInput] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const inputRef = useRef(null)


    const handleCardClick = ()=>{        
        setModalData(trackData)
        setModalOpen(true)
    }
    const handleCommentClick = (e)=>{
        e.stopPropagation();
        
        const timeout = setTimeout(() => {
          if(!showInput){
            inputRef.current.focus()
          }
        }, 100);

        setShowInput(prev => !prev)

        return () => {
          clearTimeout(timeout);
        };
    }

    const handleChange = (e)=>{
      const value = e.target.value
      setComment(value)
    }

    const handleSubmitComment = ()=>{

      if(comment !== ''){
        let now = Date.now()
    
        const obj = {id:`comment_${comments.length}_${now.toString()}`,text: comment, timestamp:now}
        const newCommentsList = [...comments, obj]

        newCommentsList.sort((a,b) => b.timestamp - a.timestamp)

        setComments(newCommentsList)
        setComment('')
        sessionStorage.setItem(trackData.trackId.toString(), JSON.stringify(newCommentsList));
      }

    }

    const commentInputTheme = createTheme({
      palette: {
        primary: {
          main: '#000000',
        },
        
      },
    });

    const fetchComments = () =>{

      let exisitingComments = sessionStorage.getItem(trackData.trackId.toString())

      if(exisitingComments){
        exisitingComments = JSON.parse(exisitingComments)
        exisitingComments.sort((a,b) => b.timestamp - a.timestamp)
        setComments(exisitingComments)
      }


    }
 


    useEffect(()=>{
      fetchComments()

    },[])


    return (

    <Card className = 'trackCard'  sx={{ width: 270}}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={{ width: '100%'}}
          image={trackData?.artworkUrl100}
          alt="track image"
        />
        {/* <ListItemAvatar>
          <Avatar  sx ={{ width:100, height:100}} src = {trackData?.artworkUrl100}/>
        </ListItemAvatar> */}

        <CardContent sx ={{pb:0}}>
          <Typography noWrap  variant="h6" component="div">
            {trackData?.trackName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trackData?.artistName}

          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            
            {trackData.trackId}
          </Typography> */}
        </CardContent>
      </CardActionArea>

      <CardActions className = 'comment_section'>
        <IconButton className = 'comment_icon_container' onClick = {(e)=>handleCommentClick(e)} aria-label="comment">
          <ModeCommentIcon className = 'comment_icon'/>
        </IconButton>
      </CardActions>
      
      <CardActions>
        <Collapse 
        sx ={{ maxHeight:300, width:'100%', overflowY:'scroll'}}  
        in = {showInput} 
        timeout="auto">
          <>
            <ThemeProvider theme={commentInputTheme}>
                <TextField
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmitComment()
                    }
                  }}
                  onChange = {(e)=> handleChange(e)}
                  className = 'comment_input'
                  inputRef = {inputRef}                  
                  variant = 'standard'
                  multiline
                  color="primary"
                  maxRows={4}
                  label="Post a Review" 
                  sx ={{width:'100%'}} 
                  value = {comment}
                />

            </ThemeProvider>
            <List component="div" disablePadding>
              <FlipMove>
                {comments?.map((comment, index) =>(

                    <div key = {`comment_${index}`} className = 'comment_container'>
                      <Comment key =  {`comment_${index}`} setComments={setComments} trackId = {trackData?.trackId} comment = {comment}/>
                    </div>

                ))}
              </FlipMove>
            </List>
          </>
        </Collapse>
      </CardActions>
    </Card>
  );
}
