export const isObject = (subject: any) =>
  typeof subject === 'object' && subject !== null

export const hasKeys = (subject: any) =>
  isObject(subject) && Object.keys(subject).length > 0

export const jsonToQueryString = (params?: Record<string, any>) =>
  params && hasKeys(params)
    ? Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value
              .map((val) => key + '=' + val)
              .filter((val) => val !== undefined)
              .join('&')
          }

          return key + '=' + value
        })
        .filter(Boolean)
        .join('&')
    : ''

export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)
