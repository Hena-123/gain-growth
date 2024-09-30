import { useCallback } from 'react';
import './HowToUse.css';

import { Container, Row, Col } from 'react-bootstrap';

export default function HowToUse() {

    const scroll = useCallback(node => {
        if(node != null) {
            node.scrollIntoView(true);
        }
    }, []);

    return(
        <div className='about' ref={scroll}>
            <Container>
                <Row>
                    <Col xl={12}>
                        <div>
                            <h1>How to use Gain-Growth?</h1>
                            <ul>
                                <li>
                                    To get max out of it, you need to follow below steps :
                                    <ol>
                                        <li>
                                            First create one <i class="bi bi-google" style={{color: '#4dd571'}}></i> google spreadsheet which contains your investment records and <u><b>provide public access for that spreadsheet.</b></u>
                                        </li>
                                        <div class='about_images'>
                                            <img id='SheetAccess' src='/SheetAccess.png' class="image"></img>
                                        </div>
                                        <li>
                                            Your spreadsheet <u><b>must have sheet with name Fds or Investments</b></u>, othervise you will see no data.
                                        </li>
                                        <li>
                                            Your Fds sheet contains following table columns :
                                            <ul>
                                                <li>
                                                    Id, Bank, FD No, Account No, Account Holder, Opening Date, Opening Month, Opening Year, Maturity Date, Maturity Month, Maturity Year, Opening Amount, Interest Rate, Interest, Maturity Amount, Remarks
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            Your Investments sheet contains following table columns :
                                            <ul>
                                                <li>
                                                    Id, Investment Type, Investment No, Investment Holder, Opening Date, Opening Month, Opening Year, Maturity Date, Maturity Month, Maturity Year, Opening Amount, Interest Rate, Interest, Maturity Amount, Remarks
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            Copy the sheet link available in URL and use it in Edit Sheet-URL Form.
                                        </li>
                                        <div class='about_images'>
                                            <img id='SheetURL' src='/SheetURL_<480.png' class='image'></img>
                                        </div>
                                        <div class='about_images'>
                                            <img id='SheetURL990' src='/SheetURL_>990.png' class='image'></img>
                                        </div>
                                    </ol>
                                </li>
                                <li>
                                    Now you will be able to see statics on the dashboard.
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}