'use client'

import React, { useState } from 'react'
import '../../home.scss'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, Modal } from '@mui/material'
 
import DetailsCard from '../detailsCard/detailsCard'
import TrackCard from '../trackCard/trackCard'
import SearchBar from '../searchBar/searchBar'

export default function HomePage({trackList}) {


  const isAtLeastTablet = useMediaQuery('(min-width:600px)')

  const [finalTrackList, setFinalTrackList] = useState(trackList)

  const [modalData, setModalData] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: isAtLeastTablet? '50%':'80%',
      bgcolor: 'background.paper',
      borderRadius: 5,
      boxShadow: 24,
      color:'black',
      p: 0,
      maxHeight: '90vh',
      overflow:'scroll'
  }

  return (
     <div className = 'home_page'>

        <div className = 'search_bar'>
          <SearchBar
            trackList = {trackList}
            setFinalTrackList = {setFinalTrackList}
          />

        </div>

        <div className = 'content'>
          <div className = 'track_list_container'>
          {
            <div className = 'track_list'>
                {finalTrackList?.map((track,index)=>
    
                <div key = {`track_${index}`}>
                    <TrackCard 
                      trackData={track}
                      setModalData = {setModalData}
                      setModalOpen = {setModalOpen}
                    />
                </div>
        
                )}
            </div>
              
          }
          </div>
        </div>


        <Modal
          open={modalOpen && Object.keys(modalData).length > 0}
          onClose={()=>{setModalOpen(false)}}
        >
          <Box sx={modalStyle}>
            <DetailsCard 
              trackData = {modalData} 
            />
          </Box>
        </Modal>
      
    </div>
  )
}
