import React from "react";
import { useEffect, useState } from 'react';
import './DashboardWidget.css';
import {filterData, aggregateByField, numbertoCurrencyFormat, numbertoDateFormat, isCurrencyField, isDateField, totalGainByField, totalInvestedByField, filterDataByValue, totalMaturedByField} from '../utils/utils';

function DashboardWidget(props) {

    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        var response = null;
        // Filter provided for drilldown
        if(props.filter) {
            switch(props.filter.widget){
                case 'ALL':
                    setDisplayData(aggregateByField(filterData(props.data, props.config["fields"]), props.config["groupBy"], props.config["sumWith"]));
                    break;
                case 'TOTAL_FDS_COUNT':
                    setDisplayData(filterDataByValue(props.data, props.config["groupBy"], (props.year !== undefined ? parseInt(props.year) : undefined)));
                    break;
                case 'TOTAL_INVESTMENTS_COUNT':
                    setDisplayData(filterDataByValue(props.data, props.config["groupBy"], (props.year !== undefined ? parseInt(props.year) : undefined)));
                    break;
                case 'TOTAL_GAIN_OVER_YEAR':
                    response = totalGainByField(props.data, props.config["fields"], props.config["groupBy"],  props.config["sumWith"], (props.year !== undefined ? props.year : undefined));
                    setDisplayData(filterData(response.records, props.fieldsToDisplay));
                    break;
                case 'TOTAL_MATURED_COUNT_OVER_YEAR':
                    response = totalMaturedByField(props.data, props.config["fields"], props.config["groupBy"],  props.config["sumWith"], (props.year !== undefined ? props.year : undefined));
                    setDisplayData(filterData(response.records, props.fieldsToDisplay));
                    break;
                case 'TOTAL_INVESTED_COUNT_OVER_YEAR':
                    response = totalInvestedByField(props.data, props.config["fields"], props.config["groupBy"],  props.config["sumWith"], (props.year !== undefined ? props.year : undefined));
                    setDisplayData(filterData(response.records, props.fieldsToDisplay));
                    break;
                case 'INVESTED_BY_MONTH':
                case 'INVESTED_BY_ACCOUNT_HOLDER':
                case 'INVESTED_BY_INVESTMENT_HOLDER':
                case 'INVESTED_BY_BANK':
                    var aggregatedData = aggregateByField(filterData(filterDataByValue(props.data, props.investField, (props.year !== undefined ? parseInt(props.year) : undefined)), props.config["fields"]), props.config["groupBy"], props.config["sumWith"]);
                    var drillDownRecords = {}
                    var investedFilteredData = filterDataByValue(props.data, props.investField, (props.year !== undefined ? parseInt(props.year) : undefined));
                    aggregatedData.map(element => {
                        drillDownRecords[element[props.config["groupBy"]]] = filterDataByValue(investedFilteredData, props.config["groupBy"], element[props.config["groupBy"]]);
                    });
                    setDisplayData(filterData(drillDownRecords[props.filter.row_value], props.fieldsToDisplay));
                    break;
                case 'INVESTED_THAT_MATURED_IN':
                    investedFilteredData = filterDataByValue(props.data, props.investField, (props.year !== undefined ? parseInt(props.year) : undefined));
                    setDisplayData(filterData(filterDataByValue(investedFilteredData, props.config["groupBy"][1], parseInt(props.filter.row_value)), props.fieldsToDisplay));
                    break;
                default:
                    setDisplayData(aggregateByField(filterData(props.data, props.config["fields"]), props.config["groupBy"], props.config["sumWith"]));
                    break;
            }
        }
        else{
            switch(props.config["name"]) {
                case 'INVESTED_BY_MONTH':
                case 'INVESTED_BY_ACCOUNT_HOLDER':
                case 'INVESTED_BY_INVESTMENT_HOLDER':
                case 'INVESTED_BY_BANK':
                    aggregatedData = aggregateByField(filterData(filterDataByValue(props.data, props.investField, (props.year !== undefined ? parseInt(props.year) : undefined)), props.config["fields"]), props.config["groupBy"], props.config["sumWith"]);
                    setDisplayData(aggregatedData);
                    break;
                case 'INVESTED_THAT_MATURED_IN':
                    aggregatedData = aggregateByField(filterData(filterDataByValue(props.data, props.investField, (props.year !== undefined ? parseInt(props.year) : undefined)), props.config["fields"]), props.config["groupBy"][1], props.config["sumWith"]);
                    aggregatedData = aggregatedData.map(record => {
                        var displayData1 = {}
                        displayData1['count'] = record['count'];
                        displayData1['Matured In'] = record[props.config["groupBy"][1]];
                        displayData1['Gain Amount'] = record[props.config["sumWith"][1]] - record[props.config["sumWith"][0]];
                        return displayData1;
                    })
                    setDisplayData(aggregatedData);
                    break;
            }
        }
    }, [props.data, props.filter, props.year, props.fieldsToDisplay, props.config])
    let stylesForWidget = props.title !== undefined ? {height: '82%', marginTop: '15px', padding: '0 15px 25px 15px'} : {height: '100%', borderRadius: '10px'}
    return (
        <div className='dashboardWidget'>
            {
                props.title &&
                <div className="dashboardWidgetTitle">
                    {props.title}
                </div>
            }
            {
                displayData !== undefined && displayData.length> 0 ?
                <div className="table-responsive"  style={stylesForWidget}>
                    <table border="0">
                        <thead className="tbl-header" id={props.config["name"].toLowerCase()+'_header'}>
                            <tr>
                                {displayData && displayData[0] && Object.keys(displayData[0]).map(i => {
                                    var firstField = props.config["name"].substring(3)
                                    firstField = firstField.replaceAll("_", " ").toLowerCase();

                                    // Only for the first header of table and Only to widgets, not drilldowns
                                    if(i.toLowerCase() === firstField && props.filter === undefined){
                                        return (<th className="box-shadow">{i}</th>)
                                    }
                                    return (<th>{i}</th>)
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody className="tbl-content" id={props.config["name"].toLowerCase()+'_body'}>
                            {
                                displayData &&
                                displayData.map((item) => {
                                    return (
                                        <tr id={props.config["name"]+ "_" +item[Object.keys(displayData[0])[0]]} 
                                            onClick={_ => {
                                                if(props.onClick !== undefined && props.onClick !== null){
                                                    props.onClick(item)
                                                }
                                            }}
                                            style={props.onClick !== undefined && props.onClick !== null ? {cursor: 'pointer'}: {}}>
                                            {
                                                Object.keys(item).map(i => {
                                                    if(isCurrencyField(i)) {
                                                        return (<td>{numbertoCurrencyFormat(item[i])}</td>)
                                                    } else if(isDateField(i)) {
                                                        return (<td>{numbertoDateFormat(item[i], 'DD/MM/YYYY')}</td>)
                                                    } else {
                                                        return (<td>{item[i]}</td>)
                                                    }
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
                :
                <div id="noData">
                    No Data Available
                </div>
            }
    </div>
    );
  }

export default DashboardWidget;