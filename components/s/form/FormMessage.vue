<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="div"
    :name="toValue(name)"
    class="text-sm font-medium text-destructive mt-1"
  />
</template>
