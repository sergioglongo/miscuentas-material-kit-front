import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { reducer as form } from 'redux-form';
import userReducer from './slices/user.slice';
import unitsReducer from './slices/units.slice';
import trasactionsReducer from './slices/transactions.slice';
import listsReducer from './slices/lists.slice';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user","units"],
}

const rootReducer = combineReducers({
    user: userReducer,
    units: unitsReducer,
    lists: listsReducer,
    transactions: trasactionsReducer,
    form,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['pwa.event'],
          ignoredActions: ['pwa/addDeferredPrompt', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch