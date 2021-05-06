import React, {useState, useEffect} from 'react';

import IllnessItem from "./IllnessItem";
import styles from "../styles/Illnesses.module.css";
import { fetchApiData } from '../api/fetchApiData';
import { getDbData } from '../api/dbData';

const Illnesses = (props) => {
    const [illnesses, setIllnesses] = useState([]);
    const [dataLength, setDataLength] = useState(null);
    const [patientName, setPatientName] = useState("");
    const [error, setError] = useState("");

    useEffect( () => {
        const fetchIllness = async () => {
            setIllnesses(await fetchApiData("illnesses"));
        };
        fetchIllness();
    },[]);

    useEffect( () => {
        const fetchData = async () => {
            const {patients: {length}} = await getDbData();
            setDataLength(length);
        };
        fetchData();
    },[]);

    const nameValidation = (value) => {
        if(value.trim() === '') {
            setError("Name is required.");
        } else {
           setError("");
        }
    }
    
    const onNameInputChange = (e) => {
        nameValidation(e.target.value);
        setPatientName(e.target.value);
    }

    return ( 
        <div id={styles.list}>
            <div className = "required field" id = {styles.field}>
                <h3 className={styles.label}>Name:</h3>
                <input className={styles.input} value = {patientName} type="text" placeholder=" Your name." onChange = {onNameInputChange}/>
                {error.length > 0 && <span className="error" id={styles.error}>{error}</span>}
            </div>
            <h3 id = {styles.header}>Select an Illness</h3>
            {illnesses.map( (item) =>
                <IllnessItem key = {item.id} item = {item} onIllnessClick = {props.onIllnessClick} dataLength = {dataLength} patientName={patientName}/>
            )}
        </div>
    );
}

export default Illnesses;
