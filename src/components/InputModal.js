import { useState } from 'react';

import './InputModal.css';
import '../App.css';
import {connect} from 'react-redux';
import {loadDataFromSheets} from '../pages/Home';
import {updatePath, updateFDs, updateInvestments} from '../app/redux/actions';
import { useCookies } from "react-cookie";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'
import { OverlayTrigger } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';


function InputModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
    const [isValidatedModal, setIsValidatedModal] = useState(false);
    const [cookies, setCookie] = useCookies(['sheets']);

    const handleChange = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setIsValidatedModal(true);
        }
        else {
            setIsModalOpen(false);

            // Prevent the rerender of component after the Modal form submition
            event.preventDefault();
            event.stopPropagation();

            var fileControlElement = document.querySelector("[controlid='filePath']");
            var filePath = fileControlElement.value;

            // Find SpreadSheetId & SheetId from Datasheet URL
            // const re = new RegExp('\\/d\\/(.*)\\/edit\\?gid=(.*)#')
            const re = new RegExp('\\/d\\/(.*)\\/.*')
            const [_, spreadSheetId] = re.exec(filePath)
            const sheetNames = [encodeURIComponent("Fds"), encodeURIComponent("Investments")];
            var sheets = []
            sheetNames.forEach(sheet => {
                const sheetURL = 'https://docs.google.com/spreadsheets/d/' + spreadSheetId + '/gviz/tq?tqx=out:csv&sheet=' + sheet;
                sheets.push({'sheetname': sheet, 'url': sheetURL});
            })

            //Store Sheets
            props.updatePath({'sheets': sheets});

            setCookie("sheets", sheets);
            fileControlElement.value="";

            loadDataFromSheets(sheets, props.updateFDs, props.updateInvestments);
        }

    };
    const tooltip = (
        <Tooltip id="tooltip-custom-1">
            <div>
                Enter the URL like:
                https://docs.google.com/spreadsheets/d//SPREADSHEET_ID/edit?gid=SHEET_ID#gid=SHEET_ID
            </div>
        </Tooltip>
      );
    return (
        <Modal
            size="lg"
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}>
            <Form noValidate validated={isValidatedModal} onSubmit={handleChange}>
                <Modal.Header closeButton>
                    <Modal.Title>Give your datasheet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            Datasheet URL&nbsp;
                            <OverlayTrigger key='tooltip-custom-1' placement='right' overlay={tooltip}>
                                <i class="bi bi-info-circle"></i>
                            </OverlayTrigger>
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
                    <Button className="button-17" type="submit" >Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
const mapStateToProps = state => {
    console.log("STATE on HOME: ",state)
    const { sheets, fdData, fdMetadata, investmentData, investmentMetadata } = state.connectReducer.dataset;
    return {'sheets': sheets, 'fdData': fdData, 'fdMetadata': fdMetadata, 'investmentData': investmentData, 'investmentMetadata': investmentMetadata};
}
export default connect(mapStateToProps, {updatePath, updateFDs, updateInvestments})(InputModal);