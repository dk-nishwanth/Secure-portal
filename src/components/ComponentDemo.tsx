import { useState } from 'react';
import { Calendar, CheckSquare, Palette, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { DatePicker } from './ui/date-picker';
import { MultiSelect } from './ui/multi-select';
import { ColorPicker } from './ui/color-picker';

interface ComponentDemoProps {
  onBack?: () => void;
}

export function ComponentDemo({ onBack }: ComponentDemoProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedItems, setSelectedItems] = useState<string[]>(['react', 'nextjs']);
  const [selectedColor, setSelectedColor] = useState('#FF7619');

  const frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'gatsby', label: 'Gatsby' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
    { value: 'solid', label: 'SolidJS' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-white/10 text-gray-400 hover:text-white h-10 w-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Component Demo</h1>
            <p className="text-gray-400 text-sm">
              Interactive showcase of custom UI components
            </p>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date Picker Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Date Picker</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Select Date</Label>
                <DatePicker
                  date={selectedDate}
                  onDateChange={setSelectedDate}
                  placeholder="Choose a date..."
                />
              </div>
              
              {selectedDate && (
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-blue-300">
                    Selected: {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multi-Select Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Multi-Select</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Choose Frameworks</Label>
                <MultiSelect
                  options={frameworkOptions}
                  selected={selectedItems}
                  onSelectionChange={setSelectedItems}
                  placeholder="Select technologies..."
                  maxDisplay={2}
                />
              </div>
              
              {selectedItems.length > 0 && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm text-green-300 mb-1">
                    Selected ({selectedItems.length}):
                  </p>
                  <p className="text-xs text-gray-400">
                    {selectedItems.map(item => 
                      frameworkOptions.find(opt => opt.value === item)?.label
                    ).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Color Picker Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Color Picker</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Pick Color</Label>
                <ColorPicker
                  color={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </div>
              
              <div 
                className="p-4 rounded-lg border border-white/10 transition-all duration-300"
                style={{ 
                  backgroundColor: selectedColor + '20',
                  borderColor: selectedColor + '40'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded border border-white/20"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <p className="text-sm font-medium text-white">{selectedColor}</p>
                </div>
                <p className="text-xs text-gray-400">
                  This preview updates with your selected color
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Demo */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">Combined Form Example</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-gray-300 mb-2 block">Project Deadline</Label>
              <DatePicker
                date={selectedDate}
                onDateChange={setSelectedDate}
                placeholder="Set deadline..."
              />
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Tech Stack</Label>
              <MultiSelect
                options={frameworkOptions}
                selected={selectedItems}
                onSelectionChange={setSelectedItems}
                placeholder="Choose technologies..."
                maxDisplay={1}
              />
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Brand Color</Label>
              <ColorPicker
                color={selectedColor}
                onColorChange={setSelectedColor}
              />
            </div>
          </div>

          {(selectedDate || selectedItems.length > 0 || selectedColor !== '#FF7619') && (
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-3">Form Summary</h4>
              <div className="space-y-2 text-sm">
                {selectedDate && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Deadline:</span> {selectedDate.toLocaleDateString()}
                  </p>
                )}
                {selectedItems.length > 0 && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Technologies:</span> {selectedItems.length} selected
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="text-gray-400">Brand Color:</span> 
                  <span className="ml-2 inline-flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded border border-white/20"
                      style={{ backgroundColor: selectedColor }}
                    />
                    {selectedColor}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}