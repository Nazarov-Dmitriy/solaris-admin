<!-- <style scoped>

  .p-datepicker-input {
    width: 100%;
  }
</style> -->

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="() => createCompetition(competitionFields)"
      class="bg-white shadow-md rounded-lg p-4 w-full  space-y-6"
    >
      <h1 class="text-2xl font-bold text-center text-gray-700">
        Создание конкурса
      </h1>
      <div class="space-y-4">
        <div
          v-for="(field, index) in formFields"
          :key="index"
          class="space-y-2"
        >
          <label
            :for="field.id"
            class="block text-sm font-medium text-gray-700"
          >
            {{ field.label }}
          </label>
          <component
            :is="field.component"
            v-model="competitionFields[field.model]"
            :id="field.id"
            :placeholder="field.placeholder"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            :style="field.style"
            :formats="field.formats"
            v-tooltip.top="field.tooltip"
            :options="field.options"
            :optionLabel="field.optionLabel"
            :optionValue="field.optionValue"
          />
        </div>
        <div class="my-4">
          <Button type="submit" class="w-full">Создать</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {
  competitionFields,
  createCompetition,
} from '../../features/competitions/services/useCompetitions';
import { CreateFormField } from '../../features/competitions/types';
import Editor from 'primevue/editor';
import { DatePicker, Select } from 'primevue';
import { useGetUserStore } from '../../stores/getUsersStore';
import { computed } from 'vue';

const teacherStore = useGetUserStore();
const teachers = computed(() => teacherStore.getTeachers)
if(teachers.value.length === 0) {
  teacherStore.fetchTeachers();
}

const formFields: CreateFormField[] = [
  {
    label: 'Название',
    id: 'title',
    model: 'title',
    component: InputText,
    placeholder: 'Введите название конкурса',
  },
  {
    label: 'Описание конкурса',
    id: 'description',
    model: 'description',
    component: Editor,
    rows: 5,
    cols: 30,
    placeholder: 'Введите описание конкурса',
    style: 'resize: none',
    formats: ['bold', 'color', 'italic', 'link', 'script', 'underline', 'list', 'image', 'video', 'align']
  },
  {
    label: 'Краткое описание конкурса',
    id: 'description_short',
    model: 'description_short',
    component: Textarea,
    rows: 5,
    cols: 30,
    placeholder: 'Введите описание конкурса',
  },
  {
    label: 'Задача конкурса',
    id: 'task_competitions',
    model: 'task_competitions',
    component: InputText,
    placeholder: 'Введите задачу конкурса',
  },
  {
    label: 'Дата начала конкурса',
    id: 'begin_at',
    model: 'begin_at',
    component: DatePicker,
    placeholder: 'Дата начала конкурса'
  },
  {
    label: 'Дата конца конкурса',
    id: 'end_at',
    model: 'end_at',
    component: DatePicker,
    placeholder: 'Дата конца конкурса'
  },
  {
    label: 'Дата остановки конкурса',
    id: 'stop_at',
    model: 'stop_at',
    component: DatePicker,
    placeholder: 'Дата остановки конкурса',
  },
  {
    label: 'Статус',
    id: 'status_id',
    model: 'status',
    component: Select,
    placeholder: 'Статус конкурса',
    tooltip: '0-не активен, 1-активен и можно записатьтся, 2-активен и запись закрыта, 3-не активен, закончился',
    options: [
    {
     optionLabel: 'Не активен',
     optionValue: '0', 
    },
    {
     optionLabel: 'Активен и можно записатьтся',
     optionValue: '1', 
    },
    {
     optionLabel: 'Активен и запись закрыта',
     optionValue: '2', 
    },
    {
     optionLabel: 'Не активен, закончился',
     optionValue: '3', 
    },
  ],
  optionLabel: 'optionLabel',
    optionValue: 'optionValue',
  },
  {
    label: 'Наставник',
    id: 'nastavnik_id',
    model: 'nastavnik_id',
    component: Select,
    placeholder: 'Выберите наставника',
    tooltip: 'Выберите 1го наставника из списка',
    options: teachers.value,
    optionLabel: (el) => el.name + ' ' + el.surname + ' ' + el.fathername + ' | ' + el.profeccion /* + ' | ' + el.competition_activities */,
    optionValue: 'user_id',
  }
];
</script>
