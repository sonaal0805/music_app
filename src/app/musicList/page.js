
const fetchMusicList  = async () => {

    console.log('fetching music list')
    const url = 'https://itunes.apple.com/search?term=canton%2Bpop'
    const res = await fetch(url)

    return res.json()

}

async function page() {

    // const musicList = await fetchMusicList()

    // console.log('musicList: ',musicList)
    return (
        <div>
            Music List
            
        </div>
        
    )
}

export default page