/* eslint-disable */

import { useState } from 'react';

import './InputModal.css';
import '../App.css';
import {connect} from 'react-redux';
import {loadDataFromSheets} from '../pages/Home';
import {updateFDs, updateInvestments, cleanUpAll, setDataAvailability} from '../app/redux/actions';
import { useCookies } from "react-cookie";
import Alert from '../components/Alert';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { OverlayTrigger } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';


function InputModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
    const [isValidatedModal, setIsValidatedModal] = useState(false);
    const [cookies, setCookies] = useCookies(['spreadSheetId']);
    const [fileLinkCookie, setFileLinkCookie] = useCookies(['filelink']);
    const [fileNameCookie, setFileNameCookie] = useCookies(['filename']);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();

    const openAlert = (message) => {
        setShowAlert(true);
        setAlertMessage(message);
    }
    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage("");
        //navigate("/");
    }

    const handleChange = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setIsValidatedModal(true);
        }
        else {
            setDataAvailability(true);
            setIsModalOpen(false);

            // Prevent the rerender of component after the Modal form submition
            event.preventDefault();
            event.stopPropagation();

            var fileControlElement = document.querySelector("[controlid='filePath']");
            var filePath = fileControlElement.value;
            var fileNameControlElement = document.querySelector("[controlid='fileName']");
            var fileName = fileNameControlElement.value;

            // Find SpreadSheetId from Datasheet URL
            // const re = new RegExp('\\/d\\/(.*)\\/edit\\?gid=(.*)#')
            const re = new RegExp('\\/d\\/(.*)\\/.*')
            const [_, spreadSheetId] = re.exec(filePath);
            setCookies("spreadSheetId", spreadSheetId);
            setFileLinkCookie("filelink", filePath);
            setFileNameCookie("filename", fileName);
            fileControlElement.value="";

            var response = loadDataFromSheets(spreadSheetId, props.updateFDs, props.updateInvestments, props.cleanUpAll, props.setDataAvailability, props.setInvalidSheet);
            props.onModalClose();
            response.then(status => {
                if (!status.isLoaded) {
                    openAlert(status.message);
                    console.log("alert");
                    navigate("/");
                }
                else {
                    console.log("success");

                }
            });
        }
    };

    return (
        <div id="inputmodal">
            { showAlert &&
                <Alert message={alertMessage} show={true} onClose={closeAlert}>
                </Alert>
            }
            <Modal
                size="lg"
                show={isModalOpen}
                onHide={() => props.onModalClose()}>
                <Form noValidate validated={isValidatedModal} onSubmit={handleChange}>
                    <Modal.Header closeButton>
                        <Modal.Title>Give your datasheet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                Datasheet Name&nbsp;
                            </Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="input"
                                    controlid="fileName"
                                    required
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please provide datasheet name above.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Looks Good!!
                                </Form.Control.Feedback>
                            </InputGroup>
                            <Form.Label>
                                Datasheet URL&nbsp;
                                <div className="tooltip1">
                                    <i className="bi bi-info-circle" style={{padding: '0px', fontSize: '15px'}}></i>
                                    <span className="tooltiptext1" style={{maxWidth: '900px', width: 'auto', whiteSpace: 'nowrap'}}>
                                        Enter the URL like: https://docs.google.com/spreadsheets/d//SPREADSHEET_ID/edit?gid=SHEET_ID#gid=SHEET_ID
                                    </span>
                                </div>
                            </Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="input"
                                    controlid="filePath"
                                    required
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please provide datasheet link above.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Looks Good!!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="button-17" type="submit" >Save</button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
const mapStateToProps = state => {
    console.log("STATE on HOME: ",state)
    const { fdData, fdMetadata, investmentData, investmentMetadata } = state.connectReducer.dataset;
    return {'fdData': fdData, 'fdMetadata': fdMetadata, 'investmentData': investmentData, 'investmentMetadata': investmentMetadata};
}
export default connect(mapStateToProps, {updateFDs, updateInvestments, cleanUpAll, setDataAvailability})(InputModal);