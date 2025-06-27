
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
  EyeOff
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
    icon: Icon 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
    icon: any;
  }) => (
    <Collapsible
      open={expandedSections[section]}
      onOpenChange={() => toggleSection(section)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto font-semibold text-gray-800 hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-blue-600" />
            <span className="text-sm uppercase tracking-wide">{title}</span>
          </div>
          {expandedSections[section] ? 
            <ChevronDown className="h-4 w-4" /> : 
            <ChevronRight className="h-4 w-4" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4 space-y-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2" size="lg">
            <Filter className="h-5 w-5" />
            Filtros Avançados
            {totalActiveFilters > 0 && (
              <Badge className="bg-white text-blue-600 hover:bg-gray-50">
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="space-y-4">
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Filtros Avançados
            </SheetTitle>
            
            {/* Barra de ações */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onResetFilters}
                disabled={totalActiveFilters === 0}
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                Limpar Todos
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveModal(true)}
                disabled={totalActiveFilters === 0}
                className="flex items-center gap-1"
              >
                <Save className="h-4 w-4" />
                Salvar
              </Button>
              
              {onExportResults && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExportResults}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              )}
              
              {/* Filtros Salvos */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    Salvos ({savedFilters.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
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
              
              {/* Histórico */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    Histórico
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
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
            
            {/* Tags de filtros ativos */}
            {activeTags.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Filtros Aplicados:</div>
                <div className="flex flex-wrap gap-1">
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

          <div className="space-y-4 mt-6">
            {/* Busca Global */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-600" />
                  Busca Global
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Buscar por CNPJ, razão social, nome fantasia..."
                  value={activeFilters.busca}
                  onChange={(e) => updateFilter('busca', e.target.value)}
                  className="h-10"
                />
              </CardContent>
            </Card>

            {/* Seções de Filtros */}
            <div className="space-y-2">
              <FilterSection title="Identificação & Situação" section="identification" icon={Tag}>
                <div className="space-y-3">
                  <AdvancedFilterDropdown
                    label="Situação"
                    options={filterOptions.situacao}
                    selectedValues={activeFilters.situacao}
                    onSelectionChange={(values) => updateFilter('situacao', values)}
                    tooltip="Situação cadastral da empresa na Receita Federal"
                  />
                  <AdvancedFilterDropdown
                    label="Tipo"
                    options={filterOptions.tipo}
                    selectedValues={activeFilters.tipo}
                    onSelectionChange={(values) => updateFilter('tipo', values)}
                  />
                  <AdvancedFilterDropdown
                    label="Matriz/Filial"
                    options={filterOptions.matriz_filial}
                    selectedValues={activeFilters.matriz_filial}
                    onSelectionChange={(values) => updateFilter('matriz_filial', values)}
                  />
                  <AdvancedFilterDropdown
                    label="Porte"
                    options={filterOptions.porte}
                    selectedValues={activeFilters.porte}
                    onSelectionChange={(values) => updateFilter('porte', values)}
                    tooltip="Classificação de porte baseada no faturamento"
                  />
                </div>
              </FilterSection>

              <Separator />

              <FilterSection title="Classificação CNAE" section="classification" icon={Filter}>
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
                  placeholder="Buscar por código ou nome..."
                  tooltip="Atividade econômica principal da empresa"
                />
              </FilterSection>

              <Separator />

              <FilterSection title="Localização" section="location" icon={Filter}>
                <div className="space-y-3">
                  <AdvancedFilterDropdown
                    label="Estado"
                    options={filterOptions.estado}
                    selectedValues={activeFilters.estado}
                    onSelectionChange={(values) => updateFilter('estado', values)}
                  />
                  <AdvancedFilterDropdown
                    label="Município"
                    options={filterOptions.municipio}
                    selectedValues={activeFilters.municipio}
                    onSelectionChange={(values) => updateFilter('municipio', values)}
                    tooltip="Filtro cascata: selecione um estado primeiro para refinar"
                  />
                </div>
              </FilterSection>

              <Separator />

              <FilterSection title="Situação Tributária" section="tax" icon={DollarSign}>
                <div className="space-y-3">
                  <AdvancedFilterDropdown
                    label="MEI"
                    options={filterOptions.mei.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    selectedValues={activeFilters.mei.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    onSelectionChange={(values) => updateFilter('mei', values.map(v => v.value))}
                    displayProperty="label"
                    valueProperty="value"
                    isSearchable={false}
                    tooltip="Microempreendedor Individual"
                  />
                  <AdvancedFilterDropdown
                    label="Simples Nacional"
                    options={filterOptions.simples.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    selectedValues={activeFilters.simples.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
                    onSelectionChange={(values) => updateFilter('simples', values.map(v => v.value))}
                    displayProperty="label"
                    valueProperty="value"
                    isSearchable={false}
                    tooltip="Regime tributário simplificado"
                  />
                </div>
              </FilterSection>

              <Separator />

              <FilterSection title="Dados Financeiros" section="financial" icon={DollarSign}>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Capital Social</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Mínimo"
                        value={activeFilters.capital_social_min || ''}
                        onChange={(e) => updateFilter('capital_social_min', Number(e.target.value) || undefined)}
                      />
                      <Input
                        type="number"
                        placeholder="Máximo"
                        value={activeFilters.capital_social_max || ''}
                        onChange={(e) => updateFilter('capital_social_max', Number(e.target.value) || undefined)}
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>

              <Separator />

              <FilterSection title="Datas" section="dates" icon={Calendar}>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Data de Início de Atividade</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={activeFilters.data_inicio_min || ''}
                        onChange={(e) => updateFilter('data_inicio_min', e.target.value || undefined)}
                      />
                      <Input
                        type="date"
                        value={activeFilters.data_inicio_max || ''}
                        onChange={(e) => updateFilter('data_inicio_max', e.target.value || undefined)}
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>
            </div>

            {/* Botão de Aplicar Filtros */}
            <div className="sticky bottom-0 bg-white p-4 border-t">
              <div className="flex gap-2">
                <Button
                  onClick={handleApplyFilters}
                  disabled={isApplying}
                  className="flex-1 flex items-center gap-2"
                >
                  {isApplying ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Filter className="h-4 w-4" />
                  )}
                  Aplicar Filtros
                  {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  {isOpen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {resultsCount.toLocaleString()}
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
    </>
  );
};

export default AdvancedFilters;
