/* eslint-disable */
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()
        // If token is present add it to request's Authorization Header
        if (accessToken && accessToken.toLowerCase() !== "undefined") {
          // eslint-disable-next-line no-param-reassign 
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}` 
          
        }
        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config
        // if (status === 401) {
        if (
          response &&
          response.status === 401 &&
          config.url !== this.jwtConfig.loginEndpoint
        ) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken()
              .then(r => {
              
                this.isAlreadyFetchingAccessToken = false

                // Update accessToken in localStorage
                this.setToken(r.data.token)
                // this.setRefreshToken(r.data.refreshToken)

                this.onAccessTokenFetched(r.token)
              })
              .catch(err => {
                console.log(err)
              })
          } else if (
            this.isAlreadyFetchingAccessToken &&
            config.url === this.jwtConfig.refreshEndpoint
          ) {
            this.logout()
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(access => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              if (access) {
                // alert(
                //   JSON.stringify(access)
                // )
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${access}`
              }
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback =>
      callback(accessToken),
    )
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  getUserData() {
    return JSON.parse(
      localStorage.getItem(this.jwtConfig.storageUserDataKeyName),
    )
  }

  getUserAbility() {
    return JSON.parse(
      localStorage.getItem(this.jwtConfig.storageAbilityKeyName),
    )
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  setUserData(value) {
    localStorage.setItem(
      this.jwtConfig.storageUserDataKeyName,
      JSON.stringify(value),
    )
  }

  setUserAbilities(value) {
    localStorage.setItem(
      this.jwtConfig.storageAbilityKeyName,
      JSON.stringify(value),
    )
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  logout() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageUserDataKeyName)
    localStorage.removeItem(this.jwtConfig.storageAbilityKeyName)
    window.location.reload()
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refresh: this.getRefreshToken(),
    })
  }
}
