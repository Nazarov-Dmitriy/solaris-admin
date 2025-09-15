<template>
  <Dialog
    v-model:visible="props.visible"
    modal
    :header="`Изменить ${type}`"
    :style="{ width: '25rem' }"
    close-icon="none"
  >
  <!-- STUDENT || TEACHER -->
    <div v-if="user" class="flex flex-col gap-4">
      <div
        class="flex flex-col gap-4"
        v-if="props.type === 'teacher' || props.type === 'student'"
      >
        <div class="flex items-center gap-4">
          <label for="username" class="font-semibold w-24">Имя</label>
          <InputText
            id="username"
            class="flex-auto"
            v-model="user.name"
            autocomplete="off"
          />
        </div>
        <div class="flex items-center gap-4">
          <label for="surname" class="font-semibold w-24">Фамилия</label>
          <InputText
            id="surname"
            class="flex-auto"
            v-model="user.surname"
            autocomplete="off"
          />
        </div>
        <div class="flex items-center gap-4">
          <label for="fathername" class="font-semibold w-24">Отчество</label>
          <InputText
            id="fathername"
            class="flex-auto"
            v-model="user.fathername"
            autocomplete="off"
          />
        </div>
        <div v-if="props.type === 'teacher'" class="flex items-center gap-4">
          <label for="profeccion" class="font-semibold w-24">Профессия</label>
          <InputText
            id="profeccion"
            class="flex-auto"
            v-model="user.profeccion"
            autocomplete="off"
          />
        </div>
        <div v-if="props.type === 'teacher'" class="flex items-center gap-4">
          <label for="activities" class="font-semibold w-24">Активности</label>
          <InputText
            id="activities"
            class="flex-auto"
            v-model="user.competition_activities"
            autocomplete="off"
          />
        </div>
      </div>
    </div>

    <!-- USER -->
    <div class="flex flex-col gap-4" v-if="props.type === 'user'">
      <div class="flex items-center gap-4">
        <label for="competitionTitle" class="font-semibold w-24">Логин</label>
        <InputText
          id="competitionTitle"
          class="flex-auto"
          v-model="user.username"
          autocomplete="true"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="competitionDescription" class="font-semibold w-24"
          >Email</label
        >
        <Textarea
          v-model="user.email"
          id="description"
          rows="2"
          cols="30"
          placeholder="Введите описание конкурса"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          style="resize: none"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="competitionTask" class="font-semibold w-24"
          >Категория</label
        >
        <InputText
          id="competitionTask"
          class="flex-auto"
          v-model="user.category"
          autocomplete="off"
        />
      </div>
    </div>
    <!-- COMPETITION -->

    <div class="flex flex-col gap-4" v-if="props.type === 'competition'">
      <div class="flex items-center gap-4">
        <label for="competitionTitle" class="font-semibold w-24"
          >Название</label
        >
        <InputText
          id="competitionTitle"
          class="flex-auto"
          v-model="competition!.title"
          autocomplete="true"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="competitionDescription" class="font-semibold w-24"
          >Описание</label
        >
        <Textarea
          v-model="competition!.description"
          id="description"
          rows="2"
          cols="30"
          placeholder="Введите описание конкурса"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          style="resize: none"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="competitionTask" class="font-semibold w-24">Задача</label>
        <InputText
          id="competitionTask"
          class="flex-auto"
          v-model="competition!.task_competitions"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- NAPRAM -->

    <div class="flex flex-col gap-4" v-if="props.type === 'napram'">
      <div class="flex items-center gap-4">
        <label for="napramTitle" class="font-semibold w-24"
          >Название</label
        >
        <InputText
          id="napramTitle"
          class="flex-auto"
          v-model="napram!.name"
          autocomplete="true"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="napramImage" class="font-semibold w-24"
          >Картинка</label
        >
        <FileUpload
          @select="(e: FileUploadSelectEvent) => $emit('imageSelected', e.files)"
          @remove="() => $emit('imageDeleted')"
          id="napramImage"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          style="resize: none"
          :fileLimit="1"
          :showUploadButton="false"
          :showCancelButton="false"
          chooseLabel="Выбрать фото"
          accept='image/png, .jpeg'
          invalidFileTypeMessage='Подходящие типы файлов: .png, .jpg'
          invalidFileLimitMessage='Нельзя загрузить больше одного файла'
        />
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        label="Отменить"
        severity="secondary"
        @click="closeDialog"
      ></Button>

      <Button type="button" label="Сохранить" @click="saveTeacher"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { FileUpload, FileUploadSelectEvent } from 'primevue';
import { computed } from 'vue';
import Textarea from 'primevue/textarea';

const props = defineProps({
  visible: Boolean,
  user: {
    type: Object,
    default: () => ({}),
  },
  competition: Object,
  type: String,
  napram: {
    type: Object,
    default: () => ({}),
  },
});

const type = computed(() => {
  if (props.type === 'teacher') return 'учителя';
  if (props.type === 'student') return 'ученика';
  if (props.type === 'competition') return 'конкурс';
  if (props.type === 'user') return 'пользователя';
  if (props.type === 'napram') return 'напрвление';
});

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'save': []
  'imageSelected': [files: File[]]
  'imageDeleted': []
}>();

function closeDialog() {
  emit('update:visible', false);
}

function saveTeacher() {
  emit('save');
}
</script>
