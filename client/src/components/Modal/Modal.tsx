import style from './modal.module.scss';
import { useState } from "react"

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('')
        onClose();
    }

    if (!isOpen) return null;

    return <div className={style.modalWrapper}>
        <div className={style.modal}>
            <h2>Input data</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Enter email'></input>
                <button type='submit'>Response</button>
                <button type='button' onClick={onClose}>Cancel</button>
            </form>
        </div>
    </div>
}

export default Modal;