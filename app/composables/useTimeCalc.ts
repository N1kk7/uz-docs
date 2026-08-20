export function useTimeCalc() {
  const MINUTES_IN_DAY = 1440;

  // "20:00" -> 1200
  function timeToMinutes(time: any) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  // 1200 -> "20:00" (с учётом переполнения суток)
  function minutesToTime(totalMinutes: any) {
    const m = ((totalMinutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY;
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }

  // прибавить минуты к "абсолютному" времени (абсолютное = может быть > 1440, это уже следующие сутки)
  function addMinutes(absoluteMinutes: any, minutesToAdd: any) {
    return absoluteMinutes + minutesToAdd;
  }

  // пользователь ввёл "сырое" HH:mm (не длительность, а конкретное время, например КП захід).
  // определяем, это ещё те же сутки что и reference, или уже следующие (+ ручной сдвиг на всякий случай)
  function resolveAfter(referenceAbsolute: any, rawTime: any, extraDays = 0) {
    const refDay = Math.floor(referenceAbsolute / MINUTES_IN_DAY);
    const refMinuteOfDay = referenceAbsolute - refDay * MINUTES_IN_DAY;
    const rawMinuteOfDay = timeToMinutes(rawTime);

    let day = refDay;
    if (rawMinuteOfDay < refMinuteOfDay) {
      day += 1; // время "перевалило" через полночь относительно reference
    }
    day += extraDays;

    return day * MINUTES_IN_DAY + rawMinuteOfDay;
  }

  function diffMinutes(startAbsolute: any, endAbsolute: any) {
    return endAbsolute - startAbsolute;
  }

  function formatDuration(minutes: any) {
    if (minutes === null || minutes === undefined) return '—';
    const sign = minutes < 0 ? '-' : '';
    const abs = Math.abs(Math.round(minutes));
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    return `${sign}${h} год ${String(m).padStart(2, '0')} хв`;
  }

  // ночные часы: окно 22:00–05:00 (=420 минут за "ночь"), считаем пересечение с диапазоном работы
  function nightMinutesInRange(startAbsolute: any, endAbsolute: any) {
    if (endAbsolute === null || startAbsolute === null || endAbsolute <= startAbsolute) return 0;

    let total = 0;
    const firstDay = Math.floor(startAbsolute / MINUTES_IN_DAY) - 1;
    const lastDay = Math.floor(endAbsolute / MINUTES_IN_DAY) + 1;

    for (let d = firstDay; d <= lastDay; d++) {
      const nightStart = d * MINUTES_IN_DAY + 22 * 60; // 22:00 суток d
      const nightEnd = nightStart + 7 * 60;             // 05:00 суток d+1

      const overlapStart = Math.max(startAbsolute, nightStart);
      const overlapEnd = Math.min(endAbsolute, nightEnd);

      if (overlapEnd > overlapStart) {
        total += overlapEnd - overlapStart;
      }
    }

    return total;
  }

  // отдых / переотдых между двумя маршрутами
  // shiftMinutes — длительность ПЕРВОГО маршруту (робочий час)
  // endFirstAbsolute — кінець роботи першого маршруту
  // yavkaSecondAbsolute — явка другого маршруту
  function calcRest(shiftMinutes: any, endFirstAbsolute: any, yavkaSecondAbsolute: any) {
    const availableRest = diffMinutes(endFirstAbsolute, yavkaSecondAbsolute);
    const minRest = Math.max(Math.round(shiftMinutes / 2), 180); // не менше 3-х годин
    const rest = Math.min(minRest, Math.max(availableRest, 0));
    const overRest = Math.max(availableRest - rest, 0);

    return { availableRest, rest, overRest };
  }

  function toDate(dateStr: any, timeStr: any) {
  // dateStr: "2026-08-20", timeStr: "20:00"
  return new Date(`${dateStr}T${timeStr}:00`);
}

function diffMinutesBetweenDates(startDate: any, startTime: any, endDate: any, endTime: any) {
  if (!startDate || !startTime || !endDate || !endTime) return null;
  const start = toDate(startDate, startTime) as any;
  const end = toDate(endDate, endTime) as any;
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  return Math.round((end - start) / 60000);
}

// ночные часы по полным датам (переиспользуем nightMinutesInRange через "абсолютные" минуты от точки-нуля)
function nightMinutesBetweenDates(startDate: any, startTime: any, endDate: any, endTime: any) {
  if (!startDate || !startTime || !endDate || !endTime) return null;
  const start = toDate(startDate, startTime) as any;
  const end = toDate(endDate, endTime) as any;
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const base = new Date(start) as any;
  base.setHours(0, 0, 0, 0);

  const startAbs = Math.round((start - base) / 60000);
  const endAbs = Math.round((end - base) / 60000);

  return nightMinutesInRange(startAbs, endAbs);
}

  return {
    MINUTES_IN_DAY,
    timeToMinutes,
    minutesToTime,
    addMinutes,
    resolveAfter,
    diffMinutes,
    formatDuration,
    nightMinutesInRange,
    calcRest,
    toDate,
    diffMinutesBetweenDates,
    nightMinutesBetweenDates
  };
}