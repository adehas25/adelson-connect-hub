

## Seletor visual de icones para links

Atualmente, o usuario precisa digitar manualmente a classe do icone Font Awesome (ex: `fab fa-instagram`) ou fazer upload de uma logo. Vamos substituir isso por um grid visual de icones pre-definidos, otimizado para mobile, onde o usuario simplesmente toca no icone desejado.

### O que muda

**Arquivo: `src/components/admin/LinkForm.tsx`**

- Remover o campo de texto para digitar classe Font Awesome
- Remover o radio button "Font Awesome / Logo"
- Substituir por um grid visual com todos os icones populares de redes sociais e tipos de link
- Cada icone sera um botao com o logo SVG inline + nome embaixo
- O icone selecionado tera destaque visual (borda, escala)
- Manter a opcao "Logo personalizada" como ultimo item do grid (para upload de imagem custom)
- Ao selecionar um preset, preencher automaticamente o `icon`, `gradient` e `name` (o usuario pode editar depois)
- Grid responsivo: 3 colunas no mobile, 4 no desktop

**Arquivo: `src/components/admin/LinkPresets.tsx` (novo)**

- Componente com a lista de presets de links populares:
  - WhatsApp, Instagram, Facebook, TikTok, YouTube, X/Twitter, LinkedIn, GitHub, Telegram, Spotify, Pinterest, Snapchat, Discord, Twitch, E-mail, Telefone, Website, Notion, OneDrive, Google Drive, Curriculo Lattes, E-book/Livro
- Cada preset contem: nome, icone (classe Font Awesome), gradiente padrao
- Ultimo item: "Personalizado" para upload de logo propria

### Detalhes tecnicos

- O componente `LinkPresets` recebe `onSelect(preset)` como callback
- Quando o usuario seleciona um preset, o formulario preenche `name`, `icon`, `gradient` automaticamente
- O campo de nome e URL continuam editaveis
- O campo de gradiente continua disponivel para personalizacao
- Layout do grid usa CSS grid com `grid-cols-3 md:grid-cols-4 gap-3`
- Cada item do grid tem ~64px de altura, icone centralizado + label pequeno
- Item selecionado: `ring-2 ring-primary scale-105`
- Scroll vertical no mobile se necessario, com max-height e overflow-y-auto
- A opcao "Personalizado" abre o componente `ImageUpload` existente

### Fluxo do usuario

1. Clica em "Novo Link"
2. Ve o grid de icones populares
3. Toca no icone desejado (ex: Instagram)
4. Nome, icone e cor sao preenchidos automaticamente
5. Digita apenas a URL
6. Salva

