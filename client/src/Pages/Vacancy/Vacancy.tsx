import style from './style.module.scss';
import { useEffect, useState } from "react"
import axios from 'axios'

function Vacancy() {

    const [vacancies, setVacancies] = useState([]);

    const getAllVacancies = async () => {
        const response = await axios.get('http://localhost:3003/vacancy')
        setVacancies(response.data)
        console.log(response.data);
    }

    useEffect(() => {
        getAllVacancies()
    }, [])
    
    return <div>
        <h1>Vacancies</h1>

        {vacancies.map((el: any) => 
            <div key={el.id} className={style.section}>
                <div>
                    <h1>{el.title}</h1>
                    <p>{el.description}</p>
                </div>
            </div>
        )}
        <button>Response</button>
    </div>
}

export default Vacancy;