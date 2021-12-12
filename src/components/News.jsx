import React, {useEffect, useState} from 'react'
import axios from "axios";
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input,Typography,Avatar, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setNewsData } from '../redux/actions/CryptoActions';
import  moment  from 'moment';




const  News = ({simplified}) => {
    const [newsCategory, setNewsCategory] =  useState("Crytocurrency");
    const {Title, Text} = Typography;
    const { Option } = Select;
    const count_val = simplified? 6 : 100;
    const dispatch = useDispatch();
    const options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}`,
        params: {safeSearch: 'Off', textFormat: 'Raw', freshness: 'Day'},
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': '9261b4b56amsh5718c4638253499p17b454jsnac98a98626d3'
        }
      };
      
     const FetchNews = async () => axios.request(options).then(function (response) {
          console.log(response.data.value);
          dispatch(setNewsData(response.data));
      }).catch(function (error) {
          console.error(error);
      });
    useEffect(() => {
        FetchNews()
       
    }, [])
    
    const changeCategory = (value) => {
     if (value) setNewsCategory(value);
     FetchNews();
    }

    const fetchNewsData = useSelector(state => state.newsData.newsData)
    const fetchCurrencyCategories = useSelector(state => state.cryptoData?.cryptoData?.coins)

    console.log(fetchNewsData.value)
    if(!fetchNewsData?.value) return 'Loading ...';
    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select 
                       showSear
                       className="select-news"
                       placeholder="Select a Crpto"
                       optionFilterProp="children"
                       onChange={(value) => changeCategory(value)}
                       filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() > 0)}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {fetchCurrencyCategories?.map((coin) => (
                            <Option value={coin.name}>{coin.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}

            {fetchNewsData?.value?.slice(0,count_val).map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.name}
                                </Title>
                                <img style={{maxWidth:"200px", maxHeight:"100px"}} src={news?.image?.thumbnail?.contentUrl} alt="news"/>
                                
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0,100)} ...` : news.description} 
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="news" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>

                               </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                            </div>
                           
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
