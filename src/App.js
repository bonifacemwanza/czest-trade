import React from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom"
import { Layout, Typography, Space} from 'antd'
import {Navbar, Exchanges,Homepage, Crptocurrencies,CrytoDetails, News} from './components';
import "./App.css"

function App() {
    return (
        <div className="app">
             <Router>
               
            <div className="navbar">
               <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route  path="/" element={<Homepage />} />
                              
                            <Route  path="/exchanges" element={ <Exchanges />} />
                               
                           
                            <Route  path="/cryptocurrencies" element={<Crptocurrencies />} />
                                
                          
                            <Route  path="/crypto/:coinId" element={<CrytoDetails />} />
                              
                            
                            <Route  path="/news" element={<News />}/>
                               
                     </Routes>
                       
                       
                    </div>

                </Layout>

          
            <div className="footer">
                <Typography.Title  level={5} style={{color:'white', textAlign:'center'}}>
                    Czest Tech <br />
                    All rights reserved
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="news">News</Link>
                    
                </Space>
            </div>
            </div>
             
          </Router>
        </div>
    )
}

export default App
