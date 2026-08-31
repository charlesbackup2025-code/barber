# Barbearia Premium — Cloudflare Worker

Esta versão é para publicar diretamente como **Cloudflare Worker** no endereço `barber.<sua-conta>.workers.dev`. Ela serve o site, o calendário e as APIs de disponibilidade/reserva no mesmo Worker.

## Publicação pelo terminal

Na raiz deste projeto:

```bash
npm install
npx wrangler login
npx wrangler secret put SERVICE_ACCOUNT_JSON
npx wrangler deploy
```

Quando o comando pedir, cole o conteúdo inteiro do JSON da Service Account. Nunca coloque esse JSON no GitHub.

## Publicação pelo GitHub

Se estiver usando o Git Integration do Cloudflare Workers:

- Root directory: `/`
- Build command: `npm install`
- Deploy command: `npx wrangler deploy`

O projeto precisa ser **Workers**, não Pages. O `wrangler.toml` deste pacote já está preparado para Worker e mantém o nome `barber`.

## Google Calendar

O calendário usado é `Barbearia Premium - Agendamentos`. Compartilhe-o com o e-mail da Service Account com permissão **Fazer alterações nos eventos**.

## Funcionamento

- Calendário das 08:00 às 20:00
- Intervalos de 1 hora
- Todos os serviços por R$ 40
- Consulta de horários ocupados no Google Calendar
- Rechecagem antes de reservar
- Criação do evento e redirecionamento para o WhatsApp +55 11 94975-3727
