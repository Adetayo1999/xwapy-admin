import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const clearPersistState = async () => {
  persistor.pause();
  await persistor.flush();
  return persistor.purge();
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
