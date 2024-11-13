import style from './style.module.scss';
import { useEffect, useState} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, getVacancies, setImageSrc } from '../../slice/vacancy.slice';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';

const Vacancy = () => {
    const dispatch = useDispatch();
    const { 
        vacancies, 
        total, 
        isModalOpen, 
        vacancyid, 
        imageSrc 
    } = useSelector((state) => state.vacancies)
    const [error, setError] = useState(null)

    const handleCloseModal = () => {
       dispatch(closeModal())
    }

    const handleVacancyClick = (id: number) => {
        dispatch(openModal(id))
    }

    const handleSubmit = async (inputValue: string) => {
        const data = { useremail: inputValue, vacancyid }
            const response = await axios.post('http://localhost:3003/response/', data);
            setError(response.data)
    }

    const getImage = async () => {
        try {
            const response = await axios.get('http://localhost:3003/vacancy/1');
            dispatch(setImageSrc(response.data.logo));
            console.log(response.data.logo);
            
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        dispatch(getVacancies());
        getImage();
    }, [dispatch])
    console.log(error);
    
    return <div>
        <Modal error={error} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit}></Modal>
        <div className={style.wrapper}>
            <h1>Vacancies</h1>
            <h2>Total amount of vacancies: {total}</h2>
            <div className={style.vacancyInfo}>
                {vacancies.map((el: any) => 
                    <div key={el.id} className={style.item}>
                        <div className={style.descript}>
                            <div className={style.itemInfo}>
                                <h1>{el.title}</h1>
                                <p>{el.description}</p>
                            </div>
                            <div>
                                {imageSrc ? ( <img src={imageSrc} width='70px' height='70px'/> ) : ( <p>Loading image...</p> )}
                            </div>
                        </div>
                        <div className={style.respInfo}>
                            <button className={style.btnResp} onClick={() => handleVacancyClick(el.id)}>Response</button>
                            <p>Responses amount: {el.responses}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default Vacancy;