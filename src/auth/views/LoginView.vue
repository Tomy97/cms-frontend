<script setup lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {Field, useForm} from 'vee-validate'
import {useAuthStore} from "../store/auth.store.ts";
import {type AuthPayload} from "../services/auth.service.ts";
import {RoutesNamesEnum} from "@/enums/RoutesNames.enum.ts";

import Card from "primevue/card";
import Button from "primevue/button";
import FormInputEmail from "../../core/components/input/FormInputEmail.vue";
import FormInputPassword from "../../core/components/input/FormInputPassword.vue";

const form = reactive<AuthPayload>({
  email: "",
  password: "",
})
const router = useRouter();
const authStore = useAuthStore();
const {handleSubmit} = useForm({initialValues: form})

const onSubmit = handleSubmit(async (values: AuthPayload) => {
  try {
    await authStore.login(values)
    if (authStore.isLogged) {
      await router.push({name: RoutesNamesEnum.HOME})
    }
  } catch (err) {
    throw err;
  }
})
</script>
<template>
  <main class="flex items-center justify-center min-h-svh">
    <Card class="w-[30.5rem] max-h-[25rem]">
      <template #title>
        Bienvenido
      </template>
      <template #subtitle>
        Ingrese sus credenciales para ingresar
      </template>
      <template #content>
        <form @submit="onSubmit">
          <Field name="email" rules="required|email" v-slot="{ field }">
            <FormInputEmail
                :name="field.name"
                v-model="form.email"
                @update:model-value="field.onChange"
                class="mb-3"
            />
          </Field>
          <Field name="password" rules="required|min:8" v-slot="{ field }">
            <FormInputPassword
                :name="field.name"
                v-model="form.password"
                @update:model-value="field.onChange"
                class="mb-4"
            />
          </Field>
          <div class="flex justify-end">
            <Button type="submit" label="Enviar"/>
          </div>
        </form>
      </template>
    </Card>
  </main>
</template>