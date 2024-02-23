import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import chatReducer from './slices/chatSlice'
import sidebarReducer from './slices/sidebarSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'userInfo',
  storage,
}

const persistSidebarConfig = {
  key: 'sidebarInfo',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedSideBarReducer = persistReducer(persistSidebarConfig, sidebarReducer)

const rootReducer = combineReducers({
  userInfo: persistedReducer,
  chatInfo: chatReducer,
  sidebarInfo: sidebarReducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducer>

export const persistor = persistStore(store)
