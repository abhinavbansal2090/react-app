import { LanguageIds } from 'lib/i18n'

export enum paymentMethodsModel {
  creditcard,
  stcpay,
}

export const paymentMethods = [
  {
    id: 0,
    isChecked: true,
    value: 'creditcard',
    title: [
      {
        languageId: LanguageIds.English,
        label: 'Credit card / Mada',
      },
      {
        languageId: LanguageIds.Arabic,
        label: 'بطاقة ائتمان',
      },
    ],
  },
]
