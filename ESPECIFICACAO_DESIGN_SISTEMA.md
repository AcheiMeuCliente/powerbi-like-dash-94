
# 🎨 Especificação Técnica Detalhada do Design do Sistema de Filtros e Tabela de Empresas

## 📋 Visão Geral
Este documento detalha minuciosamente o design visual, cores, tipografia, espaçamentos, animações e todos os aspectos visuais do sistema de filtros avançados e tabela de empresas implementado. O objetivo é permitir que uma AI Builder (como Cursor AI) replique exatamente o mesmo design visual.

## 🎯 Identidade Visual Global

### Paleta de Cores Principal
```css
/* Cores Primárias do Sistema */
--primary-blue: #3b82f6;           /* Azul principal */
--primary-indigo: #6366f1;         /* Índigo complementar */
--primary-slate: #64748b;          /* Cinza neutro */

/* Gradientes Principais */
--gradient-blue: linear-gradient(135deg, #3b82f6, #6366f1);
--gradient-slate: linear-gradient(135deg, #f1f5f9, #e2e8f0);
--gradient-success: linear-gradient(135deg, #10b981, #059669);
--gradient-warning: linear-gradient(135deg, #f59e0b, #d97706);
--gradient-danger: linear-gradient(135deg, #ef4444, #dc2626);

/* Cores de Background */
--bg-primary: #ffffff;             /* Branco puro */
--bg-secondary: #f8fafc;           /* Cinza muito claro */
--bg-tertiary: #f1f5f9;            /* Cinza claro */
--bg-accent: #e0e7ff;              /* Azul muito claro */

/* Cores de Texto */
--text-primary: #1e293b;           /* Cinza escuro */
--text-secondary: #475569;         /* Cinza médio */
--text-muted: #64748b;             /* Cinza claro */
--text-accent: #3b82f6;            /* Azul para destaques */

/* Cores de Borda */
--border-light: #e2e8f0;           /* Bordas sutis */
--border-medium: #cbd5e1;          /* Bordas normais */
--border-strong: #94a3b8;          /* Bordas definidas */
--border-accent: #3b82f6;          /* Bordas de destaque */
```

### Sombras e Elevações
```css
/* Sistema de Sombras */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Sombras Coloridas */
--shadow-blue: 0 4px 14px 0 rgb(59 130 246 / 0.15);
--shadow-green: 0 4px 14px 0 rgb(16 185 129 / 0.15);
--shadow-purple: 0 4px 14px 0 rgb(139 92 246 / 0.15);
```

## 🎨 Design do Sistema de Filtros (AdvancedFilters)

### Layout e Estrutura
```typescript
// Arquivo: src/components/AdvancedFilters.tsx

/* Container Principal */
.filter-panel {
  width: 400px;                    /* Largura fixa em desktop */
  height: 100vh;                   /* Altura total da viewport */
  background: linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%);
  border-right: 2px solid #e2e8f0;
  box-shadow: var(--shadow-lg);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

/* Header do Painel */
.filter-header {
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  padding: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  box-shadow: var(--shadow-md);
}

.filter-title {
  font-size: 1.125rem;            /* 18px */
  font-weight: 700;               /* font-bold */
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Campo de Busca Global */
.search-container {
  padding: 1.5rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.search-input {
  width: 100%;
  height: 2.5rem;                 /* 40px */
  padding: 0 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;          /* 8px */
  font-size: 0.875rem;            /* 14px */
  transition: all 0.2s ease;
  background: #f8fafc;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
  background: white;
  outline: none;
}
```

### Seções de Filtros Colapsíveis
```typescript
/* Seções de Filtros */
.filter-section {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.filter-section:hover {
  background: linear-gradient(135deg, #f8fafc, #e0e7ff);
}

/* Headers das Seções */
.section-header {
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.section-header:hover {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;            /* 14px */
  font-weight: 600;               /* font-semibold */
  color: #1e293b;
}

.section-icon {
  width: 1rem;                    /* 16px */
  height: 1rem;                   /* 16px */
  color: #3b82f6;
}

/* Conteúdo das Seções */
.section-content {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.section-content.collapsed {
  display: none;
}
```

