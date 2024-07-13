import { useMemo, useState } from 'preact/hooks'
import './app.css'
import { quantum } from 'ldrs'
import SimpleLayout from './shared/components/simple-layout/simple-layout'
import { jwtDecode } from 'jwt-decode'

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

  const decodedData = useMemo(() => {
    try {
      return jwtDecode<{email?: string}>(jwt ?? '')
    } catch (e) {
      return undefined;
    }

  }, [jwt])

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
      const { result } = await window.pontem.addKeylessAccount({ jwt })
      if (result.redirectTo) {
        window.location.href = result.redirectTo
      }
      setSuccess(true);
    } catch (e) {
      const error = e as Error;
      setError(error.message ?? 'Unknown error')
    } finally {
      setLoading(false);
    }
  }


  return (
    <SimpleLayout navigateBackLink className='main'>
      <h1>{'Create keyless wallet with '}</h1>
      <h2>{decodedData?.email ?? 'msinkevic103@gmail.ocm'}</h2>
      <span>
      Keyless Wallets replace the traditional private key or seed phrases with three
      <br/>
      independently created mathematical "secret shares". 
      <br/><br/>
      The Personal Share is stored on your device, the Remote Share is encrypted on the 
      <br/>
      Self Chain, and the Recovery Share is sent to users for secure backup.
      </span>
    {loading &&
      //@ts-expect-error
      <l-quantum
        size="45"
        speed="1.75" 
        color="#6E42CA" 
      />
    }
    {!!error && <p id={'error'}>{error}</p>}
    {!!success && <p id={'success'}>Success! Redirecting...</p>}
      <button onClick={openEXT} disabled={loading || success}>Create</button>
    </SimpleLayout>
  )
}
