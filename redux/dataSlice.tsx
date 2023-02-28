import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
    imageUri: string;
    QrCode: string;
}

const initialState = {
    imageUri: '' as string,
    QrCode: '' as string,
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
    }
});

export const { addImageUri, addQr } = dataSlice.actions;

export default dataSlice.reducer;
