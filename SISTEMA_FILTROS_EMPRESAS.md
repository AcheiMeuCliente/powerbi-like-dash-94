
# Sistema de Filtros Avançados e Tabela de Empresas - Documentação Completa

## 📋 Visão Geral
Sistema completo de filtros avançados estilo Power BI com tabela de empresas moderna, popup de detalhes e funcionalidades avançadas de busca e visualização.

## 🏗️ Arquitetura do Sistema

### Estrutura de Pastas
```
src/
├── components/
│   ├── ui/                    # Componentes base (shadcn/ui)
│   ├── AdvancedFilters.tsx    # Painel principal de filtros
│   ├── AdvancedFilterDropdown.tsx # Dropdowns multi-seleção
│   ├── FilterTag.tsx          # Tags removíveis
│   ├── SaveFilterModal.tsx    # Modal para salvar filtros
│   ├── EmpresasTable.tsx      # Tabela principal
│   └── EmpresaDetailsDialog.tsx # Popup de detalhes
├── types/
│   └── empresa.ts             # Definições de tipos
├── data/
│   └── mockEmpresas.ts        # Dados mockados
└── pages/
    └── Index.tsx              # Página principal
```

### Dependências Necessárias
```json
{
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-sheet": "^1.1.0",
  "@radix-ui/react-collapsible": "^1.1.0",
  "@radix-ui/react-separator": "^1.1.0",
  "lucide-react": "^0.462.0",
  "tailwindcss": "latest",
  "@tanstack/react-query": "^5.56.2"
}
```

## 📊 Modelo de Dados

### Interface Principal - Empresa
```typescript
interface Empresa {
  // Identificação
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  situacao: string;
  
  // Classificação
  cnae_principal_codigo: string;
  cnae_principal_nome: string;
  porte: string;
  matriz_filial: string;
  
  // Localização
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipio: string;
  estado: string;
  cep: string;
  
  // Contato
  email?: string;
  telefones?: string;
  site?: string;
  
  // Tributário
  mei: boolean;
  simples: boolean;
  capital_social: number;
  
  // Datas
  inicio_atividade: string;
  atualizacao_cadastral: string;
  data_opcao_simples?: string;
  data_opcao_mei?: string;
  
  // Links gerados
  maps: string;
  whatsapp_1?: string;
  receita_federal: string;
}
```

### Interface de Filtros
```typescript
interface ActiveFilters {
  busca: string;
  situacao: string[];
  cnae_principal: string[];
  estado: string[];
  municipio: string[];
  porte: string[];
  mei: boolean[];
  simples: boolean[];
  matriz_filial: string[];
  tipo: string[];
  capital_social_min?: number;
  capital_social_max?: number;
  data_inicio_min?: string;
  data_inicio_max?: string;
}
```

## 🎨 Componentes Principais

### 1. AdvancedFilters (Painel Principal)

#### Funcionalidades Principais:
- **Painel Lateral Retrátil**: Sheet component do Radix UI
- **6 Seções Organizadas**: Colapsíveis com ícones
- **Busca Global**: Campo de texto no topo
- **Tags Removíveis**: Cada filtro aplicado vira tag
- **Salvamento de Filtros**: Modal para nomear e salvar
- **Histórico**: Últimos 10 filtros aplicados
- **Exportação**: Botão para exportar resultados

#### Seções de Filtros:
1. **Identificação & Situação** (Tag icon)
   - Situação: Ativa, Suspensa, Baixada
   - Tipo: Empresa, MEI
   - Matriz/Filial: Matriz, Filial
   - Porte: MEI, ME, EPP, Grande

2. **Classificação CNAE** (Filter icon)
   - CNAE Principal: Multi-select com busca

3. **Localização** (MapPin icon)
   - Estado: Dropdown simples
   - Município: Filtro cascata (baseado no estado)

4. **Situação Tributária** (DollarSign icon)
   - MEI: Sim/Não
   - Simples Nacional: Sim/Não

5. **Dados Financeiros** (DollarSign icon)
   - Capital Social: Range (min/max)

6. **Datas** (Calendar icon)
   - Data Início Atividade: Range (min/max)

#### Estados e Props:
```typescript
interface AdvancedFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  onSaveFilters: () => void;
  onResetFilters: () => void;
  onExportResults?: () => void;
  resultsCount?: number;
}
```

### 2. AdvancedFilterDropdown (Multi-Seleção)

