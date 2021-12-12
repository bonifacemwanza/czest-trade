import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({coinHistory,currentPrice, coinName}) => {
    
const {Title} = Typography;
    const coinPrice = [];
    const coinTimestamp = [];
    
    for (let i = 0; i < coinHistory?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.history[i].price);
      }
    
      for (let i = 0; i < coinHistory?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.history[i].timestamp).toLocaleDateString());
      }
      const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart</Title>
                <Col className="chart-header">
                    <Title level={5} className="price-change">{coinHistory?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Title>                    <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
    
                </Col>
                <Line data={data} options={options}/>
            </Row>
        </>
    )
}

export default LineChart
