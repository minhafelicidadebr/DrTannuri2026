# Pacote incremental para o Google AI Studio — Dr. Luiz Tannuri

**Base auditada:** `copia.19.10.2026---dr.tannutri (1).zip`, SHA-256 `e2c58485a4cad3fb0ec4c1944450b335076b38dcf42a55932d7d7bee80cde2f5`.

Este pacote é uma instrução de **correção incremental** do app que recebeu o kit anterior. Não é o projeto inteiro, nem substitui o ZIP do app. A auditoria encontrou 7 requisitos concluídos no fluxo ativo, 13 parciais e 2 pendentes. A equivalência entre o ZIP auditado e o app publicado ainda não foi comprovada.

## Como executar

1. No **mesmo projeto do app no AI Studio**, faça uma cópia/versão de segurança e confira que o código atual contém `src/data/canonicalCatalog.ts`, `src/components/features/ProfessionalStory.tsx`, `src/components/features/AthleteTestimonials.tsx`, `src/data/professionalCredentials.ts` e a imagem `public/assets/aistudio/certificado-6-grau-referencia-pdf_e6b0b557.png`. São assinaturas da exportação auditada. Se uma delas faltar, compare a versão aberta com o ZIP acima **antes** de permitir alterações.
2. Disponibilize ao Gemini os arquivos deste pacote como contexto. Se for necessário colocá-los na árvore do projeto, use `docs/ai-studio-execution/` ou pasta equivalente **fora de `public/`**. Mantenha `02_DELTA_22_REQUISITOS.json`, `04_MATRIZ_ORIGINAL_22_REQUISITOS.json` e `05_AUDITORIA_DE_REFERENCIA.md` acessíveis ao agente; não copie o pacote inteiro para `public/assets/`.
3. Cole o conteúdo integral de `01_SUPERPROMPT_INCREMENTAL_AI_STUDIO.md` na conversa do **Build mode** desse projeto. O prompt orienta inspeção da base, mudanças em etapas e critérios de conclusão. O `03_CRITERIOS_DE_ACEITE.md` é o contrato de verificação. `reference/AuthorityRibbonDesignReference.tsx` é **referência visual sem alegações preenchidas**, não código para copiar integralmente.
4. Peça ao AI Studio que mostre o diff, rode os comandos `npm run lint` e `npm run build` no ambiente com dependências instaladas, exercite os fluxos no preview e entregue a tabela de aceite por requisito. Revise os resultados antes de publicar. Este pacote **não autoriza publicação automática**, alteração de DNS, serviço pago nem mensagens reais em testes.

**Não** aplique de novo `Pacote_AI_Studio_Dr_Tannuri.zip` como comando integral. **Não** envie somente o JSON do delta: ele registra o diagnóstico, mas o superprompt define a ordem, a preservação, as decisões condicionais e os testes. A referência filtrada dos 22 requisitos serve apenas para detalhes da especificação; seu `historical_target.sha256` aponta ao ZIP **anterior** e não deve substituir a base atual.

## Documentos e precedência

| Arquivo | Papel |
|---|---|
| `01_SUPERPROMPT_INCREMENTAL_AI_STUDIO.md` | Comando principal a colar no Gemini. |
| `02_DELTA_22_REQUISITOS.json` | Estado auditado de R01–R22 e prioridades. |
| `03_CRITERIOS_DE_ACEITE.md` | Cenários e evidências exigidas após as mudanças. |
| `04_MATRIZ_ORIGINAL_22_REQUISITOS.json` | Texto detalhado da intenção original, filtrado para remover o plano antigo; `historical_target` não é base de execução. |
| `05_AUDITORIA_DE_REFERENCIA.md` | Evidência estática, limitações e locais dos problemas. |
| `reference/AuthorityRibbonDesignReference.tsx` | Referência de composição com dados injetados somente após aprovação editorial. |
| `99_MANIFESTO_SHA256.json` | Integridade do pacote; não é necessário enviar à aplicação. |

**Regra de evidência:** o código atual determina o que já existe; o PDF e a matriz original explicam a intenção editorial; o delta e o superprompt determinam o trabalho restante. Alegações públicas, dados de contato e funcionalidades operacionais exigem fonte validada. Na ausência dela, o agente deve concluir as partes independentes e manter a funcionalidade com estados honestos e CTAs condicionados.

Documentação oficial: [Google AI Studio Build mode](https://ai.google.dev/gemini-api/docs/aistudio-build-mode).
