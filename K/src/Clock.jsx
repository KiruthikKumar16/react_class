import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // cleanup — runs on unmount, prevents the timer leaking
    return () => clearInterval(timer);
  }, []); // run once on mount

  return <p>Current time: {time.toLocaleTimeString()}</p>;
}

export default Clock;
