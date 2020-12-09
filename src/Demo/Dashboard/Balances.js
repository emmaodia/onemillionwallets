import React, { useState, useEffect } from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import Balances from '../../App/components/Balances'
import Aux from "../../hoc/_Aux";

import Axios from 'axios';

const Dashboard = () => {

    const [balances, setBalances] = useState([]);

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
        }
        
        getTicker();
    }, [setBalances, url])

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={6}>
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
                    </Col>
                   
                </Row>
            </Aux>
        );
    }
// }

export default Dashboard;