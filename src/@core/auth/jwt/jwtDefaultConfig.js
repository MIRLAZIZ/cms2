export default {
  // Endpoints
  loginEndpoint: 'api/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/users/login/refresh', 
  // logoutEndpoint: '/jwt/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessTemplate',
  storageRefreshTokenKeyName: 'refreshTemplate',
  storageUserDataKeyName: 'userDataTemplate',
  storageAbilityKeyName: 'abilityTemplate',
}
