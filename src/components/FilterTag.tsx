
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterTagProps {
  label: string;
  value: string;
  onRemove: () => void;
}

const FilterTag = ({ label, value, onRemove }: FilterTagProps) => {
  return (
    <Badge 
      variant="secondary" 
      className="flex items-center gap-2 px-3 py-2 text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200 hover:from-indigo-200 hover:to-purple-200 hover:border-indigo-300 transition-all duration-200 rounded-full shadow-sm"
    >
      <span className="font-semibold text-indigo-600">{label}:</span>
      <span className="truncate max-w-24 text-indigo-800" title={value}>{value}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-indigo-300 rounded-full p-1 transition-colors duration-150 flex items-center justify-center"
        aria-label={`Remover filtro ${label}: ${value}`}
      >
        <X className="h-3 w-3 text-indigo-600" />
      </button>
    </Badge>
  );
};

export default FilterTag;
