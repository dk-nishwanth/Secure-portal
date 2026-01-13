"use client";

import * as React from "react";
import { Palette } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";

interface ColorPickerProps {
  color?: string;
  onColorChange?: (color: string) => void;
  className?: string;
  disabled?: boolean;
  presetColors?: string[];
}

const defaultPresetColors = [
  "#FF7619", // Orange
  "#9A18FB", // Purple
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange-600
  "#84CC16", // Lime
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#F43F5E", // Rose
  "#A855F7", // Purple-500
  "#22C55E", // Green-500
];

export function ColorPicker({
  color = "#FF7619",
  onColorChange,
  className,
  disabled = false,
  presetColors = defaultPresetColors,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [customColor, setCustomColor] = React.useState(color);

  const handleColorSelect = (selectedColor: string) => {
    setCustomColor(selectedColor);
    onColorChange?.(selectedColor);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorChange?.(newColor);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start bg-white/5 border-white/10 text-white hover:bg-white/10",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border border-white/20"
              style={{ backgroundColor: color }}
            />
            <Palette className="w-4 h-4" />
            <span>{color}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-[#1a1a2e] border-white/10" align="start">
        <div className="space-y-4">
          {/* Preset Colors */}
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Preset Colors</h4>
            <div className="grid grid-cols-8 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  className={cn(
                    "w-6 h-6 rounded border-2 transition-all hover:scale-110",
                    color === presetColor ? "border-white" : "border-white/20"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorSelect(presetColor)}
                />
              ))}
            </div>
          </div>

          {/* Custom Color Input */}
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Custom Color</h4>
            <div className="flex gap-2">
              <Input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="w-12 h-10 p-1 bg-white/5 border-white/10"
              />
              <Input
                type="text"
                value={customColor}
                onChange={handleCustomColorChange}
                placeholder="#FF7619"
                className="flex-1 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          {/* Recent Colors (if you want to add this feature later) */}
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Recent</h4>
            <div className="grid grid-cols-8 gap-2">
              {[color, "#9A18FB", "#3B82F6", "#10B981"].map((recentColor, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-6 h-6 rounded border border-white/20 transition-all hover:scale-110"
                  style={{ backgroundColor: recentColor }}
                  onClick={() => handleColorSelect(recentColor)}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}