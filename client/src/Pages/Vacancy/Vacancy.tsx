import style from './style.module.scss';
import { useEffect, useState } from "react"
import axios from 'axios';
import Modal from '../../components/Modal/Modal';

const Vacancy = () => {
    const [vacancies, setVacancies] = useState([]);
    const [total, setTotal] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vacancyId, setVacancyId] = useState(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleVacancyClick = (id) => {
        setVacancyId(id)
        console.log('Vacancy id: ', id);
        setIsModalOpen(true);
    }

    const handleSubmit = async (inputValue) => {
        const data = { userEmail: inputValue, vacancyId }
        try {
            const response = await axios.post('http://localhost:3003/response', data);
            console.log('Successed: ', response.data);
        } catch (error: any) {
            if (error.message) {
                console.error('Sending error: ', error.response.data)
            } else if (error.request) {
                console.error('Network error: ', error.request)
            } else {
                console.error('Error: ', error.message)
            }
        }
    }

    const getAllVacancies = async () => {
        const response = await axios.get('http://localhost:3003/vacancy')
        setVacancies(response.data.items)
        console.log(response.data.items);
        setTotal(response.data.total)
    }

    useEffect(() => {
        getAllVacancies()
    }, [])
    
    return <div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit}></Modal>
        <div className={style.wrapper}>
            <h1>Vacancies</h1>
            <h2>Total amount of vacancies: {total}</h2>
            <div className={style.vacancyInfo}>
                {vacancies.map((el: any) => 
                    <div key={el.id} className={style.item}>
                        <div className={style.descript}>
                            <h1>{el.title}</h1>
                            <p>{el.description}</p>
                        </div>
                        <button className={style.btnResp} onClick={() => handleVacancyClick(el.id)}>Response</button>
                        <p>Responses amount {el.responses}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default Vacancy;