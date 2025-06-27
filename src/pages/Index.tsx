
import React, { useState, useMemo, useEffect } from 'react';
import { Building2, Database, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdvancedFilters from '@/components/AdvancedFilters';
import EmpresasTable from '@/components/EmpresasTable';
import { mockEmpresas, getFilterOptions } from '@/data/mockEmpresas';
import { Empresa, ActiveFilters } from '@/types/empresa';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    situacao: [],
    cnae_principal: [],
    porte: [],
    tipo: [],
    matriz_filial: [],
    estado: [],
    municipio: [],
    mei: [],
    simples: [],
    busca: ''
  });

  // Filtrar empresas baseado nos filtros ativos
  const filteredEmpresas = useMemo(() => {
    return mockEmpresas.filter((empresa) => {
      // Busca global
      if (activeFilters.busca) {
        const searchTerm = activeFilters.busca.toLowerCase();
        const searchFields = [
          empresa.cnpj,
          empresa.razao_social,
          empresa.nome_fantasia || '',
          empresa.email || ''
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchTerm)) {
          return false;
        }
      }

      // Filtros específicos
      if (activeFilters.situacao.length > 0 && !activeFilters.situacao.includes(empresa.situacao)) {
        return false;
      }

      if (activeFilters.cnae_principal.length > 0 && !activeFilters.cnae_principal.includes(empresa.cnae_principal_codigo)) {
        return false;
      }

      if (activeFilters.porte.length > 0 && !activeFilters.porte.includes(empresa.porte)) {
        return false;
      }

      if (activeFilters.tipo.length > 0 && !activeFilters.tipo.includes(empresa.tipo)) {
        return false;
      }

      if (activeFilters.matriz_filial.length > 0 && !activeFilters.matriz_filial.includes(empresa.matriz_filial)) {
        return false;
      }

      if (activeFilters.estado.length > 0 && !activeFilters.estado.includes(empresa.estado)) {
        return false;
      }

      if (activeFilters.municipio.length > 0 && !activeFilters.municipio.includes(empresa.municipio)) {
        return false;
      }

      if (activeFilters.mei.length > 0 && !activeFilters.mei.includes(empresa.mei)) {
        return false;
      }

      if (activeFilters.simples.length > 0 && !activeFilters.simples.includes(empresa.simples)) {
        return false;
      }

      return true;
    });
  }, [activeFilters]);

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  const filterOptions = useMemo(() => getFilterOptions(mockEmpresas), []);

  const handleSaveFilters = () => {
    // Aqui você salvaria os filtros no localStorage ou backend
    localStorage.setItem('savedFilters', JSON.stringify(activeFilters));
    toast({
      title: "Filtros salvos",
      description: "Suas configurações de filtro foram salvas com sucesso.",
    });
  };

  const handleResetFilters = () => {
    setActiveFilters({
      situacao: [],
      cnae_principal: [],
      porte: [],
      tipo: [],
      matriz_filial: [],
      estado: [],
      municipio: [],
      mei: [],
      simples: [],
      busca: ''
    });
    toast({
      title: "Filtros resetados",
      description: "Todos os filtros foram limpos.",
    });
  };

  // Estatísticas rápidas
  const stats = useMemo(() => {
    const ativas = filteredEmpresas.filter(e => e.situacao === 'ATIVA').length;
    const mei = filteredEmpresas.filter(e => e.mei).length;
    const simples = filteredEmpresas.filter(e => e.simples).length;
    const matrizes = filteredEmpresas.filter(e => e.matriz_filial === 'MATRIZ').length;

    return { ativas, mei, simples, matrizes };
  }, [filteredEmpresas]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard de Empresas
              </h1>
              <p className="text-gray-600">
                Sistema avançado de filtros e análise empresarial
              </p>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredEmpresas.length.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                de {mockEmpresas.length.toLocaleString()} cadastradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {stats.ativas}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((stats.ativas / filteredEmpresas.length) * 100 || 0).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                do total filtrado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MEI</CardTitle>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {stats.mei}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((stats.mei / filteredEmpresas.length) * 100 || 0).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Microempreendedores
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Simples Nacional</CardTitle>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                {stats.simples}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((stats.simples / filteredEmpresas.length) * 100 || 0).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Optantes do Simples
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros Avançados */}
        <AdvancedFilters
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFiltersChange={setActiveFilters}
          onSaveFilters={handleSaveFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Tabela de Empresas */}
        <EmpresasTable
          empresas={filteredEmpresas}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;
