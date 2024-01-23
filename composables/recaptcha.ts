import type { ReCaptchaInstance } from 'recaptcha-v3'
import { load as loadReCaptcha } from 'recaptcha-v3'
import type { InjectionKey, Ref } from 'vue'
import type { IReCaptchaLoaderOptions } from 'recaptcha-v3/dist/ReCaptchaLoader'

export interface IReCaptchaOptions {
  siteKey: string
  loaderOptions: IReCaptchaLoaderOptions
}

export interface IReCaptchaComposition {
  isLoaded: Ref<boolean>
  instance: Ref<ReCaptchaInstance | undefined>
  executeRecaptcha: (action: string) => Promise<string>
  recaptchaLoaded: () => Promise<boolean>
}

const VueReCaptchaInjectKey: InjectionKey<IReCaptchaComposition> = Symbol('VueReCaptchaInjectKey')

interface IGlobalConfig {
  loadedWaiters: Array<({ resolve: (resolve: boolean) => void; reject: (reject: Error) => void })>
  error: Error | null
}
const globalConfig: IGlobalConfig = {
  loadedWaiters: [],
  error: null,
}

export function useReCaptcha(): IReCaptchaComposition {
  return inject(VueReCaptchaInjectKey)!
}

async function initializeReCaptcha(options: IReCaptchaOptions): Promise<ReCaptchaInstance> {
  return await loadReCaptcha(options.siteKey, options.loaderOptions)
}

function recaptchaLoaded(isLoaded: Ref<boolean>) {
  return () => new Promise<boolean>((resolve, reject) => {
    if (globalConfig.error !== null)
      return reject(globalConfig.error)

    if (isLoaded.value)
      return resolve(true)

    globalConfig.loadedWaiters.push({ resolve, reject })
  })
}

function recaptcha(instance: Ref<ReCaptchaInstance | undefined>) {
  return async (action: string): Promise<string | undefined> => {
    return await instance.value?.execute(action)
  }
}

export function install({ app }: any) {
  const isLoaded = ref(false)
  const instance: Ref<ReCaptchaInstance | undefined> = ref(undefined)

  // app.config.globalProperties.$recaptchaLoaded = recaptchaLoaded(isLoaded)
  const options = {
    siteKey: useRuntimeConfig().public.recaptchaSiteKey,
    loaderOptions: {
      autoHideBadge: true,
      useEnterprise: true,
    },
  } as IReCaptchaOptions

  initializeReCaptcha(options).then((wrapper) => {
    isLoaded.value = true
    instance.value = wrapper

    // app.config.globalProperties.$recaptcha = recaptcha(instance)
    // app.config.globalProperties.$recaptchaInstance = instance

    globalConfig.loadedWaiters.forEach(v => v.resolve(true))
  }).catch((error) => {
    globalConfig.error = error
    globalConfig.loadedWaiters.forEach(v => v.reject(error))
  })

  app.provide(VueReCaptchaInjectKey, {
    instance,
    isLoaded,
    executeRecaptcha: recaptcha(instance),
    recaptchaLoaded: recaptchaLoaded(isLoaded),
  })
}
