// useKeyPress.ts
import { useEffect } from 'react';

function useKeyPress(callback: (event: KeyboardEvent) => void, targetKey: string) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, targetKey]);
}

export default useKeyPress;
