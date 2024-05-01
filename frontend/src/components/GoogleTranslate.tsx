import React, { useEffect, useRef } from 'react';

/**
 * Google translate component
 * @returns Google translate
 */
const GoogleTranslate = () => {
  const scriptLoaded = useRef(false);

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
          { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
          id
        );

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
          #google_translate_element img,
          .goog-te-gadget-icon {
            display: none !important;
          }
          .goog-te-gadget-simple {
            border: none !important;
            background-color: white !important;
            width: 100% !important;
            height: 100% !important;
          }
          .goog-te-menu-value {
            width: 100% !important;
            height: 100% !important;
            display: inline-block !important;
            line-height: normal !important;
            font-size: 1em !important;
          }
        `;
        document.head.appendChild(styleSheet);
      };

      document.body.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div 
      id="google_translate_element"
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }} 
    />
  );
};

export default GoogleTranslate;