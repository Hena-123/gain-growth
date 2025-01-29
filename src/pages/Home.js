import { useEffect, useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DashboardWidget from '../components/DashboardWidget';
import DashboardSingleStateWidget from '../components/DashboardSingleStateWidget';
import Alert from '../components/Alert';
import DataHandler from '../components/DataHandler';

import { extractFields, getDateDifference } from '../utils/utils'
import { ALLOWED_DRILLDOWN_CLASS_NAMES, GITHUB_REPO, GITHUB_OWNER, GITHUB_REF_BRANCH, GITHUB_TOKEN} from '../utils/const/const';
import  { homeWidgets } from '../utils/const/HomeConst';

import { updateFDs, updateInvestments, cleanUpAll, setDataAvailability, getDataAvailability, getInvalidSheet, setInvalidSheet } from '../app/redux/actions';

import './Home.css';

function Home(props) {

    const [totalFDCountDrilldown, setTotalFDCountDrilldown] = useState(false);
    const [totalInvestmentCountDrilldown, setTotalInvestmentCountDrilldown] = useState(false);

    const [fileLinkCookie, setFileLinkCookie] = useCookies(['gg_filelink']);
    const [fileNameCookie, setFileNameCookie] = useCookies(['gg_filename']);
    const [updatedAtCookie, setUpdatedAtCookie] = useCookies(['gg_updatedAt']);
    const [timeAgo, setTimeAgo] = useState('');
    const [isDataHandlerActive, setIsDataHandlerActive] = useState(false);
    const [editSheet, setEditSheet] = useState(false);
    const [invalidSheet, setInvalidSheet] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");
    const [load, setLoad] = useState(true);
    const [noSheetAvailable, setNoSheetAvailable] = useState(false);
    const navigate = useNavigate();

    // When onClick is performed, on Component render (initial render)
    useEffect((e) => {
        console.log("home");
        document.addEventListener('click', e => {
            let className = e.target.className;
            if(className === undefined || className === ''){
                if(e.target.closest('div') === null || e.target.closest('div') === undefined) {
                    className = undefined
                } else {
                    className = e.target.closest('div').className
                }
            }
            if(className === undefined || className === '' || !ALLOWED_DRILLDOWN_CLASS_NAMES.includes(className)){
                unloadDrillDowns();
            }
        });

        const interval = setInterval(() => {
            if(updatedAtCookie.gg_updatedAt > 0){
                setTimeAgo(getDateDifference(new Date(updatedAtCookie.gg_updatedAt), new Date()));
            } else {
                setTimeAgo('0s ago');
            }
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if(updatedAtCookie.gg_updatedAt > 0){
                setTimeAgo(getDateDifference(new Date(updatedAtCookie.gg_updatedAt), new Date()));
            } else {
                setTimeAgo('0s ago');
            }
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, []);

    // When fdData & investmentData changes
    useEffect(() => {
        if(props.isDataAvailable) {
            console.log("Data Available");
            setInvalidSheet(false);
            setNoSheetAvailable(false);
            setTimeout(()=> {
                openAlert("<p style='margin: 0px'><strong>Success:</strong> Data has been successfully loaded from Google Sheets.</p>", "success");
                setLoad(false);
            }, 2000);
        }
        else if(props.invalidSheet.status) {
            console.log("Invalid");
            setInvalidSheet(true);
            setNoSheetAvailable(false);
            openAlert(props.invalidSheet.message, "error");
        }
        else {
            console.log("No Data Available");
            setNoSheetAvailable(true);
            setIsDataHandlerActive(true);
        }
    }, [props.fds.fdData, props.invalidSheet]);

    const scroll = useCallback(node => {
        if (node !== null) {
            node.scrollIntoView({behavior: "smooth", block: "center", inline: "center" });
        }
      }, []);

    const unloadDrillDowns = () => {
        setTotalFDCountDrilldown(false);
        setTotalInvestmentCountDrilldown(false);
    }

    const onModalClose = () => {
        setIsDataHandlerActive(false);
        setEditSheet(false);
    }

    const openAlert = (message, type) => {
        setShowAlert(true);
        setAlertType(type);
        setAlertMessage(message);
    }
    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage("");
    }

    return(
        <div className="home">
            { showAlert &&
                <Alert type={alertType} message={alertMessage} show={true} onClose={closeAlert}>
                </Alert>
            }
            { isDataHandlerActive &&
                <DataHandler isModalOpen={editSheet} onModalClose={onModalClose} updateFDs={props.updateFDs} updateInvestments={props.updateInvestments} cleanUpAll={props.cleanUpAll} setDataAvailability={props.setDataAvailability} setInvalidSheet={props.setInvalidSheet}></DataHandler>
            }
            <Container>
                <Row>
                    <div className="welcomeTitle" >
                        Welcome to Gain Growth
                    </div>
                </Row>
                <Row style={{margin: '0px', borderRadius: '10px', boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.287)', padding: '8px'}}>
                    <Col xl={9} md={12} sm={12} xs={12} style={{alignSelf: 'center', textAlign: 'left', fontSize: '20px'}}>
                        <div className="ctooltip">
                            <a
                                href={fileLinkCookie.gg_filelink !== undefined ? fileLinkCookie.gg_filelink : ""}
                                target="_blank">
                                <i className="bi bi-file-earmark-check-fill"></i>
                            </a>
                            <span className="ctooltiptext top-ctooltiptext">
                                {(fileLinkCookie.gg_filelink !== undefined ? "Go to your sheet" : "Sheet not available") + " : " + (fileNameCookie.gg_filename !== undefined ? fileNameCookie.gg_filename : "")}
                            </span>
                        </div>
                        {fileNameCookie.gg_filename !== undefined ? fileNameCookie.gg_filename : ""}
                    </Col>
                    <Col xl={3} md={12} sm={12} xs={12} style={{textAlign: 'right'}}>
                        <div className="ctooltip">
                            <button
                                style={{padding: '0px', background: 'none', border: 'none'}}
                                onClick={() => {
                                    setIsDataHandlerActive(true);
                                    setEditSheet(true);
                                }}>
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <span className="ctooltiptext top-ctooltiptext">
                                Edit your sheet
                            </span>
                        </div>
                        <div className="ctooltip">
                            <i className="bi bi-arrow-repeat"
                                style={{margin: '0px'}}
                                onClick={() => {
                                    // Reload from sheets from localstorage
                                    setIsDataHandlerActive(true);
                                }}>
                            </i>
                            <span className="ctooltiptext top-ctooltiptext">
                                Reload
                            </span>
                        </div>
                        <div className="ctooltip">
                            <div style={{padding: '4px'}}>
                                {timeAgo}
                            </div>
                            <span className="ctooltiptext top-ctooltiptext">
                                Sheet Updated
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
            {
                invalidSheet ? 
                    <div className="invalidContainer">
                        <img className="invalidSheet" onClick={() => navigate('/howtouse')} src="./images/Invalid_Sheet.png" alt="Invalid Sheet"></img>
                    </div>
                :
                (
                    noSheetAvailable ?
                        <div className="noSheetContainer">
                            <img className="noSheetAvailable" onClick={() => navigate('/howtouse')} src="./images/No_Sheet_Available.png" alt="No Sheet Available"></img>
                        </div>
                        :
                    (
                        load ?
                            <div id="loader">
                                <BounceLoader color={'#36d7b7'} loading={load} size={70} aria-label="Loading Spinner" data-testid="loader"/>
                            </div>
                        :
                        <Container>
                            <Row>
                                {homeWidgets.fdWidgets.map(widget =>
                                    <Col xl={3} md={6} sm={3} xs={12} id={widget}>
                                        <DashboardSingleStateWidget
                                            className="dashboardSingleStateWidget-bubble"
                                            data={props.fds.fdData}
                                            config={props.fds.fdMetadata['widgets'][widget]}
                                            hasDrilldown = {widget == "TOTAL_FDS_COUNT" ? true : false}
                                            onClick={() => {
                                                if(widget == "TOTAL_FDS_COUNT") {
                                                    unloadDrillDowns();
                                                    setTotalFDCountDrilldown(prev=>!prev);
                                                }
                                            }}
                                            superscriptEnabled={false}
                                            subscriptEnabled={true}
                                            hoverInfo={false}>
                                        </DashboardSingleStateWidget>
                                    </Col>
                                )}
                            </Row>
                            {
                                totalFDCountDrilldown
                                &&
                                    <Row className='bounceElement' ref={scroll}>
                                        <Col xl={12}>
                                            <DashboardWidget
                                                data={props.fds.fdData}
                                                config={props.fds.fdMetadata['widgets']['TOTAL_FDS_COUNT']}
                                                filter={{"widget": 'TOTAL_FDS_COUNT'}}>
                                            </DashboardWidget>
                                        </Col>
                                    </Row>
                            }
                            <Row>
                                {homeWidgets.investmentWidgets.map(widget =>
                                    <Col xl={3} md={6} sm={3} xs={12} id={widget}>
                                        <DashboardSingleStateWidget
                                            className="dashboardSingleStateWidget-bubble"
                                            data={props.investments.investmentData}
                                            config={props.investments.investmentMetadata['widgets'][widget]}
                                            hasDrilldown = {widget == "TOTAL_INVESTMENTS_COUNT" ? true : false}
                                            onClick={() => {
                                                if(widget == "TOTAL_INVESTMENTS_COUNT") {
                                                    unloadDrillDowns();
                                                    setTotalInvestmentCountDrilldown(prev=>!prev);
                                                }
                                            }}
                                            superscriptEnabled={false}
                                            subscriptEnabled={true}
                                            hoverInfo={false}>
                                        </DashboardSingleStateWidget>
                                    </Col>
                                )}
                            </Row>
                            {
                                totalInvestmentCountDrilldown
                                &&
                                    <Row className='bounceElement' ref={scroll}>
                                        <Col xl={12}>
                                            <DashboardWidget
                                                data={props.investments.investmentData}
                                                config={props.investments.investmentMetadata['widgets']['TOTAL_INVESTMENTS_COUNT']}
                                                filter={{"widget": 'TOTAL_INVESTMENTS_COUNT'}}>
                                            </DashboardWidget>
                                        </Col>
                                    </Row>
                            }
                        </Container>
                    )
                )
            }
        </div>
    );
}

export function loadDataFromSheets(spreadSheetId, updateFDs, updateInvestments, cleanUpAll, setDataAvailability, setInvalidSheet){

    const baseURL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/sheetdata/${spreadSheetId}`;
    const refParam = `?ref=${GITHUB_REF_BRANCH}`;

    const fileCheckURL = baseURL + refParam;
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',  // Optional: To specify API version
        }
    };
    setDataAvailability(false);

    const fetchData = async() => {
        try {
            const response = await fetch(fileCheckURL, options);
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }

            let resultObject = {};

            var filePresentResult = response.json();
            filePresentResult.then(filePresentResult => {
                var files = filePresentResult.map(files => files.name);
                files.forEach(async (file) => {

                    const fetchFileMetadataURL = baseURL + `/${file}` + refParam ;

                    // Fetch file metadata from GitHub API
                    const response = await fetch(fetchFileMetadataURL, options);
                    if (!response.ok) {
                        throw new Error('Failed to fetch file metadata');
                    }
                    var fileMetadataResult = response.json();
                    fileMetadataResult.then(async (fileMetadataResult) => {
                        const rawFileURL = fileMetadataResult.download_url;

                        // Fetch the raw file content using the download_url
                        const response = await fetch(rawFileURL);
                        if (!response.ok) {
                            throw new Error('Failed to fetch file content');
                        }

                        var dataResults = response.json();
                        dataResults.then(data => {
                            console.log("\nON HOME ", file ," Data: ", data);
                            if(file.toUpperCase().includes("FDS")) {
                                Object.assign(resultObject, {fdData: {"data": data, "fields": extractFields(data)}});
                                // resultObject.fdData = {data: data, fields: extractFields(data)};
                                updateFDs({'data': data, 'fields': extractFields(data)});
                            } else if(file.toUpperCase().includes("INVESTMENTS")) {
                                Object.assign(resultObject, {investmentData: {"data": data, "fields": extractFields(data)}});
                                // resultObject.investmentData = {data: data, fields: extractFields(data)};
                                updateInvestments({'data': data, 'fields': extractFields(data)});
                            }
                        })
                    })
                });
            });
            setDataAvailability(true);
            setInvalidSheet({status: false, message: ''});
            return {isLoaded: response.ok, message: "Data loaded successfully", result: {'obj': resultObject}};

        } catch(error) {
            console.error("Error: ", error.message);
            cleanUpAll();
            setInvalidSheet({status: true, message: "<p style='margin: 0px'><strong>Error:</strong> Could not retrieve data from Google Sheets. <br> Please verify the steps mentioned in the <code class='c-code'>How to Use?</code> guide.</p>"});
            return {isLoaded: false};
        }
    }
    return fetchData();
}

const mapStateToProps = state => {
    console.log("STATE on HOME: ",state)
    const { fds, investments, isDataAvailable, invalidSheet} = state.connectReducer.dataset;
    return { 'fds': fds, 'investments': investments, 'isDataAvailable': isDataAvailable, 'invalidSheet': invalidSheet};
}
export default connect(mapStateToProps, {updateFDs, updateInvestments, cleanUpAll, setDataAvailability, getDataAvailability, getInvalidSheet, setInvalidSheet})(Home);