/**
 * Shared library for shift-scheduler monorepo
 * Contains common types, utilities, and constants used across app and backend
 */

/**
 * Get the application name
 */
export function getAppName(): string {
  return 'Shift Scheduler'
}

/**
 * Common types that can be shared between frontend and backend
 */
export interface User {
  id: string
  name: string
  email: string
}

export interface Shift {
  id: string
  userId: string
  startTime: Date
  endTime: Date
  role: string
}

/**
 * Common constants
 */
export const APP_VERSION = '1.0.0'
export const API_BASE_URL = process.env.API_URL || 'http://localhost:3001'
