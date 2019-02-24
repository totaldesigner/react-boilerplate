import { createAction } from 'typesafe-actions'
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from '../constants/actionTypes'

export const fetchUsers = createAction(
  FETCH_USERS,
  resolve => (params: { seed: number; page: number }) => resolve(params)
)

export const fetchUsersSuccess = createAction(
  FETCH_USERS_SUCCESS,
  resolve => (payload: object) => resolve(payload)
)

export const fetchUsersFailure = createAction(
  FETCH_USERS_FAILURE,
  resolve => (error: Error) => resolve(error)
)
