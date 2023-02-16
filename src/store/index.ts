import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import overviewReducer from "../pages/overview/redux/reducer";
import loginReducer from "../pages/login/redux/reducer";
export const store = configureStore({
  reducer: {
    overview: overviewReducer,
    auth: loginReducer
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    if (process.env.NODE_ENV === "development") middleware.push(logger);

    return middleware;
  },
  devTools: process.env.NODE_ENV !== `production`,
})

// create types for state and dispatch
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;