### Cores Específicas por Seção
```typescript
/* Seção 1: Identificação & Situação */
.section-identification {
  --section-color: #3b82f6;       /* Azul */
  --section-bg: #dbeafe;
  --section-border: #93c5fd;
}

/* Seção 2: Classificação CNAE */
.section-cnae {
  --section-color: #8b5cf6;       /* Roxo */
  --section-bg: #e9d5ff;
  --section-border: #c4b5fd;
}

/* Seção 3: Localização */
.section-location {
  --section-color: #10b981;       /* Verde */
  --section-bg: #d1fae5;
  --section-border: #6ee7b7;
}

/* Seção 4: Situação Tributária */
.section-tax {
  --section-color: #f59e0b;       /* Amarelo/Laranja */
  --section-bg: #fef3c7;
  --section-border: #fcd34d;
}

/* Seção 5: Dados Financeiros */
.section-financial {
  --section-color: #ef4444;       /* Vermelho */
  --section-bg: #fee2e2;
  --section-border: #fca5a5;
}

/* Seção 6: Datas */
.section-dates {
  --section-color: #6366f1;       /* Índigo */
  --section-bg: #e0e7ff;
  --section-border: #a5b4fc;
}
```

### Tags de Filtros Ativos
```typescript
/* Container de Tags */
.filter-tags-container {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f1f5f9, #e0e7ff);
  border-bottom: 2px solid #e2e8f0;
  min-height: 3rem;
}

.filter-tags-title {
  font-size: 0.75rem;             /* 12px */
  font-weight: 600;               /* font-semibold */
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

/* Tags Individuais */
.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  margin: 0.125rem;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  border-radius: 9999px;          /* fully rounded */
  font-size: 0.75rem;             /* 12px */
  font-weight: 500;               /* font-medium */
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.filter-tag:hover {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.filter-tag-remove {
  width: 0.875rem;                /* 14px */
  height: 0.875rem;               /* 14px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag-remove:hover {
  color: #fef2f2;
  transform: scale(1.1);
}
```

### Botões de Ação
```typescript
/* Container de Botões */
.action-buttons-container {
  padding: 1.5rem;
  background: white;
  border-top: 2px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Botão Primário (Aplicar Filtros) */
.btn-primary {
  width: 100%;
  height: 2.5rem;                 /* 40px */
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  border: none;
  border-radius: 0.5rem;          /* 8px */
  font-size: 0.875rem;            /* 14px */
  font-weight: 600;               /* font-semibold */
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

/* Botão Secundário (Limpar) */
.btn-secondary {
  width: 100%;
  height: 2.5rem;                 /* 40px */
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;          /* 8px */
  font-size: 0.875rem;            /* 14px */
  font-weight: 500;               /* font-medium */
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}

/* Botões Menores (Salvar, Histórico) */
.btn-small {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  height: 2rem;                   /* 32px */
  padding: 0 0.75rem;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;        /* 6px */
  font-size: 0.75rem;             /* 12px */
  font-weight: 500;               /* font-medium */
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-small:hover {
  background: #e0e7ff;
  color: #3b82f6;
  border-color: #c7d2fe;
}
```

## 📊 Design da Tabela de Empresas (EmpresasTable)

### Container Principal
```typescript
/* Card Container */
.table-card {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border: 2px solid #e0e7ff;
  border-radius: 0.75rem;         /* 12px */
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.table-card:hover {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  border-color: #c7d2fe;
}

/* Header da Tabela */
.table-header {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  padding: 1.5rem;
  border-bottom: 2px solid #c7d2fe;
  box-shadow: var(--shadow-sm);
}

.table-title {
  font-size: 1.25rem;             /* 20px */
  font-weight: 700;               /* font-bold */
  background: linear-gradient(135deg, #1e40af, #3730a3);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.results-counter {
  font-size: 0.875rem;            /* 14px */
  font-weight: 600;               /* font-semibold */
  color: #64748b;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;          /* fully rounded */
  border: 1px solid #c7d2fe;
  box-shadow: var(--shadow-md);
}
```

### Cabeçalhos da Tabela
```typescript
/* Headers Ordenáveis */
.table-header-cell {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;             /* 12px */
  font-weight: 600;               /* font-semibold */
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  background: linear-gradient(135deg, #f1f5f9, #e0e7ff);
  border-bottom: 2px solid #c7d2fe;
  transition: all 0.2s ease;
  user-select: none;
}

.table-header-cell:hover {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #1e293b;
}

.sort-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.sort-icon {
  width: 1rem;                    /* 16px */
  height: 1rem;                   /* 16px */
  color: #3b82f6;
}
```

