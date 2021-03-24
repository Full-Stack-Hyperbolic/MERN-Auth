import axios from 'axios';
import React, { useState } from 'react';

export default function CustomerForm({ getCustomers }) {
  const [customerName, setCustomerName] = useState('');

  async function saveCustomer(e) {
    e.preventDefault();

    try {
      const customerData = {
        name: customerName,
      };
      await axios.post('http://localhost:5000/customer/', customerData);
      getCustomers();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={saveCustomer}>
        <input
          type='text'
          placeholder='Customer Name'
          onChange={e => {
            setCustomerName(e.target.value);
          }}
          value={customerName}
        />
        <button type='submit'>Save New Customer</button>
      </form>
    </div>
  );
}
