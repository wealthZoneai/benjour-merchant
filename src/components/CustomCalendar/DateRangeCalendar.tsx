import React, { useState, useMemo, useCallback } from 'react';

interface DayData {
    date: Date;
    isCurrentMonth: boolean;
    isSelectable: boolean;
}

const createDate = (year: number, month: number, day: number): Date => new Date(year, month, day);

const isDateBetween = (date: Date, start: Date | null, end: Date | null): boolean => {
    if (!start || !end) return false;
    const min = start.getTime() < end.getTime() ? start : end;
    const max = start.getTime() < end.getTime() ? end : start;

    const dateTs = date.getTime();
    return dateTs >= min.getTime() && dateTs <= max.getTime();
};

// --- DateRangeCalendar Component (Modified for Single-Day Selection) ---

interface DateRangeCalendarProps {
    isopen: (value: boolean) => void;
    onApply: (startDate: Date | null, endDate: Date | null) => void; 
}

const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({ isopen, onApply }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

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

    // (calendarDays memoization remains unchanged)
    const calendarDays: DayData[] = useMemo(() => {
        const days: DayData[] = [];
        const firstDayOfMonth = createDate(currentYear, currentMonth, 1);
        const startDayIndex = firstDayOfMonth.getDay();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Padding for previous month
        for (let i = startDayIndex - 1; i >= 0; i--) {
            const date = createDate(currentYear, currentMonth - 1, daysInPrevMonth - i);
            const isFuture = date.getTime() > today.getTime();
            days.push({ date, isCurrentMonth: false, isSelectable: !isFuture });
        }

        // Days in current month
        const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const date = createDate(currentYear, currentMonth, i);
            const isFuture = date.getTime() > today.getTime();
            days.push({ date, isCurrentMonth: true, isSelectable: !isFuture });
        }

        // Padding for next month
        const totalSlots = 42; 
        const remainingSlots = totalSlots - days.length;
        for (let i = 1; i <= remainingSlots; i++) {
            const date = createDate(currentYear, currentMonth + 1, i);
            const isFuture = date.getTime() > today.getTime();
            days.push({ date, isCurrentMonth: false, isSelectable: !isFuture });
        }

        return days;
    }, [currentYear, currentMonth, today]);

    const prevMonth = (): void => {
        setCurrentDate(prev => createDate(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const nextMonth = (): void => {
        const nextDate = createDate(currentYear, currentMonth + 1, 1);
        if (nextDate.getTime() > today.getTime()) {
            return;
        }
        setCurrentDate(prev => createDate(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const applySelection = (): void => {
        let finalStartDate = startDate;
        let finalEndDate = endDate;

        // CRUCIAL: If only the start date is selected, treat it as a single-day range
        if (finalStartDate && !finalEndDate) {
            finalEndDate = finalStartDate;
        }

        // Ensure the dates are passed back in chronological order
        if (finalStartDate && finalEndDate && finalStartDate.getTime() > finalEndDate.getTime()) {
            [finalStartDate, finalEndDate] = [finalEndDate, finalStartDate];
        }
        
        onApply(finalStartDate, finalEndDate);
        isopen(false);
    };
    
    const clearSelection = (): void => {
        setStartDate(null);
        setEndDate(null);
    };


    // MODIFIED: Selection logic
    const handleDateClick = useCallback((date: Date): void => {
        if (date.getTime() > today.getTime()) {
            return;
        }

        if (!startDate || (startDate && endDate)) {
            // Case 1: No selection or a full range is already selected. Start a new selection.
            setStartDate(date);
            setEndDate(null);
        }
        else if (startDate && !endDate) {
            // Case 2: Only start date is selected.
            if (date.getTime() === startDate.getTime()) {
                // If the same date is clicked, clear the selection.
                setStartDate(null);
                setEndDate(null);
            } else {
                // If a new date is clicked, set the range.
                if (date < startDate) {
                    setEndDate(startDate); // The old start becomes the new end
                    setStartDate(date);    // The new click becomes the new start
                } else {
                    setEndDate(date);      // The new click becomes the end
                }
            }
        }
    }, [startDate, endDate, today]);

    
    // (getDayClasses remains unchanged as its logic already handles single-day vs range display)
    const getDayClasses = useCallback((date: Date): string => {
        const baseClasses: string[] = [
            'w-full h-10 p-1 text-sm transition-all duration-100 flex items-center justify-center rounded-lg'
        ];

        const dayData = calendarDays.find(d => d.date.getTime() === date.getTime());
        const isCurrentMonth = dayData?.isCurrentMonth ?? false;
        const isSelectable = dayData?.isSelectable ?? false;

        const classes: string[] = [...baseClasses];
        const dateTs = date.getTime();

        const minDate = startDate && endDate ? (startDate < endDate ? startDate : endDate) : null;
        const maxDate = startDate && endDate ? (startDate < endDate ? endDate : startDate) : null;

        const isInRange = isDateBetween(date, minDate, maxDate);
        const isStart = startDate && dateTs === startDate.getTime();
        const isEnd = endDate && dateTs === endDate.getTime();
        const isSingleDay = isStart && isEnd && startDate?.getTime() === endDate?.getTime();
        const isToday = dateTs === today.getTime();

        if (isSingleDay) {
            classes.push('bg-[#0099FF] text-white font-bold shadow-lg cursor-pointer');
        } else if (isStart) {
            classes.push('bg-[#0099FF] text-white font-bold shadow-lg cursor-pointer');
            if (isInRange) classes.push('rounded-r-none');
        } else if (isEnd) {
            classes.push('bg-[#0099FF] text-white font-bold shadow-lg cursor-pointer');
            if (isInRange) classes.push('rounded-l-none');
        } else if (isInRange) {
            classes.push('bg-blue-100 text-gray-800 rounded-none cursor-pointer');
        } else {
            if (!isSelectable) {
                return baseClasses.concat([
                    'text-gray-300 cursor-not-allowed',
                    !isCurrentMonth ? 'opacity-50' : ''
                ]).join(' ');
            }

            if (isToday) {
                classes.push('border-2 border-green-500 font-semibold');
            }

            classes.push('hover:bg-gray-200 text-gray-800 cursor-pointer');
            if (startDate && !endDate) classes.push('border border-transparent hover:border-[#0099FF]');

            if (!isCurrentMonth) {
                classes.push('opacity-50 hover:bg-white');
                const hoverIndex = classes.indexOf('hover:bg-gray-200');
                if (hoverIndex > -1) {
                    classes.splice(hoverIndex, 1);
                }
            }
        }

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
            // Hint text updated to reflect that "Apply" is now valid even with only one date selected
            return `Selected Day/Start: ${startStr}. Click to select End Date or click 'Apply'.`; 
        }
        return 'Click to select a date or start a range.';
    }, [startDate, endDate]);

    const isNextMonthDisabled: boolean = useMemo(() => {
        const nextMonthStart = createDate(currentYear, currentMonth + 1, 1);
        return nextMonthStart.getTime() > today.getTime();
    }, [currentYear, currentMonth, today]);


    return (
        <div 
            className="w-[300px] bg-white rounded-2xl shadow-xl p-4 font-inter flex flex-col"
            onClick={e => e.stopPropagation()} 
        >
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
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayObj, i) => (
                    <div
                        key={i}
                        className={getDayClasses(dayObj.date)}
                        onClick={() => dayObj.isSelectable && handleDateClick(dayObj.date)}
                    >
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
                    onClick={applySelection}
                    // MODIFIED: Button is active if AT LEAST a start date is selected.
                    disabled={!startDate} 
                    className="px-3 py-1 text-xs rounded-md border border-[#0099FF] text-black hover:bg-blue-50 transition disabled:opacity-50"
                >
                    Apply
                </button>
                <button
                    onClick={clearSelection}
                    disabled={!startDate && !endDate}
                    className="px-3 py-1 text-xs rounded-md border border-gray-400 text-black hover:bg-gray-100 transition disabled:opacity-50 ml-2"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default DateRangeCalendar;