### Linhas da Tabela
```typescript
/* Linhas de Dados */
.table-row {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.table-row:hover {
  background: linear-gradient(135deg, rgba(219, 234, 254, 0.3), rgba(224, 231, 255, 0.3));
  border-left-color: #3b82f6;
  transform: translateX(2px);
}

/* Células de Dados */
.table-cell {
  padding: 1rem;
  vertical-align: top;
  border-bottom: 1px solid #e0e7ff;
}

/* Célula CNPJ */
.cnpj-cell {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;            /* 14px */
  color: #475569;
  background: #f8fafc;
  font-weight: 500;
}

/* Célula Empresa (Razão Social + Nome Fantasia + Situação) */
.empresa-cell {
  max-width: 20rem;               /* 320px */
}

.razao-social {
  font-weight: 600;               /* font-semibold */
  color: #1e293b;
  font-size: 0.875rem;            /* 14px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nome-fantasia {
  font-size: 0.75rem;             /* 12px */
  color: #64748b;
  margin-top: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Badges de Situação */
.badge-ativa {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #166534;
  border: 1px solid #86efac;
  box-shadow: 0 1px 2px 0 rgb(22 101 52 / 0.05);
}

.badge-suspensa {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  border: 1px solid #fcd34d;
  box-shadow: 0 1px 2px 0 rgb(146 64 14 / 0.05);
}

.badge-baixada {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #991b1b;
  border: 1px solid #fca5a5;
  box-shadow: 0 1px 2px 0 rgb(153 27 27 / 0.05);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;        /* 6px */
  font-size: 0.75rem;             /* 12px */
  font-weight: 500;               /* font-medium */
  margin-top: 0.25rem;
}
```

### Colunas CNAE
```typescript
/* CNAE Principal */
.cnae-principal-cell {
  max-width: 20rem;               /* 320px */
}

.cnae-codigo {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.75rem;             /* 12px */
  color: #3b82f6;
  font-weight: 600;               /* font-semibold */
  margin-bottom: 0.125rem;
}

.cnae-nome {
  font-size: 0.875rem;            /* 14px */
  color: #475569;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* CNAE Secundário (Truncado com Tooltip) */
.cnae-secundario-cell {
  max-width: 20rem;               /* 320px */
  position: relative;
}

.cnae-secundario-truncated {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
  font-size: 0.875rem;            /* 14px */
  color: #64748b;
}

.cnae-secundario-truncated:hover {
  color: #3b82f6;
  text-decoration: underline;
}
```

### Badges de Tipo e Características
```typescript
/* Container de Badges */
.badges-container {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

/* Badge Matriz/Filial */
.badge-matriz-filial {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1d4ed8;
  border: 1px solid #93c5fd;
}

/* Badge MEI */
.badge-mei {
  background: linear-gradient(135deg, #ecfeff, #cffafe);
  color: #0e7490;
  border: 1px solid #67e8f9;
}

/* Badge Simples Nacional */
.badge-simples {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #166534;
  border: 1px solid #86efac;
}
```

### Ícones de Contato e Ações
```typescript
/* Container de Ícones */
.icons-container {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

/* Botões de Ícones */
.icon-button {
  width: 2rem;                    /* 32px */
  height: 2rem;                   /* 32px */
  padding: 0;
  border: none;
  border-radius: 9999px;          /* fully rounded */
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ícone Telefone */
.icon-phone {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1d4ed8;
}

.icon-phone:hover {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Ícone Email */
.icon-email {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
}

.icon-email:hover {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Ícone WhatsApp */
.icon-whatsapp {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #166534;
}

.icon-whatsapp:hover {
  background: linear-gradient(135deg, #bbf7d0, #86efac);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Ícone Website */
.icon-website {
  background: linear-gradient(135deg, #e9d5ff, #d8b4fe);
  color: #7c3aed;
}

.icon-website:hover {
  background: linear-gradient(135deg, #d8b4fe, #c4b5fd);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Ícone Ver Detalhes */
.icon-details {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #4338ca;
}

.icon-details:hover {
  background: linear-gradient(135deg, #c7d2fe, #a5b4fc);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Ícone Mapa */
.icon-map {
  background: linear-gradient(135deg, #fed7aa, #fdba74);
  color: #ea580c;
}

.icon-map:hover {
  background: linear-gradient(135deg, #fdba74, #fb923c);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Ícone Receita Federal */
.icon-receita {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  color: #64748b;
}

.icon-receita:hover {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
```

