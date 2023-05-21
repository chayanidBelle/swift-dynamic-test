import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IForm {
  key: any;
  name_title: string;
  name: string;
  last_name: string;
  birth_date: any;
  nationality: string;
  id_card: string;
  gender: string;
  phone_no: string;
  passport: string;
  expected_salary: number;
}

interface IInitialState {
  //Form
  form: IForm;
  dataList: any[];
  //Table
  selectedRow: any[];
}

const initialState = {
  //Form
  form: {
    key: '',
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
  },
  dataList: [],
  //Table
  selectedRow: [],
} as IInitialState;

const manageFormSlice = createSlice({
  name: 'manageForm',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<any>) => {
      let temp = state.dataList;
      temp.push(action.payload);
      console.log('temp :>> ', temp);
      return { ...state, form: { ...action.payload }, dataList: temp };
    },
    selectRows: (state, action: PayloadAction<any>) => {
      return { ...state, selectedRow: action.payload };
    },
    setRecord: (state, action: PayloadAction<any>) => {
      let temp = state.dataList;
      temp.push(action.payload);
      return { ...state, dataList: temp };
    },
  },
});

export const { updateForm, selectRows, setRecord } = manageFormSlice.actions;
export default manageFormSlice.reducer;
