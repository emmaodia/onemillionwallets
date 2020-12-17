import React, { useState, useEffect } from 'react';
import {Row, Col, Card, InputGroup, FormControl} from 'react-bootstrap';
import Balances from '../../App/components/Balances'
import Aux from "../../hoc/_Aux";
import ContentLoader from "react-content-loader";

import Axios from 'axios';

const Dashboard = () => {

    const [balances, setBalances] = useState([]);
    const [fetching, setFetching] = useState(true);

    const url = `https://api.covalenthq.com/v1/1/address/0x32D9b5C41d594838d6b993ebAF538fF770a00E30/balances_v2/?key=API_KEY`

    

    useEffect(() => {
        const getTicker = async () => {
            const response = await Axios ({
            url: url,
            method: "GET"
        })
        
        const data = response.data.data.items;
        console.log('here')
        console.log(data)
        setBalances(data)
        setFetching(false);
        }
        
        getTicker();
    }, [setBalances, url])


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
                <Card>
                    <Card.Header>
                    <Card.Title as="h6">Enter a Wallet address to view all Transactions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                    <Row>
                        <Col md={12}>
                        <InputGroup className="mb-4">
                            <InputGroup.Prepend>
                            <InputGroup.Text>Search</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="With textarea" />
                        </InputGroup>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
                <Row>
                    
                        {/* <Card className='card-social'> */}
                            {balances.map(balance => (
                                <Balances 
                                    key={balance.contract_name}
                                    contract_name={balance.contract_name}
                                    contract_ticker_symbol={balance.contract_ticker_symbol}
                                    logo_url={balance.logo_url}
                                    balance={balance.balance}
                                    type={balance.type}
                                    quote_rate={balance.quote_rate}
                                    quote={balance.quote}
                                    nft_data={balance.nft_data}
                                />
                            ))}
                        {/* </Card> */}                   
                </Row>
            </Aux>
        );
    }
// }

export default Dashboard;