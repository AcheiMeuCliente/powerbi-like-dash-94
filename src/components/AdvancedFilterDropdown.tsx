
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AdvancedFilterDropdownProps {
  label: string;
  options: any[];
  selectedValues: any[];
  onSelectionChange: (values: any[]) => void;
  displayProperty?: string;
  valueProperty?: string;
  isSearchable?: boolean;
  placeholder?: string;
  tooltip?: string;
  isLoading?: boolean;
  maxSelectedDisplay?: number;
}

const AdvancedFilterDropdown = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  displayProperty,
  valueProperty,
  isSearchable = true,
  placeholder = "Buscar...",
  tooltip,
  isLoading = false,
  maxSelectedDisplay = 2
}: AdvancedFilterDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  const getDisplayValue = (option: any) => {
    if (displayProperty && typeof option === 'object') {
      return option[displayProperty];
    }
    return String(option);
  };

  const getValue = (option: any) => {
    if (valueProperty && typeof option === 'object') {
      return option[valueProperty];
    }
    return option;
  };

  const filteredOptions = options.filter(option => {
    if (!isSearchable || !searchTerm) return true;
    const displayValue = getDisplayValue(option).toLowerCase();
    return displayValue.includes(searchTerm.toLowerCase());
  });

  const handleToggle = (option: any) => {
    const value = getValue(option);
    const isSelected = selectedValues.some(selected => 
      JSON.stringify(getValue(selected)) === JSON.stringify(value)
    );

    if (isSelected) {
      onSelectionChange(selectedValues.filter(selected => 
        JSON.stringify(getValue(selected)) !== JSON.stringify(value)
      ));
    } else {
      onSelectionChange([...selectedValues, option]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const selectAll = () => {
    onSelectionChange([...filteredOptions]);
  };

  const removeSelected = (optionToRemove: any) => {
    const value = getValue(optionToRemove);
    onSelectionChange(selectedValues.filter(selected => 
      JSON.stringify(getValue(selected)) !== JSON.stringify(value)
    ));
  };

  const selectedCount = selectedValues.length;
  const displayedSelections = selectedValues.slice(0, maxSelectedDisplay);
  const remainingCount = selectedCount - maxSelectedDisplay;

  const renderTriggerContent = () => {
    if (selectedCount === 0) {
      return <span className="text-gray-500 truncate">{label}</span>;
    }

    return (
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-1 flex-wrap">
          {displayedSelections.map((selected, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="text-xs bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-cyan-200 flex items-center gap-1 max-w-20 shadow-sm"
            >
              <span className="truncate" title={getDisplayValue(selected)}>
                {getDisplayValue(selected)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelected(selected);
                }}
                className="hover:bg-cyan-200 rounded-full p-0.5 transition-colors duration-150"
              >
                <X className="h-2 w-2 text-cyan-600" />
              </button>
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 shadow-sm">
              +{remainingCount}
            </Badge>
          )}
        </div>
      </div>
    );
  };

  const trigger = (
    <Button 
      variant="outline" 
      className={`w-full justify-between h-auto min-h-12 p-3 transition-all duration-200 ${
        selectedCount > 0 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 hover:from-blue-100 hover:to-indigo-100' 
          : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50'
      }`}
      disabled={isLoading}
      aria-label={`${label} - ${selectedCount} selecionado${selectedCount !== 1 ? 's' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
          <span className="text-indigo-600">Carregando...</span>
        </div>
      ) : (
        <>
          {renderTriggerContent()}
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 text-indigo-500" />
        </>
      )}
    </Button>
  );

  return (
    <TooltipProvider>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">{label}</label>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            {trigger}
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 shadow-xl border-2 border-indigo-100" align="start">
            <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="font-semibold text-sm mb-3 flex items-center justify-between">
                <span className="text-gray-800">{label}</span>
                {selectedCount > 0 && (
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 shadow-sm">
                    {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              {isSearchable && (
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    ref={searchInputRef}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 border-2 border-indigo-200 focus:border-indigo-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsOpen(false);
                      }
                    }}
                  />
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={selectAll} 
                  className="h-8 text-xs flex-1 bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-150"
                  disabled={filteredOptions.length === 0}
                >
                  Selecionar Todos ({filteredOptions.length})
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAll} 
                  className="h-8 text-xs flex-1 bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-150"
                  disabled={selectedCount === 0}
                >
                  Limpar ({selectedCount})
                </Button>
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center bg-gray-50">
                  {searchTerm ? '🔍 Nenhum item encontrado' : '📋 Nenhum item disponível'}
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const value = getValue(option);
                  const displayValue = getDisplayValue(option);
                  const isSelected = selectedValues.some(selected => 
                    JSON.stringify(getValue(selected)) === JSON.stringify(value)
                  );

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400' 
                          : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50'
                      }`}
                      onClick={() => handleToggle(option)}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleToggle(option);
                        }
                      }}
                    >
                      <Checkbox 
                        checked={isSelected}
                        onChange={() => handleToggle(option)}
                        aria-label={`Selecionar ${displayValue}`}
                        className="border-2 border-indigo-300 data-[state=checked]:bg-indigo-500"
                      />
                      <span className={`text-sm flex-1 truncate transition-colors duration-150 ${
                        isSelected ? 'text-indigo-800 font-medium' : 'text-gray-700'
                      }`} title={displayValue}>
                        {isSelected && <Check className="inline h-3 w-3 mr-2 text-indigo-600" />}
                        {displayValue}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipProvider>
  );
};

export default AdvancedFilterDropdown;
