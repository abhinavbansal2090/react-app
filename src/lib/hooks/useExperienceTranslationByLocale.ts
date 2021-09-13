import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Experience, ExperienceDescription } from 'lib/models'
import { getLanguageId } from 'features/locale/store/locale.selector'
import {
  getBase,
  getCategories,
} from 'features/initialize/initialize.selectors'
import { LanguageIds } from 'lib/i18n'

export const useExperienceTranslationByLocale = (experience: Experience) => {
  const appLanguageId = useSelector(getLanguageId)
  const categories = useSelector(getCategories)
  const base = useSelector(getBase)

  const {
    descriptions,
    categoryId,
    genderRestrictionId,
    difficultyLevelId,
    ageRestrictionId,
    regionId,
    poiId,
    activityIds,
  } = experience

  return useMemo(() => {
    const getByAppLanguageId = (withLanguageId: { languageId: LanguageIds }) =>
      appLanguageId === withLanguageId.languageId
    const fallbackLanguageId =
      appLanguageId === LanguageIds.Arabic
        ? LanguageIds.English
        : LanguageIds.Arabic
    const getByFallbackLanguageId = (withLanguageId: {
      languageId: LanguageIds
    }) => fallbackLanguageId === withLanguageId.languageId

    return {
      description: descriptions.find(getByAppLanguageId)?.name.length
        ? (descriptions.find(getByAppLanguageId) as ExperienceDescription)
        : (descriptions.find(getByFallbackLanguageId) as ExperienceDescription),
      category: categories
        ?.find((category) => category.id === categoryId)
        ?.labels.find(getByAppLanguageId)?.label.length
        ? categories
            ?.find((category) => category.id === categoryId)
            ?.labels.find(getByAppLanguageId)?.label
        : categories
            ?.find((category) => category.id === categoryId)
            ?.labels.find(getByFallbackLanguageId)?.label,
      audience: {
        gender: base.genderRestrictions
          ?.find(({ id }) => id === genderRestrictionId)
          ?.labels.find(getByAppLanguageId)?.label.length
          ? base.genderRestrictions
              ?.find(({ id }) => id === genderRestrictionId)
              ?.labels.find(getByAppLanguageId)?.label
          : base.genderRestrictions
              ?.find(({ id }) => id === genderRestrictionId)
              ?.labels.find(getByFallbackLanguageId)?.label,
        difficultyLevels: base.difficultyLevels
          ?.find(({ id }) => id === difficultyLevelId)
          ?.labels.find(getByAppLanguageId)?.label.length
          ? base.difficultyLevels
              ?.find(({ id }) => id === difficultyLevelId)
              ?.labels.find(getByAppLanguageId)?.label
          : base.difficultyLevels
              ?.find(({ id }) => id === difficultyLevelId)
              ?.labels.find(getByFallbackLanguageId)?.label,
        ageRestrictions: base.ageRestrictions
          ?.find(({ id }) => id === ageRestrictionId)
          ?.labels.find(getByAppLanguageId)?.label.length
          ? base.ageRestrictions
              ?.find(({ id }) => id === ageRestrictionId)
              ?.labels.find(getByAppLanguageId)?.label
          : base.ageRestrictions
              ?.find(({ id }) => id === ageRestrictionId)
              ?.labels.find(getByFallbackLanguageId)?.label,
        region: base.regions
          ?.find(({ id }) => id === regionId)
          ?.labels.find(getByAppLanguageId)?.label.length
          ? base.regions
              ?.find(({ id }) => id === regionId)
              ?.labels.find(getByAppLanguageId)?.label
          : base.regions
              ?.find(({ id }) => id === regionId)
              ?.labels.find(getByFallbackLanguageId)?.label,
        poi: base.places
          ?.find(({ id }) => id === poiId)
          ?.labels.find(getByAppLanguageId)?.label.length
          ? base.places
              ?.find(({ id }) => id === poiId)
              ?.labels.find(getByAppLanguageId)?.label
          : base.places
              ?.find(({ id }) => id === poiId)
              ?.labels.find(getByFallbackLanguageId)?.label,
        activities: base.activities
          ?.filter(({ id }) => activityIds.includes(id))
          .map(({ labels }) =>
            labels.find(getByAppLanguageId)?.label.length
              ? labels.find(getByAppLanguageId)?.label
              : labels.find(getByFallbackLanguageId)?.label
          ),
      },
    }
  }, [
    descriptions,
    categories,
    base.genderRestrictions,
    base.difficultyLevels,
    base.ageRestrictions,
    base.regions,
    base.places,
    base.activities,
    appLanguageId,
    categoryId,
    genderRestrictionId,
    difficultyLevelId,
    ageRestrictionId,
    regionId,
    poiId,
    activityIds,
  ])
}
