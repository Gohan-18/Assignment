const { configureStore } = require("@reduxjs/toolkit");
import setUserSlice from '../store/setUser-slice'


const store = configureStore({
    reducer: {
        user: setUserSlice
    }
})

export default store;