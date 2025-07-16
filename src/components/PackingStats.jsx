// PackingStats.jsx

import React from 'react';

export default function PackingStats({ stats }) {
  return (
    <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Packing Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Items Packed:</p>
          <p className="font-semibold">{stats.packed} / {stats.total}</p>
        </div>
        <div>
          <p className="text-gray-600">Efficiency:</p>
          <p className="font-semibold">{stats.efficiency.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-gray-600">Fragile Items:</p>
          <p className="font-semibold text-red-600">{stats.fragileCount}</p>
        </div>
        <div>
          <p className="text-gray-600">Frequently Used:</p>
          <p className="font-semibold text-blue-600">{stats.frequentCount}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">Total Weight:</p>
          <p className="font-semibold">{stats.weight} lbs</p>
        </div>
      </div>
    </div>
  );
}
