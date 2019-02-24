import React, { ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { DEFAULT_LOCALE } from '../i18n'

namespace LanguageProvider {
  export interface Props {
    children: ReactNode
    locale?: Language
    messages: any
  }
}

const LanguageProvider: React.FC<LanguageProvider.Props> = ({
  children,
  locale = DEFAULT_LOCALE,
  messages,
}: LanguageProvider.Props) => (
  <IntlProvider key={locale} locale={locale} messages={messages[locale]()}>
    {children}
  </IntlProvider>
)

export default LanguageProvider
