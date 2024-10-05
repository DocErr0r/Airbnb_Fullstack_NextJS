import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/features/counter/counterSlice'
import queryparameterReducer from './features/queryparameter/queryparameterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    queryParameter:queryparameterReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch