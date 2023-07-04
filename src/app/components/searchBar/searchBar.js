'use client'

import React, { useEffect, useState } from 'react'
import './searchBar.scss'

import { Box, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({trackList, setFinalTrackList}) {

    const [searchText, setSearchText] = useState('')


    const handleChange = (e)=>{
        const value = e.target.value
        setSearchText(value)
    }

    const filterTrackList = (track) =>{
        if(track.artistName.toLowerCase().includes(searchText.toLowerCase()) || searchText === ''){
            return true
        }else{
            return false
        }
    }

    useEffect(()=>{
     
        const newList = trackList.filter(track => filterTrackList(track))
        setFinalTrackList(newList)

    },[searchText])
    
    return (

    <>
        <span className = 'logo'>ML</span>
      

        {/* <div className = 'input_container'>
            <SearchIcon sx = {{fontSize : 'medium'}}/>
            <input 
                className = 'searchInput'
                value = {searchText}
                onChange = {(e)=>handleChange(e)}
                placeholder="Search By Artist Name"
              
            />
        </div> */}


    </>
    )
}
