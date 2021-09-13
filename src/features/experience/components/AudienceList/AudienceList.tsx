import React, { CSSProperties, FC } from 'react'
import { useSelector } from 'react-redux'
import { icons } from 'assets'
import { getLineHeightByOS } from 'lib/utils'
import { StyledText } from 'components/StyledText/StyledText'
import { DARK_GREY } from 'lib/constants/colors'
import { getIsRtl } from 'features/locale/store/locale.selector'

type Props = {
  title?: string
  showBullet?: boolean
  style?: CSSProperties
  audience: string[]
}

export const AudienceList: FC<Props> = ({
  audience,
  style,
  title,
  showBullet,
}) => {
  const isRtl = useSelector(getIsRtl)

  return (
    <div style={styles.container}>
      {title && (
        <StyledText style={styles.title}>{title.toUpperCase()}</StyledText>
      )}
      <div style={style}>
        {audience.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: showBullet ? 'flex' : 'block',
              flexDirection: isRtl
                ? ('row-reverse' as 'row-reverse')
                : ('row' as 'row'),
              ...styles.row,
            }}
          >
            {showBullet && (
              <img
                src={icons.bullet}
                style={{
                  margin: isRtl ? '0 0 0 8px' : '0 8px 0 0',
                  ...styles.bullet,
                }}
                alt={'bullet'}
              />
            )}
            <StyledText style={styles.text}>{item}</StyledText>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    marginTop: 6,
  },
  title: {
    fontSize: 14,
    lineHeight: `${getLineHeightByOS(14)}px`,
    fontWeight: 500,
    // @todo EA-273 light/dark mode
    color: DARK_GREY,
  },
  row: {
    alignItems: 'center',
  },
  text: {
    marginTop: -6,
    fontSize: 16,
    lineHeight: `${getLineHeightByOS(16)}px`,
    fontWeight: 300,
  },
  bullet: {
    marginTop: -6,
    height: 6,
    width: 6,
  },
}
