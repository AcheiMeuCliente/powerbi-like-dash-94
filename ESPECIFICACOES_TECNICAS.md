
# 🔧 Especificações Técnicas Detalhadas

## 📊 Interfaces TypeScript Completas

### Empresa (45 campos)
```typescript
interface Empresa {
  // Identificação Básica
  cnpj: string;                    // "25.972.870/0001-04"
  razao_social: string;            // "EMPRESA EXEMPLO LTDA"
  nome_fantasia?: string;          // "Casa & Lar" (opcional)
  situacao: string;                // "ATIVA" | "SUSPENSA" | "BAIXADA"
  
  // Classificação Empresarial
  cnae_principal_codigo: string;   // "47.57-4/01"
  cnae_principal_nome: string;     // "COMERCIO VAREJISTA DE..."
  cnae_secundario?: string[];      // Array de CNAEs secundários
  porte: string;                   // "MEI" | "ME" | "EPP" | "GRANDE"
  matriz_filial: string;           // "MATRIZ" | "FILIAL"
  natureza_juridica: string;       // "206-2"
  descricao_natureza_juridica: string; // "SOCIEDADE EMPRESÁRIA LIMITADA"
  
  // Endereço Completo
  logradouro: string;              // "RUA DAS FLORES"
  numero: string;                  // "123"
  complemento?: string;            // "SALA 101" (opcional)
  bairro: string;                  // "CENTRO"
  municipio: string;               // "SÃO PAULO"
  estado: string;                  // "SP"
  cep: string;                     // "01234-567"
  
  // Contato
  email?: string;                  // "contato@empresa.com.br"
  telefones?: string;              // "11999887766"
  telefone_fixo?: string;          // "1133334444"
  telefone_celular?: string;       // "11999887766"
  site?: string;                   // "https://empresa.com.br"
  
  // Dados Tributários
  mei: boolean;                    // true/false
  simples: boolean;                // true/false
  capital_social: number;          // 50000.00
  data_opcao_simples?: string;     // "2020-01-01"
  data_opcao_mei?: string;         // "2020-01-01"
  data_exclusao_simples?: string;  // "2023-12-31"
  
  // Datas Importantes
  inicio_atividade: string;        // "2020-01-15"
  atualizacao_cadastral: string;   // "2023-06-10"
  data_abertura: string;           // "2020-01-01"
  data_ultima_atualizacao: string; // "2023-12-15"
  
  // Dados Societários
  responsavel_federativo?: string; // "UNIÃO" | "ESTADO" | "MUNICÍPIO"
  faixa_etaria?: string;           // "0-5 ANOS" | "6-10 ANOS" | etc
  codigo_municipio: string;        // "3550308"
  tipo: string;                    // "EMPRESA" | "MEI"
  
  // Links Gerados Automaticamente
  maps: string;                    // Link Google Maps
  whatsapp_1?: string;             // Link WhatsApp formatado
  whatsapp_2?: string;             // WhatsApp alternativo
  receita_federal: string;         // Link Receita Federal
  
  // Dados Adicionais
  socios?: Socio[];                // Array de sócios (opcional)
  atividades_secundarias?: string[]; // CNAEs secundários
  inscricao_estadual?: string;     // "123.456.789.123"
  inscricao_municipal?: string;    // "987654321"
  situacao_especial?: string;      // Situação especial se houver
  data_situacao_especial?: string; // Data da situação especial
}

interface Socio {
  nome: string;
  cpf_cnpj: string;
  qualificacao: string;
  data_entrada: string;
  percentual_capital?: number;
}
```

