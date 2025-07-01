import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  X, 
  Download,
  History,
  Trash2,
  Search,
  Calendar,
  DollarSign,
  Tag,
  Settings,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AdvancedFilterDropdown from './AdvancedFilterDropdown';
import FilterTag from './FilterTag';
import SaveFilterModal from './SaveFilterModal';
import { FilterOptions, ActiveFilters, SavedFilter, FilterHistory } from '@/types/empresa';

interface AdvancedFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  onSaveFilters: () => void;
  onResetFilters: () => void;
  onExportResults?: () => void;
  resultsCount?: number;
}

const AdvancedFilters = ({
  filterOptions,
  activeFilters,
  onFiltersChange,
  onSaveFilters,
  onResetFilters,
  onExportResults,
  resultsCount = 0
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    identification: true,
    classification: true,
    location: true,
    tax: true,
    dates: false,
    financial: false
  });
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [filterHistory, setFilterHistory] = useState<FilterHistory[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Carregar filtros salvos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedFilters');
    if (saved) {
      setSavedFilters(JSON.parse(saved));
    }
    
    const history = localStorage.getItem('filterHistory');
    if (history) {
      setFilterHistory(JSON.parse(history));
    }
  }, []);

  const updateFilter = <K extends keyof ActiveFilters>(
    key: K,
    value: ActiveFilters[K]
  ) => {
    const newFilters = {
      ...activeFilters,
      [key]: value
    };
    onFiltersChange(newFilters);
    
    // Adicionar ao histórico
    addToHistory(newFilters);
  };

  const addToHistory = (filters: ActiveFilters) => {
    const historyEntry: FilterHistory = {
      id: Date.now().toString(),
      filters,
      appliedAt: new Date().toISOString(),
      resultsCount
    };
    
    const newHistory = [historyEntry, ...filterHistory.slice(0, 9)]; // Manter apenas 10 entradas
    setFilterHistory(newHistory);
    localStorage.setItem('filterHistory', JSON.stringify(newHistory));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getTotalActiveFilters = () => {
    return Object.entries(activeFilters).reduce((count, [key, value]) => {
      if (key === 'busca' && typeof value === 'string' && value.length > 0) return count + 1;
      if (Array.isArray(value) && value.length > 0) return count + value.length;
      if (typeof value === 'number' && value > 0) return count + 1;
      return count;
    }, 0);
  };

  const getActiveFilterTags = () => {
    const tags: Array<{label: string, value: string, key: string, index?: number}> = [];
    
    // Busca global
    if (activeFilters.busca) {
      tags.push({ label: 'Busca', value: activeFilters.busca, key: 'busca' });
    }
    
    // Arrays de filtros
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach((value, index) => {
          const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
          tags.push({ 
            label: key.replace('_', ' ').toUpperCase(), 
            value: displayValue.length > 20 ? displayValue.substring(0, 20) + '...' : displayValue, 
            key, 
            index 
          });
        });
      }
    });
    
    return tags;
  };

  const removeFilterTag = (tagKey: string, index?: number) => {
    if (tagKey === 'busca') {
      updateFilter('busca', '');
    } else if (index !== undefined) {
      const currentValues = activeFilters[tagKey as keyof ActiveFilters] as any[];
      const newValues = currentValues.filter((_, i) => i !== index);
      updateFilter(tagKey as keyof ActiveFilters, newValues as any);
    }
  };

  const handleSaveFilter = (name: string) => {
    const newSavedFilter: SavedFilter = {
      id: Date.now().toString(),
      name,
      filters: { ...activeFilters },
      createdAt: new Date().toISOString()
    };
    
    const newSavedFilters = [...savedFilters, newSavedFilter];
    setSavedFilters(newSavedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(newSavedFilters));
    setShowSaveModal(false);
  };

  const applySavedFilter = (savedFilter: SavedFilter) => {
    onFiltersChange(savedFilter.filters);
    addToHistory(savedFilter.filters);
  };

  const deleteSavedFilter = (filterId: string) => {
    const newSavedFilters = savedFilters.filter(f => f.id !== filterId);
    setSavedFilters(newSavedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(newSavedFilters));
  };

  const applyHistoryFilter = (historyEntry: FilterHistory) => {
    onFiltersChange(historyEntry.filters);
  };

  const handleApplyFilters = async () => {
    setIsApplying(true);
    // Simular delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 500));
    onSaveFilters();
    setIsApplying(false);
  };

  const totalActiveFilters = getTotalActiveFilters();
  const activeTags = getActiveFilterTags();

  const FilterSection = ({ 
    title, 
    section, 
    children, 
    icon: Icon,
    description,
    iconColor
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
    icon: any;
    description: string;
    iconColor: string;
  }) => (
    <Collapsible
      open={expandedSections[section]}
      onOpenChange={() => toggleSection(section)}
    >
      <CollapsibleTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-semibold text-gray-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 rounded-lg border border-transparent hover:border-indigo-200"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${iconColor}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm uppercase tracking-wide font-bold">{title}</span>
                </div>
                {expandedSections[section] ? 
                  <ChevronDown className="h-5 w-5 text-indigo-500" /> : 
                  <ChevronRight className="h-5 w-5 text-indigo-500" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-6 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <TooltipProvider>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200" size="lg">
            <Filter className="h-5 w-5" />
            <span className="hidden sm:inline">Filtros Avançados</span>
            <span className="sm:hidden">Filtros</span>
            {totalActiveFilters > 0 && (
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 shadow-md animate-pulse">
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-full sm:max-w-lg lg:max-w-xl overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50">
          <SheetHeader className="space-y-4 pb-6 border-b border-indigo-200">
            <SheetTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
                Filtros Avançados
              </span>
            </SheetTitle>
            
            {/* Barra de ações melhorada */}
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onResetFilters}
                    disabled={totalActiveFilters === 0}
                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">Limpar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove todos os filtros aplicados</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSaveModal(true)}
                    disabled={totalActiveFilters === 0}
                    className="flex items-center gap-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span className="hidden sm:inline">Salvar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salva os filtros atuais para uso futuro</p>
                </TooltipContent>
              </Tooltip>
              
              {onExportResults && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onExportResults}
                      className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Exportar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exporta os resultados filtrados</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {/* Filtros Salvos com cores melhoradas */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Salvos</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {savedFilters.length}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 bg-white border-purple-200">
                  <DropdownMenuLabel>Filtros Salvos</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {savedFilters.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">Nenhum filtro salvo</div>
                  ) : (
                    savedFilters.map((savedFilter) => (
                      <DropdownMenuItem
                        key={savedFilter.id}
                        className="flex items-center justify-between p-2"
                      >
                        <button
                          onClick={() => applySavedFilter(savedFilter)}
                          className="flex-1 text-left truncate"
                        >
                          {savedFilter.name}
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedFilter(savedFilter.id);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Histórico com cores melhoradas */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200">
                    <History className="h-4 w-4" />
                    <span className="hidden sm:inline">Histórico</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 bg-white border-orange-200">
                  <DropdownMenuLabel>Histórico de Filtros</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filterHistory.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">Nenhum histórico</div>
                  ) : (
                    filterHistory.slice(0, 5).map((entry) => (
                      <DropdownMenuItem
                        key={entry.id}
                        onClick={() => applyHistoryFilter(entry)}
                        className="flex flex-col items-start p-3 cursor-pointer"
                      >
                        <div className="text-sm font-medium">
                          {new Date(entry.appliedAt).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {entry.resultsCount} resultados
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Tags de filtros ativos melhoradas */}
            {activeTags.length > 0 && (
              <div className="space-y-3 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Filtros Aplicados:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeTags.map((tag, index) => (
                    <FilterTag
                      key={`${tag.key}-${tag.index || 0}-${index}`}
                      label={tag.label}
                      value={tag.value}
                      onRemove={() => removeFilterTag(tag.key, tag.index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Busca Global melhorada */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-cyan-50 to-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">Busca Global</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-cyan-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Pesquise por CNPJ, nome da empresa ou razão social. A busca é inteligente e encontra resultados parciais.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Digite CNPJ, razão social ou nome fantasia..."
                  value={activeFilters.busca}
                  onChange={(e) => updateFilter('busca', e.target.value)}
                  className="h-12 border-2 border-cyan-200 focus:border-cyan-400 text-base"
                />
              </CardContent>
            </Card>

            {/* Seções de Filtros com cores vibrantes */}
            <div className="space-y-3">
              <FilterSection 
                title="Identificação & Situação" 
                section="identification" 
                icon={Tag}
                iconColor="bg-gradient-to-r from-emerald-500 to-teal-500"
                description="Filtre empresas por situação cadastral, tipo de empresa, se é matriz ou filial, e porte da empresa."
              >
                <div className="space-y-4">
                  <AdvancedFilterDropdown
                    label="Situação Cadastral"
                    options={filterOptions.situacao}
                    selectedValues={activeFilters.situacao}
                    onSelectionChange={(values) => updateFilter('situacao', values)}
                    tooltip="Situação da empresa na Receita Federal: Ativa (funcionando normalmente), Suspensa (com pendências) ou Baixada (encerrada)"
                  />
                  <AdvancedFilterDropdown
                    label="Tipo de Empresa"
                    options={filterOptions.tipo}
                    selectedValues={activeFilters.tipo}
                    onSelectionChange={(values) => updateFilter('tipo', values)}
                    tooltip="Classificação da empresa: Empresa Normal ou MEI (Microempreendedor Individual)"
                  />
                  <AdvancedFilterDropdown
                    label="Matriz ou Filial"
                    options={filterOptions.matriz_filial}
                    selectedValues={activeFilters.matriz_filial}
                    onSelectionChange={(values) => updateFilter('matriz_filial', values)}
                    tooltip="Matriz é a sede principal da empresa, Filial é uma unidade secundária"
                  />
                  <AdvancedFilterDropdown
                    label="Porte da Empresa"
                    options={filterOptions.porte}
                    selectedValues={activeFilters.porte}
                    onSelectionChange={(values) => updateFilter('porte', values)}
                    tooltip="Classificação por faturamento: MEI (até R$ 81mil/ano), ME (até R$ 360mil/ano), EPP (até R$ 4,8mi/ano), Grande (acima)"
                  />
                </div>
              </FilterSection>

              <Separator className="bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-px" />

              <FilterSection 
                title="Atividade Econômica" 
                section="classification" 
                icon={FileText}
                iconColor="bg-gradient-to-r from-violet-500 to-purple-500"
                description="Filtre por código CNAE - a atividade principal que a empresa está autorizada a exercer."
              >
                <AdvancedFilterDropdown
                  label="CNAE Principal"
                  options={filterOptions.cnae_principal}
                  selectedValues={activeFilters.cnae_principal.map(codigo => 
                    filterOptions.cnae_principal.find(c => c.codigo === codigo)
                  ).filter(Boolean)}
                  onSelectionChange={(values) => 
                    updateFilter('cnae_principal', values.map(v => v.codigo))
                  }
                  displayProperty="nome"
                  valueProperty="codigo"
                  placeholder="Buscar por código ou nome da atividade..."
                  tooltip="CNAE é o código que define a atividade principal da empresa (ex: 47.11-3 - Comércio varejista de mercadorias em geral)"
                />
              </FilterSection>

              <Separator className="bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-px" />

              <FilterSection 
                title="Localização" 
                section="location" 
                icon={MapPin}
                iconColor="bg-gradient-to-r from-rose-500 to-pink-500"
                description="Filtre empresas por estado e município onde estão localizadas."
              >
                <div className="space-y-4">
                  <AdvancedFilterDropdown
                    label="Estado (UF)"
                    options={filterOptions.estado}
                    selectedValues={activeFilters.estado}
                    onSelectionChange={(values) => updateFilter('estado', values)}
                    tooltip="Estado onde a empresa está registrada (ex: SP, RJ, MG, etc.)"
                  />
                  <AdvancedFilterDropdown
                    label="Município"
                    options={filterOptions.municipio}
                    selectedValues={activeFilters.municipio}
                    onSelectionChange={(values) => updateFilter('municipio', values)}
                    tooltip="Cidade onde a empresa está localizada. Selecione um estado primeiro para refinar a busca."
                  />
                </div>
              </FilterSection>

              <Separator className="bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-px" />

              <FilterSection 
                title="Regime Tributário" 
                section="tax" 
                icon={DollarSign}
                iconColor="bg-gradient-to-r from-amber-500 to-orange-500"
                description="Filtre por regime tributário: MEI ou Simples Nacional oferecem tributação simplificada."
              >
                <div className="space-y-4">
                  <AdvancedFilterDropdown
                    label="MEI (Microempreendedor)"
                    options={filterOptions.mei.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    selectedValues={activeFilters.mei.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    onSelectionChange={(values) => updateFilter('mei', values.map(v => v.value))}
                    displayProperty="label"
                    valueProperty="value"
                    isSearchable={false}
                    tooltip="MEI é um regime especial para faturamento até R$ 81mil/ano, com tributação muito baixa e processo simplificado"
                  />
                  <AdvancedFilterDropdown
                    label="Simples Nacional"
                    options={filterOptions.simples.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    selectedValues={activeFilters.simples.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    onSelectionChange={(values) => updateFilter('simples', values.map(v => v.value))}
                    displayProperty="label"
                    valueProperty="value"
                    isSearchable={false}
                    tooltip="Regime tributário simplificado para empresas com faturamento até R$ 4,8 milhões/ano, com menos burocracia"
                  />
                </div>
              </FilterSection>

              <Separator className="bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-px" />

              <FilterSection 
                title="Capital Social" 
                section="financial" 
                icon={DollarSign}
                iconColor="bg-gradient-to-r from-green-500 to-emerald-500"
                description="Filtre por valor do capital social - o valor investido inicialmente na empresa."
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-semibold text-gray-700">Faixa de Capital Social</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-green-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Capital Social é o valor que os sócios investiram na empresa. Indica o porte financeiro inicial do negócio.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Valor Mínimo (R$)</label>
                      <Input
                        type="number"
                        placeholder="Ex: 1000"
                        value={activeFilters.capital_social_min || ''}
                        onChange={(e) => updateFilter('capital_social_min', Number(e.target.value) || undefined)}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Valor Máximo (R$)</label>
                      <Input
                        type="number"
                        placeholder="Ex: 100000"
                        value={activeFilters.capital_social_max || ''}
                        onChange={(e) => updateFilter('capital_social_max', Number(e.target.value) || undefined)}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>

              <Separator className="bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-px" />

              <FilterSection 
                title="Período de Atividade" 
                section="dates" 
                icon={Calendar}
                iconColor="bg-gradient-to-r from-blue-500 to-indigo-500"
                description="Filtre por quando a empresa iniciou suas atividades - útil para encontrar empresas novas ou consolidadas."
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-semibold text-gray-700">Data de Início das Atividades</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-blue-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Data em que a empresa começou a operar oficialmente. Empresas mais antigas tendem a ser mais consolidadas no mercado.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Data Inicial</label>
                      <Input
                        type="date"
                        value={activeFilters.data_inicio_min || ''}
                        onChange={(e) => updateFilter('data_inicio_min', e.target.value || undefined)}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Data Final</label>
                      <Input
                        type="date"
                        value={activeFilters.data_inicio_max || ''}
                        onChange={(e) => updateFilter('data_inicio_max', e.target.value || undefined)}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>
            </div>

            {/* Botão de Aplicar Filtros melhorado */}
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent p-6 border-t border-indigo-200 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleApplyFilters}
                  disabled={isApplying}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12"
                >
                  {isApplying ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Filter className="h-5 w-5" />
                  )}
                  <span className="font-semibold">
                    Aplicar Filtros
                    {totalActiveFilters > 0 && ` (${totalActiveFilters})`}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 h-12 min-w-fit px-6"
                >
                  <Eye className="h-5 w-5" />
                  <span className="font-semibold">
                    {resultsCount.toLocaleString()} resultado{resultsCount !== 1 ? 's' : ''}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <SaveFilterModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveFilter}
      />
    </TooltipProvider>
  );
};

export default AdvancedFilters;
