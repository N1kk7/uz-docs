export function formatDateUa(isoDate: any) {
  if (!isoDate) return ''
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return ''
  return `${d}.${m}.${y}`
}