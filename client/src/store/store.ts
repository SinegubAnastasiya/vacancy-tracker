import { configureStore } from "@reduxjs/toolkit";
import vacancyReducer from '../slice/vacancy.slice';

const store = configureStore({
    reducer: {
        vacancies: vacancyReducer,
    },
});

export default store;