### Paginação
```typescript
/* Container de Paginação */
.pagination-container {
  background: linear-gradient(135deg, #f1f5f9, #e0e7ff);
  padding: 1rem;
  border-top: 2px solid #c7d2fe;
  display: flex;
  align-items: center;
  justify-content: between;
}

/* Informações de Paginação */
.pagination-info {
  font-size: 0.875rem;            /* 14px */
  font-weight: 500;               /* font-medium */
  color: #475569;
}

.pagination-numbers {
  font-weight: 700;               /* font-bold */
  color: #1d4ed8;
}

/* Botões de Paginação */
.pagination-button {
  height: 2rem;                   /* 32px */
  padding: 0 0.75rem;
  background: white;
  border: 1px solid #c7d2fe;
  color: #1d4ed8;
  font-size: 0.75rem;             /* 12px */
  font-weight: 500;               /* font-medium */
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
  background: #e0e7ff;
  border-color: #a5b4fc;
}

.pagination-button:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
}

.pagination-button.active {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  border-color: #3b82f6;
}
```

## 🏠 Design do Dashboard (Cards de Estatísticas)

### Layout dos Cards
```typescript
/* Grid de Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* Card Individual */
.stats-card {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;         /* 12px */
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.stats-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: #c7d2fe;
  transform: translateY(-2px);
}

/* Header do Card */
.stats-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.stats-title {
  font-size: 0.875rem;            /* 14px */
  font-weight: 500;               /* font-medium */
  color: #64748b;
}

.stats-icon {
  width: 1rem;                    /* 16px */
  height: 1rem;                   /* 16px */
  color: #94a3b8;
}

/* Valor Principal */
.stats-value {
  font-size: 2rem;                /* 32px */
  font-weight: 700;               /* font-bold */
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.25rem;
}

/* Texto Secundário */
.stats-subtitle {
  font-size: 0.75rem;             /* 12px */
  color: #94a3b8;
}
```

### Cards Específicos
```typescript
/* Card Total de Empresas */
.card-total {
  border-left: 4px solid #3b82f6;
  background: linear-gradient(135deg, #ffffff, #dbeafe);
}

.card-total .stats-value {
  color: #1d4ed8;
}

.card-total .stats-icon {
  color: #3b82f6;
}

/* Card Empresas Ativas */
.card-active {
  border-left: 4px solid #10b981;
  background: linear-gradient(135deg, #ffffff, #d1fae5);
}

.card-active .stats-value {
  color: #059669;
}

.card-active .stats-icon {
  color: #10b981;
}

/* Card MEI */
.card-mei {
  border-left: 4px solid #06b6d4;
  background: linear-gradient(135deg, #ffffff, #cffafe);
}

.card-mei .stats-value {
  color: #0891b2;
}

.card-mei .stats-icon {
  color: #06b6d4;
}

/* Card Simples Nacional */
.card-simples {
  border-left: 4px solid #8b5cf6;
  background: linear-gradient(135deg, #ffffff, #e9d5ff);
}

.card-simples .stats-value {
  color: #7c3aed;
}

.card-simples .stats-icon {
  color: #8b5cf6;
}
```

## 🔍 Design do Popup de Detalhes (EmpresaDetailsDialog)

### Container Principal
```typescript
/* Modal Container */
.details-modal {
  max-width: 64rem;               /* 1024px */
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #f1f5f9, #e0e7ff);
  border-radius: 1rem;            /* 16px */
  box-shadow: var(--shadow-2xl);
}

/* Header do Modal */
.details-header {
  padding: 1.5rem;
  border-bottom: 2px solid #e0e7ff;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
}

.details-title {
  font-size: 1.25rem;             /* 20px */
  font-weight: 700;               /* font-bold */
  background: linear-gradient(135deg, #1e40af, #3730a3);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.details-icon {
  width: 1.5rem;                  /* 24px */
  height: 1.5rem;                 /* 24px */
  color: #3b82f6;
}
```

### Grid de Cards
```typescript
/* Grid Layout */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

/* Cards Individuais */
.detail-card {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border-radius: 0.75rem;         /* 12px */
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all 0.3s ease;
}

.detail-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}
```

