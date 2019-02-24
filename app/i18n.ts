import { addLocaleData } from 'react-intl'
import * as enLocaleData from 'react-intl/locale-data/en'
import * as koLocaleData from 'react-intl/locale-data/ko'

import enTranslationMessages from './translations/en.json'
import koTranslationMessages from './translations/ko.json'

import { EN, KO } from './constants/languages'

addLocaleData([...enLocaleData, ...koLocaleData])

const DEFAULT_LOCALE = KO
const appLocales = [EN, KO]

const formatTranslationMessages = (
  locale: Language,
  messages: object
): object => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, koTranslationMessages)
      : {}
  return { defaultFormattedMessages, ...messages }
}

const translationMessages = {
  [EN]: () => formatTranslationMessages(EN, enTranslationMessages),
  [KO]: () => formatTranslationMessages(KO, koTranslationMessages),
}

export {
  DEFAULT_LOCALE,
  appLocales,
  formatTranslationMessages,
  translationMessages
}
