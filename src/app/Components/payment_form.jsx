import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PaymentsServices from '../Services/payments_services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaymentForm() {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();
  const id = router.query.payment;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (id !== undefined) {
      try {
        const response = await PaymentsServices.Create(id, date,  amount);
        if (response) {
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } 
      
      } catch (error) {
        console.error('Error creating purchase:', error);
        
      }
    }
  }


  return (
    <> <ToastContainer />
    <form className="w-1/2 flex flex-col gap-6 justify-center p-6 bg-white rounded-lg shadow-xl"  onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Fecha de compra:</label>
        <input
        required
        value={date}
          type="date"
          name="purchase_date"
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Monto:</label>
        <input
        required
        value={amount}
          type="number"
            step="0.01"
            min="0"
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex flex-row justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-tertiary hover:bg-tertiaryDark py-2 px-4 rounded-md font-montserrat text-white"
        >
          Registrar compra
        </button>
        <Link href="/">
          <button className="bg-primary hover:bg-primaryDark py-2 px-4 rounded-md font-montserrat text-white">
            Cancelar
          </button>
        </Link>
      </div>
    </form>
    </>
  )
}

export default PaymentForm