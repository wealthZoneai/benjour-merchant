import React, { useState, useMemo, useCallback } from 'react';

interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isSelectable: boolean;
}

const createDate = (year: number, month: number, day: number): Date => new Date(year, month, day);

// Utility function to check if a date is between two other dates (inclusive)
const isDateBetween = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  // Ensure min is the earlier date and max is the later date
  const min = start.getTime() < end.getTime() ? start : end;
  const max = start.getTime() < end.getTime() ? end : start;
  
  const dateTs = date.getTime();
  return dateTs >= min.getTime() && dateTs <= max.getTime();
};

const DateRangeCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Memoize today's date, normalized to midnight, for comparison
  const today: Date = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generates 42 slots (6 weeks) including padding days from adjacent months
  const calendarDays: DayData[] = useMemo(() => {
    const days: DayData[] = [];
    const firstDayOfMonth = createDate(currentYear, currentMonth, 1);
    const startDayIndex = firstDayOfMonth.getDay();
    // 0 is the last day of the previous month
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Padding for previous month (Always selectable as they are in the past)
    for (let i = startDayIndex - 1; i >= 0; i--) {
      // The date needs to be checked against 'today' for isSelectable
      const date = createDate(currentYear, currentMonth - 1, daysInPrevMonth - i);
      const isFuture = date.getTime() > today.getTime();
      days.push({
        date: date,
        isCurrentMonth: false,
        isSelectable: !isFuture
      });
    }

    // Days in current month
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = createDate(currentYear, currentMonth, i);
      const isFuture = date.getTime() > today.getTime();
      days.push({
        date: date,
        isCurrentMonth: true,
        isSelectable: !isFuture // Only selectable if not a future date
      });
    }

    // Padding for next month
    const totalSlots = 42; // 6 rows * 7 days
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const date = createDate(currentYear, currentMonth + 1, i);
      const isFuture = date.getTime() > today.getTime();
      days.push({
        date: date,
        isCurrentMonth: false,
        isSelectable: !isFuture // Only selectable if not a future date
      });
    }

    return days;
  }, [currentYear, currentMonth, today]);

  const prevMonth = (): void => {
    setCurrentDate(prev => createDate(prev.getFullYear(), prev.getMonth() - 1, 1));
    // setStartDate(null);
    // setEndDate(null);
  };

  const nextMonth = (): void => {
    // Prevent navigating to future months (unless today is in that month)
    const nextDate = createDate(currentYear, currentMonth + 1, 1);
    // If the first day of the next month is later than today, stop.
    if (nextDate.getTime() > today.getTime()) {
      return;
    }
    
    setCurrentDate(prev => createDate(prev.getFullYear(), prev.getMonth() + 1, 1));
    // setStartDate(null);
    // setEndDate(null);
  };

  const resetSelection = (): void => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateClick = useCallback((date: Date): void => {
    // Final check for future dates (should be prevented by isSelectable logic, but for safety)
    if (date.getTime() > today.getTime()) {
        return; 
    }

    // Start a new range if none is selected, or if a full range is already selected
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } 
    // If only start date is selected, set the end date
    else if (startDate && !endDate) {
      if (date.getTime() === startDate.getTime()) {
        // Clear selection if the same date is clicked again
        setStartDate(null);
        setEndDate(null);
      } else {
        // Determine the correct start and end order
        if (date < startDate) {
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
      }
    }
  }, [startDate, endDate, today]);

  const getDayClasses = useCallback((date: Date): string => {
    // Base classes for all days
    const baseClasses: string[] = [
      'w-full h-10 p-1 text-sm transition-all duration-100 flex items-center justify-center rounded-lg'
    ];

    const dayData = calendarDays.find(d => d.date.getTime() === date.getTime());
    
    // Default to false if dayData isn't found (shouldn't happen)
    const isCurrentMonth = dayData?.isCurrentMonth ?? false;
    const isSelectable = dayData?.isSelectable ?? false; 
    
    const classes: string[] = [...baseClasses];

    const dateTs = date.getTime();
    
    // Safely determine min/max date for range checking
    const minDate = startDate && endDate ? (startDate < endDate ? startDate : endDate) : null;
    const maxDate = startDate && endDate ? (startDate < endDate ? endDate : startDate) : null;
    
    const isInRange = isDateBetween(date, minDate, maxDate);

    const isStart = startDate && dateTs === startDate.getTime();
    const isEnd = endDate && dateTs === endDate.getTime();
    const isSingleDay = isStart && isEnd && startDate?.getTime() === endDate?.getTime();

    // Check if the date is today's date (normalized)
    const isToday = dateTs === today.getTime();

    // 1. Selection Styles (Highest Priority)
    if (isSingleDay) {
      classes.push('bg-[#0099FF] text-white font-bold shadow-lg cursor-pointer');
    } else if (isStart) {
      classes.push('bg-[#0099FF] text-white font-bold shadow-lg cursor-pointer');
      if (isInRange) classes.push('rounded-r-none');
    } else if (isEnd) {
      classes.push('bg-[#0099FF] text-white font-bold shadow-lg cursor-pointer');
      if (isInRange) classes.push('rounded-l-none');
    } else if (isInRange) {
      // Day within the selected range (lighter background)
      classes.push('bg-blue-100 text-gray-800 rounded-none cursor-pointer');
    } else {
      // 2. Disabled/Future Date Style (Prevents click/hover styles)
      if (!isSelectable) {
        // Future dates are grayed out and not clickable
        return baseClasses.concat([
            'text-gray-300 cursor-not-allowed', 
            !isCurrentMonth ? 'opacity-50' : ''
        ]).join(' ');
      }
      
      // 3. Today's Date Style (Secondary Priority)
      if (isToday) {
         // Apply a green border for today when it's NOT selected
        classes.push('border-2 border-green-500 font-semibold'); 
      }
      
      // 4. Normal State (Selectable, Past/Present day)
      classes.push('hover:bg-gray-200 text-gray-800 cursor-pointer');
      if (startDate && !endDate) classes.push('border border-transparent hover:border-[#0099FF]');
      
      // 5. Custom logic for unselected padding days (Past/Present days)
      if (!isCurrentMonth) {
          // Dim the text and remove hover background
          classes.push('opacity-50 hover:bg-white');
          const hoverIndex = classes.indexOf('hover:bg-gray-200');
          if (hoverIndex > -1) {
              classes.splice(hoverIndex, 1);
          }
      }
    }

    // Ensure today's border doesn't conflict with selection styling if applied
    if ((isStart || isEnd) && isToday) {
        const todayBorderIndex = classes.indexOf('border-2 border-green-500 font-semibold');
        if (todayBorderIndex > -1) {
            classes.splice(todayBorderIndex, 1);
        }
    }


    return classes.join(' ');
  }, [startDate, endDate, calendarDays, today]); 

  const selectedRangeText: string = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

    if (startDate && endDate) {
      const minDate = startDate < endDate ? startDate : endDate;
      const maxDate = startDate < endDate ? endDate : startDate;
      
      const startStr = minDate.toLocaleDateString('en-US', options);
      const endStr = maxDate.toLocaleDateString('en-US', options);
      
      if (minDate.getTime() === maxDate.getTime()) return `Selected Day: ${startStr}`;
      return `Range: ${startStr} - ${endStr}`;
    }
    if (startDate) {
      const startStr = startDate.toLocaleDateString('en-US', options);
      return `Selected From: ${startStr}. Click To select End Date.`;
    }
    return 'Click to select a start date (From).';
  }, [startDate, endDate]);

  const isNextMonthDisabled: boolean = useMemo(() => {
    // Disable the next button if the next month starts after today
    const nextMonthStart = createDate(currentYear, currentMonth + 1, 1);
    return nextMonthStart.getTime() > today.getTime();
  }, [currentYear, currentMonth, today]);


  return (
    <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-xl p-4 font-inter flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <button onClick={prevMonth} className="p-1 text-gray-600 hover:text-[#0099FF] rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-lg font-bold text-gray-800">{monthNames[currentMonth]} {currentYear}</h2>
        <button 
            onClick={nextMonth} 
            disabled={isNextMonthDisabled}
            className={`p-1 text-gray-600 rounded-full ${isNextMonthDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:text-[#0099FF]'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 mb-1 text-center">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 flex-grow">
        {calendarDays.map((dayObj, i) => (
          <div
            key={i}
            className={getDayClasses(dayObj.date)}
            onClick={() => dayObj.isSelectable && handleDateClick(dayObj.date)}
          >
            {/* Always display the date number */}
            {dayObj.date.getDate()}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
        <p className={`font-medium ${startDate ? 'text-[#0099FF]' : 'text-gray-500'} truncate`}>
          {selectedRangeText}
        </p>
        <button
          onClick={resetSelection}
          disabled={!startDate}
          className="px-3 py-1 text-xs rounded-md border border-[#0099FF] text-black hover:bg-blue-50 transition disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DateRangeCalendar;
