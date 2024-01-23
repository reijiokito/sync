<script lang="ts" setup>
import { Form, Field as FormField } from 'vee-validate'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const formSchema = toTypedSchema(
  z.object({
    name: z.string({ required_error: 'This is required' }).min(1, { message: 'This is required' }).max(50, { message: 'Must contain at most 50 character(s)' }),
    email: z.string({ required_error: 'This is required' }).email(),
    address: z.string().min(1, 'This is required'),
    countryCode: z.string(),
    phone: z.string({ required_error: 'This is required' }).superRefine((val, ctx) => {
      const parsePhone = parsePhoneNumberFromString(val as string || '', form.values.countryCode || 'VN')
      const numberRegex = /^\d+$/

      if (!numberRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number",
          fatal: true,
        })

        return z.NEVER
      }

      if (!parsePhone || !parsePhone.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number for the selected country",
        });
      }
    })
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    countryCode: 'VN',
    address: ''
  }
})


const { query } = useRoute()
const router = useRouter()
const carts = useState('carts', () => [])

if (process.dev) {
  // carts.value = [
  //   {
  //     product: 'A',
  //     price: 39,
  //     qty: 1,
  //   },
  //   {
  //     product: 'B',
  //     price: 49,
  //     qty: 1,
  //   },
  //   {
  //     product: 'C',
  //     price: 59,
  //     qty: 1,
  //   }
  // ]
}

onMounted(() => {
  if (query.product && query.price) {
    const product = query.product as string
    const price = Number(query.price as string)
    const cart = carts.value.find(item => item.product === product)
    if (cart) {
      cart.price = price
    } else {
      carts.value.push({ product, price, qty: 1 })
    }
    router.replace({
      query: {},
    })
  }
})



const isEmpty = computed(() => carts.value?.length === 0)
const { t: $t } = useI18n()
function remove(item: any) {
  const result = confirm($t('cart.are_you_sure_you_want_to_remove_this_product_from_your_cart'))
  if (result) {
    const index = carts.value.indexOf(item)
    if (index > -1) {
      carts.value.splice(index, 1)
    }
  }
}

const total = computed(() => carts.value.reduce((total, item) => total + item.price * item.qty, 0))

const step = ref(1)

function goToPayment() {
  step.value = 2
}

const submitOrder = form.handleSubmit(async (values) => {
  step.value = 3
})

onBeforeUnmount(() => {
  if (step.value === 3) {
    carts.value = []
  }
})

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
    // Calculate the Unicode value of the first character of the flag emoji
    const offset = 127397
    const unicode = countryCode
      .toUpperCase()
      .split('')
      .map(char => char.charCodeAt() + offset)
      .join('-')
    // Return the flag emoji as a string
    return String.fromCodePoint(...unicode.split('-'))
  }

  const countryName = `${getFlag(countryCode)} ${getCountryName(countryCode)}`
  return { value: countryCode, label: countryName }
})

const phonePrefix = computed(() => getCountryCallingCode(form.values.countryCode || 'VN'))
const phoneHint = computed(() => getExampleNumber(form.values.countryCode || 'VN', example)?.formatNational().slice(1))

const formattedDate = useDateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss')
const paymentMethod = ref('1')
const agree = ref(false)
</script>

