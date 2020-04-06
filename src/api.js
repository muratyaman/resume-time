import axios from 'axios';

export async function resumeRetrieveFile(username) {
  return axios.get('/api/resumes/' + username + '/file');
}

export async function resumeRetrieve(username) {
  return axios.get('/api/resumes/' + username);
}

export async function resumeCreate(data) {
  return axios.post('/api/resumes', data);
}

export async function resumeUpdate(username, password, data) {
  const config = {
    headers: {
      'x-password': password,
    },
  };
  return axios.put('/api/resumes/' + username, data, config);
}

export async function resumeDelete(username, password) {
  const config = {
    headers: {
      'x-password': password,
    },
  };
  return axios.delete('/api/resumes/' + username, config);
}

export default {
  resumeRetrieveFile,
  resumeRetrieve,
  resumeCreate,
  resumeUpdate,
  resumeDelete,
};
