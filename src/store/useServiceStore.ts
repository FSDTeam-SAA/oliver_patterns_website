'use client'

import { create } from 'zustand'

export interface Service {
  _id: string
  serviceName: string
  sessionInfo: string
  description: string
  uploadPhoto: string
  createdAt: string
  updatedAt: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalData: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface ServicesResponse {
  success: boolean
  pagination: Pagination
  services: Service[]
}

interface ServicesState {
  data: Service[]
  pagination: Pagination | null
  setData: (data: Service[]) => void
  setPagination: (pagination: Pagination) => void
  clear: () => void
}

export const useServicesStore = create<ServicesState>((set) => ({
  data: [],
  pagination: null,
  setData: (data) => set({ data }),
  setPagination: (pagination) => set({ pagination }),
  clear: () => set({ data: [], pagination: null }),
}))

export type { ServicesResponse }
