# Catálogo Digital RN

Catálogo (ou cardápio) digital para comércio local, feito com React Native. O cliente navega pelos produtos, monta o pedido e envia tudo pronto pelo WhatsApp do estabelecimento.

## Demo online

**[devgdamasceno.github.io/catalogo-digital-rn](https://devgdamasceno.github.io/catalogo-digital-rn/)**

Versão web do app, publicada automaticamente no GitHub Pages a cada push na `main`. Para a melhor experiência, abra no celular ou reduza a largura da janela do navegador. O número do WhatsApp da demo é fictício.

## Funcionalidades

- Lista de produtos com foto, descrição e preço em R$
- Filtro por categorias
- Busca por nome ou descrição (ignora acentos e maiúsculas)
- Tela de detalhe do produto, com escolha de quantidade
- Carrinho com ajuste de quantidades e total
- Carrinho salvo no aparelho: o pedido não se perde ao fechar o app
- Pedido enviado pelo WhatsApp, com mensagem pronta (itens, total e observações)
- Modo escuro, que segue o tema do sistema e guarda a escolha do usuário

## Tecnologias

- [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- TypeScript
- AsyncStorage (persistência local)
- react-native-safe-area-context

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
git clone https://github.com/DevGDamasceno/catalogo-digital-rn.git
cd catalogo-digital-rn
npm install
npx expo start
```

Depois, escolha como visualizar:

- **Celular:** instale o app **Expo Go** e escaneie o QR code exibido no terminal (celular e computador na mesma rede Wi-Fi).
- **Navegador:** pressione `w` no terminal.

## Personalizando para um comércio real

- **Nome da loja e WhatsApp:** edite `src/config.ts`. O número deve ter DDI e DDD, só dígitos (ex.: `5511999999999`).
- **Produtos:** edite `src/data/products.ts` (nome, descrição, preço, categoria e foto).

## Estrutura

```
App.tsx                      tela principal
src/
  config.ts                  nome da loja e número do WhatsApp
  types.ts                   tipos (Product, CartItem)
  utils.ts                   preço, busca e mensagem do pedido
  storage.ts                 leitura e gravação no AsyncStorage
  theme.tsx                  cores claras/escuras e contexto de tema
  data/products.ts           lista de produtos
  hooks/useCart.ts           lógica do carrinho
  components/                ProductCard, CategoryChips, ProductModal, CartModal
```

## Próximos passos

- Navegação com Expo Router
- Backend (Supabase ou Firebase) para o lojista editar os produtos
- Testes das funções utilitárias
- Build publicado com EAS

## Licença

Veja o arquivo [LICENSE](LICENSE).
