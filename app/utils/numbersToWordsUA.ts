// utils/numberToWordsUa.ts
const ones = ['', 'один', 'два', 'три', 'чотири', "п'ять", 'шість', 'сім', 'вісім', "дев'ять"]
const onesFem = ['', 'одна', 'дві', 'три', 'чотири', "п'ять", 'шість', 'сім', 'вісім', "дев'ять"]
const teens = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', "п'ятнадцять", 'шістнадцять', 'сімнадцять', 'вісімнадцять', "дев'ятнадцять"]
const tens = ['', '', 'двадцять', 'тридцять', 'сорок', "п'ятдесят", 'шістдесят', 'сімдесят', 'вісімдесят', "дев'яносто"]
const hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', "п'ятсот", 'шістсот', 'сімсот', 'вісімсот', "дев'ятсот"]

function threeDigits(num: number, fem = false): string {
  const h = Math.floor(num / 100), t = num % 100
  const parts: string[] = []
  if (h) parts.push(hundreds[h] || '')
  if (t >= 10 && t < 20) {
    parts.push(teens[t - 10] || '')
  } else {
    const tt = Math.floor(t / 10), o = t % 10
    if (tt) parts.push(tens[tt] || '')
    if (o) parts.push((fem ? onesFem : ones)[o] || '')
  }
  return parts.join(' ')
}
function plural(num: number, forms: [string, string, string]): string {
  const n = Math.abs(num) % 100, n1 = n % 10
  if (n > 10 && n < 20) return forms[2]
  if (n1 > 1 && n1 < 5) return forms[1]
  if (n1 === 1) return forms[0]
  return forms[2]
}

const scales = [
  { value: 1_000_000_000, forms: ['мільярд', 'мільярди', 'мільярдів'] as [string,string,string], fem: false },
  { value: 1_000_000, forms: ['мільйон', 'мільйони', 'мільйонів'] as [string,string,string], fem: false },
  { value: 1_000, forms: ['тисяча', 'тисячі', 'тисяч'] as [string,string,string], fem: true },
]

export function integerToWordsUa(value: number): string {
  if (value === 0) return 'нуль'
  let n = Math.floor(value)
  const chunks: string[] = []
  for (const s of scales) {
    if (n >= s.value) {
      const count = Math.floor(n / s.value)
      n -= count * s.value
      chunks.push(`${threeDigits(count, s.fem)} ${plural(count, s.forms)}`.trim())
    }
  }
  if (n > 0) chunks.push(threeDigits(n))
  return chunks.join(' ').replace(/\s+/g, ' ').trim()
}

export function amountToWordsUa(amount: number): string {
  const rounded = Math.round(amount * 100) / 100
  const uah = Math.floor(rounded)
  const kop = Math.round((rounded - uah) * 100)
  const words = integerToWordsUa(uah)
  const capitalized = words.charAt(0).toUpperCase() + words.slice(1)
  const uahForm = plural(uah, ['гривня', 'гривні', 'гривень'])
  return `${capitalized} ${uahForm} ${String(kop).padStart(2, '0')} коп.`
}