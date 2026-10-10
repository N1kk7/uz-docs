// composables/useAdvanceReportForm.ts
import { ref, reactive, computed } from 'vue'
import { amountToWordsUa } from '../utils/numbersToWordsUA'
import type { AdvanceReportPerson, ReceivedItem, ExpenseItem } from '~/types/advanceReport'

const uid = () => Math.random().toString(36).slice(2, 10)

export function useAdvanceReportForm() {
  const person = reactive<AdvanceReportPerson>({
    lastName: '', firstName: '', middleName: '', tabNumber: '', inn: '',
  })

  const received = ref<ReceivedItem[]>([{ id: uid(), source: '', amount: 0 }])
  const expenses = ref<ExpenseItem[]>([])

  function addReceivedItem() {
    if (received.value.length >= 3) return // в шаблоні тільки 3 рядки
    received.value.push({ id: uid(), source: '', amount: 0 })
  }
  const removeReceivedItem = (id: string) =>
    (received.value = received.value.filter(i => i.id !== id))

  const addExpense = () =>
    expenses.value.push({ id: uid(), date: '', description: '', amount: 0 })
  const removeExpense = (id: string) =>
    (expenses.value = expenses.value.filter(i => i.id !== id))

  const totalReceived = computed(() =>
    received.value.reduce((s, i) => s + (Number(i.amount) || 0), 0))
  const totalSpent = computed(() =>
    expenses.value.reduce((s, i) => s + (Number(i.amount) || 0), 0))
  const balance = computed(() => {
    const d = totalReceived.value - totalSpent.value
    return d > 0 ? d : null
  })
  const overspent = computed(() => {
    const d = totalSpent.value - totalReceived.value
    return d > 0 ? d : null
  })
  const amountInWords = computed(() => amountToWordsUa(totalSpent.value))
  const fullName = computed(() =>
    [person.lastName, person.firstName, person.middleName].filter(Boolean).join(' '))

  const errors = reactive<Record<string, string>>({})

  function validate(): boolean {
    Object.keys(errors).forEach(k => delete errors[k])
    if (!person.lastName.trim()) errors.lastName = 'Вкажіть прізвище'
    if (!person.firstName.trim()) errors.firstName = "Вкажіть ім'я"
    if (!person.tabNumber.trim()) errors.tabNumber = 'Вкажіть табельний номер'
    if (!/^\d{10}$/.test(person.inn.trim())) errors.inn = 'ІПН має складатись з 10 цифр'
    if (totalReceived.value <= 0) errors.received = 'Додайте хоча б одну суму одержання'
    if (expenses.value.length === 0) errors.expenses = 'Додайте хоча б одну витрату'
    expenses.value.forEach((e, i) => {
      if (!e.date) errors[`expense_${i}_date`] = 'Вкажіть дату'
      if (!e.description.trim()) errors[`expense_${i}_description`] = 'Вкажіть опис'
      if (!e.amount || e.amount <= 0) errors[`expense_${i}_amount`] = 'Сума > 0'
    })
    return Object.keys(errors).length === 0
  }

  const isSaving = ref(false)
  const saveError = ref<string | null>(null)

  async function save() {
    if (!validate()) return false
    isSaving.value = true
    saveError.value = null
    try {
      await $fetch('/api/advance-reports', {
        method: 'POST',
        body: {
          person: { ...person },
          received: received.value.map(({ source, amount }) => ({ source, amount })),
          expenses: expenses.value.map((e, i) => ({
            number: i + 1, date: e.date, description: e.description, amount: e.amount,
          })),
          totals: {
            received: totalReceived.value,
            spent: totalSpent.value,
            balance: balance.value,
            overspent: overspent.value,
            amountInWords: amountInWords.value,
          },
        },
      })
      return true
    } catch (e: any) {
      saveError.value = e?.data?.message || e.message || 'Помилка збереження'
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    person, received, expenses, fullName,
    totalReceived, totalSpent, balance, overspent, amountInWords,
    errors, isSaving, saveError,
    addReceivedItem, removeReceivedItem, addExpense, removeExpense,
    validate, save,
  }
}