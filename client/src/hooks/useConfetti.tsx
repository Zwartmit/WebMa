import { useState, useCallback } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);
  const { width, height } = useWindowSize();

  // Show confetti for 5 seconds
  const triggerConfetti = useCallback(() => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 5000);
  }, []);

  // Render confetti component when active
  const ConfettiComponent = useCallback(() => {
    if (!isActive) return null;
    
    return (
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={200}
        colors={['#F8C1D8', '#D0BFFF', '#FFD966', '#FFF8E6']}
      />
    );
  }, [isActive, width, height]);

  return {
    isActive,
    triggerConfetti,
    ConfettiComponent,
  };
};

export default useConfetti;
