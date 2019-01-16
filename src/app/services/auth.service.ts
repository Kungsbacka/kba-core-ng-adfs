import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, OidcClientSettings, User, Log } from 'oidc-client';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());

  private user: User = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    Log.logger = console;
    Log.level = Log.DEBUG;

    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(currentUrl?: string): Promise<void> {
    return this.manager.signinRedirect({state: currentUrl});
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
        this.user = user;
        if (this.user.state) {
          console.log('AuthService::completeAuthentiction (' + this.user.state + ')');
          this.router.navigateByUrl(this.user.state);
        }
    });
}
}
// Secret (arkiv2): zo6XrKZDZwOE82Xeo27ETEqTZAc9_uRrASR15upV

export function getClientSettings(): UserManagerSettings {
  const result: UserManagerSettings = {
    authority: 'https://fs.kungsbacka.se/adfs/',
    client_id: 'http://internal.kba.local',
    redirect_uri: 'https://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'https://localhost:4200/',
    response_type: 'token id_token',
    scope: 'openid profile',
    filterProtocolClaims: true,
    loadUserInfo: false,
    metadata:  {
      issuer: 'https://fs.kungsbacka.se/adfs',
      authorization_endpoint: 'https://fs.kungsbacka.se/adfs/oauth2/authorize/',
      userinfo_endpoint: 'https://fs.kungsbacka.se/adfs/userinfo',
      jwks_uri: 'https://fs.kungsbacka.se/adfs/discovery/keys',
    },
    signingKeys: [{
        'kty': 'RSA',
        'use': 'sig',
        'alg': 'RS256',
        'kid': 'T588uiRNbGFFK1Bh4ewdNnsy6YI',
        'x5t': 'T588uiRNbGFFK1Bh4ewdNnsy6YI',
        'n': 'idKPBjANBgNg4gUodu2yuvNj39LRjACUL5ao5P1vIZLH932Y922Lb-Bb0WzTj0F-kwEjIQUyWaNOKy6jgGemo4Ttran1WhLHRg6sdA7cPqvesH6fadml5iHBQHuecLSs6roiMgXUOS-pzwBUPizXXoR1_FW_Hx2SZQx4htdka2-MCft1xl-ZOaLzkZkCmNwgFzt4nZRKsMxkSQsI2iq4ebsRZqrK7myzBd1JTiTrzxqWXiCSEGVTRWAHRGKK8Tib2UiLsvs927VJk7005QWY-l3NvfuLZfH9SA58dESiuUoKxo_xV0jsJ_xrP_GyYr7sPGyoE2Qmlp5RuE5yoBUNqw',
        'e': 'AQAB',
        'x5c': ['MIIC3DCCAcSgAwIBAgIQU3bMF\/cg56FL9CN0dtzssDANBgkqhkiG9w0BAQsFADAqMSgwJgYDVQQDEx9BREZTIFNpZ25pbmcgLSBmcy5rdW5nc2JhY2thLnNlMB4XDTE3MDYwMTA3MDAwM1oXDTIwMTEyNzA3MDAwM1owKjEoMCYGA1UEAxMfQURGUyBTaWduaW5nIC0gZnMua3VuZ3NiYWNrYS5zZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAInSjwYwDQYDYOIFKHbtsrrzY9\/S0YwAlC+WqOT9byGSx\/d9mPdti2\/gW9Fs049BfpMBIyEFMlmjTisuo4BnpqOE7a2p9VoSx0YOrHQO3D6r3rB+n2nZpeYhwUB7nnC0rOq6IjIF1Dkvqc8AVD4s116EdfxVvx8dkmUMeIbXZGtvjAn7dcZfmTmi85GZApjcIBc7eJ2USrDMZEkLCNoquHm7EWaqyu5sswXdSU4k688all4gkhBlU0VgB0RiivE4m9lIi7L7Pdu1SZO9NOUFmPpdzb37i2Xx\/UgOfHREorlKCsaP8VdI7Cf8az\/xsmK+7DxsqBNkJpaeUbhOcqAVDasCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAVwOnljhs6DbnGcVvAB6+7NWETXIl4X8tOeHJxgN3OWcE+nNm8rlXb\/8lTyjG0nw2lVEDLrnyyjUVZNhdVC0qfDzcM4on0AlCHUowvYs5gy2qupB9sODtaVeTPpt\/XITC9fSzCF9hXNfshYgkvBdZ3UxLdF14Tj99Pd82OSCWmeAbvlFO\/CgUA4zT9psBawfU3wXYYBhuT1iaIEWWa7KQNPQTeFD3T1pVuPM9Ma4QGdvTUw93cmlBNCufqXW972kdCyXqmsYsRpDnCydZPdPQ6Fq7xb4wp0CUiJkPnrclsFWPbnMaWIUgWX+hAZOJ\/NQrI3FSKe51CWKd\/IgFO40xQQ==']}]
  };
//    result.prompt
  return result;
}
