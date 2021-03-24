import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  async function delCustomer(customerName) {
    const deletedCustomer = {
      name: customerName,
    };
    console.log(deletedCustomer);
    await axios.delete('http://localhostl:5000/customer/', deletedCustomer);
    // console.log(name);
  }

  async function getCustomers() {
    const customersRes = await axios.get('http://localhost:5000/customer/');
    setCustomers(customersRes.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <CustomerForm getCustomers={getCustomers} />
      <CustomerList customers={customers} />
    </div>
  );
}
