import React from 'react'
import { EN, KO } from '../constants/languages'
import { DEFAULT_LOCALE } from '../i18n'

const supportedLanguages = [EN, KO]
const supportedLanguagesPair = {
  [EN]: 'English',
  [KO]: '한국어',
}

namespace LanguageSelector {
  export interface Props {
    locale?: Language,
    changeLocale: any,
  }

  export interface State {
    language: Language
  }
}

export const LanguageSelector: React.FC<LanguageSelector.Props> = ({
  locale = DEFAULT_LOCALE,
  changeLocale,
}) => {

  return (
    <div>
      <select
        onChange={(e: React.ChangeEvent) => changeLocale((e.target as HTMLSelectElement).value)}
        value={locale}
      >
        {supportedLanguages.map((key: string) => {
          return (
            <option key={key} value={key}>
              {supportedLanguagesPair[key]}
            </option>
          )
        })}
      </select>
    </div>
  )
}
