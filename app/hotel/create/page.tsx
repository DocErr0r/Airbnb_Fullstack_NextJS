'use client'
import React, { useState } from 'react';

export interface FormData {
  title: string;
  desc: string;
  category: string;
  hoteltype: string;
  price: number;
  propertytype: string;
  selfcheckin: boolean;
  destination: string;
  adults: number;
  children: number;
  infents: number;
  totalguest: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  location: string;
  city: string;
  state: string;
  country: string;
  amenities: Record<string, boolean>;
}

const ModalForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    desc: '',
    category: 'home',
    hoteltype: 'entirehome',
    price: 1500,
    propertytype: 'home',
    selfcheckin: true,
    destination: 'Udaipur, Udaipur, Rajasthan, India',
    adults: 5,
    children: 4,
    infents: 2,
    totalguest: 11,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    location: 'Udaipur',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    amenities: {
      wifi: false,
      kitchen: false,
      washingmachine: false,
      dryer: false,
      heating: false,
      dedicatedspace: false,
      tv: false,
      hairdryer: false,
      iron: false,
      pool: false,
      hottub: false,
      freeparking: false,
      cot: false,
      kingbed: false,
      gym: false,
      bbqgrill: false,
      indoorfireplace: false,
      smokealarm: false,
      carbonmonooxidealarm: false,
      breakfast: false,
    },
  });

  // console.log(formData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked }:any = e.target;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      amenities: {
        ...prevFormData.amenities,
        [value]: checked,
      },
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // Handle form submission logic here

    // console.log(formData);

    const res = await  fetch('http://localhost:3000/api/hotel/create',{
      method:"POST",
        body:JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        }
    })
    const json = await res.json()
    console.log(json)
  };

  return (
    <div className=' w-full'>
      <div id="crud-modal" tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
        <div className="relative p-4 w-full max-w-md mx-auto max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-span-2">
                  <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea name="desc" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description" value={formData.desc} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
  <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.category} onChange={handleChange} required>
    <option value="">Select category</option>
    <option value="TV">TV/Monitors</option>
    <option value="PC">PC</option>
    <option value="GA">Gaming/Console</option>
    <option value="PH">Phones</option>
  </select>
</div>

<div className="col-span-2 sm:col-span-1">
  <label htmlFor="hoteltype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hotel Type</label>
  <select name="hoteltype" id="hoteltype" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.hoteltype} onChange={handleChange} required>
    <option value="">Select hotel type</option>
    <option value="hotel">Hotel</option>
    <option value="resort">Resort</option>
    <option value="villa">Villa</option>
    {/* Add more options as needed */}
  </select>
</div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Price" value={formData.price} onChange={handleChange} required />
                </div>
                
              
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="adults" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adults</label>
                  <input type="number" name="adults" id="adults" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Adults" value={formData.adults} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="children" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Children</label>
                  <input type="number" name="children" id="children" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Children" value={formData.children} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="infents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Infants</label>
                  <input type="number" name="infents" id="infents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Infants" value={formData.infents} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="totalguest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Guests</label>
                  <input type="number" name="totalguest" id="totalguest" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Total Guests" value={formData.totalguest} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="bedrooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bedrooms</label>
                  <input type="number" name="bedrooms" id="bedrooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="beds" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Beds</label>
                  <input type="number" name="beds" id="beds" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Beds" value={formData.beds} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="bathrooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bathrooms</label>
                  <input type="number" name="bathrooms" id="bathrooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                  <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                  <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="City" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                  <input type="text" name="state" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="State" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                  <input type="text" name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Country" value={formData.country} onChange={handleChange} required />
                </div>
                {/* Input fields */}
              </div>
              <fieldset>
                <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amenities</legend>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(formData.amenities).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2 text-gray-900 dark:text-white">
                      <input
                        type="checkbox"
                        name="amenities"
                        value={key}
                        checked={value}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-primary-600 dark:bg-gray-700 dark:border-gray-500"
                      />
                      <span className=' text-sm overflow-hidden  min-w-0'>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" className="w-full  my-3 bg-gradient-to-r text-white py-2 rounded-md px-2 from-red-500 to-pink-500">Create Hotel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
