import { useEffect, useState } from 'react'

export const useCookieUpdate = () => {
  const [latestCookie, setLatestCookie] = useState(document.cookie)
  // get newest cookies e.g with config
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      document.cookie !== latestCookie && setLatestCookie(document.cookie)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return latestCookie
}
