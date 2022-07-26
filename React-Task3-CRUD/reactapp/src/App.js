import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from "./components/Product"


function App() {

  return (
    <div className="App">
      <Product />
    </div>
  );
}

export default App;
