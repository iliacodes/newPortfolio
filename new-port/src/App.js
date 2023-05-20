import logo from './logo.svg';
import './App.css';
import Background from './components/Background';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>

      <div className="App">
        < Navbar />
      </div>
      <div className="Background">
        < Background />
      </div>
    </div>
    );
}

export default App;
