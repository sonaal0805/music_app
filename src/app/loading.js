'use client'

import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';


export default function loading() {
  return (
    <div style = {{ display:'flex', justifyContent:'center'}}>
        <CircularProgress sx={{color:'white'}}/>
    </div>
  )
}