### Filtros e Opções
```typescript
interface ActiveFilters {
  // Busca Global
  busca: string;
  
  // Arrays Multi-Seleção
  situacao: string[];              // ["ATIVA", "SUSPENSA"]
  cnae_principal: string[];        // ["47.57-4/01", "62.01-5/00"]
  estado: string[];                // ["SP", "RJ", "MG"]
  municipio: string[];             // ["SÃO PAULO", "RIO DE JANEIRO"]
  porte: string[];                 // ["ME", "EPP"]
  matriz_filial: string[];         // ["MATRIZ", "FILIAL"]
  tipo: string[];                  // ["EMPRESA", "MEI"]
  
  // Booleanos
  mei: boolean[];                  // [true] ou [false] ou []
  simples: boolean[];              // [true] ou [false] ou []
  
  // Ranges Numéricos
  capital_social_min?: number;     // 1000
  capital_social_max?: number;     // 100000
  
  // Ranges de Data
  data_inicio_min?: string;        // "2020-01-01"
  data_inicio_max?: string;        // "2023-12-31"
  data_atualizacao_min?: string;   // "2023-01-01"
  data_atualizacao_max?: string;   // "2023-12-31"
}

interface FilterOptions {
  situacao: string[];
  cnae_principal: CnaeOption[];
  estado: string[];
  municipio: string[];
  porte: string[];
  matriz_filial: string[];
  tipo: string[];
  mei: boolean[];
  simples: boolean[];
}

interface CnaeOption {
  codigo: string;                  // "47.57-4/01"
  nome: string;                    // "COMERCIO VAREJISTA DE..."
  grupo?: string;                  // "COMÉRCIO"
}

interface SavedFilter {
  id: string;
  name: string;
  filters: ActiveFilters;
  createdAt: string;
  description?: string;
}

interface FilterHistory {
  id: string;
  filters: ActiveFilters;
  appliedAt: string;
  resultsCount: number;
}
```

## 🎨 Props dos Componentes

### AdvancedFilters
```typescript
interface AdvancedFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  onSaveFilters: () => void;
  onResetFilters: () => void;
  onExportResults?: () => void;
  resultsCount?: number;
  isLoading?: boolean;
  className?: string;
}
```

### AdvancedFilterDropdown
```typescript
interface AdvancedFilterDropdownProps<T = any> {
  label: string;
  options: T[];
  selectedValues: T[];
  onSelectionChange: (values: T[]) => void;
  displayProperty?: keyof T | ((item: T) => string);
  valueProperty?: keyof T;
  placeholder?: string;
  tooltip?: string;
  isSearchable?: boolean;
  maxDisplayItems?: number;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}
```

### EmpresasTable
```typescript
interface EmpresasTableProps {
  empresas: Empresa[];
  isLoading?: boolean;
  onEmpresaSelect?: (empresa: Empresa) => void;
  onSort?: (field: keyof Empresa, direction: 'asc' | 'desc') => void;
  sortField?: keyof Empresa;
  sortDirection?: 'asc' | 'desc';
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
  className?: string;
}
```

### EmpresaDetailsDialog
```typescript
interface EmpresaDetailsDialogProps {
  empresa: Empresa | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionClick?: (action: string, empresa: Empresa) => void;
}
```

## 🔄 Hooks Customizados

### useEmpresaFilters
```typescript
interface UseEmpresaFiltersReturn {
  filteredEmpresas: Empresa[];
  activeFilters: ActiveFilters;
  filterOptions: FilterOptions;
  isLoading: boolean;
  resultsCount: number;
  updateFilter: <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => void;
  resetFilters: () => void;
  saveFilters: (name: string) => void;
  loadSavedFilter: (filterId: string) => void;
  exportResults: () => void;
}

const useEmpresaFilters = (empresas: Empresa[]): UseEmpresaFiltersReturn => {
  // Implementação completa do hook
};
```

### useLocalStorage
```typescript
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};
```

## 🎯 Funções Utilitárias

### Formatação
```typescript
// Formatação de CNPJ
const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

// Formatação de telefone
const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  return phone;
};

// Formatação de moeda
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Formatação de data
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};
```

