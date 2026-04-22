import React from 'react';

const App = () => {
  // ... other code
  const screen = 'ending'; // Simulating screen state

  // Render JSX based on the screen state
  return (
    <div>
      {screen === 'ending' ? (
        <a 
          href="https://lin.ee/sIbQlIJ" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 block w-full rounded-xl bg-[#06C755] px-6 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          🎁 クリア報酬を受け取る
        </a>
      ) : (
        // Other screens rendering
      )}
    </div>
  );
};

export default App;