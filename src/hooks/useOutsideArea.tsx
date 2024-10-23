import React from 'react';

export const useOutsideArea = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  handler: () => void,
) => {
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