#### Funcionalidades:
- **Busca Interna**: Campo de pesquisa no dropdown
- **Multi-Seleção**: Checkboxes para cada opção
- **Contador**: Mostra quantos itens selecionados
- **Tooltip**: Informações sobre o filtro
- **Lazy Loading**: Para grandes listas

#### Props Principais:
```typescript
interface AdvancedFilterDropdownProps {
  label: string;
  options: any[];
  selectedValues: any[];
  onSelectionChange: (values: any[]) => void;
  displayProperty?: string;
  valueProperty?: string;
  placeholder?: string;
  tooltip?: string;
  isSearchable?: boolean;
}
```

### 3. EmpresasTable (Tabela Principal)

#### Colunas e Funcionalidades:
1. **CNPJ**: Formatado com máscara
2. **Empresa**: Razão Social + Nome Fantasia
3. **CNAE**: Código + Nome (tooltip com nome completo)
4. **Localização**: Município/Estado
5. **Ações**: Ícones clicáveis

#### Ícones de Ação (com tooltips):
- **Telefone** (Phone): `tel:${telefone}` - Cor padrão
- **Email** (Mail): `mailto:${email}` - Cor padrão  
- **WhatsApp** (Phone): Link direto - Verde (#22c55e)
- **Website** (Globe): Link externo - Azul
- **Mapa** (MapPin): Google Maps - Cor padrão
- **Detalhes** (Eye): Abre popup - Azul
- **Receita Federal** (ExternalLink): Link oficial - Cor padrão

#### Funcionalidades da Tabela:
- **Ordenação**: Clique no header para ordenar
- **Paginação**: 10, 25, 50, 100 itens por página
- **Loading States**: Skeleton durante carregamento
- **Responsividade**: Scroll horizontal em mobile
- **Hover Effects**: Destaque da linha

### 4. EmpresaDetailsDialog (Popup de Detalhes)

#### Layout - Cards Organizados:
1. **Identificação** (Hash icon)
   - CNPJ, Razão Social, Nome Fantasia, Situação

2. **Contato** (Phone icon)
   - Email, Telefone, WhatsApp, Website
   - Botões de ação para cada contato

3. **Endereço** (MapPin icon)
   - Endereço completo formatado
   - Botão "Ver no Mapa"

4. **Atividade Econômica** (FileText icon)
   - CNAE Principal, Porte, Natureza Jurídica

5. **Informações Financeiras** (DollarSign icon)
   - Capital Social formatado em R$
   - Badges: MEI, Simples, Matriz/Filial

6. **Datas Importantes** (Calendar icon)
   - Início Atividade, Última Atualização
   - Opções MEI/Simples (se aplicável)

#### Formatações e Estilos:
- **Moeda**: `Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})`
- **Data**: `new Date().toLocaleDateString('pt-BR')`
- **Badges Situação**:
  - Ativa: bg-green-100 text-green-800
  - Suspensa: bg-yellow-100 text-yellow-800
  - Baixada: bg-red-100 text-red-800

## 🔧 Implementação Técnica

### 1. Gerenciamento de Estado
```typescript
// Estado principal na página Index
const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
  busca: '',
  situacao: [],
  cnae_principal: [],
  // ... outros filtros
});

const [empresas, setEmpresas] = useState<Empresa[]>([]);
const [filteredEmpresas, setFilteredEmpresas] = useState<Empresa[]>([]);
```

### 2. Lógica de Filtros
```typescript
// Aplicação de filtros com useMemo para performance
const filteredEmpresas = useMemo(() => {
  return empresas.filter(empresa => {
    // Busca global
    if (activeFilters.busca) {
      const searchTerm = activeFilters.busca.toLowerCase();
      const searchIn = [
        empresa.cnpj,
        empresa.razao_social,
        empresa.nome_fantasia || ''
      ].join(' ').toLowerCase();
      
      if (!searchIn.includes(searchTerm)) return false;
    }
    
    // Filtros específicos
    if (activeFilters.situacao.length && 
        !activeFilters.situacao.includes(empresa.situacao)) return false;
    
    // ... outros filtros
    
    return true;
  });
}, [empresas, activeFilters]);
```

### 3. Persistência LocalStorage
```typescript
// Salvamento de filtros
const handleSaveFilter = (name: string) => {
  const newSavedFilter: SavedFilter = {
    id: Date.now().toString(),
    name,
    filters: { ...activeFilters },
    createdAt: new Date().toISOString()
  };
  
  const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
  savedFilters.push(newSavedFilter);
  localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
};

// Histórico de filtros
const addToHistory = (filters: ActiveFilters) => {
  const historyEntry: FilterHistory = {
    id: Date.now().toString(),
    filters,
    appliedAt: new Date().toISOString(),
    resultsCount: filteredEmpresas.length
  };
  
  const history = JSON.parse(localStorage.getItem('filterHistory') || '[]');
  const newHistory = [historyEntry, ...history.slice(0, 9)];
  localStorage.setItem('filterHistory', JSON.stringify(newHistory));
};
```

## 🎯 Funcionalidades Avançadas

### 1. Filtros Cascata
- Estado selecionado → filtra municípios disponíveis
- CNAE selecionado → filtra empresas relacionadas

### 2. Busca Inteligente
- Busca em CNPJ (com e sem formatação)
- Busca em razão social e nome fantasia
- Busca case-insensitive com normalização

### 3. Tags Removíveis
- Cada filtro aplicado vira uma tag
- Clique no X para remover filtro específico
- Botão "Limpar Todos" para reset completo

### 4. Feedback Visual
- Loading states em todos os componentes
- Estados disabled quando apropriado
- Animações suaves com Tailwind
- Contadores dinâmicos

## 📱 Responsividade

### Breakpoints:
- **Mobile**: < 640px - Layout stack, sheet full-width
- **Tablet**: 640px - 1024px - Ajustes de espaçamento
- **Desktop**: > 1024px - Layout completo

### Ajustes Mobile:
- Tabela com scroll horizontal
- Painel de filtros ocupa tela inteira
- Botões maiores para touch
- Cards empilhados no popup

## ♿ Acessibilidade

### Implementado:
- Labels apropriados em todos os inputs
- Navegação por teclado
- ARIA labels descritivos
- Contraste adequado nas cores
- Focus visible em todos os elementos

### Teclas de Atalho:
- `Escape`: Fecha modals/sheets
- `Enter`: Confirma ações
- `Tab/Shift+Tab`: Navegação

## 🚀 Performance

### Otimizações:
- `useMemo` para filtros pesados
- `useCallback` para handlers
- Lazy loading em dropdowns grandes
- Paginação para tabelas grandes
- Debounce em campos de busca

## 🧪 Testes Recomendados

### Cenários de Teste:
1. **Filtros**: Aplicar/remover filtros individualmente
2. **Busca**: Testar busca global com diferentes termos
3. **Persistência**: Salvar/carregar filtros salvos
4. **Responsividade**: Testar em diferentes tamanhos
5. **Performance**: Testar com muitos dados
6. **Acessibilidade**: Navegação por teclado

## 📋 Checklist de Implementação

### Preparação:
- [ ] Instalar dependências necessárias
- [ ] Configurar Tailwind CSS
- [ ] Configurar componentes shadcn/ui

### Componentes Base:
- [ ] Criar tipos TypeScript
- [ ] Implementar AdvancedFilterDropdown
- [ ] Implementar FilterTag
- [ ] Implementar SaveFilterModal

### Componentes Principais:
- [ ] Implementar AdvancedFilters
- [ ] Implementar EmpresasTable
- [ ] Implementar EmpresaDetailsDialog

### Funcionalidades:
- [ ] Integrar filtros com tabela
- [ ] Implementar persistência
- [ ] Adicionar responsividade
- [ ] Testar acessibilidade

### Finalização:
- [ ] Otimizar performance
- [ ] Adicionar loading states
- [ ] Testar em diferentes browsers
- [ ] Documentar componente

## 🎨 Paleta de Cores

```css
/* Cores principais */
--primary: #3b82f6;      /* Azul principal */
--success: #22c55e;      /* Verde WhatsApp */
--warning: #f59e0b;      /* Amarelo avisos */
--error: #ef4444;        /* Vermelho erros */
--gray-50: #f9fafb;      /* Background suave */
--gray-100: #f3f4f6;     /* Background cards */
--gray-600: #4b5563;     /* Texto secundário */
--gray-800: #1f2937;     /* Texto principal */
```

Esta documentação garante que qualquer desenvolvedor ou IA possa implementar o sistema **EXATAMENTE** como foi criado, mantendo todas as funcionalidades, estilos e comportamentos.
