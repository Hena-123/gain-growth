
const DATASET_PATH = "excel/FDs.xlsx";
const initialStateInvestmentMetadata = {
    "ALL": {
        name: "ALL",
        fields: ['Id', 'Investment Type', 'Investment No', 'Investment Holder', 'Opening Date', 'Maturity Date', 'Opening Amount', 'Interest Rate', 'Interest', 'Maturity Amount', 'Remarks']
    },
    "INVESTED_BY_INVESTMENT_TYPE": {
        name: "INVESTED_BY_INVESTMENT_TYPE",
        fields: ["Investment Type", "Opening Amount", "Maturity Amount"],
        groupBy: "Investment Type",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "INVESTED_BY_MONTH": {
        name: "INVESTED_BY_MONTH",
        fields: ["Opening Month", "Opening Amount", "Maturity Amount"],
        groupBy: "Opening Month",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "INVESTED_BY_INVESTMENT_HOLDER": {
        name: "INVESTED_BY_INVESTMENT_HOLDER",
        fields: ["Investment Holder", "Opening Amount", "Maturity Amount"],
        groupBy: "Investment Holder",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "TOTAL_INVESTMENTS_COUNT": {
        name: "TOTAL_INVESTMENTS_COUNT",
        fields: ["Investment No"],
        groupBy: "Opening Year"
    },
    "TOTAL_INVESTED_OVER_YEAR": {
        name: "TOTAL_INVESTED_OVER_YEAR",
        fields: ["Opening Year", "Opening Amount"],
        groupBy: "Opening Year",
        sumWith: ["Opening Amount"]
    },
    "TOTAL_GAIN_OVER_YEAR": {
        name: "TOTAL_GAIN_OVER_YEAR",
        fields: ["Maturity Year", "Opening Amount", "Maturity Amount"],
        groupBy: "Maturity Year",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "TOTAL_INVESTED_COUNT_OVER_YEAR": {
        name: "TOTAL_INVESTED_COUNT_OVER_YEAR",
        fields: ["Opening Year", "Opening Amount"],
        groupBy: "Opening Year",
        sumWith: ["Opening Amount"]
    },
    "TOTAL_MATURED_COUNT_OVER_YEAR": {
        name: "TOTAL_MATURED_COUNT_OVER_YEAR",
        fields: ["Maturity Year", "Opening Amount", "Maturity Amount"],
        groupBy: "Maturity Year",
        sumWith: ["Maturity Amount"]
    },
    "TOTAL_GAIN_TILL_TODAY": {
        name: "TOTAL_GAIN_TILL_TODAY",
        fields: ["Maturity Date", "Opening Amount", "Maturity Amount"],
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "TOTAL_FUTURE_GAIN": {
        name: "TOTAL_FUTURE_GAIN",
        fields: ["Maturity Date", "Opening Amount", "Maturity Amount"],
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "INVESTED_THAT_MATURED_IN": {
        name: "INVESTED_THAT_MATURED_IN",
        fields: ["Maturity Year", "Opening Amount", "Maturity Amount"],
        groupBy: ["Opening Year", "Maturity Year"],
        sumWith: ["Opening Amount", "Maturity Amount"]
    }
};
const dateInvestmentFields = ["Opening Date", "Maturity Date"];
const yearInvestmentFields = ["Opening Year", "Maturity Year"];
const currencyInvestmentFields = ["Opening Amount", "Maturity Amount", "Interest",
"TOTAL_GAIN_OVER_YEAR",
"TOTAL_GAIN_TILL_TODAY",
"TOTAL_FUTURE_GAIN"
];

export {initialStateInvestmentMetadata, currencyInvestmentFields, dateInvestmentFields, yearInvestmentFields, DATASET_PATH}