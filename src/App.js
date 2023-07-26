import React from 'react';
import Sidebar from './Sidebar';

const defaultComponents = [
  { id: 'comp-1', name: 'Component 1' },
  { id: 'comp-2', name: 'Component 2' },
  { id: 'comp-3', name: 'Component 3' },
];

function App() {
  return (
    <div className="App">
      <Sidebar defaultComponents={defaultComponents} />
    </div>
  );
}

export default App;
