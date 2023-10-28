import ability from './ability'
/* eslint-disable */
export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'read', route.meta.resource))

// export const _ = undefined
