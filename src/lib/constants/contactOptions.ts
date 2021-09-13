import { LanguageIds } from 'lib/i18n'
import { TagLabel } from 'lib/models'
import { store } from 'lib/store/store'

export enum contactOptionsEnum {
  Call,
  SMS,
  WhatsApp,
  Cancel,
}
const t = store.getState().locale.t

export const contactOptions: {
  id: number
  title: TagLabel[]
}[] = [
  {
    id: 0,
    title: [
      {
        tagId: 0,
        languageId: LanguageIds.English,
        label: t.contact.call,
      },
      {
        tagId: 0,
        languageId: LanguageIds.Arabic,
        label: t.contact.call,
      },
    ],
  },
  {
    id: 1,
    title: [
      {
        tagId: 0,
        languageId: LanguageIds.English,
        label: t.contact.sms,
      },
      {
        tagId: 0,
        languageId: LanguageIds.Arabic,
        label: t.contact.sms,
      },
    ],
  },
  {
    id: 2,
    title: [
      {
        tagId: 0,
        languageId: LanguageIds.English,
        label: t.contact.whatsApp,
      },
      {
        tagId: 0,
        languageId: LanguageIds.Arabic,
        label: t.contact.whatsApp,
      },
    ],
  },
  {
    id: 3,
    title: [
      {
        tagId: 0,
        languageId: LanguageIds.English,
        label: t.contact.cancel,
      },
      {
        tagId: 0,
        languageId: LanguageIds.Arabic,
        label: t.contact.cancel,
      },
    ],
  },
]
