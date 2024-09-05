import './Home.css';
import {connect} from 'react-redux';

import { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import * as XLSX from 'xlsx';
import DashboardWidget from '../components/DashboardWidget';
import DashboardSingleStateWidget from '../components/DashboardSingleStateWidget';
import InputModal from '../components/InputModal';
import {extractFields} from '../utils/utils'
import { ALLOWED_DRILLDOWN_CLASS_NAMES } from '../utils/const/const';
import {updatePath, updateFDs, updateInvestments} from '../app/redux/actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home(props) {

    const [totalFDCountDrilldown, setTotalFDCountDrilldown] = useState(false);
    const [totalInvestmentCountDrilldown, setTotalInvestmentCountDrilldown] = useState(false);
    const stateBubblesStyles = { borderRadius:'50%', height: '250px', width: '300px', margin: '30px 5px'}

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies, setCookie] = useCookies(['sheets']);

    useEffect(() => {
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
        if(props.fdData.length === 0 || props.fdMetadata.fields.length === 0 || props.investmentData.length === 0 || props.investmentMetadata.fields.length === 0) {
            if(cookies.sheets !== undefined) {
                loadDataFromSheets(cookies.sheets, props.updateFDs, props.updateInvestments);
            } else {
                setIsModalOpen(true);
            }
        }
    })

    const scroll = useCallback(node => {
        if (node !== null) {
            node.scrollIntoView({behavior: "smooth", block: "center", inline: "center" });
        }
      }, []);

    const unloadDrillDowns = () => {
        setTotalFDCountDrilldown(false);
        setTotalInvestmentCountDrilldown(false);
    }

    return(
        <div id="home">
                { isModalOpen &&
                    <InputModal isModalOpen="true"></InputModal>
                }
                {
                    props.fdData.length !== 0 && props.fdMetadata.length !== 0 ?
                        <Container>
                            <Row>
                                <div className="welcomeTitle" >
                                    Welcome to Gain Growth
                                </div>
                            </Row>
                            <Row>
                                <Col xl={3} id="TOTAL_FDS_COUNT">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.fdData}
                                        config={props.fdMetadata['widgets']['TOTAL_FDS_COUNT']}
                                        onClick={() => {
                                            unloadDrillDowns();
                                            setTotalFDCountDrilldown(prev=>!prev);
                                        }}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                                <Col xl={3} id="TOTAL_INVESTED_OVER_YEAR">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.fdData}
                                        config={props.fdMetadata['widgets']['TOTAL_INVESTED_OVER_YEAR']}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                                <Col xl={3} id="TOTAL_GAIN_TILL_TODAY">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.fdData}
                                        config={props.fdMetadata['widgets']['TOTAL_GAIN_TILL_TODAY']}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                                <Col xl={3} id="TOTAL_FUTURE_GAIN">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.fdData}
                                        config={props.fdMetadata['widgets']['TOTAL_FUTURE_GAIN']}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                            </Row>
                            {
                                 totalFDCountDrilldown
                                &&
                                    <Row className='bounceElement' ref={scroll}>
                                        <Col xl={12}>
                                            <DashboardWidget
                                                data={props.fdData}
                                                config={props.fdMetadata['widgets']['TOTAL_FDS_COUNT']}
                                                filter={{"widget": 'TOTAL_FDS_COUNT'}}>
                                            </DashboardWidget>
                                        </Col>
                                    </Row>
                            }
                            <Row>
                                <Col xl={3} id="TOTAL_INVESTMENTS_COUNT">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.investmentData}
                                        config={props.investmentMetadata['widgets']['TOTAL_INVESTMENTS_COUNT']}
                                        onClick={() => {
                                                unloadDrillDowns();
                                                setTotalInvestmentCountDrilldown(prev=>!prev);
                                            }}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                                <Col xl={3} id="TOTAL_INVESTED_OVER_YEAR">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.investmentData}
                                        config={props.investmentMetadata['widgets']['TOTAL_INVESTED_OVER_YEAR']}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                                <Col xl={3} id="TOTAL_GAIN_TILL_TODAY">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.investmentData}
                                        config={props.investmentMetadata['widgets']['TOTAL_GAIN_TILL_TODAY']}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                                <Col xl={3} id="TOTAL_FUTURE_GAIN">
                                    <DashboardSingleStateWidget
                                        styles={stateBubblesStyles}
                                        data={props.investmentData}
                                        config={props.investmentMetadata['widgets']['TOTAL_FUTURE_GAIN']}
                                        superscriptEnabled={false}
                                        subscriptEnabled={true}
                                        hoverInfo={false}>
                                    </DashboardSingleStateWidget>
                                </Col>
                            </Row>
                            {
                                totalInvestmentCountDrilldown
                                &&
                                    <Row className='bounceElement' ref={scroll}>
                                        <Col xl={12}>
                                            <DashboardWidget
                                                data={props.investmentData}
                                                config={props.investmentMetadata['widgets']['TOTAL_INVESTMENTS_COUNT']}
                                                filter={{"widget": 'TOTAL_INVESTMENTS_COUNT'}}>
                                            </DashboardWidget>
                                        </Col>
                                    </Row>
                            }
                        </Container>
                        :
                        <div className="welcomeTitle" >
                            Welcome to Gain Growth
                        </div>
                    }
        </div>
    );
}

export function loadDataFromSheets(sheets, updateFDs, updateInvestments){
    sheets.forEach(sheet => {
        fetch(sheet['url'])
            // Convert to ArrayBuffer.
            .then((res) => res.arrayBuffer())
            .then((data) => {
                const wb = XLSX.read(data, {type: "buffer"});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                var json = XLSX.utils.sheet_to_json(ws);
                console.log("\nON HOME ", sheet['sheetname'] ," Data: ", json);
                if(sheet['sheetname'] === 'Fds') {
                    updateFDs({'data': json, 'fields': extractFields(json)});
                } else if(sheet['sheetname'] === 'Investments') {
                    updateInvestments({'data': json, 'fields': extractFields(json)});
                }
            })
    })
}

const mapStateToProps = state => {
    console.log("STATE on HOME: ",state)
    const { sheets, fdData, fdMetadata, investmentData, investmentMetadata } = state.connectReducer.dataset;
    return {'sheets': sheets, 'fdData': fdData, 'fdMetadata': fdMetadata, 'investmentData': investmentData, 'investmentMetadata': investmentMetadata};
}
export default connect(mapStateToProps, {updatePath, updateFDs, updateInvestments})(Home);