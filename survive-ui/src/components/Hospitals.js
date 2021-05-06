import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import HospitalItem from "./HospitalItem";
import {fetchApiData} from "../api/fetchApiData";
import {postDBdata} from "../api/dbData";
import styles from "../styles/Hospitals.module.css";

const Hospitals = ({id, patientName, illnessName, levelOfPain}) => {
    
    const [hospitals, setHospitals] = useState([]);
    let curated = [];

    useEffect(()=>{
        const fetchHospitals = async () => {
            setHospitals(await fetchApiData("hospitals"));
        };
        fetchHospitals();
    },[]);

    useEffect(()=>{
        const postData = async () => {
            if(patientName <= 0)
                patientName = `patient_${id}`;
            await postDBdata({id: id, patient_name: patientName, illness_name: illnessName, pain_level: levelOfPain});
        };
        postData();
    }, []);

    if(hospitals.length>0) {
        try{
            hospitals.map(({id, name, waitingList}) => {
                const {averageProcessTime, patientCount} = waitingList[levelOfPain];
                curated[id-1] = {id, name, averageProcessTime, patientCount, "waitingTime" : averageProcessTime*patientCount};
            });
            curated.sort(function(a, b){return a.waitingTime-b.waitingTime});
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div id={styles.list}>
            <h3 id = {styles.header}>Our Suggested Hospitals</h3>
            {curated.map( (hospital) => 
                <HospitalItem key = {hospital.id} item = {hospital}/>
            )}
            <Link to="/severity" id={styles.button}><button className="ui purple basic button">Back</button></Link>
        </div>
    );
}

export default Hospitals;