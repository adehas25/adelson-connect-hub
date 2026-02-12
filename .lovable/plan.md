

## Corrigir URL exibida nos perfis de usuario

O usuario quer que as URLs exibidas no app usem o dominio publicado (`allconnecthub.lovable.app`) em vez do dominio de preview.

### Mudancas

1. **`src/pages/Index.tsx`** - Na landing page, a URL de exemplo ja mostra `allconnect-hub.lovable.app/seuusername`. Atualizar para `allconnecthub.lovable.app/seuusername` (sem hifen, dominio correto publicado).

2. **`src/pages/UserProfile.tsx`** - No footer do perfil publico, onde mostra `@username`, adicionar a URL completa publicada: `allconnecthub.lovable.app/username`.

3. **`src/pages/MyPage.tsx`** - No dashboard do usuario, onde mostra o link do perfil, garantir que use `allconnecthub.lovable.app/username` como URL base em vez de `window.location.origin` (que no ambiente de dev retorna o dominio de preview).

### Detalhes tecnicos

- Definir uma constante `BASE_URL = "https://allconnecthub.lovable.app"` em um local centralizado ou inline nos componentes relevantes.
- Substituir qualquer uso de `window.location.origin` para construir URLs de perfil por essa constante.
- Atualizar o texto de exemplo na landing page de `allconnect-hub.lovable.app` para `allconnecthub.lovable.app`.

