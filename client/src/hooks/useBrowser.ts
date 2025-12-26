import { useState, useEffect } from 'react';

export enum Browser {
  Firefox = 'firefox',
  Edge = 'edge',
  Chrome = 'chrome',
  Safari = 'safari',
  Unknown = 'unknown',
}

export const useBrowser = () => {
  const [browser, setBrowser] = useState<Browser>(Browser.Unknown);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('firefox')) setBrowser(Browser.Firefox);
    else if (userAgent.includes('edg')) setBrowser(Browser.Edge);
    else if (userAgent.includes('chrome')) setBrowser(Browser.Chrome);
    else if (userAgent.includes('safari')) setBrowser(Browser.Safari);
    else setBrowser(Browser.Unknown);
  }, []);

  return browser;
};