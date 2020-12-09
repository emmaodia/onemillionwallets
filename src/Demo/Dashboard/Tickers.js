import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Table,} from 'react-bootstrap';

import Tickers from '../../App/components/Tickers'

import Aux from "../../hoc/_Aux";

import Axios from 'axios';

const Dashboard = () => {

    const [tickers, setTicker] = useState([]);

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
        }
        
        getTicker();
    }, [setTicker, url])

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