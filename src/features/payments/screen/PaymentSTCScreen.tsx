import React, { FC, useContext } from 'react'
import { Header } from 'components/Header'
import { LocalizationContext } from 'lib/context'
import { ButtonBig } from 'components/Button/ButtonBig'
import { MOYASAR_PUBLIC_KEY } from 'lib/configs/moyasar'
import { TagLabel } from 'lib/models'
import { getLabelsTranslationByLocale } from 'features/locale/utils'

import './Payments.scss'

type Props = {
  back: any
  method: string
  amount: number
  title: TagLabel[]
  userID: string
}

export const PaymentSTCScreen: FC<Props> = ({
  back,
  method,
  title,
  amount,
  userID,
}) => {
  const { t } = useContext(LocalizationContext)

  return (
    <>
      <Header
        title={t.payments.title}
        hideBackButton={false}
        subTitle={getLabelsTranslationByLocale(title)}
        onBackHistory={false}
        onBackAdditional={() => {
          back(false)
        }}
        backButtonVariant="back"
      />
      <div className="payments container container-fullheight container-fullheight-withButton">
        <form
          className="payments__form"
          method="POST"
          action="https://api.moyasar.com/v1/payments.html"
        >
          {/* SAR to HALAL */}
          <input type="hidden" name="amount" value={amount * 100} />
          <input type="hidden" name="source[type]" value={method} />
          <input type="hidden" name="source[mobile]" value="0500267267" />
          <input type="hidden" name="source[branch]" value="74416070923" />
          <input required type="hidden" name="description" value={userID} />
          <input
            type="hidden"
            name="publishable_api_key"
            value={MOYASAR_PUBLIC_KEY}
          />
          <ButtonBig
            title={t.payments.continue}
            actionType="submit"
            disabled={[].some(Boolean)}
            type="full"
          />
        </form>
      </div>
    </>
  )
}
