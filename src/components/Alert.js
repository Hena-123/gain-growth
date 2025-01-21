import { useEffect} from 'react';

export default function Alert(props) {

    const alertStyle = {
        position: 'fixed',
        top: '100px',         // Adjust top distance
        right: '20px',       // Adjust right distance
        zIndex: '1050',      // Ensure it's above other elements
    };
    var message = props.message !== undefined ? props.message : "";

    useEffect(() => {
        if(document.getElementById("alertMessage").innerHTML == "Empty") {
            document.getElementById("alertMessage").innerHTML = message ;
        }
        if (props.show) {
            const timer = setTimeout(() => {
                props.onClose(); // Automatically hide the alert after 3 seconds
            }, 5000);
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [props.show, props.onClose]);

    return (
        <div id="alert" style={{visibility: props.show ? 'visible' : 'collapse'}} >
            <div className={`alert alert-danger alert-dismissible fade show`} role="alert" style={alertStyle}>
                <div id="alertMessage" style={{textAlign: 'left'}}>Empty</div>
                <button type="button" class="close" onClick={() => props.onClose()} data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}