import { useEffect, useState, useCallback } from 'react';

import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BounceLoader from "react-spinners/BounceLoader";
import { useMediaQuery } from 'react-responsive';

import DashboardWidget from '../components/DashboardWidget';
import DashboardSingleStateWidget from '../components/DashboardSingleStateWidget';
import DataHandler from '../components/DataHandler';
import { getAllYears, filterDataByValue, getDateDifference } from '../utils/utils';
import { initialStateInvestmentMetadata, yearInvestmentFields } from '../utils/const/InvestmentConst';
import { dashboardSingleStateWidgetSubscript, investmentWidgetTitles } from '../utils/const/WidgetNameConst';

import { updateFDs, updateInvestments, cleanUpAll, setDataAvailability, setInvalidSheet } from '../app/redux/actions';

import '../App.css';

function Investments(props) {

    const ALLOWED_DRILLDOWN_CLASS_NAMES =  ["dashboardSingleStateWidget", "dashboardWidget"]
    const [data, setData] = useState([]);
    const [datasetMetadata, setDatasetMetadata] = useState([]);

    const [displayData, setDisplayData] = useState([]);
    const [load, setLoad] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDataHandlerActive, setIsDataHandlerActive] = useState(false);

    const [totalMaturedCountOverYearDrilldown, setTotalMaturedCountOverYearDrilldown] = useState(false);
    const [totalInvestedCountOverYearDrilldown, setTotalInvestedCountOverYearDrilldown] = useState(false);
    const [investedByMonthDrilldown, setInvestedByMonthDrilldown] = useState(false);
    const [investedByInvestmentHolderDrilldown, setInvestedByInvestmentHolderDrilldown] = useState(false);
    const [investedThatMaturedInDrilldown, setInvestedThatMaturedInDrilldown] = useState(false);

    const [selectedRowValue, setSelectedRowValue] = useState(null);
    const [fileLinkCookie, setFileLinkCookie] = useCookies(['gg_filelink']);
    const [fileNameCookie, setFileNameCookie] = useCookies(['gg_filename']);
    const [updatedAtCookie, setUpdatedAtCookie] = useCookies(['gg_updatedAt']);
    const [timeAgo, setTimeAgo] = useState('');
    const navigate = useNavigate();
    const isMobile = useMediaQuery({query: "(max-width: 480px)"});

    // When onClick is performed, on Component render (initial render)
    useEffect(() => {
        document.addEventListener('click', e => {
            let className = e.target.className;
            if(className === undefined || className === ''){
                className = e.target.closest('div').className
                if(className === undefined || className === '' || !ALLOWED_DRILLDOWN_CLASS_NAMES.includes(className)){
                    className = e.target.closest('div').parentElement.className
                }
            }
            if(className === undefined || className === '' || !ALLOWED_DRILLDOWN_CLASS_NAMES.includes(className)){
                unloadDrillDowns();
            }
        });
    }, []);

    // Whenever updatedAtCookie.gg_updatedAt changes
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
    }, [updatedAtCookie.gg_updatedAt]);

    // After data is available on UI, after loading
    useEffect(() => {
        if(!load) {
            var currentYear = new Date().getFullYear();
            if(document.getElementById("year-dropdown") && document.getElementById(currentYear)) {
                document.getElementById("year-dropdown").innerHTML = "Year-"+currentYear;
                document.getElementById(currentYear).click();
            }
            console.log("changed year");
            setSearchParams({"year": currentYear});
        }
    }, [load]);

    // When investmentData changes
    useEffect(() => {
        if(props.isDataAvailable) {
            console.log("Data Available");
            setTimeout(()=> {
                setData(props.investments.investmentData);
                setDatasetMetadata (props.investments.investmentMetadata);
                setDisplayData(props.investments.investmentData);
                setLoad(false);
            }, 2000);
        } else {
            console.log("navigate to home");
            navigate("/");
        }
    }, [props.investments.investmentData])

    const scroll = useCallback(node => {
        if (node !== null) {
            node.scrollIntoView({behavior: "smooth", block: "center", inline: "center" });
        }
      }, []);

    const applyfilter = (year) => {
        if(year) {
            setDisplayData(filterDataByValue(data, yearInvestmentFields[0], year).concat(filterDataByValue(data, yearInvestmentFields[1], year)));
        } else {
            setDisplayData(data);
        }
    }

    const loadBounceElement = () => {
        var allWidgets = Object.keys(initialStateInvestmentMetadata);
        var length = Object.keys(initialStateInvestmentMetadata).length;
        var allWidgetsExceptAll = allWidgets.slice(1, length);
        allWidgetsExceptAll.forEach(element => {
            if(document.getElementById(element) != null){
                document.getElementById(element).classList.add("bounceElement")
            }
        })
        setTimeout(() => {
            allWidgetsExceptAll.forEach(element => {
                if(document.getElementById(element) != null){
                    document.getElementById(element).classList.remove("bounceElement")
                }
            })
        }, 2000);
    }

    const onModalClose = () => {
        setIsDataHandlerActive(false);
    }

    const unloadDrillDowns = () => {
        setTotalMaturedCountOverYearDrilldown(false);
        setTotalInvestedCountOverYearDrilldown(false);
        setInvestedByMonthDrilldown(false);
        setInvestedByInvestmentHolderDrilldown(false);
        setInvestedThatMaturedInDrilldown(false);
        setSelectedRowValue(null);
    }

    return (
        <div className="investments">
        { isDataHandlerActive &&
            <DataHandler isModalOpen={false} onModalClose={onModalClose} updateFDs={props.updateFDs} updateInvestments={props.updateInvestments} cleanUpAll={props.cleanUpAll} setDataAvailability={props.setDataAvailability} setInvalidSheet={props.setInvalidSheet}></DataHandler>
        }
        {
            load ?
                <div id="loader">
                    <BounceLoader color={'#36d7b7'} loading={load} size={80} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
            :
                <Container>
                    { isMobile &&
                        <>
                            <Row className='header'>
                                <Col xs={6} style={{textAlign: 'left', padding: '0px'}}>
                                    <div className="dropdown">
                                        <button className="button-17 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="year-dropdown">
                                        </button>
                                        <ul className="dropdown-menu">
                                        {
                                            getAllYears(data, yearInvestmentFields).sort().reverse().map(i=>
                                                <li key={i}>
                                                    <a id={i} key={i} className="dropdown-item" onClick={() => {
                                                            setSearchParams({"year": i});
                                                            applyfilter(i);
                                                            document.getElementById("year-dropdown").innerHTML = "Year-"+i;
                                                            loadBounceElement();
                                                            unloadDrillDowns();
                                                        }}>
                                                        {i}
                                                    </a>
                                                </li>
                                            )
                                        }
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={6} className="right-col-headLine">
                                    <div className="ctooltip">
                                        <a
                                            href={fileLinkCookie.gg_filelink !== undefined ? fileLinkCookie.gg_filelink : ""}
                                            target="_blank">
                                            <i className="bi bi-file-earmark-check-fill"></i>
                                        </a>
                                        <span className="ctooltiptext top-ctooltiptext">
                                            {(fileLinkCookie.gg_filelink !== undefined ? "Go to your sheet" : "Sheet not available") + " : " + fileNameCookie.gg_filename}
                                        </span>
                                    </div>
                                    <div className="ctooltip" id="reload">
                                        <i className="bi bi-arrow-repeat"
                                            onClick={() => {
                                                // Reload from sheets from localstorage
                                                setLoad(true);
                                                setTimeout(()=> {
                                                    setLoad(false);
                                                }, 2000);
                                                setIsDataHandlerActive(true);
                                            }}
                                        ></i>
                                        <span className="ctooltiptext top-ctooltiptext">
                                            Reload
                                        </span>
                                    </div>
                                    <div className="ctooltip" id="timeAgo">
                                        <div>
                                            {timeAgo}
                                        </div>
                                        <span className="ctooltiptext top-ctooltiptext">
                                            Sheet Updated
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{padding: '0px 10px'}}>
                                <Col xs={12} className="pageTitle">
                                    <div>Your Investments</div>
                                </Col>
                            </Row>
                        </>
                    }
                    { !isMobile &&
                        <Row className='header'>
                            <Col xl={2} md={4} sm={4} xs={3} style={{textAlign: 'left', padding: '0px'}}>
                                <div className="dropdown">
                                    <button className="button-17 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="year-dropdown">
                                    </button>
                                    <ul className="dropdown-menu">
                                    {
                                        getAllYears(data, yearInvestmentFields).sort().reverse().map(i=>
                                            <li key={i}>
                                                <a id={i} key={i} className="dropdown-item" onClick={() => {
                                                        setSearchParams({"year": i});
                                                        applyfilter(i);
                                                        document.getElementById("year-dropdown").innerHTML = "Year-"+i;
                                                        loadBounceElement();
                                                        unloadDrillDowns();
                                                    }}>
                                                    {i}
                                                </a>
                                            </li>
                                        )
                                    }
                                    </ul>
                                </div>
                            </Col>
                            <Col xl={8} md={4} sm={4} xs={6} className="pageTitle" style={{padding: '0px'}}>
                                <div>Your Investments</div>
                            </Col>
                            <Col xl={2} md={4} sm={4} xs={3} className="right-col-headLine">
                                <div className="ctooltip">
                                    <a
                                        href={fileLinkCookie.gg_filelink !== undefined ? fileLinkCookie.gg_filelink : ""}
                                        target="_blank">
                                        <i className="bi bi-file-earmark-check-fill"></i>
                                    </a>
                                    <span className="ctooltiptext top-ctooltiptext">
                                        {(fileLinkCookie.gg_filelink !== undefined ? "Go to your sheet" : "Sheet not available") + " : " + fileNameCookie.gg_filename}
                                    </span>
                                </div>
                                <div className="ctooltip" id="reload">
                                    <i className="bi bi-arrow-repeat"
                                        onClick={() => {
                                            // Reload from sheets from localstorage
                                            setLoad(true);
                                            setTimeout(()=> {
                                                setLoad(false);
                                            }, 2000);
                                            setIsDataHandlerActive(true);
                                        }}
                                    ></i>
                                    <span className="ctooltiptext top-ctooltiptext">
                                        Reload
                                    </span>
                                </div>
                                <div className="ctooltip" id="timeAgo">
                                    <div>
                                        {timeAgo}
                                    </div>
                                    <span className="ctooltiptext top-ctooltiptext">
                                        Sheet Updated
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col xl={6} md={6} sm={6} xs={12} id="TOTAL_INVESTED_COUNT_OVER_YEAR">
                            <DashboardSingleStateWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['TOTAL_INVESTED_COUNT_OVER_YEAR']}
                                onClick={() => {
                                        unloadDrillDowns();
                                        setTotalInvestedCountOverYearDrilldown(prev=>!prev);
                                }}
                                superscriptEnabled={true}
                                subscriptEnabled={true}
                                hoverInfo={true}>
                            </DashboardSingleStateWidget>
                        </Col>
                        <Col xl={6} md={6} sm={6} xs={12} id="TOTAL_MATURED_COUNT_OVER_YEAR">
                            <DashboardSingleStateWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['TOTAL_MATURED_COUNT_OVER_YEAR']}
                                onClick={() => {
                                    unloadDrillDowns();
                                    setTotalMaturedCountOverYearDrilldown(prev=>!prev);

                                }}
                                superscriptEnabled={true}
                                subscriptEnabled={true}
                                hoverInfo={true}>
                            </DashboardSingleStateWidget>
                        </Col>
                    </Row>
                    {
                        totalInvestedCountOverYearDrilldown
                        &&
                            <Row className='bounceElement' ref={scroll}>
                                <Col xl={12} md={12} sm={12} xs={12}>
                                    <DashboardWidget
                                        year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                        data={displayData}
                                        config={datasetMetadata['widgets']['TOTAL_INVESTED_COUNT_OVER_YEAR']}
                                        fieldsToDisplay={datasetMetadata['widgets']['ALL'].fields}
                                        drilldownTitle={dashboardSingleStateWidgetSubscript['TOTAL_INVESTED_COUNT_OVER_YEAR']}
                                        filter={{"widget": 'TOTAL_INVESTED_COUNT_OVER_YEAR'}}>
                                    </DashboardWidget>
                                </Col>
                            </Row>
                    }
                    {
                        totalMaturedCountOverYearDrilldown
                        &&
                        <Row className='bounceElement' ref={scroll}>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <DashboardWidget
                                    year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                    data={displayData}
                                    config={datasetMetadata['widgets']['TOTAL_MATURED_COUNT_OVER_YEAR']}
                                    fieldsToDisplay={datasetMetadata['widgets']['ALL'].fields}
                                    drilldownTitle={dashboardSingleStateWidgetSubscript['TOTAL_MATURED_COUNT_OVER_YEAR']}
                                    filter={{"widget": 'TOTAL_MATURED_COUNT_OVER_YEAR'}}>
                                </DashboardWidget>
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col xl={6} md={6} sm={6} xs={12} id="TOTAL_INVESTED_OVER_YEAR">
                            <DashboardSingleStateWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['TOTAL_INVESTED_OVER_YEAR']}
                                superscriptEnabled={true}
                                subscriptEnabled={true}
                                hoverInfo={true}>
                            </DashboardSingleStateWidget>
                        </Col>
                        <Col xl={6} md={6} sm={6} xs={12} id="TOTAL_GAIN_OVER_YEAR">
                            <DashboardSingleStateWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['TOTAL_GAIN_OVER_YEAR']}
                                superscriptEnabled={true}
                                subscriptEnabled={true}
                                hoverInfo={true}>
                            </DashboardSingleStateWidget>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={6} sm={6} xs={12} id="INVESTED_BY_MONTH">
                            <DashboardWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['INVESTED_BY_MONTH']}
                                investField={yearInvestmentFields[0]}
                                title={investmentWidgetTitles['INVESTED_BY_MONTH']}
                                onClick={(element) => {
                                    unloadDrillDowns();
                                    setInvestedByMonthDrilldown(prev=>!prev);
                                    setSelectedRowValue(element['Opening Month']);
                                }}
                            ></DashboardWidget>
                        </Col>
                        <Col xl={6} md={6} sm={6} xs={12} id="INVESTED_BY_INVESTMENT_HOLDER">
                            <DashboardWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['INVESTED_BY_INVESTMENT_HOLDER']}
                                investField={yearInvestmentFields[0]}
                                title={investmentWidgetTitles['INVESTED_BY_INVESTMENT_HOLDER']}
                                onClick={(element) => {
                                    unloadDrillDowns();
                                    setInvestedByInvestmentHolderDrilldown(prev=>!prev);
                                    setSelectedRowValue(element['Investment Holder']);
                                }}>
                            </DashboardWidget>
                        </Col>
                    </Row>
                    {
                        investedByMonthDrilldown
                        &&
                        <Row className='bounceElement' ref={scroll}>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <DashboardWidget
                                    year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                    data={displayData}
                                    config={datasetMetadata['widgets']['INVESTED_BY_MONTH']}
                                    investField={yearInvestmentFields[0]}
                                    fieldsToDisplay={datasetMetadata['widgets']['ALL'].fields}
                                    drilldownTitle={investmentWidgetTitles['INVESTED_BY_MONTH'] + ", " + selectedRowValue}
                                    filter={{"widget": 'INVESTED_BY_MONTH', "row_value": selectedRowValue}}>
                                </DashboardWidget>
                            </Col>
                        </Row>
                    }
                    {
                        investedByInvestmentHolderDrilldown
                        &&
                        <Row className='bounceElement' ref={scroll}>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <DashboardWidget
                                    year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                    data={displayData}
                                    config={datasetMetadata['widgets']['INVESTED_BY_INVESTMENT_HOLDER']}
                                    investField={yearInvestmentFields[0]}
                                    fieldsToDisplay={datasetMetadata['widgets']['ALL'].fields}
                                    drilldownTitle={investmentWidgetTitles['INVESTED_BY_INVESTMENT_HOLDER'] + ", " + selectedRowValue}
                                    filter={{"widget": 'INVESTED_BY_INVESTMENT_HOLDER', "row_value": selectedRowValue}}>
                                </DashboardWidget>
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col xl={6} md={6} sm={6} xs={12} id="INVESTED_THAT_MATURED_IN">
                            <DashboardWidget
                                year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                data={displayData}
                                config={datasetMetadata['widgets']['INVESTED_THAT_MATURED_IN']}
                                investField={yearInvestmentFields[0]}
                                title={investmentWidgetTitles['INVESTED_THAT_MATURED_IN']}
                                onClick={(element) => {
                                    unloadDrillDowns();
                                    setInvestedThatMaturedInDrilldown(prev=>!prev);
                                    setSelectedRowValue(element['Matured In']);
                                }}>
                            </DashboardWidget>
                        </Col>
                    </Row>
                    {
                        investedThatMaturedInDrilldown
                        &&
                        <Row className='bounceElement' ref={scroll}>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <DashboardWidget
                                    year={searchParams.has('year') ? searchParams.get('year'): undefined}
                                    data={displayData}
                                    config={datasetMetadata['widgets']['INVESTED_THAT_MATURED_IN']}
                                    investField={yearInvestmentFields[0]}
                                    fieldsToDisplay={datasetMetadata['widgets']['ALL'].fields}
                                    drilldownTitle={investmentWidgetTitles['INVESTED_THAT_MATURED_IN'] + ", " + selectedRowValue}
                                    filter={{"widget": 'INVESTED_THAT_MATURED_IN', "row_value": selectedRowValue}}>
                                </DashboardWidget>
                            </Col>
                        </Row>
                    }
                </Container>
        }
        </div>
    );
}
const mapStateToProps = state => {
    console.log("STATE on Investments: ",state)
    const { fds, investments, isDataAvailable, updatedAt} = state.connectReducer.dataset;
    return { 'fds': fds, 'investments': investments, 'isDataAvailable': isDataAvailable, 'updatedAt': updatedAt};
}
export default connect(mapStateToProps, {updateFDs, updateInvestments, cleanUpAll, setDataAvailability, setInvalidSheet})(Investments);