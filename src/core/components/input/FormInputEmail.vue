<script setup lang="ts">
import {defineRule, useField} from 'vee-validate'
import {required, email} from '@vee-validate/rules'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

defineRule('required', required)
defineRule('email', email)

const props = defineProps({
  name: {
    type: String,
    default: 'email',
  },
  modelValue: {
    type: String
  }
})

const {value, errorMessage, errors } = useField<string>(props.name, {
  required,
  email
})
const $emit = defineEmits(['update:modelValue'])
const onUpdate = (event: any) => {
  $emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="props.name">Email</label>
    <InputText class="w-full" :id="props.name" :name="props.name" type="email" required v-model="value" @input="onUpdate"/>
    <template v-if="errors.length">
      <Message size="small" severity="error" variant="simple">{{ errorMessage }}</Message>
    </template>
  </div>
</template>