import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faClock, faClipboard } from "@fortawesome/free-solid-svg-icons"

export const UserFormHeader = () => {
    return (
        <div className="bg-pink p-5 mb-5 d-flex justify-content-between">
            <div className="d-flex flex-column gap-5 justify-content-between">
                <p className="h5">Título del formulario</p>
                <p>
                    <span> <FontAwesomeIcon icon={faClock} /> </span>
                    En menos de 5 minutos
                </p>
            </div>
            <FontAwesomeIcon icon={faClipboard} size="6x" className="align-self-center text-white" />
        </div>
    )
}