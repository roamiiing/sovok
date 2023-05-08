import { computed, watch } from 'vue'
import { GlobalThemeOverrides, darkTheme, lightTheme } from 'naive-ui'
import { useLocalStorage } from '@vueuse/core'
import colors from 'tailwindcss/colors'
import { UiTheme } from '@sovok/client/domain/ui'
import { defineStore } from 'pinia'

const LOCAL_STORAGE_THEME_KEY = 'sovok-ui-theme'
const DARK_THEME_CLASS = 'dark'

const DEFAULT_NAIVE_UI_THEME: GlobalThemeOverrides = {
  common: {
    borderRadius: '8px',

    fontSize: '16px',
    fontSizeTiny: '12px',
    fontSizeMini: '13px',
    fontSizeSmall: '14px',
    fontSizeMedium: '16px',
    fontSizeLarge: '18px',
    fontSizeHuge: '20px',

    heightTiny: '24px',
    heightMini: '28px',
    heightSmall: '32px',
    heightMedium: '36px',
    heightLarge: '40px',
    heightHuge: '44px',

    primaryColor: colors.blue[500],
    primaryColorHover: colors.blue[400],
    primaryColorPressed: colors.blue[600],
    primaryColorSuppl: colors.blue[700],
    infoColor: colors.sky[500],
    infoColorHover: colors.sky[400],
    infoColorPressed: colors.sky[600],
    infoColorSuppl: colors.sky[700],
    successColor: colors.green[500],
    successColorHover: colors.green[400],
    successColorPressed: colors.green[600],
    successColorSuppl: colors.green[700],
    warningColor: colors.amber[500],
    warningColorHover: colors.amber[400],
    warningColorPressed: colors.amber[600],
    warningColorSuppl: colors.amber[700],
    errorColor: colors.rose[500],
    errorColorHover: colors.rose[400],
    errorColorPressed: colors.rose[600],
    errorColorSuppl: colors.rose[700],
  },
}

export const useThemeStore = defineStore($line, () => {
  const theme = useLocalStorage(LOCAL_STORAGE_THEME_KEY, () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? UiTheme.Dark
      : UiTheme.Light,
  )

  const toggleTheme = () =>
    theme.value === UiTheme.Light ? UiTheme.Dark : UiTheme.Light

  const currentThemeOverrides = computed(() =>
    theme.value === UiTheme.Light
      ? DEFAULT_NAIVE_UI_THEME
      : DEFAULT_NAIVE_UI_THEME,
  )

  const currentTheme = computed(() =>
    theme.value === UiTheme.Light ? lightTheme : darkTheme,
  )

  watch(
    theme,
    value => {
      const html = document.querySelector('html')!

      if (value === UiTheme.Dark) {
        html.classList.add(DARK_THEME_CLASS)
      } else {
        html.classList.remove(DARK_THEME_CLASS)
      }
    },
    {
      immediate: true,
    },
  )

  return {
    theme,
    toggleTheme,
    currentThemeOverrides,
    currentTheme,
  }
})
