'use client'

import React from 'react'
import { Typography } from '@mui/material'

export default function error() {
  return (
    <Typography variant="h6" component="h6" sx ={{color:'red',display:'flex', justifyContent:'center'}}>
        Failed to fetch tracks
    </Typography>
  )
}
