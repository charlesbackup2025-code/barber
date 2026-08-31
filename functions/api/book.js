import { createBooking, validDate, validSlot } from '../_shared/google.js';

const SERVICES = new Set(['Social', 'Personalizado', 'Barba', 'Luzes', 'Degradê', 'Navalhado']);

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Dados inválidos.' }, { status: 400 }); }
  const { date, time, service } = body || {};
  if (!validDate(date) || !validSlot(time) || !SERVICES.has(service)) {
    return Response.json({ error: 'Escolha um serviço, uma data e um horário válidos.' }, { status: 400 });
  }
  try {
    const result = await createBooking(env, { date, time, service });
    if (result.conflict) return Response.json({ error: 'Esse horário acabou de ser reservado. Escolha outro.' }, { status: 409 });
    return Response.json({ ok: true, eventId: result.eventId });
  } catch (error) {
    return Response.json({ error: 'Não foi possível confirmar o horário agora.' }, { status: 500 });
  }
}
