
import React from 'react';
import { Save, RotateCcw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import FilterDropdown from './FilterDropdown';
import { FilterOptions, ActiveFilters } from '@/types/empresa';

interface AdvancedFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  onSaveFilters: () => void;
  onResetFilters: () => void;
}

const AdvancedFilters = ({
  filterOptions,
  activeFilters,
  onFiltersChange,
  onSaveFilters,
  onResetFilters
}: AdvancedFiltersProps) => {
  const updateFilter = <K extends keyof ActiveFilters>(
    key: K,
    value: ActiveFilters[K]
  ) => {
    onFiltersChange({
      ...activeFilters,
      [key]: value
    });
  };

  const totalActiveFilters = Object.values(activeFilters).reduce((count, filter) => {
    if (Array.isArray(filter)) {
      return count + filter.length;
    }
    if (typeof filter === 'string' && filter.length > 0) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Filtros Avançados</CardTitle>
            {totalActiveFilters > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {totalActiveFilters} ativo{totalActiveFilters > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            <Button size="sm" onClick={onSaveFilters}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Busca Global */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Busca Global</label>
          <Input
            placeholder="Buscar por CNPJ, razão social, nome fantasia..."
            value={activeFilters.busca}
            onChange={(e) => updateFilter('busca', e.target.value)}
            className="h-10"
          />
        </div>

        <Separator />

        {/* Identificação */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Identificação & Situação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <FilterDropdown
              label="Situação"
              options={filterOptions.situacao}
              selectedValues={activeFilters.situacao}
              onSelectionChange={(values) => updateFilter('situacao', values)}
            />
            <FilterDropdown
              label="Tipo"
              options={filterOptions.tipo}
              selectedValues={activeFilters.tipo}
              onSelectionChange={(values) => updateFilter('tipo', values)}
            />
            <FilterDropdown
              label="Matriz/Filial"
              options={filterOptions.matriz_filial}
              selectedValues={activeFilters.matriz_filial}
              onSelectionChange={(values) => updateFilter('matriz_filial', values)}
            />
            <FilterDropdown
              label="Porte"
              options={filterOptions.porte}
              selectedValues={activeFilters.porte}
              onSelectionChange={(values) => updateFilter('porte', values)}
            />
          </div>
        </div>

        <Separator />

        {/* Classificação */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Classificação CNAE
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FilterDropdown
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
            />
          </div>
        </div>

        <Separator />

        {/* Localização */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Localização
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FilterDropdown
              label="Estado"
              options={filterOptions.estado}
              selectedValues={activeFilters.estado}
              onSelectionChange={(values) => updateFilter('estado', values)}
            />
            <FilterDropdown
              label="Município"
              options={filterOptions.municipio.filter(municipio => {
                // Filtro cascata: só mostra municípios dos estados selecionados
                if (activeFilters.estado.length === 0) return true;
                // Aqui você implementaria a lógica real de cascata
                return true;
              })}
              selectedValues={activeFilters.municipio}
              onSelectionChange={(values) => updateFilter('municipio', values)}
            />
          </div>
        </div>

        <Separator />

        {/* Tributário */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Situação Tributária
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FilterDropdown
              label="MEI"
              options={filterOptions.mei.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
              selectedValues={activeFilters.mei.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
              onSelectionChange={(values) => updateFilter('mei', values.map(v => v.value))}
              displayProperty="label"
              valueProperty="value"
              isSearchable={false}
            />
            <FilterDropdown
              label="Simples Nacional"
              options={filterOptions.simples.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
              selectedValues={activeFilters.simples.map(v => ({ label: v ? 'Sim' : 'Não', value: v }))}
              onSelectionChange={(values) => updateFilter('simples', values.map(v => v.value))}
              displayProperty="label"
              valueProperty="value"
              isSearchable={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
