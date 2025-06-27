
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X, Loader2 } from 'lucide-react';
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
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-1 flex-wrap">
          {displayedSelections.map((selected, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="text-xs bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 max-w-20"
            >
              <span className="truncate" title={getDisplayValue(selected)}>
                {getDisplayValue(selected)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelected(selected);
                }}
                className="hover:bg-blue-200 rounded p-0.5"
              >
                <X className="h-2 w-2" />
              </button>
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs bg-gray-100">
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
      className={`w-full justify-between h-auto min-h-10 p-2 ${selectedCount > 0 ? 'bg-blue-50 border-blue-300' : ''}`}
      disabled={isLoading}
      aria-label={`${label} - ${selectedCount} selecionado${selectedCount !== 1 ? 's' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando...</span>
        </div>
      ) : (
        <>
          {renderTriggerContent()}
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
        </>
      )}
    </Button>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="h-4 w-4 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center">
                  ?
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {trigger}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 border-b bg-gray-50">
            <div className="font-medium text-sm mb-2 flex items-center justify-between">
              <span>{label}</span>
              {selectedCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            
            {isSearchable && (
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8"
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
                className="h-6 text-xs flex-1"
                disabled={filteredOptions.length === 0}
              >
                Selecionar Todos ({filteredOptions.length})
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll} 
                className="h-6 text-xs flex-1"
                disabled={selectedCount === 0}
              >
                Limpar ({selectedCount})
              </Button>
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground text-center">
                {searchTerm ? 'Nenhum item encontrado' : 'Nenhum item disponível'}
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
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer focus:bg-gray-100"
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
                    />
                    <span className="text-sm flex-1 truncate" title={displayValue}>
                      {isSelected && <Check className="inline h-3 w-3 mr-1 text-blue-600" />}
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
  );
};

export default AdvancedFilterDropdown;
