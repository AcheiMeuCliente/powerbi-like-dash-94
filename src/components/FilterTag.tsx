
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
      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors"
    >
      <span className="font-medium">{label}:</span>
      <span className="truncate max-w-20" title={value}>{value}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-blue-300 rounded-full p-0.5 transition-colors"
        aria-label={`Remover filtro ${label}: ${value}`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
};

export default FilterTag;
