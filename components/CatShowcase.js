import React from 'react'
import styles from '../styles/components/_cat.module.scss'
import Link from 'next/link'

function CatShowcase(props) {

  const MainGames = props.topRel.results.map(g => {
    const gameCover = g.background_image
    return (
      
        <div  key={g.id} className={styles["games"]}>
            
            <Link href={'/' + g.id}>
                <img src={gameCover} alt={g.name.substring(0,22)}></img>
            </Link>
            <div className={styles["infos"]}>
                {/* limit characters to 22 */}
                <Link href={'/' + g.id}>
                    <p className={styles['gameName']}>{g.name.substring(0,22)}</p>
                </Link>
                <p className={styles["tag"]}>{g.genres[0].name}</p>
            </div>
        </div>
      
    )
  })

  return (
      <div className={styles['games-container']}>{MainGames}</div>
  )
}

export default CatShowcase