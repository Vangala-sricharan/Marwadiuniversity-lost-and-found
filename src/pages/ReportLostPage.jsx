import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Upload, 
  X, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck
} from 'lucide-react';
import { locationSuggestions, itemCategories } from '../config/imageAssets';
import { isValidMUEmail, isValidGRNumber } from '../services/storage';
import { createReport } from '../services/api';

export default function ReportLostPage() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    grNumber: '',
    email: '',
    contact: '',
    itemName: '',
    category: 'electronics',
    description: '',
    location: '',
    customLocation: '',
    specificSpot: '',
    date: new Date().toISOString().split('T')[0],
    approximateTime: '',
    imageUrl: '',
  });

  // Validation errors & submission state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Field change handler with numeric 6-digit enforcement for grNumber
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'grNumber') {
      const numericVal = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, grNumber: numericVal }));
      if (errors.grNumber) {
        setErrors(prev => ({ ...prev, grNumber: null }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let err = null;
    switch (field) {
      case 'studentName':
        if (!value || !value.trim()) err = 'Student name is required.';
        else if (value.trim().length < 2) err = 'Please enter at least 2 characters.';
        break;
      case 'grNumber':
        if (!value || !String(value).trim()) {
          err = 'GR Number is required.';
        } else if (!/^\d{6}$/.test(String(value).trim())) {
          err = 'GR Number must be exactly 6 digits.';
        }
        break;
      case 'email':
        if (!value || !String(value).trim()) {
          err = 'Please enter your valid Marwadi University email ID ending with @marwadiuniversity.ac.in.';
        } else if (!isValidMUEmail(String(value).trim())) {
          err = 'Please enter your valid Marwadi University email ID ending with @marwadiuniversity.ac.in.';
        }
        break;
      case 'itemName':
        if (!value || !value.trim()) err = 'Item name is required.';
        else if (value.trim().length < 3) err = 'Please enter a descriptive item name.';
        break;
      case 'category':
        if (!value) err = 'Item category is required.';
        break;
      case 'description':
        if (!value || !value.trim()) err = 'Item description is required.';
        else if (value.trim().length < 10) err = 'Please describe identifying details (color, brand, marks).';
        break;
      case 'location':
        if (!value) err = 'Please select the campus location where the item was lost.';
        break;
      case 'customLocation':
        if (formData.location === 'Other' && (!value || !value.trim())) {
          err = 'Please specify your custom campus location.';
        }
        break;
      case 'date':
        if (!value) err = 'Date lost is required.';
        break;
      case 'approximateTime':
        if (!value || !value.trim()) err = 'Approximate time lost is required (e.g. 11:30 AM).';
        break;
      case 'contact':
        // Optional secondary contact (phone)
        if (value && value.trim()) {
          const digits = value.replace(/\D/g, '');
          if (digits.length > 0 && digits.length < 7) {
            err = 'Please enter a valid phone number (minimum 7 digits).';
          }
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setSubmissionError('Please select a valid image file (JPEG, PNG, or WEBP).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmissionError('Image file size exceeds the 5MB limit. Please choose a smaller photo.');
        return;
      }
      setSubmissionError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submits

    setSubmissionError(null);

    // Validate all required fields
    const fieldsToValidate = [
      'studentName', 
      'grNumber', 
      'email', 
      'itemName', 
      'category', 
      'description', 
      'location', 
      'date', 
      'approximateTime'
    ];
    if (formData.location === 'Other') {
      fieldsToValidate.push('customLocation');
    }

    let hasError = false;
    fieldsToValidate.forEach(field => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) {
        hasError = true;
      }
    });

    setTouched({
      studentName: true,
      grNumber: true,
      email: true,
      contact: true,
      itemName: true,
      category: true,
      description: true,
      location: true,
      customLocation: true,
      date: true,
      approximateTime: true,
    });

    if (hasError) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const effectiveLocation = formData.location === 'Other' 
        ? `Other: ${formData.customLocation.trim()}`
        : formData.location;

      const savedReport = await createReport({
        studentName: formData.studentName,
        grNumber: formData.grNumber,
        email: formData.email,
        contact: formData.contact || formData.email,
        itemName: formData.itemName,
        category: formData.category,
        description: formData.description,
        location: effectiveLocation,
        rawLocation: formData.location,
        customLocation: formData.customLocation,
        specificSpot: formData.specificSpot,
        date: formData.date,
        approximateTime: formData.approximateTime,
        imageUrl: formData.imageUrl,
        reportType: 'lost',
        type: 'lost',
      });

      // Navigate to the Phase 2 Submission Success Page with MongoDB document
      navigate('/submission-success', {
        state: { report: savedReport },
        replace: true,
      });
    } catch (err) {
      setIsSubmitting(false);
      setSubmissionError(err.message || 'An unexpected error occurred while saving your report to MongoDB Atlas.');
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to CampusFind Home</span>
          </Link>
        </div>

        {/* Page Banner Header */}
        <div className="bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold tracking-wide uppercase mb-3">
              <PlusCircle className="w-4 h-4 text-rose-400" />
              Direct Student Filing • Automatic 12-Digit Token
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Report a Lost Item
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Misplaced something at Marwadi University? Submit the details below to receive your official 12-digit registration token and track it until recovered.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <PlusCircle className="w-72 h-72 text-white" />
          </div>
        </div>

        {/* Collision or Submission Error Banner */}
        {submissionError && (
          <div className="mb-8 p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 flex items-start gap-3.5 shadow-sm animate-in fade-in">
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-rose-950">Registration Notice</h4>
              <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
                {submissionError}
              </p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
            {/* Section 1: Student Information */}
            <div className="border-b border-slate-100 pb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                1. Student Information &amp; Verification
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Institutional credentials verify university membership. Personal details remain protected under campus guidelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Student Name */}
                <div>
                  <label htmlFor="studentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('studentName')}
                    placeholder="e.g. Aarav Patel"
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                      errors.studentName && touched.studentName
                        ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                        : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.studentName && touched.studentName && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.studentName}
                    </p>
                  )}
                </div>

                {/* GR Number (Mandatory: Exactly 6 digits numeric) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="grNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      GR Number <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formData.grNumber.length}/6 digits
                    </span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="grNumber"
                    name="grNumber"
                    maxLength={6}
                    value={formData.grNumber}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grNumber')}
                    placeholder="e.g. 135062"
                    className={`w-full px-4 py-3 rounded-xl text-sm font-mono tracking-wider border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                      errors.grNumber && touched.grNumber
                        ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                        : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.grNumber && touched.grNumber ? (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.grNumber}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Must contain exactly 6 numeric digits (e.g. 135062).
                    </p>
                  )}
                </div>

                {/* Marwadi University Email ID (Mandatory: @marwadiuniversity.ac.in) */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Marwadi University Email ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="student@marwadiuniversity.ac.in"
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                      errors.email && touched.email
                        ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                        : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Must end with @marwadiuniversity.ac.in
                    </p>
                  )}
                </div>

                {/* Phone / Alternate Contact (Optional) */}
                <div>
                  <label htmlFor="contact" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Phone Number <span className="text-slate-400 text-[10px] font-normal lowercase">(optional for SMS/call)</span>
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    onBlur={() => handleBlur('contact')}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                      errors.contact && touched.contact
                        ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                        : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.contact && touched.contact ? (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.contact}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Used only for MB315 desk coordination. Never shown publicly.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Item Details */}
            <div className="border-b border-slate-100 pb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-rose-600" />
                2. Item Details
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Be specific with brands, color shades, labels, or unique stickers.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Item Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="itemName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Item Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="itemName"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      onBlur={() => handleBlur('itemName')}
                      placeholder="e.g. Blue Dell Laptop Sleeve with Charger"
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.itemName && touched.itemName
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    {errors.itemName && touched.itemName && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.itemName}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Item Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      onBlur={() => handleBlur('category')}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                    >
                      {itemCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Item Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur('description')}
                    placeholder="Provide details such as color, brand, serial markings, scratches, or contents inside..."
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all leading-relaxed ${
                      errors.description && touched.description
                        ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                        : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.description && touched.description && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Lost Location & Timing */}
            <div className="border-b border-slate-100 pb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                3. Lost Location &amp; Time
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Select from standard campus locations or provide custom location details.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Location Suggestions (Required) */}
                  <div>
                    <label htmlFor="location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Lost Location <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      onBlur={() => handleBlur('location')}
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all font-medium ${
                        errors.location && touched.location
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    >
                      <option value="">-- Select Lost Location --</option>
                      {locationSuggestions.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    {errors.location && touched.location && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Specific Spot */}
                  <div>
                    <label htmlFor="specificSpot" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Specific Spot / Room / Desk (Optional)
                    </label>
                    <input
                      type="text"
                      id="specificSpot"
                      name="specificSpot"
                      value={formData.specificSpot}
                      onChange={handleChange}
                      placeholder="e.g. Room 402, 3rd row workstation"
                      className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Conditional Custom Location if 'Other' is selected */}
                {formData.location === 'Other' && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 animate-in fade-in duration-200">
                    <label htmlFor="customLocation" className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Enter Custom Campus Location <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customLocation"
                      name="customLocation"
                      value={formData.customLocation}
                      onChange={handleChange}
                      onBlur={() => handleBlur('customLocation')}
                      placeholder="e.g. Near ATM Kiosk, Main Walkway, or Basketball Court"
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-white focus:outline-none transition-all ${
                        errors.customLocation && touched.customLocation
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-amber-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    {errors.customLocation && touched.customLocation && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.customLocation}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date Lost */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Date Lost <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={() => handleBlur('date')}
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all font-medium ${
                        errors.date && touched.date
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    {errors.date && touched.date && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Approximate Time Lost */}
                  <div>
                    <label htmlFor="approximateTime" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Approximate Time Lost <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="approximateTime"
                      name="approximateTime"
                      value={formData.approximateTime}
                      onChange={handleChange}
                      onBlur={() => handleBlur('approximateTime')}
                      placeholder="e.g. 02:30 PM (after lecture)"
                      className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        errors.approximateTime && touched.approximateTime
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    {errors.approximateTime && touched.approximateTime && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.approximateTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Item Photograph (Optional) */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Upload className="w-5 h-5 text-teal-600" />
                4. Item Photograph (Optional)
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Upload a past photo of the item or receipt to accelerate identification. You can remove it anytime before submitting.
              </p>

              {imagePreview ? (
                <div className="relative inline-block border-2 border-teal-500/40 rounded-2xl p-2 bg-teal-50/30">
                  <img
                    src={imagePreview}
                    alt="Item preview"
                    className="w-48 h-36 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    title="Remove photograph"
                    className="absolute -top-2 -right-2 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-md transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="block text-center text-[11px] text-teal-800 font-medium mt-1">
                    Photo attached
                  </span>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/60 hover:bg-teal-50/20 transition-all duration-200">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Click to select an image from your device
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Supports PNG, JPG, or WEBP (Max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submission Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>An exact 12-digit registration token (DDMMYYYYHHmm) will be automatically generated upon submission.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/"
                  className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-bold transition-colors w-full sm:w-auto text-center"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold shadow-lg shadow-rose-950/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Token &amp; Registering...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Submit Lost Item Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
