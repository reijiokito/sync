<script setup lang="ts">
import { Form, Field as FormField } from 'vee-validate'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const { t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    title: z.string(),
    name: z.string({ required_error: t('contact.required') }).min(1, { message: t('contact.required') }).max(50, { message: t('contact.max-50-characters') }),
    email: z.string({ required_error: t('contact.required') }).email(),
    countryCode: z.string(),
    company: z.string().max(50, { message: t('contact.max-50-characters') }).optional(),
    note: z.string().max(300, { message: t('contact.max-300-characters') }).optional(),
    phone: z.string({ required_error: t('contact.required') }).superRefine((val, ctx) => {
      const parsePhone = parsePhoneNumberFromString(val as string || '', form.values.countryCode || 'VN')
      const numberRegex = /^\d+$/

      if (!numberRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('contact.invalid-phone-number'),
          fatal: true,
        })

        return z.NEVER
      }

      if (!parsePhone || !parsePhone.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('contact.invalid-phone-number-for-the-selected-country'),
        });
      }
    })
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    countryCode: 'VN',
    title: 'Mr.',
    requirements: [],
    note: '',
    company: '',
  }
})

const { recaptchaLoaded, executeRecaptcha } = useReCaptcha()
const success = ref(false)

async function recaptcha() {
  await recaptchaLoaded()
  const token = await executeRecaptcha('contact_us')
  return token
}

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  await $fetch('https://dev-streaming.gviet.vn:8783/auth-service/v1/contact-us', {
    method: 'POST',
    body: {
      ...form.values
    },
    headers: {
      Recaptcha: await recaptcha()
    }
  })
  success.value = true
})

const optionsTitle: { value:string, label: string }[] = [
  {
    value: 'Mr.',
    label: 'Mr.',
  },
  {
    value: 'Mrs.',
    label: 'Mrs.',
  },
  {
    value: 'Miss',
    label: 'Miss',
  },
  {
    value: 'Ms.',
    label: 'Ms.',
  },
  {
    value: 'Prof.',
    label: 'Prof.',
  },
]

const products = [
  {
    id: 'Dynamic Ads Insert (DAI)',
    label: 'Dynamic Ads Insert (DAI)',
  },
  {
    id: 'Linear Right Management (LRM)',
    label: 'Linear Right Management (LRM)',
  },
  {
    id: 'Media Video On Demand (Media VOD)',
    label: 'Media Video On Demand (Media VOD)',
  },
  {
    id: 'Media Live',
    label: 'Media Live',
  },
  {
    id: 'Interactive',
    label: 'Interactive',
  },
  {
    id: 'Livestream',
    label: 'Livestream',
  },
] as const

const options = getCountries().map((countryCode) => {
  function getCountryName(countryCode: string) {
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
      const countryName = regionNames.of(countryCode)
      return countryName
    }
    catch (error) {
      console.error('Error retrieving country name:', error)
      return null
    }
  }

  function getFlag(countryCode) {
    const offset = 127397
    const unicode = countryCode
      .toUpperCase()
      .split('')
      .map(char => char.charCodeAt() + offset)
      .join('-')
    return String.fromCodePoint(...unicode.split('-'))
  }

  const countryName = `${getFlag(countryCode)} ${getCountryName(countryCode)}`
  return { value: countryCode, label: countryName }
})

const phonePrefix = computed(() => getCountryCallingCode(form.values.countryCode || 'VN'))
const phoneHint = computed(() => getExampleNumber(form.values.countryCode || 'VN', example)?.formatNational().slice(1))

</script>

<template>
  <div v-if="success" class="flex-col flex gap-3 pb-20 pt-20 container items-center justify-center m-auto">
    <div class="flex gap-2 items-center">
      <Icon name="i-carbon:checkmark-filled"
        class="h-10 w-10 p-2 flex-center rounded-full flex-shrink-0 bg-primary/20 text-primary">
      </Icon>
      <h2 class="text-2xl text-center font-semibold">{{ $t('contact.success') }}</h2>
    </div>
    <img src="/image_78.png" alt="logo" class="mr-8px h-263px w-263px">
    <div class="text-base font-500">
      {{ $t('contact.thanks') }}
    </div>
    <NuxtLink to="/">
      <SButton class="flex-shrink-0" variant="gradient">
        {{ $t('contact.go-to-home') }}
      </SButton>
    </NuxtLink>
  </div>
  <div class="flex justify-items-center pb-20 pt-10 container" v-else>
    <div class="w-full bg-primary/20 py-10 px-8 rounded-sm max-w-xl hidden" lg="block">
      <h1 v-if="$slots.title" class="text-4xl font-bold leading-snug tracking-tight text-gray-800 text-center" lg="text-4xl leading-tight"
        xl="text-4xl leading-tight" dark="text-black">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h1>
      <p v-if="$slots.subtitle" class="text-base text-gray-500 dark:text-gray-300">
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </p>
      <div class="flex flex-col pt-2 gap-1">
        <ContentSlot :use="$slots.default" unwrap="ul" />
      </div>
      <div class="relative w-full min-h-370px flex items-center justify-center">
        <Slot class="absolute inset-0 h-full w-full object-scale-down">
          <ContentSlot :use="$slots.image" unwrap="p" />
        </Slot>
      </div>
    </div>
    <div class="w-full">
      <h2 class="text-2xl text-center font-semibold">{{ $t('contact.form_title') }}</h2>
      <form class="w-full space-y-2 xl:space-y-6 pl-20 py-10 custom-form" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>{{ $t('contact.title') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SSelect v-bind="componentField" :options="optionsTitle" :default-value="form.values.title"/>
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="name">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>{{ $t('contact.name') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>Email <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phone">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>{{ $t('cart.phone_number') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <div class="flex items-center gap-2">
                <FormField v-slot="{ componentField }" name="countryCode">
                  <SFormItem v-auto-animate>
                    <SFormControl>
                      <SSelect v-bind="componentField" :default-value="form.values.countryCode" :options="options" class="w-150px!"/>
                    </SFormControl>
                  </SFormItem>
                </FormField>
                <SFormControl>
                  <SInputText type="text" :placeholder="`(+ ${phonePrefix}) ${phoneHint}`" v-bind="componentField" />
                </SFormControl>
              </div>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="company">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>{{ $t('cart.company') }}</SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField name="items1">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>{{ $t('contact.requirements') }}</SFormLabel>
            <div class="w-full">
              <FormField v-for="item in products" v-slot="{ value, handleChange }" :key="item.id" type="checkbox" :value="item.id" :unchecked-value="false" name="requirements">
                <SFormItem class="flex items-center space-x-3 space-y-1">
                  <SFormControl>
                    <SCheckbox
                      :checked="value?.includes(item.id)"
                      @update:checked="handleChange"
                    />
                  </SFormControl>
                  <SFormLabel class="font-normal! text-sm!">
                    {{ item.label }}
                  </SFormLabel>
                </SFormItem>
              </FormField>
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="note">
          <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
            <SFormLabel>{{ $t('contact.additional-information') }}</SFormLabel>
            <div class="w-full">
              <SFormControl>
                <STextArea placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>

        <SButton class="flex-shrink-0 float-right" variant="gradient" type="submit" @click="onSubmit">
          {{ $t('contact.submit') }}
        </SButton>
      </form>
    </div>
  </div>
</template>
<style scoped>
.custom-form p {
  @apply my-1!
}
</style>
