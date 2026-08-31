import { busySlots, validDate, slots } from '../_shared/google.js';

export async function onRequestGet({ request, env }) {
  const date = new URL(request.url).searchParams.get('date') || '';
  if (!validDate(date)) return Response.json({ error: 'Data inválida.' }, { status: 400 });
  try {
    const busy = await busySlots(env, date);
    return Response.json({ date, slots: slots().map(time => ({ time, available: !busy.has(time) })) }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    return Response.json({ error: 'Não foi possível consultar a agenda.' }, { status: 500 });
  }
}
