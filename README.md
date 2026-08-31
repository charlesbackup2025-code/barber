# Barbearia Premium — deploy Cloudflare

Pacote completo para Cloudflare Pages + Pages Functions. O site exibe um calendário de 1 hora, das 08:00 às 20:00, consulta o Google Calendar e só confirma um horário livre. Depois da confirmação, abre o WhatsApp com serviço, valor, data e hora.

## 1. Preparar o Google Calendar

1. No Google Cloud Console, crie/selecionе um projeto e ative a **Google Calendar API**.
2. Crie uma **Service Account** e gere uma chave JSON.
3. Compartilhe o calendário **Barbearia Premium - Agendamentos** com o e-mail da Service Account, com permissão **Fazer alterações nos eventos**.
4. Não publique nem envie o arquivo JSON para o site. Ele será salvo como segredo no Cloudflare.

## 2. Publicar no Cloudflare

Com o Wrangler instalado e autenticado:

```bash
npm install
npx wrangler login
npx wrangler pages project create barbearia-premium
npx wrangler pages secret put SERVICE_ACCOUNT_JSON --project-name barbearia-premium
# Cole o conteúdo inteiro do JSON da Service Account quando solicitado.
npx wrangler pages deploy public --project-name barbearia-premium
```

O comando `pages secret put` mantém a chave apenas no ambiente do Cloudflare. Nunca coloque a chave no `public/`.

## 3. Testar

Abra o endereço do Pages e teste:

- Botão **Agendar agora**
- Clique em qualquer foto de corte
- Escolha uma data
- Confira horários ocupados/livres
- Escolha o serviço
- Confirme o agendamento
- Verifique o novo evento no Google Calendar
- Confira a mensagem detalhada no WhatsApp `+55 11 94975-3727`

## Observações

- O calendário usa o fuso `America/Sao_Paulo`.
- O último horário começa às 20:00 e termina às 21:00.
- O Worker consulta novamente o calendário antes de criar o evento para reduzir conflitos.
- O pacote não contém credenciais Google; elas precisam ser adicionadas como segredo no Cloudflare.
