import Head from 'next/head'
import styles from '../../styles/Onsale.module.scss'
import Link from 'next/link'
import React from 'react'

export default function action({games, onSaleDetails}) {

  console.log(games)
  
  function fetchCover(id) {
    if (id != null) {
    return onSaleDetails.filter(g => g[id]).map(g => g[id].data ? g[id].data.header_image : 'https://api.iconify.design/bxs/error.svg?color=white&width=110&height=50')
  }
}
  
  const MainGames = games.filter(f => f.steamAppID != null).map(g => {
    if (g != null) {
  return (
    
      <div key={g.gameID} className={styles["games"]}>
          
          <Link href={'/onsale/steam/' + g.steamAppID}>
              {fetchCover(g.steamAppID) !== null ? <img src={fetchCover(g.steamAppID)} alt={g.title} className={styles['onsale-covers']}></img> : <div>bo</div>}
          </Link>

          <div className={styles["infos"]}>

            <Link href={'/onsale/steam/' + g.steamAppID}>
                <p className={styles['gameName']}>{g.title}</p>
            </Link>

            <div className={styles['infos-details']}>

              <div className={styles['infos-left']}>
                {/* <p className={styles["tag"]}>{g.steamAppID}</p> */}
                <p className={styles["oldPrice"]}>${g.normalPrice}</p>
                <p className={styles["price"]}>${g.salePrice}</p>
              </div>

              <div className={styles['infos-right']}>
                <p className={styles["reviews"]}>{g.steamRatingText}</p>
                <p className={styles["savings"]}><span>&#10225; </span>%{((g.savings)*1).toFixed(0)}</p>
              </div>

            </div>
          </div>
      </div>
    
  )}
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>On Sale!</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <section className={styles["layout"]}>
        <main className={styles['main']}>
          <img className="bg" src='../../images/rawpixel-id-3114099.png' alt="keyboard background"></img>
          <div>
            <h1>ON SALE!</h1>
            <h2>Top Rated Games On Sale</h2>
            <article className={styles['main-layout']}>
              {MainGames}
            </article>
          </div>
        </main>
        
      </section>
    </div>
  )
}

// call the api to get featured games
export async function getStaticProps() {

  const apiRoot= 'https://www.cheapshark.com/api/1.0/deals'

  const res = await fetch(`${apiRoot}?storeID=1&upperPrice=60&sortBy=Metacritic&pageNumber=1&pageSize=15&onSale=1&desc=0`)

  const gameData = await res.json()

  // fetch from gamespot
  const onSaleDetails = await Promise.all(gameData.map((g) => fetch(`https://store.steampowered.com/api/appdetails?appids=${g.steamAppID}`).then(data => data.json())))

  // // fetch from gamespot
  // const onSaleDetails = await Promise.all(gameData.map((g) => fetch(`https://www.gamespot.com/api/games/?${process.env.gamespotKey}&format=json&filter=name:${g.title.substring(0,13)}&limit=1`).then(data => data.json())))
  
  return {
    props: {
      games: gameData,
      onSaleDetails
    },
  }
}