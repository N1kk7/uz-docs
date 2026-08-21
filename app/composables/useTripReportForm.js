// composables/useTripReportForm.js
import { reactive, computed, ref } from 'vue'
import { formatDateUa } from '../utils/formatDateUa'

export function useTripReportForm() {
  const recipient = reactive({
    position: 'Начальнику виробничого підрозділу',
    department: '',
    headName: '', // ПІБ керівника у давальному відмінку — "Олександру Бартновському"
  })

  const applicant = reactive({
    position: '',
    lastName: '',
    firstName: '',
    middleName: '',
    tabNumber: '',
  })

  const trip = reactive({
    orderDate: '',
    orderNumber: '',
    city: '',
    department: '',
    branch: 'Локомотивна компанія',
    company: 'АТ «Укрзалізниця»',
    dateFrom: '',
    dateTo: '',
  })

  const applicantFullName = computed(() =>
    [applicant.firstName, applicant.lastName].filter(Boolean).join(' '))

  const applicantSignatureLine = computed(() => {
    const initials = [applicant.firstName, applicant.middleName]
      .filter(Boolean)
      .map((n) => `${n.charAt(0)}.`)
      .join('')
    return [initials, applicant.lastName.toUpperCase()].filter(Boolean).join(' ')
  })

  const letterBody = computed(() => {
    const orderDate = formatDateUa(trip.orderDate)
    const dateFrom = formatDateUa(trip.dateFrom)
    const dateTo = formatDateUa(trip.dateTo)

    return `Довожу до Вашого відома що згідно наказу від ${orderDate || '___'}р № ${trip.orderNumber || '___'} перебував у відрядженні в місті ${trip.city || '___'} в виробничому підрозділі «${trip.department || '___'}», філії «${trip.branch || '___'}», ${trip.company || '___'} з ${dateFrom || '___'}р - ${dateTo || '___'}р. Завдання відрядження виконано в повному обсязі. Прошу Вас компенсувати відрядні витрати.`
  })

  const errors = reactive({})

  function validate() {
    Object.keys(errors).forEach((k) => delete errors[k])
    if (!recipient.department.trim()) errors.recipientDepartment = 'Вкажіть підрозділ адресата'
    if (!recipient.headName.trim()) errors.recipientHeadName = 'Вкажіть ПІБ керівника'
    if (!applicant.lastName.trim()) errors.applicantLastName = 'Вкажіть прізвище'
    if (!applicant.firstName.trim()) errors.applicantFirstName = "Вкажіть ім'я"
    if (!applicant.position.trim()) errors.applicantPosition = 'Вкажіть посаду'
    if (!applicant.tabNumber.trim()) errors.applicantTabNumber = 'Вкажіть табельний номер'
    if (!trip.orderDate) errors.orderDate = 'Вкажіть дату наказу'
    if (!trip.orderNumber.trim()) errors.orderNumber = 'Вкажіть номер наказу'
    if (!trip.city.trim()) errors.city = 'Вкажіть місто відрядження'
    if (!trip.department.trim()) errors.tripDepartment = 'Вкажіть підрозділ відрядження'
    if (!trip.dateFrom) errors.dateFrom = 'Вкажіть дату початку'
    if (!trip.dateTo) errors.dateTo = 'Вкажіть дату завершення'
    if (trip.dateFrom && trip.dateTo && trip.dateFrom > trip.dateTo) {
      errors.dateTo = 'Дата завершення раніше дати початку'
    }
    return Object.keys(errors).length === 0
  }

  const isSaving = ref(false)
  const saveError = ref(null)

  async function save() {
    if (!validate()) return false
    isSaving.value = true
    saveError.value = null
    try {
      await $fetch('/api/trip-reports', {
        method: 'POST',
        body: {
          recipient: { ...recipient },
          applicant: { ...applicant },
          trip: { ...trip },
          letterBody: letterBody.value,
        },
      })
      return true
    } catch (e) {
      saveError.value = e?.data?.message || e.message || 'Помилка збереження'
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    recipient, applicant, trip,
    applicantFullName, applicantSignatureLine, letterBody,
    errors, isSaving, saveError,
    validate, save,
  }
}