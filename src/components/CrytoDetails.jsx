import React, {useState, useEffect} from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { selectedCurrency,selectedCurrencyChart,removeSelectedCurrencyChart,removeSelectedCurrency } from '../redux/actions/CryptoActions';
import { LineChart } from '.'


const {Title, Text} = Typography;
const { Option } = Select;

const CrytoDetails = () => {

    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState('7d')

    const dispatch =  useDispatch();
    
    const MultipleRequest = (type = "info",coin_in, time_period=null) => {
        let url_n;
        if (type == 'chart'){
            url_n = `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${time_period}`;
        } else {
            url_n = `https://coinranking1.p.rapidapi.com/coin/${coinId}` 
        }
        const options = {
            method: 'GET',
            url: url_n,
            headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '9261b4b56amsh5718c4638253499p17b454jsnac98a98626d3'
            }
        };
      
        const currencyDataFetch  = async () =>  axios.request(options).then(function (response) {
            
            console.log(response.data);
            (type == 'chart')?  dispatch(selectedCurrencyChart(response.data.data)) :  dispatch(selectedCurrency(response.data.data))
           
            
        }).catch(function (error) {
            console.error(error);
        })

        currencyDataFetch();
    }
    
   
    useEffect(() => {
        if(coinId && coinId !== "") {
            MultipleRequest("chart",coinId,timePeriod);
            MultipleRequest("info",coinId,null)
        }
        return () => {
            dispatch(removeSelectedCurrency())
            dispatch(removeSelectedCurrencyChart())
        }
        
       
    }, [coinId])
    const changePeriodTime = (value) => {
        setTimePeriod(value);
        MultipleRequest("chart",coinId,value);
    }
    const cryptoDetails = useSelector(state => state?.currency?.coin)
    const coinHistory = useSelector(state => state?.currency_chart);
    console.log(coinHistory)
    if (!cryptoDetails) return 'Loading ...';

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    
    return (
        <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.slug}) Price
          </Title>
          <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </Col>
        <Select 
                    defaultValue="7d" 
                    className="select-timeperiod"
                    onChange={(value) => changePeriodTime(value)}
                  >
                      {
                          time.map((date) => <Option key={date}>{date}</Option>)
                      }

                  </Select>
        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">Other Stats Info</Title>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
            {cryptoDetails.links?.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    );
}

export default CrytoDetails
