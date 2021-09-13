import React, { Suspense } from 'react'
import  {LandingPage} from './CMS'
import { HowItWorks } from 'CMS/How_it_works'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
//import './App.css'
/*import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { LocalizationContext } from 'lib/context'
import { ConfigCookies } from 'lib/constants'
import { ProtectedRoute, routes } from 'lib/navigation'
import { updateLocalizationByCookieOrBrowser } from 'features/locale/utils'
import { initializeSlice } from 'features/initialize/initialize.slice'
import { ListExperiencesScreen } from 'features/experience/screens/ListExperiencesScreen'
import { authSlice } from 'features/auth/store/auth.slice'
import { getWebView } from 'lib/utils'
import { AddExperienceScreen } from 'features/business/screens/AddExperienceScreen'
import { MapScreen } from 'features/map/MapScreen'
import { PaymentStatus } from 'features/payments/screen/PaymentStatus'
import { PaymentInfoScreen } from 'features/payments/screen/PaymentInfoScreen'
import { localeSlice } from './features/locale/store/locale.slice'
import { ExperienceScreen } from './features/experience/screens/ExperienceScreen'
import { ConfirmCodeScreen, LogInScreen } from './features/auth/screens'
import {
  AddInstanceScreen,
  InstanceScreen,
  PastInstancesScreen,
} from './features/experienceInstances/screens'

import 'lib/constants/index.scss'
import { FirebaseService } from './services/FirebaseService'
import { useCookieUpdate } from './lib/hooks'*/

const App = () => {

  return (
     <>
     <Suspense fallback="loading">
     <Router>
       <Switch>
       <Route exact path="/"><LandingPage /></Route>
       <Route exact path="/How_it_works"><HowItWorks /></Route>
      </Switch>
      </Router>
      </Suspense>
     </>
  )


}

/*type Themes = 'dark' | 'light'
const DEFAULT_THEME: Themes = 'light'

const App = () => {
  const dispatch = useDispatch()
  const [{ locale, t, isRtl }, setLocalization] = useState(
    updateLocalizationByCookieOrBrowser()
  )
  const [theme, setTheme] = useState<Themes>(DEFAULT_THEME)

  // NOTE: below in pair with useLayoutEffect checks for
  // token, theme, language changes
  const latestCookie = useCookieUpdate()

  useLayoutEffect(() => {
    const token = Cookies.get(ConfigCookies.Token)
    const themeFromCookie =
      (Cookies.get(ConfigCookies.Theme) as Themes) || DEFAULT_THEME

    setTheme(themeFromCookie)
    setLocalization(updateLocalizationByCookieOrBrowser())

    if (token) {
      // 401 in request set below to false redirecting to LoginScreen
      dispatch(authSlice.actions.setIsAuthenticated(true))
      dispatch(authSlice.actions.setToken(token))
    }

    dispatch(localeSlice.actions.setByLocale({ locale }))
    // NOTE: update config each time cookie changes
  }, [dispatch, latestCookie, locale])

  useEffect(() => {
    dispatch(initializeSlice.actions.initialize())
    FirebaseService.initialize()
  }, [dispatch])

  return (
    <main className={theme}>
      <LocalizationContext.Provider
        value={{
          t,
          isRtl,
          locale,
        }}
      >
        <Router>
          <Switch>
            <Route
              path={routes.home}
              exact
              render={() => {
                if (!getWebView()) {
                  return <Redirect to={routes.login} />
                } else {
                  return <Redirect to={routes.manage} />
                }
              }}
            />
            <Route path={routes.login} exact component={LogInScreen} />
            <Route
              path={routes.confirmCode}
              exact
              component={ConfirmCodeScreen}
            />
            <Route path={routes.payments} exact>
              <PaymentInfoScreen />
            </Route>
            <ProtectedRoute path={routes.paymentsStatus} exact>
              <PaymentStatus />
            </ProtectedRoute>
            <Route path={routes.manage} exact>
              <ListExperiencesScreen />
            </Route>
            <ProtectedRoute path={routes.addExperience} exact>
              <AddExperienceScreen />
            </ProtectedRoute>
            <ProtectedRoute path={routes.experience} exact>
              <ExperienceScreen />
            </ProtectedRoute>
            <ProtectedRoute path={routes.experienceInstance} exact>
              <InstanceScreen />
            </ProtectedRoute>
            <ProtectedRoute path={routes.experiencePastInstances} exact>
              <PastInstancesScreen />
            </ProtectedRoute>
            <ProtectedRoute path={routes.addExperienceInstance} exact>
              <AddInstanceScreen />
            </ProtectedRoute>
            <ProtectedRoute path={routes.addExperienceInstanceMap} exact>
              <MapScreen />
            </ProtectedRoute>
          </Switch>
        </Router>
      </LocalizationContext.Provider>
    </main>
  )
}
*/
export default App
