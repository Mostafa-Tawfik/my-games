import Head from 'next/head'
import React, { Fragment } from 'react'
import styles from '../styles/News.module.scss'

function news({news}) {

  const newsCard = news.articles.map((a, i) => {
    return (
      <Fragment key={i}>
        <div className={styles['news_card']}>
          <a href={a.url} target={"_blank"} rel={"noreferrer"} className={styles['news_card-img']}>
            <img src={a.imgSrc}></img> 
            <div className={styles['news_card-summary']}><p>{a.summary}</p></div>
          </a>
          <p>{a.articleDate}</p>
          <div>{a.title}</div>
        </div>
      </Fragment>
    )
  })
  return (
    <Fragment>

      <Head>
        <title>News</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <h1 className={styles['page-title']}>RECENT News</h1>
      <div className={styles['news_holder']}>
        {newsCard}
      </div>
    </Fragment>
  )
}

export default news

// call the api to get featured games
export async function getStaticProps() {

  const res = await fetch(`https://nintendo-news-api.herokuapp.com/news`)

  const newsData = await res.json()

  return {
    props: {news: newsData},
  }
}