# Kit de execução — Dr. Tannuri / Google AI Studio

Este kit acompanha o superprompt; não é uma versão modificada do aplicativo.

1. Abra o projeto atual que corresponde a `copia.19.10.2026---dr.tannutri.zip`.
2. Leia `SUPERPROMPT_DRTANNURI_AISTUDIO_CORRECOES_PDF.md` e cole a seção COMANDO DE EXECUÇÃO no AI Studio.
3. Disponibilize o PDF em `fontes/`, o JSON da matriz e os arquivos relevantes de `referencia_doadora/` e `assets_correcao/`. Se o AI Studio não ler o ZIP, extraia antes. A referência só está disponível quando seu conteúdo puder ser lido pelo agente.

## Conteúdo

- `fontes/`: cópia idêntica do PDF fornecido, com nome simplificado.
- `referencia_doadora/`: somente os componentes Story e Testimonials, seus mapas de dados/imagens e assets relacionados. Não é a aplicação doadora completa. Não execute essa pasta como projeto e não copie todos os módulos para a aplicação.
- `assets_correcao/`: recorte fiel do certificado que a seta da página 3 indica. A rasterização preserva o conteúdo; não é o arquivo original isolado nem uma autenticação do documento.
- `MATRIZ_DRTANNURI_PDF.json`: 12 grupos de requisitos, preços por modalidade, dependências técnicas, pendências factuais e hashes das fontes.
- `INTEGRIDADE_SHA256.txt`: hashes dos arquivos do kit, sem incluir o próprio arquivo de hashes.

Os caminhos sugeridos ProfessionalStory.tsx, AthleteTestimonials.tsx e professionalCredentials.ts não existiam na base auditada; são destinos propostos. O agente pode escolher equivalentes coerentes.

Os componentes originais da doadora dependem de DemoContext e de outros componentes do projeto original. São referências para adaptação seletiva; não funcionam por simples cópia. Reutilize a infraestrutura atual de booking, analytics e avaliações.

A base principal não foi alterada, não foi feito build dos aplicativos, não foi validado o domínio público e não houve publicação. O conteúdo do kit foi conferido contra as fontes fornecidas; os testes descritos no prompt deverão ser executados durante a implementação.
