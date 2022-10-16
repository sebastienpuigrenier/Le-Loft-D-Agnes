import React from "react";
import { Route, Routes } from "react-router-dom";

import Index from "./components/pages/Index";

function App() {
  
  return (
    <div>
      <div>
        <Routes>
          <Route path="/*" element={<Index />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
