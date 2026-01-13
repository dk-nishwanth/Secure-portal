"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Badge } from "./badge";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDisplay?: number;
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select items...",
  className,
  disabled = false,
  maxDisplay = 3,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter((item) => item !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectionChange(selected.filter((item) => item !== value));
  };

  const selectedOptions = options.filter((option) => selected.includes(option.value));
  const displayedOptions = selectedOptions.slice(0, maxDisplay);
  const remainingCount = selectedOptions.length - maxDisplay;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10 h-auto min-h-[2.75rem] px-3 py-2",
            className
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selected.length === 0 ? (
              <span className="text-gray-400">{placeholder}</span>
            ) : (
              <>
                {displayedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="bg-[#FF7619]/20 text-[#FF7619] border-[#FF7619]/30 hover:bg-[#FF7619]/30"
                  >
                    {option.label}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer hover:text-white"
                      onClick={(e) => handleRemove(option.value, e)}
                    />
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                    +{remainingCount} more
                  </Badge>
                )}
              </>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-[#1a1a2e] border-white/10" align="start">
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors",
                selected.includes(option.value) && "bg-white/5"
              )}
              onClick={() => handleSelect(option.value)}
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded border border-white/20",
                  selected.includes(option.value) && "bg-[#FF7619] border-[#FF7619]"
                )}
              >
                {selected.includes(option.value) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-white text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}