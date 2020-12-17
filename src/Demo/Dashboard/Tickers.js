import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Table,} from 'react-bootstrap';
import ContentLoader from "react-content-loader";
import Tickers from '../../App/components/Tickers'

import Aux from "../../hoc/_Aux";

import Axios from 'axios';

const Dashboard = () => {

    const [tickers, setTicker] = useState([]);
    const [fetching, setFetching] = useState(true);

    const url = `https://api.covalenthq.com/v1/pricing/tickers/?key=API_KEY`

    

    useEffect(() => {
        const getTicker = async () => {
            const response = await Axios ({
            url: url,
            method: "GET"
        })
        
        const data = response.data.data.items;
        console.log('here')
        console.log(data)
        setTicker(data)
        setFetching(false);
        }
        
        getTicker();
    }, [setTicker, url])

    if (fetching) return  <Card.Body>
                            <Row>
                                <Col md={12}>   <h5>Data Loading...</h5> 
                                    <ContentLoader 
                                        speed={2}
                                        width={'75%'}
                                        height={160}
                                        viewBox="0 0 400 160"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        
                                    >
                                    <rect x="80" y="40" rx="3" ry="3" width="400" height="100" /> 
                                    <rect x="80" y="40" rx="4" ry="4" width="400" height="100" />
                                    <rect x="80" y="40" rx="3" ry="3" width="400" height="100" />
                                    </ContentLoader>
                                </Col>
                            </Row>
                        </Card.Body>

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Get spot prices</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                {tickers.map(data => (
                                    <Tickers key={data.contract_name}
                                        contract_name={data.contract_name}
                                        contract_address={data.contract_address}
                                        contract_ticker_symbol={data.contract_ticker_symbol}
                                        quote_rate={data.quote_rate}
                                        rank={data.rank}
                                        logo_url={data.logo_url}
                                    />
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
// }

export default Dashboard;