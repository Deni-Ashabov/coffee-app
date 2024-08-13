import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import coffee1 from './assets/img/coffee-1.png';
import coffee2 from './assets/img/coffee-2.png';
import coffee3 from './assets/img/coffee-3.png';
import coffee4 from './assets/img/coffee-4.png';
import coffee5 from './assets/img/coffee-5.png';

const coffees = [
  { id: 1, image: coffee1, name: 'Latte', price: 150 },
  { id: 2, image: coffee2, name: 'Espresso', price: 100 },
  { id: 3, image: coffee3, name: 'Cappuccino', price: 120 },
  { id: 4, image: coffee4, name: 'Macchiato', price: 130 },
  { id: 5, image: coffee5, name: 'Americano', price: 110 },
  { id: 6, image: coffee5, name: 'Mocha', price: 140 },
];

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage coffees={coffees} />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
};

export default App;
