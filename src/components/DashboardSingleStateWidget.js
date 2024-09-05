import React from "react";
import { useEffect, useState } from 'react';
import {filterDataByValue, aggregateByField, totalGainByField, totalInvestedByField, totalMaturedByField, totalCount, numbertoCurrencyFormat, isCurrencyField, totalGainTillTodayAndFuture} from '../utils/utils';
import './DashboardSingleStateWidget.css';

function DashboardSingleStateWidget(props) {

    const [displayData, setDisplayData] = useState([]);
    const [count, setCount] = useState(-1);

    var hoverInfo = {
        "TOTAL_FDS_COUNT": "opened in year, {year}",
        "TOTAL_INVESTMENTS_COUNT": "opened in year, {year}",

        "TOTAL_INVESTED_COUNT_OVER_YEAR": "in year, {year}",
        "TOTAL_MATURED_COUNT_OVER_YEAR": "in year, {year}",
        "TOTAL_GAIN_OVER_YEAR": "would got from year, {year}",
        "TOTAL_INVESTED_OVER_YEAR": "in year, {year}",

        "TOTAL_MATURED_OVER_YEAR": "in year, {year}",
        "INVESTED_VS_MATURED": "count in year, {year}"
    }

    var subscript = {
        "TOTAL_FDS_COUNT": "Total FDs",
        "TOTAL_INVESTMENTS_COUNT": "Total Investments",

        "TOTAL_INVESTED_COUNT_OVER_YEAR": "Total Invested",
        "TOTAL_MATURED_COUNT_OVER_YEAR": "Total Matured",
        "TOTAL_GAIN_OVER_YEAR": "Total Gain Amount",
        "TOTAL_INVESTED_OVER_YEAR": "Total Invested Amount",

        "TOTAL_MATURED_OVER_YEAR": "Total Matured",
        "INVESTED_VS_MATURED": "Invested Vs Matured",

        "TOTAL_GAIN_TILL_TODAY": "Total Gain till today",
        "TOTAL_FUTURE_GAIN": "Total Future Gain"
    }

    useEffect(() => {
        var response = null;
        switch(props.config["name"]){
            case 'TOTAL_FDS_COUNT':
                setDisplayData(totalCount(filterDataByValue(props.data, props.config["groupBy"], (props.year !== undefined ? parseInt(props.year) : undefined))));
                break;
            case 'TOTAL_INVESTMENTS_COUNT':
                setDisplayData(totalCount(props.data));
                break;
            case 'TOTAL_INVESTED_COUNT_OVER_YEAR':
                response = totalInvestedByField(props.data, props.config["fields"], props.config["groupBy"], props.config["sumWith"], (props.year !== undefined ? props.year : undefined))
                setDisplayData(response.count);
                break;
            case 'TOTAL_INVESTED_OVER_YEAR':
                response = totalInvestedByField(props.data, props.config["fields"], props.config["groupBy"], props.config["sumWith"], (props.year !== undefined ? props.year : undefined))
                setDisplayData(response.invested);
                break;
            case 'TOTAL_MATURED_COUNT_OVER_YEAR':
                var response = totalMaturedByField(props.data, props.config["fields"], props.config["groupBy"], props.config["sumWith"], (props.year !== undefined ? props.year : undefined));
                setDisplayData(response.count);
                break;
            case 'TOTAL_GAIN_OVER_YEAR':
                var response = totalGainByField(props.data, props.config["fields"], props.config["groupBy"], props.config["sumWith"], (props.year !== undefined ? props.year : undefined));
                setCount(response.count);
                setDisplayData(response.gain);
                break;
            case 'INVESTED_VS_MATURED':
                var openingYearField = props.config["groupBy"][0];
                var maturityYearField = props.config["groupBy"][1];
                var investedData = aggregateByField(props.data, openingYearField, []);
                var maturedData = aggregateByField(props.data, maturityYearField, []);
                var investedCount = 0;
                var maturedCount = 0;
                if(props.year==undefined){
                    investedData.map(id => investedCount += id.count);
                    maturedData.map(id => maturedCount += id.count);
                } else {
                    investedData = filterDataByValue(investedData, openingYearField, parseInt(props.year));
                    maturedData = filterDataByValue(maturedData, maturityYearField, parseInt(props.year));
                    investedCount = investedData.length > 0 ? investedData[0].count : 0;
                    maturedCount = maturedData.length > 0 ? maturedData[0].count : 0;
                }
                setDisplayData([investedCount, maturedCount]);
                break;
            case 'TOTAL_GAIN_TILL_TODAY':
                response = totalGainTillTodayAndFuture(props.data, props.config["fields"], props.config["sumWith"]);
                setDisplayData(response.tillTodayGain);
                break;
            case 'TOTAL_FUTURE_GAIN':
                response = totalGainTillTodayAndFuture(props.data, props.config["fields"], props.config["sumWith"]);
                setDisplayData(response.futureGain);
                break;
            default:
                break;
        }
    }, [props.data, props.year, props.config])

    return (
        <div className="dashboardSingleStateWidget" onClick={props.onClick} style={props.onClick !== undefined && props.onClick !== null ? {cursor: 'pointer', ...props.styles}: props.styles}>
            <span>
                {
                    isCurrencyField(props.config["name"])? numbertoCurrencyFormat(displayData): 
                    (props.config["name"] == "INVESTED_VS_MATURED" ? 
                        displayData[0] + " Vs " + displayData[1]
                        : displayData
                    )
                }
                { props.superscriptEnabled && count !== -1 &&
                    <span style={{verticalAlign: "super", fontSize: 15, fontWeight: 350}}>
                        (from {count})
                    </span>
                }
                { props.subscriptEnabled &&
                    <sub style={{display: 'block', fontSize: 15, fontWeight: 500}}>
                        {subscript[props.config["name"]]}
                    </sub>
                }
            </span>
            {
                props.hoverInfo &&
                <div className="hover-text">
                    {(hoverInfo[props.config["name"]]) ? (hoverInfo[props.config["name"]]).replaceAll('{year}', props.year==undefined ? 'all': props.year) : ""}
                </div>
            }
        </div>
    );
}
export default DashboardSingleStateWidget;