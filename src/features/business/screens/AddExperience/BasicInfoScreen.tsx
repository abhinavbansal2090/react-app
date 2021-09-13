import React, { FC, useContext, useState } from 'react'
import { Modal } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { Header } from 'components/Header/Header'
import { ButtonBig } from 'components/Button/ButtonBig'
import { SegmentedControl } from 'components/SegmentedControl/SegmentedControl'
import { businessSlice } from 'features/business/store/business.slice'
import { store } from 'lib/store/store'
import {
  getDescriptions,
  getNames,
} from 'features/business/store/business.selectors'
import { LanguageIds } from 'lib/i18n'
import { Input } from '../../components/Input'
import { HelperText } from '../../components/HelperText'

import './BasicInfoScreen.scss'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const BasicInfoScreen: FC<Props> = ({
  step,
  updateStep,
  onClickBack,
}) => {
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const names = useSelector(getNames)
  const desc = useSelector(getDescriptions)

  const [nameArabic, updateNameArabic] = useState(
    names ? names[LanguageIds.Arabic - 1].label : ''
  )
  const [descArabic, updateDescArabic] = useState(
    desc ? desc[LanguageIds.Arabic - 1].label : ''
  )
  const [nameEnglish, updateNameEnglish] = useState(
    names ? names[LanguageIds.English - 1].label : ''
  )
  const [descEnglish, updateDescEnglish] = useState(
    desc ? desc[LanguageIds.English - 1].label : ''
  )
  const [modal, showModal] = useState(false)
  const [selected, updateSelected] = useState(0)

  const segments = [
    { name: business.languages.arabic },
    { name: business.languages.english },
  ]

  const getUnfilled = () => {
    if (nameArabic === '' || descArabic === '') {
      return {
        unfilled: business.languages.arabic,
        filled: business.languages.english,
      }
    } else {
      return {
        unfilled: business.languages.english,
        filled: business.languages.arabic,
      }
    }
  }

  const handleContinue = () => {
    if (
      [
        nameArabic === '',
        descArabic === '',
        nameEnglish === '',
        descEnglish === '',
      ].some(Boolean)
    ) {
      showModal(true)
    } else {
      sendContinue()
    }
  }

  const sendContinue = () => {
    store.dispatch(
      businessSlice.actions.setTitleAndDesc({
        data: {
          nameArabic,
          descArabic,
          nameEnglish,
          descEnglish,
        },
      })
    )
    updateStep(5)
  }

  const renderInputs = (
    name: string,
    updateName: any,
    desc: string,
    updateDesc: any,
    languageId: LanguageIds
  ) => {
    return (
      <>
        <Input
          label={business.placeholders.labels.experienceName}
          value={name}
          onChange={(event: any) => {
            updateName(event.target.value)
          }}
          placeholder={business.placeholders.experience.name}
          style={{
            direction: languageId === LanguageIds.Arabic ? 'rtl' : 'ltr',
          }}
        />
        <Input
          label={business.placeholders.labels.description}
          value={desc}
          multiline
          onChange={(event: any) => {
            updateDesc(event.target.value)
          }}
          placeholder={business.placeholders.experience.desc}
          style={{
            direction: languageId === LanguageIds.Arabic ? 'rtl' : 'ltr',
          }}
        />
      </>
    )
  }

  return (
    <>
      <Header
        title={business.steps.basic}
        subTitle={`${business.step} ${step} ${business.of} 7`}
        hideBackButton={false}
        backButtonVariant={'close'}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      >
        <SegmentedControl
          segments={segments}
          selected={selected}
          updateSelected={updateSelected}
        />
      </Header>
      <div className="container container-fullheight container-fullheight-withButton container-fullheight-with-segmented-control basic">
        <div className="basic__inputs">
          <HelperText text={business.helper.basicInfo} />
          {selected === 0
            ? renderInputs(
                nameArabic,
                updateNameArabic,
                descArabic,
                updateDescArabic,
                LanguageIds.Arabic
              )
            : renderInputs(
                nameEnglish,
                updateNameEnglish,
                descEnglish,
                updateDescEnglish,
                LanguageIds.English
              )}
        </div>
        <ButtonBig
          title={`${business.continue} >`}
          type="full"
          backButton
          backButtonAction={() => {
            updateStep(3)
          }}
          disabled={
            (nameArabic === '' || descArabic === '') &&
            (nameEnglish === '' || descEnglish === '')
          }
          onPress={() => {
            handleContinue()
          }}
        />
        <Modal
          className="modal"
          onClose={() => {
            showModal(false)
          }}
          open={modal}
        >
          <div className="modal__container">
            <p className="modal__title">
              {business.languages.offert} {getUnfilled().filled}
            </p>
            <p className="modal__subtitle">{business.languages.helper}</p>
            <ButtonBig
              title={`${business.languages.addData} ${getUnfilled().unfilled}`}
              onPress={() => {
                showModal(false)
                updateSelected(
                  getUnfilled().unfilled === business.languages.english ? 1 : 0
                )
              }}
            />
            <ButtonBig
              title={business.languages.translate}
              onPress={() => {
                sendContinue()
              }}
            />
            <ButtonBig
              variant="outlined"
              title={business.languages.back}
              onPress={() => {
                showModal(false)
              }}
            />
          </div>
        </Modal>
      </div>
    </>
  )
}
