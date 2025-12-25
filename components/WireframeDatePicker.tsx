
import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  placeholder?: string;
}

const WireframeDatePicker: React.FC<DatePickerProps> = ({ value, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDayClick = (day: number) => {
    // Note: Creating date with month/year from viewDate and the clicked day.
    // Ensure we avoid timezone offset issues by setting hours to noon.
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, 12);
    onChange(selected.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const displayValue = value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : (placeholder || 'Select Date');

  return (
    <div className="relative flex flex-col w-full h-full" ref={containerRef}>
      <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-black uppercase cursor-pointer flex-grow flex items-center hover:text-gray-600 transition-colors"
      >
        <span className="truncate">{displayValue}</span>
        <span className="ml-auto text-[8px] opacity-30">▼</span>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-[100] bg-white border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-72 animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); changeMonth(-1); }} 
              className="font-black text-xs hover:bg-black hover:text-white px-2 py-1 border-2 border-black transition-all"
            >
              PREV
            </button>
            <span className="font-black uppercase text-[10px] tracking-widest">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); changeMonth(1); }} 
              className="font-black text-xs hover:bg-black hover:text-white px-2 py-1 border-2 border-black transition-all"
            >
              NEXT
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
              <div key={d} className="text-[8px] font-black text-gray-400 mb-2">{d}</div>
            ))}
            {Array(firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth())).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => i + 1).map(day => {
              const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, 12);
              const dateStr = d.toISOString().split('T')[0];
              const isSelected = value === dateStr;
              
              return (
                <button
                  key={day}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDayClick(day); }}
                  className={`text-[10px] p-2 border-2 border-transparent font-black transition-all ${
                    isSelected 
                      ? 'bg-black text-white border-black' 
                      : 'hover:border-black'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 flex justify-end">
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[9px] font-black uppercase underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WireframeDatePicker;
