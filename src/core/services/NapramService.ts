import axiosR from '../api/http';
import { CreatedNapram } from '../../interfaces/create/createNapram';

/* export default {
  install: (app: App) => {
    const _napramService = new NapramService();
    app.provide('NapramService', _napramService);
  },
}; */

export default {

  getNapramsList() {
    return axiosR.get('/competitions/tags');
  },
  createNapram(napram: FormData) {
    return axiosR.post('/competition/naprams', napram, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateNapram(id: number, napram: FormData) {
    return axiosR.put(`/competition/naprams/${id}`, napram, {/* params: {param: napramName}, */ headers: {
      'Content-Type': 'multipart/form-data'
    }});
  },
  deleteNapram(id: number) {
    return axiosR.delete(`/competition/naprams/${id}`);
  }
}
