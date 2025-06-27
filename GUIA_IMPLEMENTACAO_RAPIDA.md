
# 🚀 Guia de Implementação Rápida - Sistema de Filtros Empresas

## ⚡ Setup Inicial (5 minutos)

### 1. Dependências
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-sheet @radix-ui/react-collapsible @radix-ui/react-separator lucide-react @tanstack/react-query
```

### 2. Estrutura de Arquivos
```
src/
├── types/empresa.ts
├── data/mockEmpresas.ts
├── components/
│   ├── FilterTag.tsx
│   ├── SaveFilterModal.tsx
│   ├── AdvancedFilterDropdown.tsx
│   ├── AdvancedFilters.tsx
│   ├── EmpresasTable.tsx
│   └── EmpresaDetailsDialog.tsx
└── pages/Index.tsx
```

## 📝 Ordem de Implementação

### Passo 1: Tipos (empresa.ts)
```typescript
// 45 campos da interface Empresa
// Interfaces FilterOptions, ActiveFilters, SavedFilter, FilterHistory
```

### Passo 2: Dados Mock (mockEmpresas.ts)
```typescript
// Array com empresas de exemplo
// Função para gerar links (Maps, WhatsApp, Receita Federal)
```

### Passo 3: Componentes Auxiliares
1. **FilterTag.tsx** - Tags removíveis
2. **SaveFilterModal.tsx** - Modal para salvar filtros
3. **AdvancedFilterDropdown.tsx** - Dropdown multi-seleção

### Passo 4: Componentes Principais
1. **AdvancedFilters.tsx** - Painel de filtros (Sheet lateral)
2. **EmpresasTable.tsx** - Tabela com ícones clicáveis
3. **EmpresaDetailsDialog.tsx** - Popup de detalhes

### Passo 5: Página Principal (Index.tsx)
```typescript
// Estado dos filtros
// Lógica de filtros com useMemo
// Integração entre componentes
```

## 🔧 Funcionalidades Principais

### AdvancedFilters - Painel Lateral
- **Sheet retrátil** do lado esquerdo
- **6 seções colapsíveis** com ícones
- **Busca global** no topo
- **Tags removíveis** para filtros ativos
- **Botões**: Limpar, Salvar, Exportar, Histórico
- **Persistência** em localStorage

### EmpresasTable - Tabela Moderna
- **7 ícones clicáveis** com tooltips
- **Ordenação** por clique no header
- **Paginação** configurável
- **Estados de loading** com skeleton
- **Responsividade** com scroll horizontal

### EmpresaDetailsDialog - Popup Detalhes
- **6 cards organizados** por categoria
- **Formatação** de moeda, data, telefone
- **Badges coloridos** para situação
- **Botões de ação** integrados
- **Layout responsivo** em grid

## 🎨 Estilos Padronizados

### Cores dos Ícones:
- **Telefone/Email/Mapa**: text-gray-600
- **WhatsApp**: text-green-600
- **Website/Detalhes**: text-blue-600
- **Situação Ativa**: bg-green-100 text-green-800

### Tamanhos:
- **Ícones**: h-4 w-4 (16px)
- **Botões**: size="sm" para ações
- **Cards**: p-4 com space-y-3
- **Inputs**: h-10 padrão

## ⚙️ Estados e Lógica

### Estado Principal:
```typescript
const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
  busca: '',
  situacao: [],
  cnae_principal: [],
  // ... 12 filtros total
});
```

### Filtros Aplicados:
```typescript
const filteredEmpresas = useMemo(() => {
  return empresas.filter(empresa => {
    // Busca global
    // Filtros específicos por array
    // Filtros de range (datas, valores)
  });
}, [empresas, activeFilters]);
```

### Persistência:
```typescript
// Salvamento de filtros nomeados
localStorage.setItem('savedFilters', JSON.stringify(filters));

// Histórico automático (últimos 10)
localStorage.setItem('filterHistory', JSON.stringify(history));
```

## 📱 Responsividade

### Mobile (< 640px):
- Sheet ocupa tela inteira
- Tabela com scroll horizontal
- Cards empilhados verticalmente
- Botões maiores para touch

### Desktop (> 1024px):
- Sheet com largura fixa (max-w-lg)
- Tabela completa visível
- Grid 2 colunas no popup
- Hover effects ativos

## 🚨 Pontos Críticos

### Performance:
- **useMemo** obrigatório para filtros
- **Paginação** para +100 registros
- **Debounce** em campos de busca

### UX Essencial:
- **Loading states** em todos os componentes
- **Feedback visual** para ações
- **Tooltips** em ícones/filtros
- **Contadores** dinâmicos

### Acessibilidade:
- **aria-labels** em todos os botões
- **Navegação por teclado** funcional
- **Contraste** adequado nas cores
- **Focus visible** em elementos

## ✅ Checklist Final

### Funcional:
- [ ] Filtros aplicam/removem corretamente
- [ ] Busca global funciona
- [ ] Ícones abrem links corretos
- [ ] Popup abre com dados completos
- [ ] Persistência salva/carrega

### Visual:
- [ ] Responsivo em mobile/desktop
- [ ] Ícones com cores corretas
- [ ] Loading states implementados
- [ ] Hover effects funcionando
- [ ] Badges com cores adequadas

### Performance:
- [ ] Sem re-renders desnecessários
- [ ] Filtros respondem rapidamente
- [ ] Tabela carrega sem travamentos
- [ ] LocalStorage não sobrecarrega

Este guia permite implementar o sistema completo em **2-3 horas** seguindo a ordem e checklist fornecidos.
