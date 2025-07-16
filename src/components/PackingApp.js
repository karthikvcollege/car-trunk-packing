// Updated with support for fragile, frequently used, weight-aware, and rear-view-safe packing

import React, { useState } from 'react';
import CarSelector from './CarSelector';
import LuggageForm from './LuggageForm';
import TrunkVisualization from './TrunkVisualization';
import PackingStats from './PackingStats';
import { OptimizedPacker } from '../utils/packer';
import { carModels, luggageTemplates } from '../utils/helpers';

export default function PackingApp() {
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [seatsFolded, setSeatsFolded] = useState(false);
  const [luggageItems, setLuggageItems] = useState([]); // each item has: name, size, weight, fragile, frequent
  const [packedItems, setPackedItems] = useState([]);
  const [packingStats, setPackingStats] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  const handleSubmitPacking = () => {
    const carData = carModels[selectedCarModel];
    if (!carData) {
      alert('Please select a car model.');
      return;
    }

    const width = carData.width;
    const height = carData.height;
    const depth = seatsFolded ? carData.depth_unfolded : carData.depth_folded;

    if (luggageItems.length === 0) {
      alert('Please add at least one luggage item.');
      return;
    }

    const packer = new OptimizedPacker(width, height, depth);
    const packed = packer.packItems(luggageItems);

    if (packed.length === 0) {
      alert('No items could be packed with the selected configuration.');
      return;
    }

    const efficiency = packer.getPackingEfficiency();
    const fragileCount = packed.filter(p => p.fragile).length;
    const frequentCount = packed.filter(p => p.frequent).length;
    const packedWeight = packed.reduce((sum, i) => sum + (i.weight || 0), 0);

    setPackedItems(packed);
    setPackingStats({
      packed: packed.length,
      total: luggageItems.length,
      efficiency,
      fragileCount,
      frequentCount,
      weight: packedWeight
    });
    setShowVisualization(true);
    setShowWarnings(packed.length < luggageItems.length);
  };

  const handleReset = () => {
  setSelectedCarModel('');
  setSeatsFolded(false);
  setLuggageItems([]);
  setPackedItems([]);
  setPackingStats(null);
  setShowVisualization(false);
  };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">3D Car Trunk Packing Optimizer</h1>

      <CarSelector
        selectedModel={selectedCarModel}
        onModelChange={setSelectedCarModel}
        seatsFolded={seatsFolded}
        onSeatsToggle={setSeatsFolded}
      />

      <LuggageForm
        luggageTemplates={luggageTemplates}
        luggageItems={luggageItems}
        setLuggageItems={setLuggageItems}
      />

      <div className="text-center mt-6">
        <button
          onClick={handleSubmitPacking}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Optimize Packing
        </button>

        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
        >
          Reset Page
        </button>
      </div>

      {showWarnings && (
        <p className="text-red-600 text-center mt-4">
          Some fragile or frequently used items were not packed due to space or placement constraints.
        </p>
      )}

      {showVisualization && (
        <>
          <PackingStats stats={packingStats} />
          <TrunkVisualization
            trunkDims={{
              width: carModels[selectedCarModel].width,
              height: carModels[selectedCarModel].height,
              depth: seatsFolded
                ? carModels[selectedCarModel].depth_unfolded
                : carModels[selectedCarModel].depth_folded
            }}
            packedItems={packedItems}
          />
        </>
      )}
    </div>
  );
}
