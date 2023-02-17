import React, { useEffect } from 'react';
import styles from './RP.module.css';

function OutfitStars({ id, rating }) {
  useEffect(() => {
    if (rating) {
      const fillPercent = (rating / 5) * 100;
      const elem = document.getElementById(id + 'O');
      elem.style.width = `${fillPercent}%`;
    }
  }, [rating]);

  return (
    <div className={styles.starsOuter}>
      <div id={id + 'O'} className={styles.starsInner}></div>
    </div>
  );
}

export default OutfitStars;