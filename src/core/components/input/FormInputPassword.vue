<script setup lang="ts">
import {defineRule, useField} from 'vee-validate'
import {required, min} from '@vee-validate/rules'
import Message from 'primevue/message'
import Password from 'primevue/password'

defineRule('required', required)
defineRule('min', min)

const props = withDefaults(
    defineProps<{
      name: string
      modelValue: string
    }>(),
    {
      name: 'password'
    }
)

const {value, errors, errorMessage } = useField<string>(props.name, {
  required,
  min: 8
})

const $emit = defineEmits(['update:modelValue'])
const onUpdate = (event: any) => {
  $emit('update:modelValue', event.target.value)
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <label :for="props.name">Contraseña</label>
    <Password
        type="password"
        required
        toggleMask
        input-class="w-full"
        :name="props.name"
        v-model="value"
        @input="onUpdate"
    />
    <template v-if="errors.length">
      <Message size="small" severity="error" variant="simple">{{ errorMessage }}</Message>
    </template>
  </div>
</template>