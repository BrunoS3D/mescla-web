interface Window {
  dataLayer: any[];
  Cookiebot: {
    consent: {
      necessary: boolean;
      preferences: boolean;
      statistics: boolean;
      marketing: boolean;
    };
    consented: boolean;
    declined: boolean;
    hasResponse: boolean;
    doNotTrack: boolean;
    regulations: {
      gdprApplies: boolean;
      ccpaApplies: boolean;
      lgpdApplies: boolean;
    };
    show(): void;
    hide(): void;
    renew(): void;
    getScript(URL: string, async: boolean, callback: void): void;
    runScripts(): void;
    withdraw(): void;
    submitCustomConsent(
      optinPreferences: boolean,
      optinStatistics: boolean,
      optinMarketing: boolean,
    ): void;
  };
}
