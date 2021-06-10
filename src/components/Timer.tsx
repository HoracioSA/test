import { useEffect, useState } from 'react';
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import styles from '../styles/components/Timer.module.css'
import TopBar from './TopBar'

let countDownTimeout:NodeJS.Timeout;
function Timer() {
    const [time, setTime] = useState(1 * 60)
    const [hasFinished, setHasFinished]= useState(false)
    const [click, setClick] = useState(1)
    const [isActive, setIsActive] = useState(false)
    const hours = Math.floor(time/(60 * 60) % 24)
    const minutes = Math.floor((time/ 60) % 60);
    const seconds = time % 60;
    const [hoursLeft, hoursRight] = String(hours).padStart(2, '0').split('')
    const [minutesLeft, minutestRight] = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondstRight] = String(seconds).padStart(2, '0').split('')
    function startCountDown(){
            setIsActive(true); 
     }
    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setIsActive(true);
        setTime(3 * 60);
        setHasFinished(false)
    }
     function stopCountDown(){
         clearTimeout(countDownTimeout)
        setIsActive(false);
        setTime(0) 
        setHasFinished(true)
     }
     function waitCountDown(){
            setHasFinished(false)
            setIsActive(false)
                
     }
     useEffect(() => {
         const unsub$= new Subject();
         interval(1000)
         .pipe(takeUntil(unsub$))
         .subscribe(() =>{
            if (isActive && time > 0){
                setTime(time -1)
            }else if (isActive && time ===0){
                setHasFinished(true);
                setIsActive(false);
            }
         })
         return ()=>{
            unsub$.next();
            unsub$.complete();
         }
     },[isActive, time])

     /* Without Rxjs only react Hook **/

    /*  useEffect(()=>{
        if (isActive && time > 0){
            countDownTimeout=setTimeout(()=>{
                setTime(time -1) // or + 1
            }, 1000)
        }else if (isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
        }
     }, [isActive, time])
     **/
    return (
        <div className={styles.container}>
            <TopBar/>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{hoursLeft}</span>
                    <span>{hoursRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutestRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondstRight}</span>
                </div>
           
            </div>
            <>
            {isActive ? (
            <button 
            type="button" 
            className={`${styles.countDownButton} ${styles.countDownButtoActive}`}
            onClick={stopCountDown}
            >
               Stop
                
            </button>
        ):(
            <button 
            type="button" 
            className={styles.countDownButton}
            onClick={startCountDown}
            >
            Start
            </button>
        )}
            </>
            <button 
             
             type="button" 
             className={styles.countDownButtonReset}
             onClick={resetCountDown}
             >
            Reset
            </button>
            <button 
             type="button" 
             className={styles.countDownButtonWait}
             onClick={waitCountDown}
             >
            Wait
            </button>
        </div>
    )
}
export default Timer
