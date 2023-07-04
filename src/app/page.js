import React from 'react'
import HomePage from './components/home/home'

const fetchTrackList  = async () => {

  const url = 'https://itunes.apple.com/search?term=canton%20pop'

  try{
    const res = await fetch(url)
    return res.json()

  }catch(err){
    console.log(err)
  }

}
export default async function index() {

  const trackList = await fetchTrackList()

  return (
    <HomePage trackList = {trackList.results} /> 
  )
}


