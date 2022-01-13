import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './Components/headers/Header';
import MainPages from './Components/mainPages/Pages';
import {DataProvider} from './GlobalState'

function App() {
  return (
    <DataProvider>
      
      <BrowserRouter>
        
        <div className="App">
          <Header></Header>
          <MainPages></MainPages>
        </div>

      </BrowserRouter>
    
    </DataProvider>
    
  );
}

export default App;
