import { reactive, computed, watch } from 'vue';
import { useTimeCalc } from './useTimeCalc';
import { useRouteCache } from './useRouteCache';

export function useRouteLeg(cacheKey: any, overrides = {}) {
  const { timeToMinutes, addMinutes, resolveAfter, diffMinutes, nightMinutesInRange } =
    useTimeCalc();
  const cache = useRouteCache(cacheKey);

  const defaultForm = {
    date: '',
    yavka: '20:00',
    priyomkaMinutes: 21,
    useKpVyhid: false,
    kpVyhidMinutes: 51,
    kpZahid: '',
    kpZahidExtraDays: 0,
    sdachaMinutes: 40,
    useMedComissia: false,
    medComissiaMinutes: 10,
    kinetsMinutes: 10,
    useNagon: false,
    nagonMinutes: 0,
    ...overrides,
  };

  const form = reactive({ ...defaultForm, ...(cache.load() || {}) });

  watch(form, (val) => cache.save(val), { deep: true });

  function clear() {
    Object.assign(form, defaultForm);
    cache.clear();
  }

  const yavkaAbsolute = computed(() => timeToMinutes(form.yavka || '00:00'));

  const priyomkaAbsolute = computed(() =>
    addMinutes(yavkaAbsolute.value, Number(form.priyomkaMinutes || 0))
  );

  const kpVyhidAbsolute = computed(() =>
    form.useKpVyhid ? addMinutes(yavkaAbsolute.value, Number(form.kpVyhidMinutes || 0)) : null
  );

  const kpZahidAbsolute = computed(() =>
    form.kpZahid
      ? resolveAfter(yavkaAbsolute.value, form.kpZahid, Number(form.kpZahidExtraDays || 0))
      : null
  );

  const sdachaAbsolute = computed(() =>
    kpZahidAbsolute.value === null
      ? null
      : addMinutes(kpZahidAbsolute.value, Number(form.sdachaMinutes || 0))
  );

  const endAbsolute = computed(() => {
    if (sdachaAbsolute.value === null) return null;
    const med = form.useMedComissia ? Number(form.medComissiaMinutes || 0) : 0;
    return addMinutes(sdachaAbsolute.value, med + Number(form.kinetsMinutes || 0));
  });

  const totalWorkMinutes = computed(() => {
    if (endAbsolute.value === null) return null;
    const nagon = form.useNagon ? Number(form.nagonMinutes || 0) : 0;
    return diffMinutes(yavkaAbsolute.value, endAbsolute.value) + nagon;
  });

  const nightMinutes = computed(() => nightMinutesInRange(yavkaAbsolute.value, endAbsolute.value));

  return {
    form,
    clear,
    yavkaAbsolute,
    priyomkaAbsolute,
    kpVyhidAbsolute,
    kpZahidAbsolute,
    sdachaAbsolute,
    endAbsolute,
    totalWorkMinutes,
    nightMinutes,
  };
}