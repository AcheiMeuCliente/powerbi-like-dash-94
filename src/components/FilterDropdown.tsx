
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FilterDropdownProps {
  label: string;
  options: any[];
  selectedValues: any[];
  onSelectionChange: (values: any[]) => void;
  displayProperty?: string;
  valueProperty?: string;
  isSearchable?: boolean;
  placeholder?: string;
}

const FilterDropdown = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  displayProperty,
  valueProperty,
  isSearchable = true,
  placeholder = "Buscar..."
}: FilterDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const selectedCount = selectedValues.length;
  const buttonText = selectedCount === 0 
    ? label 
    : `${label} (${selectedCount})`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={`w-full justify-between h-10 ${selectedCount > 0 ? 'bg-blue-50 border-blue-300' : ''}`}
        >
          <span className="truncate">{buttonText}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b bg-gray-50">
          <div className="font-medium text-sm mb-2">{label}</div>
          {isSearchable && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-8"
              />
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="sm" onClick={selectAll} className="h-6 text-xs">
              Selecionar Todos
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 text-xs">
              Limpar
            </Button>
          </div>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-sm text-muted-foreground text-center">
              Nenhum item encontrado
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
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleToggle(option)}
                >
                  <Checkbox 
                    checked={isSelected}
                    onChange={() => handleToggle(option)}
                  />
                  <span className="text-sm flex-1 truncate" title={displayValue}>
                    {displayValue}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDropdown;
