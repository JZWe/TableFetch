import { useEffect, useRef } from 'react';

function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLElement>();

  useEffect(
    function () {
      function handleClick(e: Event) {
        if (ref.current && !ref.current?.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useOutsideClick;
