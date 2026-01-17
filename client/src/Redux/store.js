import {configureStore} from "@reduxjs/toolkit"
import AuthSliceReducer from "./Slices/AuthSlice"
import CourseSliceReducer from "./Slices/CourseSlice"
import RazorpaySliceReducer from "./Slices/RazorpaySlice"
import LectureSliceReducer from "./Slices/LectureSlice"
import StatSliceReducer from "./Slices/StatSlice"
import ChatbotSliceReducer from './Slices/ChatbotSlice'
 const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course: CourseSliceReducer,
        razorpay: RazorpaySliceReducer,
        lecture: LectureSliceReducer,
        stat: StatSliceReducer,
        chat: ChatbotSliceReducer
    },
    devTools: true
})

export default store