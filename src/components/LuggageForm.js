// LuggageForm.jsx – UI for selecting and customizing luggage items

import React from 'react';

export default function LuggageForm({ luggageTemplates, luggageItems, setLuggageItems }) {
  const handleAddItem = (template) => {
    const count = luggageItems.filter(i => i.name === template.name).length;
    const newItem = {
      name: template.name,
      size: template.size,
      weight: 5, // default
      fragile: false,
      frequent: false,
      id: `${template.name}-${count + 1}`
    };
    setLuggageItems([...luggageItems, newItem]);
  };

  const updateItem = (id, field, value) => {
    const updated = luggageItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setLuggageItems(updated);
  };

  const removeItem = (id) => {
    setLuggageItems(luggageItems.filter(item => item.id !== id));
  };

  return (
    <div className="my-6 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select Luggage Items</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {luggageTemplates.map(template => (
          <button
            key={template.name}
            onClick={() => handleAddItem(template)}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg border"
          >
            ➕ {template.name}
          </button>
        ))}
      </div>

      {luggageItems.length > 0 && (
        <div className="space-y-4">
          {luggageItems.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{item.name} #{index + 1}</h4>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="block mb-1 font-medium">Weight (lbs):</label>
                  <input
                    type="number"
                    value={item.weight}
                    min={1}
                    max={100}
                    onChange={(e) => updateItem(item.id, 'weight', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.fragile}
                    onChange={(e) => updateItem(item.id, 'fragile', e.target.checked)}
                  />
                  <label className="text-red-600 font-medium">Fragile</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.frequent}
                    onChange={(e) => updateItem(item.id, 'frequent', e.target.checked)}
                  />
                  <label className="text-blue-600 font-medium">Frequently Used</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
