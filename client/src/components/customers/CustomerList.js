import axios from 'axios';
import React from 'react';

export default function CustomerList({ customers, getCustomers }) {
  function renderCustomers() {
    return customers.map((customer, i) => {
      return <li key={i}>{customer.name} </li>;
    });
  }

  return (
    <div>
      <ul>{renderCustomers()}</ul>
    </div>
  );
}
