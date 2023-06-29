'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import './home.scss'
import axios from 'axios';
import TrackCard from './components/trackCard/page'
import useMediaQuery from '@mui/material/useMediaQuery';
import DetailsCard from './components/detailsCard/page'
import { Box, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material'
import SearchAppBar from './components/searchBar/page';



// const {artistName, collectionName, artworkUrl100} = trackData
export default function index() {

  const [trackList, setTrackList] = useState([])
  const [modalData, setModalData] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const isDesktop = useMediaQuery('(min-width:600px)');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    color:'black',
    p: 0,
    maxHeight: '90vh',
    overflow:'scroll'
  };

  const fetchTrackList  = async () => {

    setLoading(true)
    const url = 'https://itunes.apple.com/search?term=canton%20pop'

    try{
      await fetch(url)
      .then(res => res.json())
      .then(data => setTrackList(data.results))

    }catch(err){
      console.log(err)
      setError('Failed to fetch track list')
    }

    setLoading(false)


  }

  useEffect(()=>{
    fetchTrackList()
  },[])



  return (
    <div className = 'home_page'>

      <div className = 'search_bar'>
        {/* <SearchAppBar/> */}
      </div>

      <div className = 'content'>
        <div className = 'track_list'>
          {
            loading ?
            <h1>loading...</h1> 
            :
            error ?

              <ListItemText primary= {error} sx ={{color:'red'}}/>

            :
            <>
              {trackList.map((track,index)=>
  
                <div key = {`track_${index}`}>
                  <TrackCard 
                    trackData={track}
                    setModalData = {setModalData}
                    setModalOpen = {setModalOpen}
                  />
                </div>
      
              )}
            </>
          }
        </div>

        <div className = "track_details">

          {Object.keys(modalData).length > 0? 
            
            <DetailsCard 
              trackData = {modalData}
              setModalData = {setModalData}
            />
            :
            <h4>Select a track to view details</h4>
          }

        </div>

        {!isDesktop &&

          <Modal
            open={modalOpen}
            onClose={()=>{setModalOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <DetailsCard 
                trackData = {modalData} 
                setModalData = {setModalData}
  
              />
            </Box>
          </Modal>
        }

      </div>
    </div>

    
  )
}


