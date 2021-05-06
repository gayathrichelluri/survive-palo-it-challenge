import React from "react";
import {Link} from "react-router-dom";

import styles from "../styles/IllnessItem.module.css";

const IllnessItem = (props) => {
    const onClick = (e) => {
        props.onIllnessClick(props.dataLength, props.patientName, props.item.illnessName);
    }

    return (
        <Link to = "/severity" className = "ui raised segment" id = {styles.item} onClick = {onClick}>
            <div id={styles.itemname}>{props.item.illnessName}</div>
            <i id={styles.arrow} className="angle right icon"></i>
        </Link>
    );
}

export default IllnessItem;