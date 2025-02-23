import { useEffect, useRef} from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

import './HowToUse.css';

export default function HowToUse() {

    const sectionRef = useRef(null);
    const isMobile = useMediaQuery({query: "(max-width: 480px)"});

    useEffect(() => {
        setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }, [])

    const openImagePopup = (e) => {
        var imgModal = document.getElementById("imgModal");
        var imgModalImg = document.getElementById("imgModal-img");
        var imgModalCaption = document.getElementById("imgModal-caption");
        imgModal.style.display = "grid";
        imgModal.style.alignContent = "center";
        imgModalImg.src = e.target.src;
        imgModalCaption.innerHTML = e.target.alt;
    }

    return(
        <div className='howToUse' ref={sectionRef}>
            <Container>
                <Row>
                    <Col xl={12}>
                        <div id='howToUse'>
                            <div id="imgModal" class="imgModal">
                                <span class="imgModal-close" onClick={() => {
                                    var imgModal = document.getElementById("imgModal");
                                    imgModal.style.display = "none";
                                }}>&times;</span>
                                <img class="imgModal-content" id="imgModal-img"></img>
                                <div id="imgModal-caption"></div>
                            </div>
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
                                                    Download the Code File
                                                    <a
                                                        id="downloadCodeFile"
                                                        href="./Code.gs"
                                                        download="Code.gs"
                                                        style={{cursor: 'pointer', color: 'white'}}>
                                                        <i class="bi bi-cloud-arrow-down-fill"
                                                        style={{margin: '0px'}}></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    Open Google Apps Script from Extensions as shown below
                                                    <div class='about_images'>
                                                        <img id='ExtensionAppScript' src='./images/ExtensionAppScript.png' className="image" alt="Extension AppScript"
                                                        onClick={(e) => {
                                                            if(isMobile) {
                                                                openImagePopup(e);
                                                            }
                                                        }}
                                                        ></img>
                                                    </div>
                                                </li>
                                                <li>
                                                    Add the code of the downloaded file to the editor shown in Google Apps Script and give a name to Google App Script Project
                                                </li>
                                                <li>
                                                    Give a name to that file like Code.gs as shown below and Save it.
                                                    <div class='about_images'>
                                                        <img id='SaveAppScript' src='./images/SaveAppScript.png' className="image" alt="Save AppScript"
                                                        onClick={(e) => {
                                                            if(isMobile) {
                                                                openImagePopup(e);
                                                            }
                                                        }}></img>
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
                                            Here is the Sample Google SpreadSheet
                                                <a
                                                    id="sampleGoogleSpreadSheet"
                                                    href="./Sample_GGSheet.xlsx"
                                                    download="Sample_GGSheet.xlsx"
                                                    style={{cursor: 'pointer', color: 'white'}}>
                                                    <i class="bi bi-cloud-arrow-down-fill"
                                                    style={{margin: '0px'}}></i>
                                                </a>
                                        </li>
                                        <li>
                                            Make sure your sheet has restricted access so that only you can view or modify it and copy the link.
                                            <div class='about_images'>
                                                <img id='ShareAccess' src='./images/BluredShareAccess.png' className="image" alt="Share Access"
                                                onClick={(e) => {
                                                    if(isMobile) {
                                                        openImagePopup(e);
                                                    }
                                                }}></img>
                                        </div>
                                        </li>
                                        <li>
                                            Add your records in Fds and Investments Sheet and click on Export Data to Github plugin.
                                            <div class='about_images'>
                                                <img id='ExportDataToGithubPlugin' src='./images/ExportDataToGithubPlugin.png' className="image" alt="Export Data To GithubPlugin"
                                                onClick={(e) => {
                                                    if(isMobile) {
                                                        openImagePopup(e);
                                                    }
                                                }}></img>
                                            </div>
                                        </li>
                                        <li>
                                            Go to Home and you are asked to provide datasheet name and URL, so provide suitable name and paste that <u>link copied in step-7</u> and save it.
                                            <div class='about_images'>
                                                <img id='InitialHome' src='./images/InitialHome.png' className="image" alt="Initial Home Page"
                                                onClick={(e) => {
                                                    if(isMobile) {
                                                        openImagePopup(e);
                                                    }
                                                }}></img>
                                            </div>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Now you will be able to see data analytics on the Home page.
                                    <div class='about_images'>
                                        <img id='SuccessHomePage' src='./images/SuccessHomePage.png' className="image" alt="Success Home Page"
                                        onClick={(e) => {
                                            if(isMobile) {
                                                openImagePopup(e);
                                            }
                                        }}></img>
                                    </div>
                                </li>
                            </ul>
                            <div className='note'>
                                Note: Whenever you update your Google Spreadsheet, ensure that you export the data using the 'Export Data to GitHub' plugin.
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}