import { ref } from 'vue';
import type { CompetitionFields } from '../types';
import { useCompetitionStore } from '../../../stores/competitionStore';

export const competitionFields = ref<CompetitionFields>({
  title: '',
  description: '',
  description_short: '',
  task_competitions: '',
  begin_at: '',
  end_at: '',
  publication_at: new Date().toISOString().slice(0, 10),
  stop_at: '',
  status_id: '0',
  nastavnik_id: '',
});

const competitionStore = useCompetitionStore();

export async function createCompetition(competition: CompetitionFields) {
  try {
    await competitionStore.addCompetition(competition);
  } catch (error) {
    console.error('Error creating competition:', error);
  }
}
