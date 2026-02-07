import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-2xl font-bold">Главная</div>} />
    </Routes>
  )
}

export default App
