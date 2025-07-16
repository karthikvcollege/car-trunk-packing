import React from 'react';

export default function VolumeWarning({ luggageItems, trunkVolume }) {
  const calculateVolume = (item) => {
    const { width, height, depth } = item.dimensions || {};
    return (width * height * depth) || 0;
  };

  const totalRequestedVolume = luggageItems.reduce(
    (sum, item) => sum + calculateVolume(item),
    0
  );

  const exceeds = totalRequestedVolume > trunkVolume;

  return (
    <div className={`mt-6 p-4 rounded-lg text-sm ${exceeds ? 'bg-red-100 border border-red-300 text-red-800' : 'bg-green-50 text-green-700'}`}>
      <strong>Total Requested Volume:</strong> {(totalRequestedVolume / 1728).toFixed(2)} cu ft<br />
      <strong>Trunk Capacity:</strong> {trunkVolume.toFixed(2)} cu ft
      {exceeds && (
        <p className="mt-2 font-medium">
          Warning: The requested volume exceeds the trunk's capacity. Consider removing some items or folding the seats.
        </p>
      )}
    </div>
  );
}
