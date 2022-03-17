import React from 'react'
import Head from 'next/head'
import styles from '../styles/Search.module.scss'
import { useDebounce } from 'use-debounce'
import SearchResult from '../components/SearchResult'

function Search() {
  const [query, setQuery] = React.useState('')
  const [value] = useDebounce(query, 800)
  const [matchedGame, setMatchedGame] = React.useState([])

  console.log(matchedGame)

  function handleChange(event) {
    setQuery(event.target.value)
  }

  React.useEffect(()=> {
    fetch(`/api/search/${value}`).then(r => r.json()).then(data => setMatchedGame(data))
  },[value])

  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className={styles['query_holder']}>

        {matchedGame[0] && 
        <div>
          {matchedGame[0].cover && 
          <img src={matchedGame[0].cover.url.replace('thumb', '1080p')} className={styles['query_holder-bg']}>
          </img>}
        </div> }

        <input className={styles['query_holder_input']}
          type='text'
          placeholder='Search by Game Name'
          name='query'
          value={query}
          onChange={handleChange}
        ></input>

        <SearchResult matchedGame={matchedGame}/>

      </div>
      
    </div>
  )
}

export default Search