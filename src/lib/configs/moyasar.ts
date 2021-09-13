import { isProduction } from '../constants/environment'

const MOYASAR_PUBLIC_KEY_DEV =
  'pk_test_PnXy2J9poMA5pL8HtXuojv51KNLxSycmEiAesd2U'
const MOYASAR_PUBLIC_KEY_PROD =
  'pk_live_QNsZeqga2Qyp8oNkykfW7PtPZHKSrm5ij6D1QwQV'

export const MOYASAR_PUBLIC_KEY = isProduction()
  ? MOYASAR_PUBLIC_KEY_PROD
  : MOYASAR_PUBLIC_KEY_DEV
