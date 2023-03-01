import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface DataState {
    imageUri: string;
    QrCode: string;
    location: string;
    comment: string;
}

const initialState = {
    imageUri: '' as string,
    QrCode: '' as string,
    location: '' as string,
    comment: '' as string,
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
    }
});

export const { addImageUri, addQr, addLocation, addComment } = dataSlice.actions;

export default dataSlice.reducer;
