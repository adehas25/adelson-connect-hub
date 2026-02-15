

## Corrigir visibilidade do grid visual de icones no mobile

### Problema

O dialog de criacao/edicao de link no `MyPage.tsx` nao tem scroll interno. No mobile, o conteudo (grid de presets + campos de nome/URL + seletor de cor + preview + botao) ultrapassa a altura da tela, fazendo com que o grid de icones e outros campos fiquem cortados ou invisiveis.

### Solucao

**Arquivo: `src/pages/MyPage.tsx`**

Adicionar scroll interno ao `DialogContent` para que todo o conteudo seja acessivel no mobile:

- Envolver o conteudo do dialog com `ScrollArea` (componente ja existente no projeto) ou aplicar `max-h-[80vh] overflow-y-auto` no container interno
- Ajustar o `DialogContent` para ter altura maxima de `90vh` no mobile
- Garantir que o grid de presets e todos os campos fiquem dentro da area com scroll

### Detalhes tecnicos

1. No `DialogContent`, adicionar classes `max-h-[90vh] overflow-hidden` para limitar a altura
2. Envolver o `div.space-y-4` interno com um container scrollavel: `max-h-[calc(90vh-80px)] overflow-y-auto pr-1`
3. Isso garante que o header do dialog fique fixo e o conteudo role normalmente
4. O `80px` desconta o espaco do header do dialog

### Resultado esperado

O usuario no mobile conseguira rolar o conteudo do dialog, vendo o grid completo de icones, os campos de nome/URL, o seletor de cor, o preview e o botao de salvar.

