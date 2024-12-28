'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const [status, setStatus] = useState('Processing...');
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      fetch('/api/payment-success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setStatus('Payment successful! Check your email for confirmation.');
        } else {
          setStatus('There was an issue with your payment. Please contact support.');
          setError(data.error || 'Unknown error occurred');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus('An error occurred. Please try again later.');
        setError(error.message);
      });
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{status}</p>
      {error && <p>Error details: {error}</p>}
    </div>
  );
}
