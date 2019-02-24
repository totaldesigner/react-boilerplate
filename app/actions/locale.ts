import { createAction } from 'typesafe-actions'
import {
  CHANGE_LOCALE
} from '../constants/actionTypes'

export const changeLocale = createAction(
  CHANGE_LOCALE,
  resolve => (locale: Language) => resolve(locale)
)