### Cards Específicos por Seção
```typescript
/* Card Identificação */
.card-identification {
  border: 2px solid #bfdbfe;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.card-identification .card-header {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-bottom: 2px solid #bfdbfe;
}

.card-identification .field-label {
  color: #1d4ed8;
  font-weight: 600;
}

/* Card Contato */
.card-contact {
  border: 2px solid #86efac;
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
}

.card-contact .card-header {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-bottom: 2px solid #86efac;
}

.card-contact .field-label {
  color: #059669;
  font-weight: 600;
}

/* Card Endereço */
.card-address {
  border: 2px solid #c4b5fd;
  background: linear-gradient(135deg, #e9d5ff, #d8b4fe);
}

.card-address .card-header {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border-bottom: 2px solid #c4b5fd;
}

.card-address .field-label {
  color: #7c3aed;
  font-weight: 600;
}

/* Card Atividade Econômica */
.card-activity {
  border: 2px solid #fcd34d;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.card-activity .card-header {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-bottom: 2px solid #fcd34d;
}

.card-activity .field-label {
  color: #d97706;
  font-weight: 600;
}

/* Card Informações Financeiras */
.card-financial {
  border: 2px solid #86efac;
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
}

.card-financial .card-header {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-bottom: 2px solid #86efac;
}

.card-financial .field-label {
  color: #059669;
  font-weight: 600;
}

/* Card Datas Importantes */
.card-dates {
  border: 2px solid #a5b4fc;
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
}

.card-dates .card-header {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border-bottom: 2px solid #a5b4fc;
}

.card-dates .field-label {
  color: #4f46e5;
  font-weight: 600;
}
```

### Elementos dos Cards
```typescript
/* Header dos Cards */
.card-header {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.125rem;            /* 18px */
  font-weight: 600;               /* font-semibold */
}

.card-icon {
  width: 1.25rem;                 /* 20px */
  height: 1.25rem;                /* 20px */
}

/* Conteúdo dos Cards */
.card-content {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Campos de Dados */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.field-label {
  font-size: 0.75rem;             /* 12px */
  font-weight: 600;               /* font-semibold */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field-value {
  font-size: 0.875rem;            /* 14px */
  color: #475569;
  font-weight: 500;               /* font-medium */
}

.field-value.large {
  font-size: 1.125rem;            /* 18px */
  font-weight: 600;               /* font-semibold */
}

.field-value.currency {
  color: #059669;
  font-weight: 700;               /* font-bold */
}

.field-value.highlight {
  color: #1e293b;
  font-weight: 600;               /* font-semibold */
}
```

### Botões de Ação nos Cards
```typescript
/* Botões de Ação */
.action-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;        /* 6px */
  font-size: 0.75rem;             /* 12px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.action-icon {
  width: 1rem;                    /* 16px */
  height: 1rem;                   /* 16px */
}
```

## 📱 Responsividade

### Breakpoints
```typescript
/* Mobile First Approach */
@media (max-width: 640px) {
  /* Mobile */
  .filter-panel { width: 100vw; }
  .details-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
  .table-card { font-size: 0.75rem; }
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablet */
  .filter-panel { width: 350px; }
  .details-grid { grid-template-columns: 1fr 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1025px) {
  /* Desktop */
  .filter-panel { width: 400px; }
  .details-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-grid { grid-template-columns: repeat(4, 1fr); }
}
```

## 🎭 Animações e Transições

### Transições Globais
```typescript
/* Transições Padrões */
.transition-fast { transition: all 0.15s ease; }
.transition-normal { transition: all 0.2s ease; }
.transition-slow { transition: all 0.3s ease; }

/* Animações de Hover */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

/* Animações de Loading */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animações de Entrada */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

## 🔧 Configurações de Tooltips

### Estilos de Tooltips
```typescript
/* Tooltip Container */
.tooltip {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;        /* 6px */
  font-size: 0.75rem;             /* 12px */
  font-weight: 500;               /* font-medium */
  max-width: 20rem;               /* 320px */
  z-index: 50;
  box-shadow: var(--shadow-lg);
}

.tooltip::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
}
```

## 📋 Checklist de Implementação

### Cores e Gradientes ✅
- [ ] Paleta de cores primárias definida
- [ ] Gradientes implementados
- [ ] Cores específicas por seção
- [ ] Sistema de cores consistente

### Layout e Estrutura ✅
- [ ] Grid responsivo implementado
- [ ] Containers com proporções corretas
- [ ] Espaçamentos padronizados
- [ ] Hierarquia visual clara

### Componentes Individuais ✅
- [ ] Filtros com cores temáticas
- [ ] Tabela com hover effects
- [ ] Cards com gradientes
- [ ] Botões com estados visuais

### Interatividade ✅
- [ ] Hover effects implementados
- [ ] Transições suaves
- [ ] Estados de loading
- [ ] Feedback visual

### Responsividade ✅
- [ ] Breakpoints definidos
- [ ] Layout adaptativo
- [ ] Elementos escaláveis
- [ ] Touch-friendly em mobile

Este documento fornece todas as especificações necessárias para replicar exatamente o design visual do sistema. Cada cor, espaçamento, animação e estado visual está detalhadamente documentado para garantir consistência na implementação.
