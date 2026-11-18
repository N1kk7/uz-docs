import type { StringLiteral } from "typescript"

// types/advanceReport.ts
export interface AdvanceReportPerson {
  lastName: string
  firstName: string
  middleName: string
  tabNumber: string
  inn: string
}

export interface ReceivedItem {
  id: string
  source: StringLiteral
  amount: number

  





}






export interface ExpenseItem {
  id: string
  date: string        // yyyy-mm-dd
  description: string
  amount: number



  
}