<template>
  <section>
    <div class="flex-col items-center gap-5 py-10" :class="[isEmpty ? 'flex' : 'hidden']">
      <div class="i-ri:shopping-cart-2-line text-primary size-20" />
      <div class="text-2xl font-semibold">
        {{ $t('cart.there_are_no_product_in_your_cart') }}
      </div>
      <ButtonLink href="/pricing" rounded>
        {{ $t('cart.go_to_shopping') }}
      </ButtonLink>
    </div>
    <div :class="[isEmpty ? 'hidden' : 'block']" class="mt-15">
      <div
        class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base px-10">
        <div
          class="flex cursor-pointer md:w-full items-center sm:after:content-[''] after:w-full after:(h-1px border-b border-gray-200 border-1 hidden mx-6) sm:after:inline-block dark:after:border-gray-700">
          <span :class="[step >= 1 ? 'text-primary dark:text-primary' : '']"
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 flex-shrink-0 ">
            <span class="me-2 rounded-full h-6 w-6 flex-shrink-0 flex-center p-1"
              :class="[step >= 1 ? 'bg-primary text-white' : '']">1</span>
            {{ $t('cart.shopping_cart') }}
          </span>
        </div>
        <div
          class="flex cursor-pointer md:w-full items-center after:content-[''] after:w-full after:h-1px after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span :class="[step >= 2 ? 'text-primary dark:text-primary' : '']"
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 flex-shrink-0">
            <span class="me-2 rounded-full h-6 w-6 flex-shrink-0 flex-center p-1"
              :class="[step >= 2 ? 'bg-primary text-white' : '']">2</span>
            {{ $t('cart.payment_options') }}
          </span>
        </div>
        <div class="flex cursor-pointer items-center flex-shrink-0"
          :class="[step >= 3 ? 'text-primary dark:text-primary ' : '']">
          <span class="me-2 rounded-full h-6 w-6 flex-shrink-0 flex-center p-1"
            :class="[step === 3 ? 'bg-primary text-white' : '']">3</span>
          {{ $t('cart.order_received') }}
        </div>
      </div>


      <template v-if="step === 1">
        <div class="relative overflow-x-auto mt-10 max-w-screen-lg mx-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  {{ $t('cart.product_name') }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  {{ $t('cart.price') }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  {{ $t('cart.qty') }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  {{ $t('cart.total') }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-10 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                  {{ item.product }}
                </th>
                <td class="px-6 py-4 text-center">
                  ${{ item.price }}
                </td>
                <td class="px-6 py-4 text-center flex-center">
                  <input type="number" v-model="item.qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-primary focus:border-primary block w-70px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary text-center"
                    placeholder="">
                </td>
                <td class="px-6 py-4 text-center">
                  ${{ item.price * item.qty }}
                </td>
                <td class="px-6 py-4 text-center">
                  <SButton class="text-sm" variant="link" @click="remove(item)">
                    {{ $t('cart.remove') }}
                  </SButton>
                </td>
              </tr>

            </tbody>
            <tfoot>
              <tr class="font-semibold text-trueGray-800 dark:text-white">
                <th scope="row" class="px-6 py-3 text-base">{{ $t('cart.total') }}</th>
                <td class="px-6 py-3 text-center"></td>
                <td class="px-6 py-3 text-center"></td>
                <td class="px-6 py-3 text-center">${{ total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>


        <div class="flex justify-end gap-2 mt-6">
          <SButton variant="white">
            <NuxtLink to="/pricing">
              {{ $t('cart.continue_shopping') }}
            </NuxtLink>
          </SButton>

          <SButton variant="gradient" @click="goToPayment">
            {{ $t('cart.payment') }}
          </SButton>
        </div>
      </template>

      <template v-if="step === 2">
        <div class="grid grid-cols-2 gap-2 mt-10">
          <div class="border-1px border-border rounded-4px px-3 py-3">
            <h6 class="text-base font-bold uppercase">
              {{ $t('cart.payment_information') }}
            </h6>

            <div class="mt-4">
              <form class="w-full space-y-6">
                <FormField v-slot="{ componentField }" name="name">
                  <SFormItem>
                    <SFormLabel :class="'text-2xl'">{{ $t('cart.name') }}<span class="text-red-500">*</span></SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="email">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.email') }}<span class="text-red-500">*</span></SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.phone_number') }}<span class="text-red-500">*</span></SFormLabel>
                    <div class="flex items-center gap-2">
                      <FormField v-slot="{ componentField }" name="countryCode">
                        <SFormItem>
                          <SFormControl>
                            <SSelect v-bind="componentField" :default-value="form.values.countryCode" :options="options"
                              class="w-150px!" />
                          </SFormControl>
                        </SFormItem>
                      </FormField>
                      <SFormControl>
                        <SInputText type="text" :placeholder="`(+${phonePrefix}) ${phoneHint}`" v-bind="componentField" />
                      </SFormControl>
                    </div>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="company">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.company') }}</SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="address">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.address') }}<span class="text-red-500">*</span></SFormLabel>
                    <SFormControl>
                      <STextArea placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="note">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.order_notes') }}</SFormLabel>
                    <SFormControl>
                      <STextArea placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
              </form>
            </div>
          </div>

          <div>
            <div class="border-1px  border-border rounded-4px px-3 py-3">
              <h6 class="text-base font-bold uppercase">
                {{ $t('cart.your_order') }}
              </h6>
              <div class="flex mt-4 flex-col divide-dashed divide-y divide-border">
                <div class="flex gap-2 pl-6 pr-3 py-2 items-center" v-for="(item, i) in carts" :key="i">
                  <div class="flex-1">
                    <span>{{ item.product }}</span>
                    x
                    <span>{{ item.qty }}</span>
                  </div>
                  <div class="w-70px">
                    ${{ item.price * item.qty }}
                  </div>
                </div>

                <div class="flex gap-2 py-2 pl-6 pr-3 items-center">
                  <div class="flex-1 font-bold">
                    {{ $t('cart.total') }}
                  </div>
                  <div class="w-70px">
                    ${{ total }}
                  </div>
                </div>

              </div>


            </div>

            <div class="border-1px mt-2  border-border rounded-4px px-3 py-3">
              <h6 class="text-base font-bold uppercase">
                {{ $t('cart.payment') }}
              </h6>
              <div class="mt-4">

                <div class="flex">
                  <div class="flex items-center h-5">
                    <input v-model="paymentMethod" id="helper-radio-1" name="default-radio" type="radio" value="1"
                      class="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 focus:outline-none">
                  </div>
                  <div class="ms-2 text-sm">
                    <label for="helper-radio-1" class="font-medium text-gray-900 dark:text-gray-300">{{
                      $t('cart.bank_transfer') }}</label>
                    <div id="helper-radio-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">{{
                      $t('cart.make_payments_right_into_our_bank_account') }}</div>
                  </div>
                </div>

                <div class="flex mt-2">
                  <div class="flex items-center h-5">
                    <input v-model="paymentMethod" id="helper-radio-2" name="default-radio" type="radio" value="2"
                      class="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                  </div>
                  <div class="ms-2 text-sm">
                    <label for="helper-radio-2" class="font-medium text-gray-900 dark:text-gray-300">{{
                      $t('cart.payment_via_vnpay') }}</label>
                    <div id="helper-radio-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">{{
                      $t('cart.pay_online_via_vnpay') }}</div>
                  </div>
                </div>

                <div class="mt-4 text-sm italic">
                  <i18n-t tag="p" keypath="cart.your_personal_information_will_be_used_to_process_orders">
                    <template #privacy>
                      <NuxtLink target="__blank" class="text-primary underline hover:font-bold" to="/privacy">
                        {{ $t('cart.privacy_policy') }}
                      </NuxtLink>
                    </template>
                  </i18n-t>
                </div>

                <div class="flex items-center mb-4 mt-4">
                  <input v-model="agree" id="default-checkbox" type="checkbox" value=""
                    class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <i18n-t tag="p" keypath="cart.i_have_read_and_agree_to_the_websites_terms">
                      <template #term>
                        <NuxtLink target="__blank" class="text-primary underline hover:font-bold" to="/terms">
                          {{ $t('cart.terms_and_conditions') }}
                        </NuxtLink>
                      </template>
                    </i18n-t>
                  </label>
                </div>
              </div>

              <div class="flex justify-end mt-4">
                <SButton :disabled="!agree" variant="gradient" class="flex-shrink-0" type="submit" @click="submitOrder">
                  {{ $t('cart.order') }}
                </SButton>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="step === 3">
        <div class="gap-5 py-10 ">
          <div class="flex-center flex-col gap-2">
            <div class="i-ri:checkbox-circle-fill text-primary size-20" />
            <div class="font-bold text-xl">
              {{ $t('cart.thank_you_your_order_has_been_received') }}
            </div>
          </div>

          <div class="mx-auto max-w-screen-lg">
            <h6 class="text-lg font-bold uppercase mt-10 text-center mb-2">
              {{ $t('cart.order_details') }}
            </h6>
            <div class="grid text-sm grid-cols-4 gap-4 bg-gray-200 dark:bg-trueGray-700 rounded-8px px-4 py-4">
              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.order_number') }}
              </h6>
              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.date') }}
              </h6>
              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.total') }}
              </h6>

              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.payment_method') }}
              </h6>

              <div>
                11341172024
              </div>

              <div>
                {{ formattedDate }}
              </div>

              <div>
                ${{ total }}
              </div>

              <div>
                {{ paymentMethod === '1' ? $t('cart.bank_transfer') : $t('cart.payment_via_vnpay') }}
              </div>
            </div>


            <div class="relative overflow-x-auto mt-10">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      {{ $t('cart.product') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      {{ $t('cart.price') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      {{ $t('cart.total') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in carts" class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-10 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                      {{ item.product }}
                    </th>
                    <td class="px-6 py-4 text-center">
                      ${{ item.price }}
                    </td>

                    <td class="px-6 py-4 text-center">
                      ${{ item.price * item.qty }}
                    </td>
                  </tr>

                </tbody>
                <tfoot>
                  <tr class="font-semibold text-trueGray-800 dark:text-white">
                    <th scope="row" class="px-6 py-3 text-base">{{ $t('cart.total') }}</th>
                    <td class="px-6 py-3 text-center"></td>
                    <td class="px-6 py-3 text-center">${{ total }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
