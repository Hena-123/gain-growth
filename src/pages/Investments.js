/* eslint-disable */
import '../App.css';

import DashboardWidget from '../components/DashboardWidget';
import DashboardButton from '../components/DashboardButton';
import DashboardSingleStateWidget from '../components/DashboardSingleStateWidget';
import {getAllYears, filterDataByValue} from '../utils/utils';
import {initialStateInvestmentMetadata, yearInvestmentFields} from '../utils/const/InvestmentConst';
import {loadDataFromSheets} from './Home';
import {updateFDs, updateInvestments} from '../app/redux/actions';

import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect, useState, useCallback } from 'react';

import InputModal from '../components/InputModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BounceLoader from "react-spinners/BounceLoader";
import '../components/DashboardButton.css';
import { useSearchParams } from "react-router-dom";


function Investments(props) {

    const ALLOWED_DRILLDOWN_CLASS_NAMES =  ["dashboardSingleStateWidget", "dashboardWidget"]
    const [data, setData] = useState([]);
    const [datasetMetadata, setDatasetMetadata] = useState([]);

    const [displayData, setDisplayData] = useState([]);
    const [load, setLoad] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [totalMaturedCountOverYearDrilldown, setTotalMaturedCountOverYearDrilldown] = useState(false);
    const [totalInvestedCountOverYearDrilldown, setTotalInvestedCountOverYearDrilldown] = useState(false);
    const [investedByMonthDrilldown, setInvestedByMonthDrilldown] = useState(false);
    const [investedByInvestmentHolderDrilldown, setInvestedByInvestmentHolderDrilldown] = useState(false);
    const [investedThatMaturedInDrilldown, setInvestedThatMaturedInDrilldown] = useState(false);

    const [selectedRowValue, setSelectedRowValue] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies, setCookie] = useCookies(['sheets']);

    useEffect(() => {
        document.addEventListener('click', e => {
            console.log("E", e.target);
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

        if(props.investmentData.length !== 0 || props.investmentMetadata.fields.length !== 0) {
            setTimeout(()=> {
                setData(props.investmentData);
                setDatasetMetadata (props.investmentMetadata);
                setDisplayData(props.investmentData);
                setLoad(false);
            }, 2000);
        }
        if(props.investmentData.length === 0 || props.investmentMetadata.fields.length === 0) {
            if(cookies.sheets !== undefined) {
                loadDataFromSheets(cookies.sheets, props.updateFDs, props.updateInvestments);
            } else {
                setIsModalOpen(true);
            }
        }

        var currentYear = new Date().getFullYear();
        if(document.getElementById("year-dropdown") && document.getElementById(currentYear)) {
            document.getElementById("year-dropdown").innerHTML = "Year-"+currentYear;
            document.getElementById(currentYear).click();
        }

    }, [load, props.investmentData, props.investmentMetadata, props.updateFDs, props.updateInvestments, cookies.sheets])

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

    const unloadDrillDowns = () => {
        setTotalMaturedCountOverYearDrilldown(false);
        setTotalInvestedCountOverYearDrilldown(false);
        setInvestedByMonthDrilldown(false);
        setInvestedByInvestmentHolderDrilldown(false);
        setInvestedThatMaturedInDrilldown(false);
        setSelectedRowValue(null);
    }

    return (
        <div className="App">
        { isModalOpen &&
            <InputModal isModalOpen="true"></InputModal>
        }
        {
            load ?
                <div id="loader">
                    <BounceLoader color={'#36d7b7'} loading={load} size={80} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
            :
            <Container>
                <Row>
                    <Col xl={2} md={4} sm={4} xs={3} style={{textAlign: 'left', padding: '0px'}}>
                    <div class="dropdown">
                        <button class="button-17 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="year-dropdown">
                            Select Year
                        </button>
                        <ul class="dropdown-menu">
                        {
                            getAllYears(data, yearInvestmentFields).map(i=>
                                <li>
                                    <a id={i} class="dropdown-item" onClick={() => {
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
                    <Col xl={8} md={4} sm={4} xs={6} className="pageTitle">
                        <div>Your Investments</div>
                    </Col>
                    <Col xl={2} md={4} sm={4} xs={3} style={{textAlign: 'right', padding: '0px'}} >
                        <button className="button-17" id="refresh_button" onClick={() => {
                            // Reload from sheets from localstorage
                            loadDataFromSheets(props.sheets, props.updateFDs, props.updateInvestments);
                            setLoad(true);
                        }}>
                            <i class="bi bi-arrow-clockwise"></i>Refresh Investments
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} md={6} sm={6} xs={12} id="TOTAL_INVESTED_COUNT_OVER_YEAR">
                        <DashboardSingleStateWidget
                            year={searchParams.has('year') ? searchParams.get('year'): undefined}
                            data={displayData}
                            config={datasetMetadata['widgets']['TOTAL_INVESTED_COUNT_OVER_YEAR']}
                            superscriptEnabled={true}
                            subscriptEnabled={true}
                            onClick={() => {
                                    unloadDrillDowns();
                                    setTotalInvestedCountOverYearDrilldown(prev=>!prev);
                                }}
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
                            title="Invested Investments by Month"
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
                            title="Invested Investments by Investment Holder"
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
                            title="Invested Investments Matured in Year"
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
    const { sheets, investmentData, investmentMetadata } = state.connectReducer.dataset;
    return {'sheets': sheets, 'investmentData': investmentData, 'investmentMetadata': investmentMetadata};
}
export default connect(mapStateToProps, {updateFDs, updateInvestments})(Investments);