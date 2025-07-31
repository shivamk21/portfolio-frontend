// import axios from 'axios';
// import { Project } from '../types/Project';

// const API_URL = 'https://portfolio-backend-jo4y.onrender.com/api/projects';

// export type CreateProjectRequest = Omit<Project, 'id' | 'createdAt'>;

// export const getAllProjects = async (): Promise<Project[]> => {
//   const response = await axios.get<Project[]>(API_URL);
//   return response.data;
// };

// export const createProject = async (project: CreateProjectRequest): Promise<Project> => {
//   const response = await axios.post<Project>(API_URL, project);
//   return response.data;
// };

// export const updateProject = async (id: string, project: CreateProjectRequest): Promise<Project> => {
//   const response = await axios.put<Project>(`${API_URL}/${id}`, project);
//   return response.data;
// };

// export const deleteProject = async (id: string): Promise<void> => {
//   await axios.delete(`${API_URL}/${id}`);
// };


import axios from 'axios';
import { Project } from '../types/Project';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/projects`;


export type CreateProjectRequest = Omit<Project, 'id' | 'createdAt'>;

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(API_URL);
  return response.data;
};

export const createProject = async (project: CreateProjectRequest): Promise<Project> => {
  const response = await axios.post<Project>(API_URL, project);
  return response.data;
};

export const updateProject = async (id: string, project: CreateProjectRequest): Promise<Project> => {
  const response = await axios.put<Project>(`${API_URL}/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
