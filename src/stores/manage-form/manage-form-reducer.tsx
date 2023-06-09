import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  //Form
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

  //Table
  selectedRow: any[];
}

const initialState = {
  //Form
  birth_date: null,
  name: '',
  last_name: '',
  gender: '',
  expected_salary: 0,
  id_card: '',
  name_title: '',
  nationality: '',
  passport: '',
  phone_no: '',

  //Table
  selectedRow: [],
} as IInitialState;

const manageFormSlice = createSlice({
  name: 'manageForm',
  initialState,
  reducers: {
    setTestType: (state, action: PayloadAction<string>) => {
      return { ...state, test_type: action.payload };
    },
    updateForm: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    selectRows: (state, action: PayloadAction<any>) => {
      return { ...state, selectedRow: action.payload };
    },
  },
});

export const { setTestType, updateForm, selectRows } = manageFormSlice.actions;
export default manageFormSlice.reducer;
