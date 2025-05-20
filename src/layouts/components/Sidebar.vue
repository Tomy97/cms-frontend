<script setup lang="ts">

import {RoutesNamesEnum} from "@/enums/RoutesNames.enum.ts";
import {ref} from "vue";
import type {MenuItem} from "primevue/menuitem";
import PanelMenu from "primevue/panelmenu";

const items = ref<MenuItem[]>([
  {label: 'Dashboard', icon: 'pi pi-chart-line', route: {name: RoutesNamesEnum.HOME}},
  {label: 'Clientes', icon: 'pi pi-users', route: {name: RoutesNamesEnum.CLIENTS}},
  {label: 'Categorías', icon: 'pi pi-tags', route: {name: RoutesNamesEnum.CATEGORIES}},
  {label: 'Productos', icon: 'pi pi-box', route: {name: RoutesNamesEnum.PRODUCTS}},
  {label: 'Pedidos', icon: 'pi pi-shopping-cart', route: {name: RoutesNamesEnum.ORDERS}},
  {label: 'Ventas', icon: 'pi pi-dollar', route: {name: RoutesNamesEnum.SALES}}
])

</script>

<template>
  <aside class="layout-sidebar surface-ground surface-border p-3"
         style="width: 250px; min-height:100vh;">
    <div class="text-xl font-bold mb-4">Logo</div>

    <PanelMenu :model="items">
      <template #item="{ item }">
        <router-link
            v-if="item.route"
            custom
            :to="item.route"
            v-slot="{ navigate, href, isActive }"
        >
          <a
              :href="href"
              @click="navigate"
              class="flex items-center px-3 py-2 mb-1 rounded cursor-pointer"
              :class="isActive ? 'bg-primary': ''"
          >
            <i :class="[item.icon, 'pi-fw']"/>
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </PanelMenu>
  </aside>
</template>

<style scoped>
.layout-sidebar {
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}
</style>