import axios from 'axios';

const url = "https://survive-data.herokuapp.com/";

export const getDbData = async () => {
    const {data} = await axios.get(url);
    return data;
};

export const postDBdata = async(data) => {
    const response = await axios.post(url, data);
    if(response.status === 200)
        console.log("Data updated!");
}