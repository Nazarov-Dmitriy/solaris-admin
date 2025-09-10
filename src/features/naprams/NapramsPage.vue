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
    <CreateUserForm
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
import UserTableComponent from '../components/UserTableComponent.vue';
import CreateUserForm from '../../../components/form/CreateUserForm.vue';
import CreateStudentForm from '../../../components/form/CreateStudentForm.vue';
import CreateTeacherForm from '../../../components/form/CreateTeacherForm.vue';
import StudentTableComponent from '../components/StudentTableComponent.vue';
import TeacherTableComponent from '../components/TeacherTableComponent.vue';
import UserMenuComponent from '../components/UserMenuComponent.vue';
import { useRoute } from 'vue-router';
import NapramTableComponent from './components/NapramTableComponent.vue';

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
