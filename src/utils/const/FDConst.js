
const DATASET_PATH = "excel/FDs.xlsx";
const initialStateFDMetadata = {
    "ALL": {
        name: "ALL",
        fields: ["Id", "Bank", "Account Holder", "Opening Date", "Maturity Date", "Opening Amount", "Maturity Amount", "Interest Rate", "Interest", "FD No", "Account No", "Remarks"],
    },
    "INVESTED_BY_BANK": {
        name: "INVESTED_BY_BANK",
        fields: ["Bank", "Opening Amount", "Maturity Amount"],
        groupBy: "Bank",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "INVESTED_BY_MONTH": {
        name: "INVESTED_BY_MONTH",
        fields: ["Opening Month", "Opening Amount", "Maturity Amount"],
        groupBy: "Opening Month",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "INVESTED_BY_ACCOUNT_HOLDER": {
        name: "INVESTED_BY_ACCOUNT_HOLDER",
        fields: ["Account Holder", "Opening Amount", "Maturity Amount"],
        groupBy: "Account Holder",
        sumWith: ["Opening Amount", "Maturity Amount"]
    },
    "TOTAL_FDS_COUNT": {
        name: "TOTAL_FDS_COUNT",
        fields: ["FD No"],
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
const dateFDFields = ["Opening Date", "Maturity Date"];
const yearFDFields = ["Opening Year", "Maturity Year"];
const currencyFDFields = ["Opening Amount", "Maturity Amount", "Interest", "Gain Amount",
"TOTAL_GAIN_OVER_YEAR",
"TOTAL_INVESTED_OVER_YEAR",
"TOTAL_GAIN_TILL_TODAY",
"TOTAL_FUTURE_GAIN"
];

export {initialStateFDMetadata, currencyFDFields, dateFDFields, yearFDFields, DATASET_PATH}