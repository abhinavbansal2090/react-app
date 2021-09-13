import { makeStyles } from '@material-ui/core/styles'
import { isIOS } from 'react-device-detect'
import { store } from 'lib/store/store'

const getIsLayoutRtl = () => store.getState().locale.isLayoutRtl

// Remember to import import 'lib/constants/index.scss' in your component
export const withRtl = (className: string) =>
  getIsLayoutRtl() ? `${className} rtl` : className

export const getLineHeightByOS = (fontSize: number) =>
  isIOS ? fontSize * 2 : fontSize * 1.8

// remove border bottom from material ui
export const useCustomTextInputStyle = (
  center = false,
  showBottomLine = false
) =>
  makeStyles({
    underline: showBottomLine
      ? {}
      : {
          '&&&:before': {
            borderBottom: 'none',
          },
          '&&:after': {
            borderBottom: 'none',
          },
        },
    input: center
      ? {
          textAlign: 'center',
          '&::placeholder': {
            textAlign: 'center',
          },
        }
      : {},
  })()
