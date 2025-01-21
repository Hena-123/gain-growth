import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

import InputModal from '../components/InputModal';
import { loadDataFromSheets } from "../pages/Home";

export default function DataHandler(props) {

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['spreadSheetId']);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // To load data on each page, if that page does not have data, then get it from cookies
        if (!props.isModalOpen) {
            if(cookies.spreadSheetId !== undefined) {
                var response = loadDataFromSheets(cookies.spreadSheetId, props.updateFDs, props.updateInvestments, props.cleanUpAll, props.setDataAvailability, props.setInvalidSheet);
                props.onModalClose();
                response.then(status => {
                    if (!status.isLoaded) {
                        console.log("not loaded");
                    } else {
                        // navigate("/", { state: {invalidsheet: false}});
                    }
                })
            } else {
                setIsModalOpen(true);
            }
        } else {
            setIsModalOpen(true);
        }

    },[])

    return(
        <>
            { isModalOpen &&
                <InputModal isModalOpen="true" onModalClose={props.onModalClose} updateFDs={props.updateFDs} updateInvestments={props.updateInvestments} cleanUpAll={props.cleanUpAll} setDataAvailability={props.setDataAvailability} setInvalidSheet={props.setInvalidSheet}></InputModal>
            }
        </>
    );
}