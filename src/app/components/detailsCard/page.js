'use client'

import { Avatar, Card, CardActionArea, CardContent, CardMedia, Collapse, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './detailsCard.scss'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'
import useMediaQuery from '@mui/material/useMediaQuery';


export default function DetailsCard({trackData,setModalData}) {


  const [relatedTracks , setRelatedTracks] = useState([])
  const [showRelatedTracks, setShowRelatedTracks] = useState(false)
  const [error, setError] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)');

  const millisToMinutesAndSeconds = (millis) => {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const fetchRelatedTracks = async () =>{

      const artistId = trackData?.artistId
      const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`

      try{
        await fetch(url)
        .then(res => res.json())
        .then(data =>setRelatedTracks(data.results.slice(1,6)))

      }catch(err){
        console.log(err)
        setError('Failed to fetch related tracks')

      }

  }

  const handleExapandBtnClick = ()=>{
    setShowRelatedTracks(prev => !prev)
  }

  useEffect(()=>{
    if(trackData?.artistId){
      fetchRelatedTracks()
    }
  },[trackData?.artistId])

  return (


    <Card 
      className = 'detailsCard' 
      sx={{ boxShadow:'none',maxHeight: '100%',overflowY: 'scroll' }}
    >
      <CardActionArea disableRipple>

        {isDesktop &&
   
          <CloseIcon
            onClick = {()=>setModalData({})}
            className = 'closeButton' 
            sx ={{position : 'absolute', top:1, right: 1}}
          />
          }
        
        <CardMedia
          component="img"
          sx={{objectFit:'contain', maxHeight: 300}}
          image={trackData?.artworkUrl100}
          alt="track image"
        />
        <CardContent>
          <Typography className = 'track' gutterBottom variant="h6" component="div">
            {trackData?.trackName} <span>{`$${trackData?.trackPrice}`}</span>
          </Typography>

          <Typography className = 'collection' variant="body2">
            Collection: {trackData?.collectionName}
            <span>{`$${trackData?.collectionPrice}`}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Artist: {trackData?.artistName}
          </Typography>
            <Typography variant="body2" color="text.secondary">
            Duration: {millisToMinutesAndSeconds(trackData?.trackTimeMillis)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Released on: {moment(trackData?.releaseDate).format('MMM Do YYYY')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {trackData?.primaryGenreName}
          </Typography>

          {error? 

            <ListItemText primary= {error} sx ={{color:'red'}}/>
 
           
          :
          <>
            <ListItemButton className = 'expand_button' onClick={handleExapandBtnClick}>
              <ListItemText primary="Show Related Tracks" />
              {showRelatedTracks ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse 
              in={showRelatedTracks} 
              timeout="auto" unmountOnExit
            >
              <List component="div">

                  {relatedTracks.map((track, index)=>

                    <div key = {`related_track_${index}`}>

                      <ListItemButton className = 'related_track_btn'>
                        <ListItemAvatar>
                          <Avatar src = {track?.artworkUrl100}/>
                        </ListItemAvatar>
                        
                        <ListItemText primary= {track?.collectionName}  secondary = {track?.primaryGenreName}/>
                        
                      </ListItemButton>
                    </div>
              

                  )}
                
              </List>
            </Collapse>
          </>

          }

        </CardContent>


      </CardActionArea>


    </Card>


  )
}
