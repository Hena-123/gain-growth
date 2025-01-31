import {currencyFDFields, dateFDFields} from './const/FDConst';
import {currencyInvestmentFields, dateInvestmentFields} from './const/InvestmentConst';
import * as moment from 'moment'

function filterDataByValue(data, field, value) {
    if(value === undefined) {
        return data;
    }
    return data.filter(item => item[field]===value);
}

function filterData(data, keyList){
    if(data === undefined || totalCount(data) < 0) {
        return data;
    }
    return data.map(item => {
        var newItem = {};
        keyList.forEach(k => newItem[k]=item[k]);
        return newItem;
    });
}

function aggregateByField(data, field, fieldsToSum) {

    if(field && fieldsToSum) {
        var aggregatedData = Object.values(Object.groupBy(data, item => item[field]))
        .map(l => l.reduce((m,n) =>
            {
                let d = {};
                d[field] =  m[field];
                let e = Object.fromEntries(fieldsToSum.map
                    (i => [i, m[i] + n[i]]));
                d = {...d, ...e};
                d["count"] = (m.hasOwnProperty("count") ? m["count"] : 1) + 1
                return d;
            }
        ));
        return aggregatedData.map(d => {
                if(d.count > 1){
                    return d;
                }
                var finalFields = {}
                var otherFields = {}
                finalFields[field] = d[field];
                if(fieldsToSum !== undefined && fieldsToSum !== null && fieldsToSum.length !== 0){
                    otherFields = Object.fromEntries(fieldsToSum.map(i => [i, d[i]]))
                }
                return {...finalFields, ...otherFields, "count": 1}
            }
        )
    }
    return data;
}

function differenceAndSum(data, key1, key2) {
    var sum = 0;
    data.map(item => {
        sum += Math.abs(item[key1]- item[key2]);
        return item;
    });
    return sum;
}

function extractFields(data) {
    if(data!== undefined && data !== null && data.length !== 0)
        return Object.keys(data[0]);
    return [];
}

function totalMaturedByField(data, keyList, field, fieldsToSum, year) {
    var aggregatedDataByField = aggregateByField(filterData(data, keyList), field, fieldsToSum);
    if(year) {
        var currentRecord = aggregatedDataByField.filter(each => each[field] === year)[0];
        var records = filterDataByValue(data, field, year);
        if(currentRecord){
            return {"matured": currentRecord[fieldsToSum[0]], "count": currentRecord.count, "records": records};
        }
    } else {
        var totalMatured = 0;
        var count = 0;
        aggregatedDataByField.forEach(record => {
            totalMatured += record[fieldsToSum[0]];
            count += record.count;
        })
        return {"matured": totalMatured, "count": count, "records": data};
    }
    return {"matured": 0, "count": 0, "records": []};
}

function totalGainByField(data, keyList, field, fieldsToSum, year) {
    var aggregatedDataByField = aggregateByField(filterData(data, keyList), field, fieldsToSum);
    if(year) {
        var currentRecord = aggregatedDataByField.filter(each => each[field] === year)[0];
        var records = filterDataByValue(data, field, year);
        if(currentRecord){
            return {"gain": currentRecord[fieldsToSum[1]]-currentRecord[fieldsToSum[0]], "count": currentRecord.count, "records": records};
        }
    } else {
        var totalGain = 0;
        var count = 0;
        aggregatedDataByField.forEach(record => {
            totalGain += record[fieldsToSum[1]] - record[fieldsToSum[0]];
            count += record.count;
        })
        return {"gain": totalGain, "count": count, "records": data};
    }
    return {"gain": 0, "count": 0, "records": []};
}

function totalInvestedByField(data, keyList, field, fieldsToSum, year) {
    var aggregatedDataByField = aggregateByField(filterData(data, keyList), field, fieldsToSum);
    if(year) {
        var currentRecord = aggregatedDataByField.filter(each => each[field] === year)[0];
        var records = filterDataByValue(data, field, year);
        if(currentRecord){
            return {"invested": currentRecord[fieldsToSum[0]], "count": currentRecord.count, "records": records};
        }
    } else {
        var totalInvested = 0
        var count = 0;
        aggregatedDataByField.forEach(record => {
            totalInvested += record[fieldsToSum[0]];
            count += record.count;
        })
        return {"invested": totalInvested, "count": count, "records": data};
    }
    return {"invested": 0, "count": 0};
}

function totalGainTillTodayAndFuture(data, keyList, fieldsToSum) {
    var filteredData = filterData(data, keyList);
    var tillTodayGain = 0;
    var futureGain = 0;
    filteredData.forEach(record => {
        var ISOformatedDate = new Date(numbertoDateFormat(record[keyList[0]], 'YYYY-MM-DD'));
        if(ISOformatedDate < new Date()) {
            tillTodayGain += record[fieldsToSum[1]] - record[fieldsToSum[0]];
        } else {
            futureGain += record[fieldsToSum[1]] - record[fieldsToSum[0]];
        }
    })
    return {'tillTodayGain': tillTodayGain, 'futureGain': futureGain}
}

function getDateDifference(start, end) {
    const diffInMilliseconds = end - start; // Difference in milliseconds

    // If the difference is less than 1 minute
    if (diffInMilliseconds < 60000) {
      const seconds = Math.floor(diffInMilliseconds / 1000);
      return `${seconds}s ago`;
    }

    // If the difference is less than 1 hour
    if (diffInMilliseconds < 3600000) {
      const minutes = Math.floor(diffInMilliseconds / 60000);
      const seconds = Math.floor((diffInMilliseconds % 60000) / 1000);
      return `${minutes}m ${seconds}s ago`;
    }

    // If the difference is less than 24 hours
    if (diffInMilliseconds < 86400000) {
        const hours = Math.floor(diffInMilliseconds / 3600000);
        const minutes = Math.floor((diffInMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((diffInMilliseconds % 60000) / 1000);
        return `${hours}h ${minutes}m ${seconds}s ago`;
      }

      // If the difference is greater than 24 hours
      const days = Math.floor(diffInMilliseconds / 86400000);
      const hours = Math.floor((diffInMilliseconds % 86400000) / 3600000);
      const minutes = Math.floor((diffInMilliseconds % 3600000) / 60000);
      const seconds = Math.floor((diffInMilliseconds % 60000) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
}

function getAllYears(data, yearFieldList) {
    var yearList = []
    data.forEach(item => {
        yearFieldList.forEach(k => {
            if(!yearList.includes(item[k]))
                yearList.push(item[k])
        });
    });
    return yearList;
}

function totalCount(data) {
    return data.length;
}

function numbertoCurrencyFormat(num) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(num);
}

function numbertoDateFormat(num, format) {
    return moment(num).format(format);
}

function isCurrencyField(field) {
    return currencyFDFields.includes(field) ||
        currencyInvestmentFields.includes(field);
}

function isDateField(field) {
    return dateFDFields.includes(field) || dateInvestmentFields.includes(field);
}

export {filterData, aggregateByField, differenceAndSum, extractFields, totalGainByField, numbertoCurrencyFormat, numbertoDateFormat, isCurrencyField, isDateField, totalInvestedByField, totalCount, getDateDifference, getAllYears, filterDataByValue, totalMaturedByField, totalGainTillTodayAndFuture}