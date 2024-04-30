import React, { useEffect, useRef } from 'react';

const GoogleTranslate: React.FC = () => {
  const scriptLoaded = useRef<boolean>(false);
  
  useEffect(() => {
    const id = 'google_translate_element';
    const scriptId = 'google-translate-script';

    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en',layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
          id
        );
      };

      document.body.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
    };
  }, []);


  return (
    <div 
      id="google_translate_element" 
      style={{ 
        float: 'right',
        paddingLeft: '14px',
        paddingRight: '14px',
        lineHeight: '0',
      }} 
    />
  );
};

export default GoogleTranslate;
