
import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Empresa } from '@/types/empresa';

interface EmpresasTableProps {
  empresas: Empresa[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

type SortField = keyof Empresa;
type SortDirection = 'asc' | 'desc';

const EmpresasTable = ({ empresas, currentPage, itemsPerPage, onPageChange }: EmpresasTableProps) => {
  const [sortField, setSortField] = useState<SortField>('razao_social');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedEmpresas = useMemo(() => {
    return [...empresas].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [empresas, sortField, sortDirection]);

  const paginatedEmpresas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedEmpresas.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedEmpresas, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(empresas.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </th>
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao.toLowerCase()) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'suspensa': return 'bg-yellow-100 text-yellow-800';
      case 'baixada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Empresas Encontradas</CardTitle>
          <div className="text-sm text-gray-600">
            {empresas.length} empresa{empresas.length !== 1 ? 's' : ''} encontrada{empresas.length !== 1 ? 's' : ''}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader field="cnpj">CNPJ</SortableHeader>
                <SortableHeader field="razao_social">Razão Social</SortableHeader>
                <SortableHeader field="nome_fantasia">Nome Fantasia</SortableHeader>
                <SortableHeader field="situacao">Situação</SortableHeader>
                <SortableHeader field="cnae_principal_nome">CNAE Principal</SortableHeader>
                <SortableHeader field="porte">Porte</SortableHeader>
                <SortableHeader field="matriz_filial">Tipo</SortableHeader>
                <SortableHeader field="municipio">Município</SortableHeader>
                <SortableHeader field="estado">UF</SortableHeader>
                <SortableHeader field="capital_social">Capital Social</SortableHeader>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEmpresas.map((empresa, index) => (
                <tr key={empresa.cnpj} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                    {empresa.cnpj}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                    <div title={empresa.razao_social}>
                      {empresa.razao_social}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {empresa.nome_fantasia || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge className={`${getSituacaoColor(empresa.situacao)} border-0`}>
                      {empresa.situacao}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                    <div title={empresa.cnae_principal_nome}>
                      <div className="font-mono text-xs text-gray-500">{empresa.cnae_principal_codigo}</div>
                      <div>{empresa.cnae_principal_nome}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {empresa.porte}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        {empresa.matriz_filial}
                      </Badge>
                      {empresa.mei && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                          MEI
                        </Badge>
                      )}
                      {empresa.simples && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          Simples
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {empresa.municipio}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {empresa.estado}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatCurrency(empresa.capital_social)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {empresa.tem_telefone && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Phone className="h-3 w-3" />
                        </Button>
                      )}
                      {empresa.tem_email && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Mail className="h-3 w-3" />
                        </Button>
                      )}
                      {empresa.whatsapp_1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-green-600"
                          onClick={() => window.open(empresa.whatsapp_1, '_blank')}
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => window.open(empresa.maps, '_blank')}
                        title="Ver no mapa"
                      >
                        <MapPin className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => window.open(empresa.receita_federal, '_blank')}
                        title="Ver na Receita Federal"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Próximo
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{' '}
                <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{' '}
                a{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, empresas.length)}
                </span>{' '}
                de{' '}
                <span className="font-medium">{empresas.length}</span>{' '}
                resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(currentPage - 1)}
                  className="rounded-r-none"
                >
                  Anterior
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(pageNum)}
                      className="rounded-none"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(currentPage + 1)}
                  className="rounded-l-none"
                >
                  Próximo
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmpresasTable;
