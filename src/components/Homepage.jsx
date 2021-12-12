import React, {useEffect} from 'react'
import axios from "axios";
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { coins } from '../services/crptoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCryptoData } from '../redux/actions/CryptoActions';
import { News,Crptocurrencies } from '.';
import { Link } from 'react-router-dom';
const {Title} = Typography;

function Homepage() {

    const dispatch =  useDispatch();
 
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': '9261b4b56amsh5718c4638253499p17b454jsnac98a98626d3'
        }
      };
      
    const cryptoFetch  = () =>  axios.request(options).then(function (response) {
          console.log(response.data.data);
         
          dispatch(setCryptoData(response.data.data))
          
      }).catch(function (error) {
          console.error(error);
      })
    
   
    useEffect(() => {
        cryptoFetch()
       
    }, [])
    const coinData = useSelector(state => state);
    const globalStats = coinData?.cryptoData?.cryptoData?.stats;
 console.log(coins)
 const check_is_valid = (value) => {
    if(value !== null && value !== undefined){
         return millify(value);
    } else {
         return 0;
    }
 }
  if(Object.keys(coinData).length == 0) return 'Loading ...';
    return (
        <>
          <Title level={2} className="heading">Global Crypto Statistics</Title>
          <Row>
              <Col span={12}><Statistic title="Total Crypto currencies" value={globalStats?.total}/></Col>
              <Col span={12}><Statistic title="Total Market Cap" value={check_is_valid(globalStats?.totalMarketCap)}/></Col>
              <Col span={12}><Statistic title="Total Markets" value={check_is_valid(globalStats?.totalMarkets)}/></Col>
              <Col span={12}><Statistic title="Total Exchanges" value={check_is_valid(globalStats?.totalExchanges)}/></Col>
              <Col span={12}><Statistic title="Total 24h Volume" value={check_is_valid(globalStats?.total24hVolume)}/></Col>

          </Row>
          <div className="home-heading-container">
              <Title level={2} className="home-title">Top 10 Crypto Currencies in the world</Title>
              <Title level={3} className="show-more" ><Link to="/cryptocurrencies">Show more</Link></Title>
          </div>
          <Crptocurrencies simplified/>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crpto News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
            </div>
          <News simplified/>
        </>
    )
}

export default Homepage
