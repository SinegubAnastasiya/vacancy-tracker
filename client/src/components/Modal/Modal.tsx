import style from './modal.module.scss';
import { useState } from "react"
import { useDispatch } from 'react-redux';
import { closeModal } from '../../slice/vacancy.slice';

const Modal = ({ isOpen, onSubmit, error }) => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(inputValue);
        setInputValue('')
        if (typeof (error) == 'object') dispatch(closeModal());
    }

    if (!isOpen) return null;

    return (    
        <div className={style.modalWrapper}>
            <div className={style.modal}>
                <h2>Fill the form</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.inputBox}>
                        <label>Enter the email</label>
                        <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Email' />
                        {typeof(error) == 'string' ? <div>{error}</div> : null}
                    </div>
                    <button type='submit'>Response</button>
                    <button type='button' onClick={() => dispatch(closeModal())}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;