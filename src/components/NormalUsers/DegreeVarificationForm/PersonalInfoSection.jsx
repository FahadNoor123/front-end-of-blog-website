import React from 'react';

export function PersonalInfoSection({ initialData, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      studentName: formData.get('studentName'),
      whatsappNumber: formData.get('whatsappNumber'),
      currentAddress: formData.get('currentAddress'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div >
        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
          Student Name  <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          placeholder='HARRY POTTER'
          type="text"
          name="studentName"
          id="studentName"
          defaultValue={initialData.studentName}
          required
          className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={{ height: '3rem' }} 
        />
      </div>

      <div>
        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
          WhatsApp Number  <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="tel"
          name="whatsappNumber"
          id="whatsappNumber"
          defaultValue={initialData.whatsappNumber}
          required
          placeholder='03032762255'
          pattern="[0-9]{11}"
          className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={{ height: '3rem' }}
        />
      </div>

      <div>
        <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700">
          Current Address  <span className="text-red-500 text-lg">*</span>
        </label>
        <textarea
        placeholder="Hose No '131' Block 'C' Bhittaiabad karachi Gulistan-e-jauher"
          name="currentAddress"
          id="currentAddress"
          defaultValue={initialData.currentAddress}
          required
          rows={3}
        
          className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={{ height: '3rem' }}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  );
}