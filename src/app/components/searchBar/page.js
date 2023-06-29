'use client'

import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './searchBar.scss'
export default function SearchBar() {

    const [searchText, setSearchText] = useState('')

    const handleChange = (e)=>{
        const value = e.target.value
        setSearchText(value)
    }


    return (

    <div>
        <span className = 'logo'>Music app</span>

        <input 
            className = 'searchInput'
            value = {searchText}
            onChange = {(e)=>handleChange(e)}
        />

    </div>
    )
}
