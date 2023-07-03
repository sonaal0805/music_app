
'use client'
import { Typography } from '@mui/material'
import React from 'react'

export default function error() {
  return (
    <Typography variant="h6" component="h6" sx ={{color:'red'}}>
        Failed to fetch data
    </Typography>
  )
}
