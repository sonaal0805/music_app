'use client'

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './trackCard.scss'
import { CardActionArea, CardActions } from '@material-ui/core';
import { Avatar, Button, Collapse, List, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import {format} from 'timeago.js'
import Comment from '../comment/page';
import FlipMove from "react-flip-move";



export default function TrackCard({trackData,setModalData,setModalOpen}) {
    // console.log('trackData: ',trackData)

    const [showInput, setShowInput] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])


    const handleCardClick = ()=>{
        // console.log('card clicked..')
        
        setModalData(trackData)
        setModalOpen(true)
    }
    const handleCommentClick = (e)=>{
        e.stopPropagation();
        setShowInput(prev => !prev)

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

        // console.log('newCommentsList: ',newCommentsList)
        setComments(newCommentsList)
        setComment('')
        sessionStorage.setItem(trackData.trackId, JSON.stringify(newCommentsList));
      }

    }

    useEffect(()=>{
      const exisitingComments = JSON.parse(sessionStorage.getItem(trackData.trackId));
      if(exisitingComments){
        exisitingComments.sort((a,b) => b.timestamp - a.timestamp)
        setComments(exisitingComments)
      }

    },[])

    return (

    <Card className = 'trackCard'  sx={{ width: 270}}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={{ width: '100%'}}
          image={trackData.artworkUrl100}
          alt="track image"
        />
        <CardContent sx ={{pb:0}}>
          <Typography gutterBottom variant="h6" component="div">
            {trackData.trackName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trackData.artistName}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <IconButton onClick = {(e)=>handleCommentClick(e)} aria-label="add to favorites">
          <ModeCommentIcon/>
        </IconButton>
      </CardActions>
      
      <CardActions>
        <Collapse sx ={{ maxHeight:300, width:'100%', overflowY:'scroll'}}  in = {showInput} timeout="auto">
          <>
            <TextField
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmitComment()
                }
              }}
              onChange = {(e)=> handleChange(e)}
              
              variant = 'standard'
              multiline
              color="warning"
              maxRows={4}
              label="Post a Review" 
              sx ={{width:'100%'}} 
              value = {comment}
            />
            <List component="div" disablePadding>
              <FlipMove>
                {comments?.map((comment, index) =>(

                    <div key = {`comment_${index}`}>

                      <Comment setComments={setComments} trackId = {trackData.trackId} comment = {comment}/>
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
