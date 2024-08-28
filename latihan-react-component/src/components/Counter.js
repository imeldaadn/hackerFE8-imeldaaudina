import React, { useState } from 'react';
import './Counter.css';

const Counter = ({ initialCount }) => { //komponent ini menerima props initialCount. jadi initialCount angka awal dari mana kita menghitung. 
  
  // useState Hook digunakan untuk menambahkan state ke komponen fungsional.
  const [count, setCount] = useState(initialCount); //kita menggunakan useState untuk membuat state count (keadaan saat ini) dan setCount (fungsi untuk mengubah keadaan). 

  //kita membuat dua fungsi, incrementCount dan decrementCount, yang digunakan untuk menambah dan mengurangi nilai count.
  const incrementCount = () => { 
    setCount(count + 1);
  };
  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <p>Count: {count}</p> {/*kita menampilkan nilai count di dalam elemen */}
      <div>
        <button onClick={decrementCount}>Decrement</button> {/*memanggil fungsi decrementCount*/}
        <button onClick={incrementCount}>Increment</button> {/*memanggil fungsi decrementCount*/}
      </div>
    </div>
  );
};

export default Counter;
