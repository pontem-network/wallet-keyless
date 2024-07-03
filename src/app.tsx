import { useState } from 'preact/hooks'
import './app.css'
import { jwtDecode } from 'jwt-decode';

import { quantum } from 'ldrs'

quantum.register()


export function App() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const parseJWTFromURL = (url: string): string | null => {
    const urlObject = new URL(url);
    const fragment = urlObject.hash.substring(1);
    const params = new URLSearchParams(fragment);
    return params.get('id_token');
  };
   
  const jwt = parseJWTFromURL(window.location.href)

  const openEXT = async () => {
    setLoading(true);
    setError('');

    if (!jwt) {
      setLoading(false);
      setError('No jwt')
      return;
    };

    if (!window.pontem) {
      setLoading(false);
      setError('Please install Pontem Wallet')
      return;
    }

    if (!window.pontem.addKeylessAccount) {
      setLoading(false);
      setError('Please update Pontem Wallet to version 2.6.7')
      return;
    }

    try {
      await window.pontem.addKeylessAccount({ jwt })
      setSuccess(true);
    } catch (e) {
      const error = e as Error;
      setError(error.message ?? 'Unknown error')
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
    {loading &&
      <l-quantum
        size="45"
        speed="1.75" 
        color="#6E42CA" 
      />
    }
    {!!error && <p id={'error'}>{error}</p>}
    {!!success && <p id={'success'}>Success! Check your wallet!</p>}
      <button onClick={openEXT} disabled={loading || success}>GO</button>
    </>
  )
}
