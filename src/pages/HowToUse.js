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
        <div className='howToUse' ref={scroll}>
            <Container>
                <Row>
                    <Col xl={12}>
                        <div id='howToUse'>
                            <h1>How to use Gain-Growth?</h1>
                            <ul>
                                <li>
                                    To get max out of it, you need to follow below steps :
                                    <ol>
                                        <li>
                                            First create one <i className="bi bi-google" style={{color: '#4dd571'}}></i> google spreadsheet which contains your fds and investment records.
                                        </li>
                                        <li>
                                            Add <u><b>Export Data to Github</b></u> plugin to the spreadsheet using below steps.
                                            <ul>
                                                <li>
                                                    Download the File: <a>file</a>
                                                </li>
                                                <li>
                                                    Open Google Apps Script from Extensions as shown below
                                                    <div class='about_images'>
                                                        <img id='ExtensionAppScript' src='./images/ExtensionAppScript.png' className="image" alt="ExtensionAppScript Not Found"></img>
                                                    </div>
                                                </li>
                                                <li>
                                                    Add the code of the file to the editor shown in Google Apps Script and give a name to Google App Script Project and Save it
                                                    <div class='about_images'>
                                                        <img id='SaveAppScript' src='./images/SaveAppScript.png' className="image" alt="SaveAppScript Not Found"></img>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
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
                                            Now, just add your records in Fds and Investments Sheet and click on Export Data to Github plugin.
                                        </li>
                                        <div class='about_images'>
                                            <img id='ExportDataToGithubPlugin' src='./images/ExportDataToGithubPlugin.png' className="image" alt="ExportDataToGithubPlugin Not Found"></img>
                                        </div>
                                    </ol>
                                </li>
                                <li>
                                    Now you will be able to see data analytics on the Home page.
                                </li>
                                <li className='highlight'>
                                    Remember: every time you made some changes in your google spreadsheet, you need to export your data using <u><b>Export Data To Github</b></u> plugin.
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}