import { DatePicker, FileUpload } from 'primevue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

export interface Roles {
  value: string;
  label: string;
}

export interface CompetitionFields {
  title: string;
  description: string;
  task_competitions: string;
  [key: string]: string;
}

export interface CreateFormField {
  label: string;
  id: string;
  model: string;
  component: typeof InputText | typeof Textarea | typeof FileUpload | typeof DatePicker;
  placeholder?: string;
  rows?: number;
  cols?: number;
  style?: string;
  fileLimit?: number;
  showCancelButton?: boolean;
  showUploadButton?: boolean;
  chooseLabel?: string;
  accept?: string;
  invalidFileTypeMessage?: string;
  invalidFileLimitMessage?: string;
  formats?: any;
  tooltip?: string;
  options?: {optionLabel: string, optionValue: string}[] | { name: string; surname: string; fathername: string; profeccion: string; competition_activities: string; user_id: string; teacherId: string; }[];
  optionLabel?: string | ((option: any) => string);
  optionValue?: string;
}
