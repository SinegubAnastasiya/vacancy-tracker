import style from './style.module.scss';
import { useEffect, useState } from "react"
import axios from 'axios'

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e: any) => {
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

const Vacancy = () => {
    const [vacancies, setVacancies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = (inputValue) => {
        console.log('Entered value: ', inputValue);   
    }

    const getAllVacancies = async () => {
        const response = await axios.get('http://localhost:3003/vacancy')
        setVacancies(response.data)
        console.log(response.data);
    }

    useEffect(() => {
        getAllVacancies()
    }, [])
    
    return <div className={style.wrapper}>
        <h1>Vacancies</h1>

        <div className={style.vacancyInfo}>
            {vacancies.map((el: any) => 
                <div key={el.id} className={style.item}>
                    <div className={style.descript}>
                        <h1>{el.title}</h1>
                        <p>{el.description}</p>
                    </div>
                    <button className={style.btnResp} onClick={handleOpenModal}>Response</button>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit}></Modal>
        </div>
    </div>
}

export default Vacancy;