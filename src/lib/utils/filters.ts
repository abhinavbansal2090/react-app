import { Filters, TagLabel } from 'lib/models'
import { getLabelsTranslationByLocale } from 'features/locale/utils'

export const isSelectedFilter = (array: Filters[] | undefined) => {
  if (array)
    return array.some((obj) => {
      return obj.isChecked
    })
}

export const getSelected = (array: Filters[] | undefined) => {
  const filtred = array?.filter((item) => {
    return item.isChecked
  })
  if (filtred?.length === 0) {
    return false
  }
  const selectedText = filtred?.map((text) => {
    return getLabelsTranslationByLocale(text.title)
  })
  if (selectedText) {
    return selectedText?.join(', ')
  } else {
    return false
  }
}

export const getSelectedIds = (array: Filters[] | undefined) => {
  const filtred = array?.filter((item) => {
    return item.isChecked
  })
  if (filtred?.length === 0 || !filtred) {
    return []
  }
  if (filtred.length > 1) {
    return filtred.map((item) => {
      return item.id
    })
  } else {
    return [filtred[0].id]
  }
}

export const getSelectedId = (array: Filters[] | undefined) => {
  const filtred = array?.filter((item) => {
    return item.isChecked
  })
  if (filtred?.length === 0 || !filtred) {
    return false
  }
  if (filtred.length > 1) {
    return filtred.map((item) => {
      return item.id
    })
  } else {
    return filtred[0].id
  }
}

export const getSelectedObject = (array: any) => {
  const filtred = array?.filter((item: any) => {
    return item.isChecked
  })
  if (filtred?.length === 0 || !filtred) {
    return []
  }
  return filtred
}

export const getActivities = (array: Filters[] | undefined) => {
  const filtred = array?.filter((item) => {
    return item.isChecked
  })
  if (filtred?.length === 0 || !filtred) {
    return false
  }
  if (filtred.length > 1) {
    return filtred.map((item) => {
      return item.id
    })
  } else {
    return [filtred[0].id]
  }
}

export const getSelectedDescriptions = (
  name: TagLabel[] | undefined,
  desc: TagLabel[] | undefined
) => {
  const ExperienceDesc = name?.map(({ label, languageId }) => {
    const description = desc?.find((desc) => languageId === desc.languageId)
      ?.label
    return {
      languageId,
      name: label,
      description: description ? description : '',
    }
  })
  return ExperienceDesc
}
