import { Swiper, SwiperSlide } from 'swiper/react'
import React, { FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { useExperienceTranslationByLocale } from 'lib/hooks'
import { StyledText } from 'components/StyledText/StyledText'
import { getLineHeightByOS } from 'lib/utils'
import { DARK_GREY, LIGHT_GREY } from 'lib/constants/colors'
import { Experience } from 'lib/models'
import { getUser } from 'features/initialize/initialize.selectors'
import { UserCard } from 'components/UserCard/UserCard'
import { icons } from 'assets'
import { AudienceList } from '../AudienceList/AudienceList'
import './ExperienceDetails.scss'
import 'swiper/swiper.scss'

type Props = {
  experience: Experience
}

export const ExperienceDetails: FC<Props> = ({ experience }) => {
  const { t, isRtl } = useContext(LocalizationContext)
  const images = experience?.images
    ? experience.images.map((image) => image.imageUrl).map((url) => ({ url }))
    : []
  const imagesToShow = isRtl ? images.reverse() : images
  const { description, category, audience } = useExperienceTranslationByLocale(
    experience
  )
  const provider = useSelector(getUser)

  const DotSeparator = () => (
    <div style={styles.dotSeparator}>
      <img src={icons.dotSeparator} alt={''} />
    </div>
  )

  const LocationText: FC = ({ children }) => (
    <StyledText fontWeight={500} style={styles.location}>
      {children}
    </StyledText>
  )

  return (
    <>
      <div style={styles.galleryContainer}>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {imagesToShow.map((image, idx) => (
            <SwiperSlide key={`swiper-slide-${idx}`}>
              <img src={image.url} key={`swiper-slide-image-${idx}`} alt={''} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={styles.textsContainer}>
        <StyledText style={styles.name}>{description.name}</StyledText>
        <StyledText style={styles.category}>{category}</StyledText>
        <div
          style={{
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginBottom: 24,
          }}
        >
          <LocationText>{audience.region}</LocationText>
          {audience.region && audience.poi && <DotSeparator />}
          <LocationText>{audience.poi}</LocationText>
        </div>
        <UserCard firstName={provider.firstName} lastName={provider.lastName} />
        <StyledText style={styles.description}>
          {description?.description}
        </StyledText>
        <StyledText style={styles.bigHeaderText}>
          {t.experience.audience}
        </StyledText>
        {audience.gender && (
          <AudienceList
            title={t.navigation.headersTitles.gender}
            audience={[audience.gender]}
          />
        )}
        {audience.difficultyLevels && (
          <AudienceList
            title={t.navigation.headersTitles.difficulty}
            audience={[audience.difficultyLevels]}
          />
        )}
        {audience.ageRestrictions && (
          <AudienceList
            title={t.navigation.headersTitles.age}
            audience={[audience.ageRestrictions]}
          />
        )}
        {audience.activities && (
          <div>
            <StyledText style={styles.bigHeaderText}>
              {t.navigation.headersTitles.activities}
            </StyledText>
            <AudienceList
              showBullet
              audience={audience.activities.filter(Boolean) as string[]}
            />
          </div>
        )}
      </div>
    </>
  )
}

const styles = {
  container: {
    flexGrow: 1,
  },
  galleryContainer: {
    height: 248,
    backgroundColor: LIGHT_GREY,
    marginBottom: 16,
  },
  gallery: {
    flex: 1,
  },
  textsContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 24,
    lineHeight: `${getLineHeightByOS(24)}px`,
    fontWeight: 500,
  },
  category: {
    marginBottom: 8,
    fontSize: 18,
    lineHeight: `${getLineHeightByOS(18)}px`,
    fontWeight: 500,
    // @todo EA-273 light/dark mode
    color: DARK_GREY,
  },
  location: {
    fontSize: 18,
    lineHeight: `${getLineHeightByOS(18)}px`,
    fontWeight: 500,
    // @todo EA-273 light/dark mode
    color: DARK_GREY,
  },
  dotSeparator: {
    display: 'flex',
    height: 4,
    width: 4,
    margin: '13px 8px 0',
  },
  description: {
    marginTop: 24,
    marginBottom: 16,
    fontWeight: 300,
  },
  bigHeaderText: {
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    lineHeight: `${getLineHeightByOS(22)}px`,
    fontWeight: 500,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 16,
    width: '90%',
  },
}
