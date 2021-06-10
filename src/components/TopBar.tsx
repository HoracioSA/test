import { useEffect, useState } from 'react';
import styles from '../styles/components/Topbar.module.css'
function TopBar() {
    
    return (
        <div className={styles.topBar}>
           <img src="timerlogo.svg" alt="logo"/>
        </div>
    )
}

export default TopBar
