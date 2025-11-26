import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) =>{
             console.log("feed", action.payload);
             return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
    },
});

export const {addFeed} = feedSlice.actions;
export default feedSlice.reducer;