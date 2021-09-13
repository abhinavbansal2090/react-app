import { availableLocales } from '../i18n'

export type AvailableLocaleNames = keyof typeof availableLocales

export type Locale = {
  isRtl: boolean
  t: Translations
}

export type Translations = {
  navigation: {
    business: string
    headersTitles: {
      business: string
      region: string
      gender: string
      age: string
      difficulty: string
      activities: string
    }
  }
  auth: {
    enterPhoneNumber: string
    youllReceiveSms: string
    errorOccurred: string
    enterCode: string
    enterCodeError: string
    notAProvider: string
    resendTheCode: string
    continue: string
  }
  contact: {
    call: string
    sms: string
    whatsApp: string
    cancel: string
  }
  date: {
    sunday: string
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    january: string
    february: string
    march: string
    april: string
    may: string
    june: string
    july: string
    august: string
    september: string
    october: string
    november: string
    december: string
  }
  experience: {
    instance: string
    archived: string
    instances: string
    preview: string
    audience: string
    notVerified: string
    addNewInstances: string
    noResultsCTA: string
    archiveModal: {
      question: string
      disclaimer: string
      archiveCTA: string
      goBackCTA: string
      archiveSuccess: string
      archiveError: string
    }
    manageExperiences: string
    addExperienceCTA: string
    addExperienceBigCTA: string
    getExperiencesCTA: string
    sar: string
    guests: string
    h: string
    d: string
    showPastInstancesCTA: string
    deleteInstance: {
      deleteInstance: string
      disclaimer: string
      errorAlreadyBooked: string
      deleteInstanceCTA: string
      contactSupportCTA: string
      goBackCTA: string
    }
  }
  payments: {
    title: string
    helperText: string
    continue: string
    paymentMethod: string
    form: {
      labels: {
        name: string
        number: string
        date: string
        cvc: string
      }
      placeholder: {
        name: string
        number: string
        date: string
        cvc: string
      }
      error: {
        name: string
        number: string
        cvc: string
        moyasar: string
      }
      status: {
        successSub: string
        success: string
        failure: string
      }
    }
  }
  business: {
    search: string
    continue: string
    saveAndAddAnother: string
    addNewInstance: string
    step: string
    addPhoto: string
    of: string
    unnamedPlace: string
    languages: {
      offert: string
      addData: string
      translate: string
      back: string
      helper: string
      arabic: string
      english: string
    }
    placeholders: {
      experience: {
        name: string
        desc: string
        location: string
        city: string
        address: string
      }
      labels: {
        location: string
        city: string
        address: string
        experienceName: string
        description: string
        gender: string
        age: string
        difficultyLevel: string
      }
      instances: {
        dateAndTime: string
        price: string
        guestsLimit: string
      }
      manage: string
      bookings: string
    }
    submit: {
      sucess: string
      verifed: string
    }
    helper: {
      locations: string
      audience: string
      activities: string
      basicInfo: string
      category: string
      photos: string
      region: string
      addInstance: string
      back: string
    }

    steps: {
      locations: string
      photos: string
      activities: string
      audience: string
      category: string
      basic: string
      region: string
    }
    maps: {
      select: string
      meetingPoint: string
      search: string
      pickAPoint: string
      continue: string
    }
    instancesFields: {
      newInstance: string
      dateAndTime: string
      duration: string
      hours: string
      days: string
      price: string
      guestsLimit: string
    }
    instanceSendingMessages: {
      error: string
      continue: string
    }
    discardNewExperienceModal: {
      title: string
      subtitle: string
      discardCTA: string
      goBackCTA: string
    }
  }
}
