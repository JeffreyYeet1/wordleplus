import React, { useEffect,  } from 'react';

// Define props type
interface KeyboardListenerProps {
  onKeyPress: (key: string) => void; // Prop type for the function
}

const KeyboardListener: React.FC<KeyboardListenerProps> = ({ onKeyPress }) => {

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    // Check if the key is a letter, Backspace, or Enter
    if ((key.length === 1 && key.match(/[a-zA-Z]/) 
      || key === 'Backspace' 
      || key === 'Enter')) {
      onKeyPress(key); // Call the passed function with the key pressed
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component does not render anything
};

export default KeyboardListener;
