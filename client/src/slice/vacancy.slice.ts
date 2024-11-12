import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getVacancies = createAsyncThunk('vacancies/getVacancies', async () => {
    const response = await axios.get('http://localhost:3003/vacancy');
    return response.data;
});

const vacancySlice = createSlice({
        name: 'vacancies',
        initialState: {
            vacancies: [],
            total: 0,
            isModalOpen: false,
            vacancyid: null,
            imageSrc: '',
            isLoading: false,
            error: null
        },
        reducers: {
            openModal: (state, action) => {
                state.isModalOpen = true;
                state.vacancyid = action.payload;
            },
            closeModal: (state) => {
                state.isModalOpen = false;
                state.vacancyid = null;
            },
            setImageSrc: (state, action) => {
                state.imageSrc = action.payload;
            },
        },
        extraReducers: (builder) => { 
        builder
        .addCase(getVacancies.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(getVacancies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.vacancies = action.payload.items;
            state.total = action.payload.total;
        })

        .addCase(getVacancies.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
},
});

export { getVacancies, vacancySlice }
export const { openModal, closeModal, setImageSrc } = vacancySlice.actions;
export default vacancySlice.reducer;