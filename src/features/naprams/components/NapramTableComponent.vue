<template>
  <div class="flex flex-column gap-2">
    <DataTable
      paginator
      :rows="5"
      showGridlines
      :value="naprams"
      tableStyle="width: 80vw;"
    >
      <Column field="name" header="Название"></Column>
      <Column field="image" header="Картинка">
        <template #body="slotProps">
            <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-24 rounded" />
        </template>
      </Column>
      <Column style="width: 80px">
        <template #body="{ data }">
          <div class="flex flex-row justify-center gap-2">
            <Button
              icon="pi pi-pencil"
              @click="updateSelectedItem(data)"
              severity="warn"
            ></Button>
            <Button
              icon="pi pi-times"
              @click="deleteSelectedItem(data)"
              severity="danger"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <Teleport to="body">
      <ChangeModal
        :napram="selectedItem"
        :visible="changeDialogVisible"
        @update:visible="closeDialogs"
        @save="changeNapram"
        @imageSelected="(files: File[]) => {
          if (selectedItem) {
            selectedItem.image = files[0];
          }
        }"
        @imageDeleted="() => {
          if (selectedItem) {
            selectedItem.image = undefined;
          }
        }"
        type="napram"
      />
      <DeleteModal
        :napram="selectedItem"
        :visible="deleteDialogVisible"
        @update:visible="closeDialogs"
        @delete="deleteNapram"
        type="napram"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
enum DataTableType {
  /* Users,
  Teachers,
  Students, */
  Napram
}
import { ref, onMounted, inject, computed, watch } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ChangeModal from '../../../components/modal/ChangeModal.vue';
import DeleteModal from '../../../components/modal/DeleteModal.vue';
import { useGetUserStore } from '../../../stores/getUsersStore';
import { useDialog } from '../../../composables/useShowDialogs';
import { UserInfo } from '../../../interfaces/user/userInterfaces';
import { useNapramStore } from '../../../stores/napramStore';
import { CreatedNapram } from '../../../interfaces/create/createNapram';

/* const userService = inject('UserService') as any;
const usersList = ref();
const value = ref<string | number>(DataTableType.Users);

const options = ref<{ label: string; value: string | number }[]>([
  { label: 'Пользователи', value: DataTableType.Users },
  { label: 'Учителя', value: DataTableType.Teachers },
  { label: 'Ученики', value: DataTableType.Students },
]); */

const napramStore = useNapramStore();
const naprams = computed(() => napramStore.getNaprams);

const {
  selectedItem,
  changeDialogVisible,
  deleteDialogVisible,
  openChangeDialog,
  openDeleteDialog,
  closeDialogs,
} = useDialog<CreatedNapram>();

/* watch(
  () => userStore.getStudents,
  (newData) => {
    usersList.value = newData;
  },
  { immediate: true },
);
 */
function deleteNapram() {
  if (selectedItem.value?.name) {
    napramStore
      .deleteNapram(selectedItem.value.id)
      .then(() => {
        napramStore.fetchNaprams(true);
      })
      .catch((err) => {
        console.error('Ошибка при удалении пользователя:', err);
      });
  }
}

function changeNapram() {
  if (selectedItem.value?.name) {
    const formData = new FormData();
    formData.append('name', selectedItem.value.name);
    formData.append('_method', "PUT");
    if (selectedItem.value.image instanceof File) {
      formData.append('image', selectedItem.value.image);
    }
    napramStore
      .updateNapram(selectedItem.value.id,formData)
      .then(() => {
        closeDialogs();
      })
      .catch((err) => {
        console.error('Ошибка при изменении ученика:', err);
      })
      .finally(() => {
        napramStore.fetchNaprams(true);
      });
  }
}

function updateSelectedItem(data: any) {
  selectedItem.value = data;
  openChangeDialog(data);
}

function deleteSelectedItem(data: any) {
  selectedItem.value = data;
  openDeleteDialog(data);
}

onMounted(() => {
  napramStore.fetchNaprams(true);

  /* userService
    .getListStudents()
    .then((res: ApiResponse<User[]>) => {
      usersList.value = res.data;
      console.log(usersList.value);
    })
    .catch((err) => {
      console.error('Ошибка при загрузке пользователей:', err);
    }); */
});

/* watch(changeDialogVisible, (newVal) => {
  if (newVal && selectedItem.value) {
    napramStore.setOldNapramName(selectedItem.value.name);
  }
}); */
</script>
