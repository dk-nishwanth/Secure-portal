"use client";

import * as React from "react";

interface SimpleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function SimpleSwitch({ checked, onCheckedChange, className }: SimpleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-12 w-24 items-center rounded-full transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-[#FF7619]/50
        border-4 cursor-pointer transform hover:scale-105 active:scale-95
        ${checked 
          ? 'bg-gradient-to-r from-[#FF7619] to-[#FF8C42] border-[#FF7619]' 
          : 'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-500'
        }
        ${className || ''}
      `}
      style={{
        backgroundColor: checked ? '#FF7619' : '#4B5563',
        borderColor: checked ? '#FF7619' : '#6B7280',
        boxShadow: checked 
          ? '0 0 20px rgba(255, 118, 25, 0.6), 0 8px 25px rgba(255, 118, 25, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
          : '0 0 10px rgba(0, 0, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Background track with stronger contrast */}
      <div 
        className="absolute inset-1 rounded-full"
        style={{
          backgroundColor: checked ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)'
        }}
      ></div>
      
      {/* Thumb with maximum visibility */}
      <span
        className={`
          relative inline-block h-9 w-9 transform rounded-full transition-all duration-300 ease-in-out
          ring-2 ring-white/30
          ${checked 
            ? 'translate-x-12' 
            : 'translate-x-1'
          }
        `}
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
        }}
      >
        {/* Inner highlight for 3D effect */}
        <div 
          className="absolute inset-0.5 rounded-full"
          style={{
            background: 'linear-gradient(to top, transparent, rgba(255, 255, 255, 0.4))'
          }}
        ></div>
      </span>
      
      {/* ON/OFF Text with high contrast */}
      <span 
        className="absolute inset-0 flex items-center justify-center text-sm font-black tracking-wider"
        style={{
          color: checked ? '#FFFFFF' : '#D1D5DB',
          textShadow: checked ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.8)'
        }}
      >
        {checked ? 'ON' : 'OFF'}
      </span>
      
      {/* Visual indicator */}
      <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
    </button>
  );
}