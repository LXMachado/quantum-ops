import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ['Client','Job','Project','Event','Auth'],
  endpoints: (b) => ({
    // Health check
    ping: b.query<{ ok: true }, void>({ query: () => 'health' }),
    // Auth
    register: b.mutation<{ message: string }, { email: string; password: string }>({
      query: (body) => ({ url: 'auth/register', method: 'POST', body }),
    }),
    login: b.mutation<{ token: string }, { email: string; password: string }>({
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    // Clients
    getClients: b.query<any[], void>({ query: () => 'clients' }),
    createClient: b.mutation<any, { name: string; email: string; phone?: string; company?: string }>({
      query: (body) => ({ url: 'clients', method: 'POST', body }),
    }),
    // Jobs
    getJobs: b.query<any[], void>({ query: () => 'jobs' }),
    createJob: b.mutation<any, { title: string; description?: string; clientId: string; status?: string }>({
      query: (body) => ({ url: 'jobs', method: 'POST', body }),
    }),
    // Projects
    getProjects: b.query<any[], void>({ query: () => 'projects' }),
    createProject: b.mutation<any, { name: string; description?: string; status?: string }>({
      query: (body) => ({ url: 'projects', method: 'POST', body }),
    }),
    // Events
    getEvents: b.query<any[], void>({ query: () => 'events' }),
    createEvent: b.mutation<any, { title: string; date: string }>({
      query: (body) => ({ url: 'events', method: 'POST', body }),
    }),
  })
})

export const {
  usePingQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useGetJobsQuery,
  useCreateJobMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetEventsQuery,
  useCreateEventMutation,
} = api