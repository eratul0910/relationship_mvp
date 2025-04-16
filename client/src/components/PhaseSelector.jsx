import React from 'react';

const PhaseSelector = ({ phase, setPhase }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Conversation Phase:</label>
      <select
        value={phase}
        onChange={(e) => setPhase(e.target.value)}
        className="p-2 rounded-md border border-gray-300 w-full"
      >
        <option value="onboarding">Onboarding</option>
        <option value="emotional">Emotional Mapping</option>
        <option value="tension">Tensions & Conflict</option>
        <option value="reflection">Reflection</option>
      </select>
    </div>
  );
};

export default PhaseSelector;
