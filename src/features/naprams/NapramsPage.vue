<template>
  <div class="flex flex-column items-center justify-center gap-2">
    <SelectButton
      v-model="selectedOption"
      :options="options"
      optionLabel="label"
    />
    <div v-if="isSearchVisible" class="flex justify-end">
      <UserMenuComponent />
    </div>
    <NapramForm
      v-if="
        selectedOption.value === 'create'
      "
    />
    <NapramTableComponent v-if="selectedOption.value === 'all'" />
  </div>
</template>

<script setup lang="ts">
import SelectButton from 'primevue/selectbutton';
import { onMounted, ref, watch } from 'vue';
import UserMenuComponent from '../user-admin/components/UserMenuComponent.vue';
import NapramTableComponent from './components/NapramTableComponent.vue';
import NapramForm from '../../components/form/NapramForm.vue';

const options = ref([
  { label: 'Создать направление', value: 'create' },
  { label: 'Все направления', value: 'all' },
]);

const isSearchVisible = ref(false);

const selectedOption = ref(options.value[0]);
watch(selectedOption, (newValue, oldValue) => {
  if (newValue.value === 'create') {
    isSearchVisible.value = false;
  } else {
    isSearchVisible.value = true;
  }
});
</script>
