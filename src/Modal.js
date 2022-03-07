import closeButton from './close-button-svgrepo-com.svg'

function Modal({ closeModal, restartHandle, title, content }) {
    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div className="modal_top">
                    <h3>{!!title ? title : ""}</h3>
                    <button onClick={closeModal}><image src={closeButton}></image></button>
                </div>
                <div className="modal_body">
                    <h2>{content}</h2>
                </div>
                <div className="modal_footer">
                    <button onClick={restartHandle}>Play</button>
                    <button onClick={closeModal}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;