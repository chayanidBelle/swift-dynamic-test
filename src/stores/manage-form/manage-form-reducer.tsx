import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  name_title: string;
  name: string;
  last_name: string;
  birth_date: Date | null;
  nationality: string;
  id_card: string;
  gender: string;
  phone_no: string;
  passport: string;
  expected_salary: number;
}

const initialState = {
  name_title: '',
  name: '',
  birth_date: null,
  expected_salary: 0,
  gender: '',
  id_card: '',
  last_name: '',
  nationality: '',
  passport: '',
  phone_no: '',
} as IInitialState;

const manageFormSlice = createSlice({
  name: 'manageForm',
  initialState,
  reducers: {},
});
