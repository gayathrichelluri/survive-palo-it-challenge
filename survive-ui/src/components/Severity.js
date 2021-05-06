import React from "react";
import {Link} from "react-router-dom";


import styles from "../styles/Severity.module.css";
import zero from "../images/1.png";
import one from "../images/2.png";
import two from "../images/3.png";
import three from "../images/4.png";
import four from "../images/5.png";

const Severity = (props) => {
    const images = [[0, zero], [1, one], [2, two], [3, three], [4, four]];

    const onSeverityClick = (e) => {
        props.onSeverityClick(e.target.alt);
    }

    return (
        <div id={styles.body}> 
            <h3 id = {styles.header}>Select severity level: <div id={styles.name}>{props.illnessName}</div></h3>
            <div id = {styles.cards}>
                {images.map( (image) => 
                    <Link to="/hospitals" key = {image[0]} className="ui centered card" id={styles.card} onClick = {onSeverityClick}>
                        <img src = {image[1]} alt = {image[0]} />
                    </Link>
                )}
            </div>
            <Link to="/" id={styles.button}><button className="ui purple basic button">Back</button></Link>
        </div>
    );
};

export default Severity;