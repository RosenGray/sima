'use client';
import { useLogger } from '@logtail/next';



const Dummy = () => {
  const log = useLogger();
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
      <h1>Dummy</h1>
      <button onClick={() => {
        console.log('button clicked with logtail');
        log.debug('User logged in', { userId: 42 });
      }}>Click me</button>
    </div>
  )
}

export default Dummy;