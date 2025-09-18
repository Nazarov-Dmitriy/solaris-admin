<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      ref="napramForm"
      @submit.prevent="() => handleSumbitNapram()"
      class="bg-white shadow-md rounded-lg p-4 w-full max-w-md space-y-6"
    >
      <h1 class="text-2xl font-bold text-center text-gray-700">
        Создание направления
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
          <component v-if="field.model === 'name'"
            :is="field.component"
            v-model="napramFields[field.model]"
            :id="field.id"
            :rows="field.rows"
            :cols="field.cols"
            :placeholder="field.placeholder"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            :style="field.style"
          />
          <component v-else
            :is="field.component"
            @select="(e: FileUploadSelectEvent) => napramFields.image = e.files"
            @remove="() => napramFields.image = ''"
            :id="field.id"
            :rows="field.rows"
            :cols="field.cols"
            :placeholder="field.placeholder"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            :style="field.style"
            :fileLimit="field.fileLimit"
            :showCancelButton="field.showCancelButton"
            :showUploadButton="field.showUploadButton"
            :chooseLabel="field.chooseLabel"
            :accept="field.accept"
            :invalidFileTypeMessage="field.invalidFileTypeMessage"
            :invalidFileLimitMessage="field.invalidFileLimitMessage"
          />
        </div>
        <div class="my-4">
          <Button type="submit" class="w-full" :disabled="createLoading">{{createLoading ? 'Загрузка...' : 'Создать'}}</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FileUpload, FileUploadSelectEvent, useToast } from 'primevue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { CreateFormField } from '../../features/competitions/types';
import { computed, ref, watch } from 'vue';
import { useNapramStore } from '../../stores/napramStore';
import isNotNullable from '../../utils/isNotNullable';

const napramFields = ref<{name: string, image: string | File[]}>({
  name: '',
  image: '',
});
const napramForm = ref<HTMLFormElement | null>(null)
const toast = useToast();

const createLoading = computed(() => napramStore.isCreateLoading)

const napramStore = useNapramStore()

async function handleSumbitNapram() {
    try {
      let napramFormData
      if(isNotNullable(napramForm.value)){
        napramFormData = new FormData()
        napramFormData.append('name', napramFields.value.name)
        napramFormData.append('image', napramFields.value.image[0])
        console.log(napramFormData)
        console.log(napramFormData.get('name'))
        console.log(napramFormData.get('image'))
        await napramStore.createNapram(napramFormData);
      } 
      else{
        toast.add({severity: 'warn', summary: 'Выберите картинку'})
        throw new Error('no image')
      }
    } catch (err) {
      console.log(err);
      toast.add({ severity: 'error', summary: 'Ошибка', detail: err.message });
    } finally {
      napramFields.value.name = '';
      napramFields.value.image = '';
    }
}

const formFields: CreateFormField[] = [
  {
    label: 'Название',
    id: 'name',
    model: 'name',
    component: InputText,
    placeholder: 'Введите название направления',
  },
  {
    label: 'Картинка направления',
    id: 'image',
    model: 'image',
    component: FileUpload,
    fileLimit: 1,
    showUploadButton: false,
    showCancelButton: false,
    chooseLabel: 'Выбрать фото',
    accept: 'image/png, .jpeg',
    invalidFileTypeMessage: 'Подходящие типы файлов: .png, .jpg',
    invalidFileLimitMessage: 'Нельзя загрузить больше одного файла'
  },
];
watch(createLoading, (newVal) => {
  if (!newVal) {
    document.querySelector('button.p-fileupload-file-remove-button')?.click();
  }
});
</script>
