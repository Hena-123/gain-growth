import { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import InputModal from '../components/InputModal';
import { loadDataFromSheets } from "../pages/Home";

export default function DataHandler(props) {

    const [cookies, setCookie] = useCookies(['gg_spreadSheetId']);
    const [updatedAtCookie, setUpdatedAtCookie] = useCookies(['gg_updatedAt']);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // To load data on each page, if that page does not have data, then get it from cookies
        if (!props.isModalOpen) {
            if(cookies.gg_spreadSheetId !== undefined) {
                var response = loadDataFromSheets(cookies.gg_spreadSheetId, props.updateFDs, props.updateInvestments, props.cleanUpAll, props.setDataAvailability, props.setInvalidSheet);
                props.onModalClose();
                response.then(status => {
                    if (!status.isLoaded) {
                        console.log("not loaded");
                    } else {
                        setUpdatedAtCookie("gg_updatedAt", Date.now());
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