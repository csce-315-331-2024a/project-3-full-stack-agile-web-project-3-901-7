// src/TextSizeContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from 'react';

type TextSizeContextType = {
  enlargeText: () => void;
  resetTextSize: () => void;  // Adding a reset function
};

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export const useTextSize = () => {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
};

interface TextSizeProviderProps {
  children: ReactNode;
}

const defaultTextSize = '1rem'; // Define the default text size

export const TextSizeProvider: React.FC<TextSizeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Load initial text size from localStorage or use default
    const initialSize = localStorage.getItem('textSize') || defaultTextSize;
    document.documentElement.style.setProperty('--text-size', initialSize);
  }, []);

  const enlargeText = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--text-size'));
    const newSize = `${currentSize + 0.1}rem`;
    document.documentElement.style.setProperty('--text-size', newSize);
    localStorage.setItem('textSize', newSize);
  };

  const resetTextSize = () => {
    document.documentElement.style.setProperty('--text-size', defaultTextSize);
    localStorage.setItem('textSize', defaultTextSize);
  };

  return (
    <TextSizeContext.Provider value={{ enlargeText, resetTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};
