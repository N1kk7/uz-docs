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
  source: string   // "від кого, № та дата" — опционально
  amount: number
}
export interface ExpenseItem {
  id: string
  date: string        // yyyy-mm-dd
  description: string
  amount: number
}