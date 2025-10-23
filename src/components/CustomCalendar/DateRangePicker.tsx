import React, { useState, useRef, useEffect, useCallback } from "react";
import { Calendar } from "lucide-react";
import DateRangeCalendar from "./DateRangeCalendar";

const DateRangePicker: React.FC = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [displayRange, setDisplayRange] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node) &&
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setIsPopoverOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // FIX APPLIED HERE
    const calculateDisplayRange = useCallback(() => {
        const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let rangeText = today.toLocaleDateString("en-US", options); // Default to today's date

        if (startDate && endDate) {
            const minDate = startDate < endDate ? startDate : endDate;
            const maxDate = startDate < endDate ? endDate : startDate;

            const startStr = minDate.toLocaleDateString("en-US", options);
            const endStr = maxDate.toLocaleDateString("en-US", options);

            // 1. Check if the dates are the same (single-day selection)
            if (minDate.getTime() === maxDate.getTime()) {
                rangeText = startStr; // Display just the single date
            } else {
                // 2. Display the full range
                rangeText = `${startStr} - ${endStr}`;
            }
        } else if (startDate) {
            rangeText = startDate.toLocaleDateString("en-US", options);
        }

        setDisplayRange(rangeText);
    }, [startDate, endDate]);


    useEffect(() => {
        calculateDisplayRange();
    }, [startDate, endDate, calculateDisplayRange]);

    const handleApply = useCallback((start: Date | null, end: Date | null) => {
        setStartDate(start);
        setEndDate(end);
        setIsPopoverOpen(false);
    }, []);

    const openPopover = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();

            const calendarWidth = 300;
            const leftPosition = rect.right - calendarWidth;
            const finalLeft = Math.max(8, leftPosition);

            setPopoverStyle({
                position: "fixed",
                top: rect.bottom + 8,
                left: finalLeft,
                right: 'auto',
                zIndex: 50,
            });
        }
        setIsPopoverOpen(true);
    };

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                onClick={openPopover}
                className="inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
                <span className="mr-2">{displayRange}</span>
                <Calendar className="h-5 w-5" />
            </button>

            {isPopoverOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                    />
                    <div
                        ref={calendarRef}
                        style={popoverStyle}
                        className="z-50"
                    >
                        <DateRangeCalendar
                            isopen={setIsPopoverOpen}
                            onApply={handleApply}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default DateRangePicker;