### Geração de Links
```typescript
const generateLinks = (empresa: Empresa) => {
  const endereco = `${empresa.logradouro}, ${empresa.numero}, ${empresa.bairro}, ${empresa.municipio} - ${empresa.estado}`;
  
  return {
    maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`,
    whatsapp: empresa.telefones ? 
      `https://wa.me/55${empresa.telefones.replace(/\D/g, '')}` : undefined,
    receitaFederal: `https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp?cnpj=${empresa.cnpj.replace(/\D/g, '')}`
  };
};
```

### Filtros Avançados
```typescript
const applyFilters = (empresas: Empresa[], filters: ActiveFilters): Empresa[] => {
  return empresas.filter(empresa => {
    // Busca Global
    if (filters.busca.trim()) {
      const searchTerm = filters.busca.toLowerCase().trim();
      const searchableText = [
        empresa.cnpj.replace(/\D/g, ''),
        empresa.razao_social,
        empresa.nome_fantasia || '',
        empresa.cnae_principal_nome
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) return false;
    }
    
    // Filtros de Array
    if (filters.situacao.length && !filters.situacao.includes(empresa.situacao)) return false;
    if (filters.estado.length && !filters.estado.includes(empresa.estado)) return false;
    if (filters.municipio.length && !filters.municipio.includes(empresa.municipio)) return false;
    if (filters.porte.length && !filters.porte.includes(empresa.porte)) return false;
    if (filters.matriz_filial.length && !filters.matriz_filial.includes(empresa.matriz_filial)) return false;
    if (filters.tipo.length && !filters.tipo.includes(empresa.tipo)) return false;
    
    // Filtros CNAE
    if (filters.cnae_principal.length && 
        !filters.cnae_principal.includes(empresa.cnae_principal_codigo)) return false;
    
    // Filtros Booleanos
    if (filters.mei.length && !filters.mei.includes(empresa.mei)) return false;
    if (filters.simples.length && !filters.simples.includes(empresa.simples)) return false;
    
    // Filtros de Range - Capital Social
    if (filters.capital_social_min && empresa.capital_social < filters.capital_social_min) return false;
    if (filters.capital_social_max && empresa.capital_social > filters.capital_social_max) return false;
    
    // Filtros de Range - Datas
    if (filters.data_inicio_min && empresa.inicio_atividade < filters.data_inicio_min) return false;
    if (filters.data_inicio_max && empresa.inicio_atividade > filters.data_inicio_max) return false;
    
    return true;
  });
};
```

## 📊 Configurações de Performance

### Memoização
```typescript
// Filtros com useMemo
const filteredEmpresas = useMemo(() => {
  return applyFilters(empresas, activeFilters);
}, [empresas, activeFilters]);

// Opções de filtro com useMemo
const filterOptions = useMemo(() => {
  return generateFilterOptions(empresas);
}, [empresas]);

// Callbacks com useCallback
const handleFilterChange = useCallback(<K extends keyof ActiveFilters>(
  key: K, 
  value: ActiveFilters[K]
) => {
  setActiveFilters(prev => ({ ...prev, [key]: value }));
}, []);
```

### Debounce para Busca
```typescript
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Uso no componente
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

## 🎨 Sistema de Cores e Estilos

### Paleta de Cores
```css
:root {
  /* Cores Principais */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  
  /* Textos */
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --text-tertiary: #6b7280;
  
  /* Bordas */
  --border-primary: #e5e7eb;
  --border-secondary: #d1d5db;
  
  /* Situações */
  --status-active-bg: #dcfce7;
  --status-active-text: #166534;
  --status-suspended-bg: #fef3c7;
  --status-suspended-text: #92400e;
  --status-inactive-bg: #fee2e2;
  --status-inactive-text: #991b1b;
}
```

### Classes Tailwind Padronizadas
```typescript
const styles = {
  // Botões
  button: {
    primary: "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
  },
  
  // Cards
  card: "bg-white rounded-lg border border-gray-200 shadow-sm",
  cardHeader: "px-6 py-4 border-b border-gray-200",
  cardContent: "px-6 py-4",
  
  // Inputs
  input: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
  
  // Badges
  badge: {
    ativa: "bg-green-100 text-green-800 border border-green-200",
    suspensa: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    baixada: "bg-red-100 text-red-800 border border-red-200"
  },
  
  // Ícones
  icon: {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6"
  }
};
```

Esta especificação técnica garante implementação precisa e consistente de todos os componentes do sistema.
