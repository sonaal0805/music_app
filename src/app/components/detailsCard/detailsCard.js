'use client'

import React, { useEffect, useState } from 'react'
import './detailsCard.scss'

import { Avatar, Card, CardActionArea, CardContent, CardMedia, Collapse, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import moment from 'moment'

export default function DetailsCard({trackData}) {

  const [relatedTracks , setRelatedTracks] = useState([])
  const [showRelatedTracks, setShowRelatedTracks] = useState(false)
  const [error, setError] = useState(false)

  const millisToMinutesAndSeconds = (millis) => {
      const minutes = Math.floor(millis / 60000)
      const seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
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


    <Card className = 'detailsCard' >
      <CardActionArea disableRipple>
        
        <CardMedia
          component="img"
          sx={{objectFit:'contain'}}
          image={trackData?.artworkUrl100}
          alt="track-image"
        />

        <CardContent>

          <Typography className = 'track' gutterBottom variant="h6" component="div">
            {trackData?.trackName || 'N/A'} 
            <span className = 'price'>{`US$${trackData?.trackPrice}`}</span>
          </Typography>

          <Typography className = 'collection' variant="body2">
            Collection: {trackData?.collectionName || 'N/A'}
            <span className = 'price'>{`US$${trackData?.collectionPrice}`}</span>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Artist: {trackData?.artistName || 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Duration: {trackData?.trackTimeMillis ? millisToMinutesAndSeconds(trackData?.trackTimeMillis): 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Released on: {trackData?.releaseDate ? moment(trackData?.releaseDate).format('MMM Do YYYY'): 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Genre: {trackData?.primaryGenreName || 'N/A'}
          </Typography>

           <Typography variant="body2" color="text.secondary">
            Country: {trackData?.country|| 'N/A'}
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
              timeout="auto" 
              unmountOnExit
            >
              <List component="div">

                  {relatedTracks.map((track, index)=>

                    <div key = {`related_track_${index}`}>

                        {track.collectionName && track.primaryGenreName &&

                          <ListItemButton className = 'related_track_btn'>

                            <ListItemAvatar>
                              <Avatar src = {track?.artworkUrl100}/>
                            </ListItemAvatar>

                            <ListItemText 
                              primary= {track?.collectionName}  
                              secondary = {track?.primaryGenreName}
                            />
              
                          </ListItemButton>
                        }
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
