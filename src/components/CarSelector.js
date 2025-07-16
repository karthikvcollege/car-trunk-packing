// Updated CarSelector.jsx with enhanced UI layout and dimension info

import React from 'react';
import { carModels } from '../utils/helpers';

export default function CarSelector({ selectedModel, onModelChange, seatsFolded, onSeatsToggle }) {
  const currentCarData = carModels[selectedModel];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Your Car Model</h2>
      <select
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
      >
        <option value="">-- Choose Car Model --</option>
        {Object.entries(carModels).map(([key, model]) => (
          <option key={key} value={key}>
            {model.name} ({model.year})
          </option>
        ))}
      </select>

      {/* Display car dimensions when selected */}
      {currentCarData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-3">{currentCarData.name} ({currentCarData.year}) - Trunk Specifications:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Width:</p>
              <p className="font-semibold">{currentCarData.width}"</p>
            </div>
            <div>
              <p className="text-gray-600">Height:</p>
              <p className="font-semibold">{currentCarData.height}"</p>
            </div>
            <div>
              <p className="text-gray-600">Depth (Normal):</p>
              <p className="font-semibold">{currentCarData.depth_folded}"</p>
            </div>
            <div>
              <p className="text-gray-600">Depth (Seats Folded):</p>
              <p className="font-semibold">{currentCarData.depth_unfolded}"</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Volume (Normal):</p>
              <p className="font-semibold">{currentCarData.volume_folded} cu ft</p>
            </div>
            <div>
              <p className="text-gray-600">Volume (Seats Folded):</p>
              <p className="font-semibold">{currentCarData.volume_unfolded} cu ft</p>
            </div>
          </div>
        </div>
      )}

      {/* Seats configuration */}
      {currentCarData && (
        <div className="mt-4">
          <h3 className="font-medium mb-3">Seat Configuration:</h3>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="seatsConfig"
                checked={!seatsFolded}
                onChange={() => onSeatsToggle(false)}
                className="mr-2"
              />
              <span className="text-sm">Seats Up (Normal)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="seatsConfig"
                checked={seatsFolded}
                onChange={() => onSeatsToggle(true)}
                className="mr-2"
              />
              <span className="text-sm">Seats Folded (Extended)</span>
            </label>
          </div>
          <div className="mt-2 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Current Configuration:</strong> {seatsFolded ? 'Seats Folded' : 'Seats Up'} -
              Available Space: {currentCarData.width}" × {currentCarData.height}" × {seatsFolded ? currentCarData.depth_unfolded : currentCarData.depth_folded}" 
              ({seatsFolded ? currentCarData.volume_unfolded : currentCarData.volume_folded} cu ft)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
