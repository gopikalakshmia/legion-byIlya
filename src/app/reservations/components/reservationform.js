import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ReservationForm({ roomNumber, setShowForm }) {

    const formPages = [
        {
            title: 'Personal Information',
            fields: [
                { name: 'firstName', label: 'First Name', type: 'text' },
                { name: 'lastName', label: 'Last Name', type: 'text' }
            ]
        },
        {
            title: 'Sponsor Information',
            fields: [
                { name: 'postSponsor', label: 'Post Sponsor', type: 'text' },
                { name: 'sponsorName', label: 'Sponsor Name', type: 'text' },
                { name: 'sponsorEmail', label: 'Sponsor Email', type: 'email' }
            ]
        },
        {
            title: 'Event Details',
            fields: [
                { name: 'eventType', label: 'Type of Event', type: 'text' },
                { name: 'attendees', label: 'Number of People Attending', type: 'number' }
            ]
        },
        {
            title: 'Event Date',
            fields: [
                { name: 'eventDate', label: 'Event Day', type: 'date' },
                { name: 'startTime', label: 'Start Time', type: 'select', options: generateHourOptions() },
                { name: 'endTime', label: 'End Time', type: 'select', options: generateHourOptions() }
            ]
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);

    function generateHourOptions() {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            if (i >= 0 && i <= 6) continue;
            
            const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
            const ampm = i < 12 ? 'AM' : 'PM';
            const value = i.toString().padStart(2, '0'); // 24-hour format for value
            const label = `${hour}:00 ${ampm}`;
            hours.push({ value, label });
        }
        return hours;
    }

    const formatEmailBody = (data) => {
        const formatTime = (hour) => {
            const hourNum = parseInt(hour);
            const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
            const ampm = hourNum < 12 ? 'AM' : 'PM';
            return `${hour12}:00 ${ampm}`;
        };

        return `
Dear American Legion War Memorial Commission,

My name is ${data.firstName} ${data.lastName} and I am interested in reserving room ${roomNumber}.
You can find all the relevant information below. 

[ENTER ANY ADDITIONAL DETAILS]

Best Regards,
${data.firstName} ${data.lastName}

----------------------------------------
Event Reservation Details:

Room Number: ${roomNumber}

Event Date:
- Date: ${data.eventDate}
- Start Time: ${formatTime(data.startTime)}
- End Time: ${formatTime(data.endTime)}

Personal Information:
- First Name: ${data.firstName}
- Last Name: ${data.lastName}

Sponsor Information:
- Post Sponsor: ${data.postSponsor}
- Sponsor Name: ${data.sponsorName}
- Sponsor Email: ${data.sponsorEmail}

Event Details:
- Event Type: ${data.eventType}
- Number of Attendees: ${data.attendees}
        `.trim();
    };

    const validateCurrentPage = () => {
        const currentFields = formPages[currentPage].fields;
        const newErrors = {};
        
        currentFields.forEach(field => {
            if (!formData[field.name] || formData[field.name].trim() === '') {
                newErrors[field.name] = `${field.label} is required`;
            }
        });

        // Special validation for the last page
        if (currentPage === formPages.length - 1) {
            const startHour = parseInt(formData.startTime);
            const endHour = parseInt(formData.endTime);
            if (endHour <= startHour) {
                newErrors.endTime = 'End time must be after start time';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    function handleClose() {
        setShowForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateCurrentPage()) {
            return;
        }

        if (currentPage === formPages.length - 1) {

            const subject = encodeURIComponent(`Event Reservation: ${formData.eventType} for ${formData.firstName} ${formData.lastName} in Room ${roomNumber}`);
            const body = encodeURIComponent(formatEmailBody(formData));
            const mailtoLink = `mailto:${encodeURIComponent('mercmartinelli@alwmcsf.org')}?subject=${subject}&body=${body}`;
            

            window.location.href = mailtoLink;
        } else {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(prev => prev + 1);
                setIsAnimating(false);
                setErrors({}); 
            }, 300);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
 
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const renderField = (field) => {
        const hasError = errors[field.name];
        const inputClassName = `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            hasError ? 'border-red-500' : ''
        }`;

        if (field.type === 'select') {
            return (
                <>
                    <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={`${inputClassName} bg-white`}
                    >
                        <option value="">Select time</option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {hasError && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                </>
            );
        }

        return (
            <>
                <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className={inputClassName}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                />
                {hasError && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
            </>
        );
    };

    const handleBack = () => {
        if (currentPage > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(prev => prev - 1);
                setIsAnimating(false);
                setErrors({}); // Clear errors when moving back
            }, 300);
        }
    };

    return (
        <div className="w-[400px] max-w-md flex flex-col items-center justify-start border-b-4">
            <form 
                onSubmit={handleSubmit} 
                onKeyDown={handleKeyDown}
                className="w-[400px] h-[100%] flex flex-col space-y-6 pt-4 mt-2 pb-8 "
            >
                {/* Exit button */}
                <button
                    type="button" 
                    onClick={handleClose}
                    className="place-self-end p-1 bg-[#1b3d6a] text-white rounded-3xl opacity-20 hover:opacity-100 hover:text-white transition-all duration-300 active:scale-90"
                    aria-label="Close form"
                >
                    <X size={18} />
                </button>

                {/* Progress indicator */}
                <div className="mt-6">
                    <div className="flex justify-between mb-2"></div>
                    <div className="h-1 opacity-20 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-[#1b3d6a] rounded-full transition-all duration-300"
                            style={{ width: `${((currentPage + 1) / formPages.length) * 100}%` }}
                        />
                    </div>
                </div>
                
                <div className="relative flex flex-col items-center justify-center">    
                    <div
                        className={`transform transition-all duration-300 ${
                            isAnimating ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
                        }`}
                    >
                        <h2 className="text-xl font-bold mb-4 text-[#1b3d6a] uppercase">
                            {formPages[currentPage].title}
                        </h2>
                        
                        <div className="space-y-2 flex flex-col items-center gap-4 pb-3">
                            {formPages[currentPage].fields.map((field) => (
                                <div key={field.name} className="space-y-2 w-full">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                    {renderField(field)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Button group with Back and Next/Submit buttons */}
                <div className="flex gap-4 items-center justify-center">
                    {currentPage > 0 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 bg-gray-100 text-gray-700 py-1 px-4 max-w-40 rounded-3xl border-2 hover:bg-gray-200 transition-all duration-300 active:scale-95"
                        >
                            Back
                        </button>
                    )}
                    <button
                        type="submit"
                        className="flex-1 bg-[#1b3d6a] text-white py-1 px-4 max-w-40 rounded-3xl hover:bg-white hover:text-[#1b3d6a] border-2 border-blue-900 active:scale-95 transition-all duration-300"
                    >
                        {currentPage === formPages.length - 1 ? 'Inquire' : 'Next'}
                    </button>
                </div>
            </form>

        </div>
    );
}