import React, { useEffect } from 'react';

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const id = 'google_translate_element';
    const scriptId = 'google-translate-script';
    
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function() {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
          id
        );
      };
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
    };
  }, []); 

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        float: 'right',
        paddingTop: '2px',
        paddingRight: '45px',
        marginBottom: '-20px',
        lineHeight: '0'
      }} 
    />
  );
};

export default GoogleTranslate;


