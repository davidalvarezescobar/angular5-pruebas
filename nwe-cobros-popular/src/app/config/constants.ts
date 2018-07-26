export class CommonConstants {
  static NWE = 'NWE';
  static FILE_CONFIG = 'config.json';
  static KEY_CONFIG = 'CONFIG';
  static FUNCIONALITY = 'pending-sign';

  // Headers
  static HEADER_LANGUAGE = 'x-user-language';
  static HEADER_SESSION = 'x-session-id';

  // Language
  static DEFAULT_LANGUAGE = 'es_ES';
  static KEY_LANGUAGE = 'OBSEmpresasLang';
  static END_POINT_LANGUAGE = '/v1/language';

  static KEY_SESSION = 'global-session-id';
  static KEY_USER = 'user';

  // Error without conexion
  static MESSAGES: any = {
    session: {
      es_ES: 'En estos momentos no podemos atenderte.',
      ca_ES: 'En aquests moments no podem atendre\'t.',
      eu_ES: 'Momentu honetan ez zaitugu joango.',
      en_GB: 'In these moments we can\'t attend you.',
      de_DE: 'In diesen Momenten können wir nicht zu dir bedienen.'
    },

    auth: {
      es_ES: 'Tu sesión ha caducado por inactividad. Por favor, vuelve a introducir tus claves para continuar trabajando. Gracias.',
      ca_ES: 'La teva sessió ha caducat per inactivitat. Si us plau, torna a introduir les claus per continuar treballant. Gràcies.',
      eu_ES: 'Zure saioa iraungita dago inaktibitateagatik. Sartu teklak berriro lanera jarraitzeko. Eskerrik asko.',
      en_GB: 'Your session has expired due to inactivity. Please, log in again to continue working. Thank you.',
      de_DE: 'Ihre Sitzung ist aufgrund von Inaktivität abgelaufen. Bitte geben Sie Ihre Schlüssel erneut ein, um weiter zu arbeiten. Danke.'
    }
  };
}
