import axios from 'axios';

const url = "http://dmmw-api.australiaeast.cloudapp.azure.com:8080"

export const fetchApiData = async (extendURL) => {

    let repo = [], pageNum, i, totalPages;
 
    const fetchTotalPages = async () => { 
      const {data} = await axios.get(`${url}/${extendURL}`) 
      return data.page.totalPages + 1;
    };

    const fetch = {
      illnesses: async (pageNum) => {
        const {data: {_embedded: {illnesses}}} = await axios.get(`${url}/${extendURL}?limit=10&page=${pageNum}`);
        for(i=0; i<illnesses.length; i++) {
          const {illness: {id, name}} = illnesses[i];
          repo[id-1] = {id, illnessName: name};
        }
      },

      hospitals: async (pageNum) => {
        const {data: {_embedded: {hospitals}}} = await axios.get(`${url}/${extendURL}?limit=10&page=${pageNum}`);

        for(i=0; i<hospitals.length; i++) {
          const {id, name, location, waitingList} = hospitals[i];
          repo[id-1] = {id, name, location, waitingList};
        }
      }
    }

    try{
      totalPages = await fetchTotalPages(); 
      for(pageNum=0; pageNum<totalPages; pageNum++)
        await fetch[`${extendURL}`](pageNum);
      
      return repo;
    } catch(error){
      console.log(error);
    }

    
}