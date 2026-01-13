import { useState } from 'react';
import { Switch } from './ui/switch';
import { DatePicker } from './ui/date-picker';
import { MultiSelect } from './ui/multi-select';
import { ColorPicker } from './ui/color-picker';

export function ComponentTest() {
  const [switchOn, setSwitchOn] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState<string[]>(['react']);
  const [color, setColor] = useState('#FF7619');

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ];

  return (
    <div className="p-8 space-y-6 bg-[#0a0a0f] min-h-screen">
      <h1 className="text-2xl font-bold text-white">Component Test</h1>
      
      {/* Switch Test */}
      <div className="p-4 bg-[#1a1a2e] rounded-lg">
        <h2 className="text-white mb-2">Switch Test</h2>
        <div className="flex items-center gap-4">
          <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          <span className="text-white">Switch is {switchOn ? 'ON' : 'OFF'}</span>
        </div>
      </div>

      {/* Date Picker Test */}
      <div className="p-4 bg-[#1a1a2e] rounded-lg">
        <h2 className="text-white mb-2">Date Picker Test</h2>
        <DatePicker date={date} onDateChange={setDate} />
        <p className="text-gray-400 mt-2">Selected: {date?.toLocaleDateString()}</p>
      </div>

      {/* Multi-Select Test */}
      <div className="p-4 bg-[#1a1a2e] rounded-lg">
        <h2 className="text-white mb-2">Multi-Select Test</h2>
        <MultiSelect 
          options={options}
          selected={selected}
          onSelectionChange={setSelected}
        />
        <p className="text-gray-400 mt-2">Selected: {selected.join(', ')}</p>
      </div>

      {/* Color Picker Test */}
      <div className="p-4 bg-[#1a1a2e] rounded-lg">
        <h2 className="text-white mb-2">Color Picker Test</h2>
        <ColorPicker color={color} onColorChange={setColor} />
        <div className="mt-2 p-2 rounded" style={{ backgroundColor: color + '20' }}>
          <p className="text-white">Color: {color}</p>
        </div>
      </div>
    </div>
  );
}