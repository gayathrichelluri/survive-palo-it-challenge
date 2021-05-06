import React from 'react';

import styles from '../styles/HospitalItem.module.css';

const HospitalItem = ({item: {id, name, averageProcessTime, patientCount, waitingTime}}) => {
    // console.log(id, name, averageProcessTime, patientCount, waitingTime);

    const getHoursAndMins = () => {
        if(waitingTime<60)
            return waitingTime + " mins";
        let mins = waitingTime%60;
        let hours = (waitingTime-mins)/60;
        if(mins === 0 && hours>1)
            return hours + " hrs";
        if(mins === 0 && hours===1)
            return hours + " hr";
        if(hours === 1)
            return hours + " hr " + mins + " mins"; 
        return hours + " hrs " + mins + " mins"; 
    };

    return (
        <div className = "ui raised segment" id = {styles.item}>
            <div id={styles.name}>{name}</div>
            <div id={styles.wait}>
                <div id={styles.waitText}>Wait time:&nbsp;</div>
                <div id={styles.waitTime}>{getHoursAndMins()}</div>
            </div>
        </div>
    );
}

export default HospitalItem;