import UserReducer from "./slices/usersSlice";
import RequestsReducer from "./slices/requestSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persisConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  auth: UserReducer,
  requests: RequestsReducer,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export default persistedReducer;
