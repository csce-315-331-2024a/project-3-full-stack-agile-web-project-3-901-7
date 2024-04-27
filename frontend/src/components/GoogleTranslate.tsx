import React, { useEffect } from 'react';

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const id = 'google_translate_element';
    const scriptId = 'google-translate-script';
    
    // Singleton pattern for init function
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function() {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
          id
        );
      };
    }

    // Append the script if not already loaded
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      // Script cleanup if necessary
    };
  }, []); // Empty dependency array to ensure this runs only once

  // Attempt to reduce the bottom padding or margin
  return (
    <div 
      id="google_translate_element" 
      style={{ 
        float: 'right',
        paddingTop: '2px',
        paddingRight: '45px',
        marginBottom: '-20px', // Negative value to reduce space below
        lineHeight: '0'
      }} 
    />
  );
};

export default GoogleTranslate;


