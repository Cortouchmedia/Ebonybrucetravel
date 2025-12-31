
import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

const WireframeDatePicker: React.FC<DatePickerProps> = ({ value, onChange, label, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const [align, setAlign] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recalculate position whenever it opens
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 400; // Estimated height of calendar
      const dropdownWidth = 320;

      // Vertical positioning
      if (rect.bottom + dropdownHeight > viewportHeight && rect.top > dropdownHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }

      // Horizontal alignment
      if (rect.left + dropdownWidth > viewportWidth) {
        setAlign('right');
      } else {
        setAlign('left');
      }
    }
  }, [isOpen]);

  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDayClick = (day: number) => {
    if (disabled) return;
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, 12);
    onChange(selected.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const displayValue = value 
    ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
    : (placeholder || 'Select Date');

  return (
    <div className={`relative flex flex-col w-full ${disabled ? 'opacity-40' : ''}`} ref={containerRef}>
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block mb-2">
        {label}
      </label>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 md:p-5 text-sm font-bold text-[#002D5B] flex items-center transition-all
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:border-[#1F93D0] focus-within:ring-2 focus-within:ring-[#1F93D0]'}`}
      >
        <svg className="w-4 h-4 text-slate-300 mr-3 md:mr-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="truncate">{displayValue}</span>
      </div>

      {isOpen && !disabled && (
        <div 
          className={`absolute z-[1001] bg-white border border-slate-100 p-6 md:p-8 shadow-[0_30px_70px_-15px_rgba(0,45,91,0.25)] rounded-[2rem] md:rounded-[2.5rem] w-[280px] md:w-80 animate-in fade-in zoom-in-95 duration-200 
            ${position === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'}
            ${align === 'right' ? 'right-0' : 'left-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-slate-50 pb-3 md:pb-4">
            <button type="button" onClick={() => changeMonth(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-300 hover:text-[#1F93D0] transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#002D5B]">
              {months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button type="button" onClick={() => changeMonth(1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-300 hover:text-[#1F93D0] transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center w-full">
            {['S','M','T','W','T','F','S'].map(d => (
              <div key={d} className="text-[8px] md:text-[9px] font-black text-slate-200 mb-2 md:mb-4 uppercase">{d}</div>
            ))}
            {Array(firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth())).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="p-1" />
            ))}
            {Array.from({ length: daysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => i + 1).map(day => {
              const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, 12);
              const dateStr = d.toISOString().split('T')[0];
              const isSelected = value === dateStr;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;
              
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`text-[10px] md:text-[11px] p-2 md:p-2.5 rounded-xl md:rounded-2xl font-black transition-all relative
                    ${isSelected 
                      ? 'bg-[#1F93D0] text-white shadow-lg shadow-blue-500/30' 
                      : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  {day}
                  {isToday && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1F93D0] rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WireframeDatePicker;
