import { useEffect, useState } from 'react';

type Props = {
  fetchNextData: () => void;
  hasMore?: boolean;
};
export const useInfinityScroll = ({ fetchNextData, hasMore }: Props) => {
  const [lastElement, setLastElement] = useState<
    HTMLDivElement | HTMLTableRowElement | null
  >(null);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = new IntersectionObserver(entries => {
      const first = entries[0];

      if (first.isIntersecting && hasMore) {
        fetchNextData();
      }
    });

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement, hasMore]);

  return { setLastElement };
};
