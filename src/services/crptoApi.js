
import axios from "axios";
const data = [];
const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  headers: {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '9261b4b56amsh5718c4638253499p17b454jsnac98a98626d3'
  }
};

 const cryptoFetch  =  axios.request(options).then(function (response) {
	console.log(response.data.data);
    data.push(response.data.data)
}).catch(function (error) {
	console.error(error);
});

export const coins = data;