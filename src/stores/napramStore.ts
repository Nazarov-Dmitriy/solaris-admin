import { defineStore } from 'pinia';
import { CreatedNapram } from '../interfaces/create/createNapram';
import napramService from '../core/services/NapramService';

export const useNapramStore = defineStore('naprams', {
  state: () => ({
    naprams: [] as CreatedNapram[],
    cachedNaprams: null as CreatedNapram[] | null,
    getNapramsLoading: false,
    isCreateLoading: false,
    /* oldNapramName: '' as string, */
  }),

  getters: {
    getNaprams(state) {
      return state.naprams;
    },
  },

  actions: {
    /* setOldNapramName(name: string) {
      this.oldNapramName = name
    }, */
    async fetchNaprams(force: boolean = false) {
      if (this.cachedNaprams && !force) {
        this.naprams = this.cachedNaprams;
        return;
      }
      try {
        const res = await napramService.getNapramsList();
        this.naprams = res.data.data;
        this.cachedNaprams = res.data.data;
        console.log('Направления', res.data.data);
      } catch (error) {
        console.error('Ошибка при загрузке Направлений:', error);
      }
    },

    async deleteNapram(id: number) {
      try {
        if (!id) {
          console.error('Ошибка: id не передан');
          return;
        }
        const res = await napramService.deleteNapram(id);
        this.cachedNaprams = null;
      } catch (err) {
        console.error('Ошибка при удалении направления:', err);
      }
    },

    async createNapram(napram: FormData) {
      this.isCreateLoading = false
      try {
        this.isCreateLoading = true
        await napramService.createNapram(napram);
      }
      catch(e) {
        this.isCreateLoading = false
        console.log(e);
      }
      this.isCreateLoading = false
    },

    async updateNapram(id: number,formData: FormData) {
      try {
        const res = await napramService.updateNapram(id, formData);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
