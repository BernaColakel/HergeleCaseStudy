import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportModel {
    defectiveVehicle: boolean; wrongParking: boolean; other: boolean;
};
export interface DataState {
    imageUri: string;
    QrCode: string;
    location: string;
    comment: string;
    report: ReportModel;
};

const initialState = {
    imageUri: '' as string,
    QrCode: '' as string,
    location: '' as string,
    comment: '' as string,
    report: { defectiveVehicle: false, wrongParking: false, other: false } as ReportModel,
} as DataState;

export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        addImageUri: (state, action: PayloadAction<string>) => {
            state.imageUri = action.payload;
        },
        addQr: (state, action: PayloadAction<string>) => {
            state.QrCode = action.payload;
        },
        addLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        addComment: (state, action: PayloadAction<string>) => {
            state.comment = action.payload;
        },
        setReport: (state, action: PayloadAction<{ defectiveVehicle?: boolean, wrongParking?: boolean, other?: boolean }>) => {
            state.report.defectiveVehicle = action.payload.defectiveVehicle ?? state.report.defectiveVehicle;
            state.report.other = action.payload.other ?? state.report.other;
            state.report.wrongParking = action.payload.wrongParking ?? state.report.wrongParking;
            return state;
        }
    }
});

export const { addImageUri, addQr, addLocation, addComment, setReport } = dataSlice.actions;

export default dataSlice.reducer;
