import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MyApp from './components/MyApp';
import React, { Suspense } from 'react';

//i18n use Suspense fallback="loading"
function App() {
  return (
    <Suspense fallback="loading">
      <MyApp />
    </Suspense>
  )
}

export default App;