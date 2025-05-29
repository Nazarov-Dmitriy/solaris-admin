import { defineStore } from 'pinia';
import type { CompetitionFields } from '../interfaces/competition/competitionInterface';
import { addCompetitionService } from '../features/competitions/services/competitionsService';
import { deleteCompetitionService } from '../features/competitions/services/competitionsService';
import { changeCompetitionService } from '../features/competitions/services/competitionsService';
import { getCompetitionService } from '../features/competitions/services/competitionsService';

export const useCompetitionStore = defineStore('competitionStore', {
  state: () => ({
    competition: [] as CompetitionFields[],
  }),
  getters: {
    getCompetition(state) {
      return state.competition;
    },
  },
  actions: {
    async fetchCompetitions() {
      try {
        const res = await getCompetitionService();
        this.competition = res.data;
        console.log('Competitions fetched:', this.competition);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    },
    async addCompetition(competition: CompetitionFields) {
      try {
        const res = await addCompetitionService(competition);
        this.competition.push(res.data);
        console.log('Competition added:', res.data);
      } catch (error) {
        console.error('Error adding competition:', error);
      }
    },
    async deleteCompetition(id: string) {
      try {
        await deleteCompetitionService(id);
        this.competition = this.competition.filter((comp) => comp.id !== id);
        console.log(`Competition with ID ${id} deleted`);
      } catch (error) {
        console.error('Error deleting competition:', error);
      }
    },

    async changeCompetition(
      competition_id: string,
      competition: CompetitionFields,
    ) {
      try {
        await changeCompetitionService(competition_id, competition);
      } catch (error) {
        console.error('Error deleting competition:', error);
      }
    },
  },
});
