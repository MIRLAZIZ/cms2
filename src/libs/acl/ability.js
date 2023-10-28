/* eslint-disable */
import { Ability } from '@casl/ability'
import { initialAbility } from './config'
import useJwt from '@/auth/jwt/useJwt'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const ability = useJwt.getUserAbility()
const existingAbility = ability || null

export default new Ability(existingAbility || initialAbility)
