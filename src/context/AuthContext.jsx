import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export const SESSION_KEY = '_wz_lg_session'
export const BILLING_SESSION_KEY = '_wz_b_session'

const SECRET_KEY = import.meta.env.VITE_SESSION_SECRET || 'wz_sess_k3y_9x72a1b4c8d2e5f0'

const toBase64 = (bytes) => {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

const fromBase64 = (str) => {
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export const encryptSessionData = (data) => {
  const json = JSON.stringify(data)
  const encoder = new TextEncoder()
  const dataBytes = encoder.encode(json)
  const keyBytes = encoder.encode(SECRET_KEY)
  const cipherBytes = new Uint8Array(dataBytes.length)

  for (let i = 0; i < dataBytes.length; i += 1) {
    cipherBytes[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length]
  }

  return `wz1.${toBase64(cipherBytes)}`
}

export const decryptSessionData = (raw) => {
  if (!raw || raw === 'undefined' || raw === 'null') {
    return null
  }

  if (raw.startsWith('wz1.')) {
    const payload = raw.slice(4)
    const cipherBytes = fromBase64(payload)
    const encoder = new TextEncoder()
    const keyBytes = encoder.encode(SECRET_KEY)
    const plainBytes = new Uint8Array(cipherBytes.length)

    for (let i = 0; i < cipherBytes.length; i += 1) {
      plainBytes[i] = cipherBytes[i] ^ keyBytes[i % keyBytes.length]
    }

    const decoded = new TextDecoder().decode(plainBytes)
    return JSON.parse(decoded)
  }

  // Fallback for legacy base64-encoded session entries
  const decoded = atob(raw)
  if (!decoded || decoded === 'undefined' || decoded === 'null') {
    return null
  }
  return JSON.parse(decoded)
}

const extractUserFromJwt = (token) => {
  if (!token || typeof token !== 'string') return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    const resolvedId = payload.user_id ?? payload.id ?? payload.sub
    return resolvedId !== undefined ? { id: resolvedId } : null
  } catch {
    return null
  }
}

const normalizeSessionPayload = (input, extraTokens = {}) => {
  if (input === undefined || input === null) {
    return null
  }

  if (typeof input !== 'object') {
    return {
      user: { id: input },
      access: extraTokens.access ?? null,
      refresh: extraTokens.refresh ?? null,
    }
  }

  const access = input.access ?? extraTokens.access ?? null
  const refresh = input.refresh ?? extraTokens.refresh ?? null

  const rawUser = input.user && typeof input.user === 'object' ? input.user : input
  const details = input.user_details && typeof input.user_details === 'object' ? input.user_details : {}
  const jwtUser = extractUserFromJwt(access)

  const resolvedId =
    rawUser.id ??
    rawUser.user_id ??
    rawUser.userId ??
    rawUser.pk ??
    input.user_id ??
    input.userId ??
    jwtUser?.id

  const cleanUser = { ...rawUser }
  delete cleanUser.access
  delete cleanUser.refresh
  delete cleanUser.user

  const resolvedFullname = cleanUser.fullname ?? details.fullname ?? input.fullname
  const resolvedPhone = cleanUser.phone_number ?? cleanUser.phone ?? details.phone ?? input.phone_number
  const resolvedAccountNumber =
    cleanUser.account_number ??
    input.account_number ??
    cleanUser.paybill_account_number ??
    input.paybill_account_number
  const resolvedPaybillAccountNumber =
    cleanUser.paybill_account_number ??
    input.paybill_account_number ??
    cleanUser.account_number ??
    input.account_number
  const resolvedPaybill = cleanUser.paybill ?? input.paybill

  const normalizedUser = {
    ...cleanUser,
    ...(resolvedId !== undefined ? { id: resolvedId } : {}),
    ...(resolvedFullname !== undefined ? { fullname: resolvedFullname } : {}),
    ...(resolvedPhone !== undefined ? { phone_number: resolvedPhone } : {}),
    ...(resolvedAccountNumber !== undefined ? { account_number: resolvedAccountNumber } : {}),
    ...(resolvedPaybillAccountNumber !== undefined
      ? { paybill_account_number: resolvedPaybillAccountNumber }
      : {}),
    ...(resolvedPaybill !== undefined ? { paybill: resolvedPaybill } : {}),
  }

  return {
    user: normalizedUser,
    access,
    refresh,
  }
}

export const readSession = () => {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) {
      const parsed = decryptSessionData(saved)
      const normalized = normalizeSessionPayload(parsed)
      if (normalized?.user?.id || normalized?.access) {
        return normalized
      }
    }
  } catch (e) {
    console.error('Error reading login session: ', e)
  }

  try {
    const savedBilling = sessionStorage.getItem(BILLING_SESSION_KEY)
    if (savedBilling) {
      const billing = decryptSessionData(savedBilling)
      if (billing?.userId) {
        return {
          user: { id: billing.userId },
          access: null,
          refresh: null,
        }
      }
    }
  } catch (e) {
    console.error('Error reading billing session fallback: ', e)
  }

  return null
}

export const getAccessToken = () => {
  const session = readSession()
  return session?.access || null
}

export const getRefreshToken = () => {
  const session = readSession()
  return session?.refresh || null
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession())

  const login = useCallback((userData, tokens = {}) => {
    const current = readSession()
    const incoming = normalizeSessionPayload(userData, tokens)
    if (!incoming) {
      return
    }

    const mergedUser = { ...(current?.user || {}) }
    Object.entries(incoming.user || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        mergedUser[key] = value
      } else if (!(key in mergedUser)) {
        mergedUser[key] = value
      }
    })

    const merged = {
      user: mergedUser,
      access: incoming.access ?? current?.access ?? null,
      refresh: incoming.refresh ?? current?.refresh ?? null,
    }

    if (!merged.user?.id && !merged.access) {
      return
    }

    sessionStorage.setItem(SESSION_KEY, encryptSessionData(merged))
    setSession(merged)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setSession(null)
  }, [])

  const user = session?.user ?? null
  const accessToken = session?.access ?? null
  const refreshToken = session?.refresh ?? null

  return (
    <AuthContext.Provider
      value={{
        user,
        token: accessToken,
        accessToken,
        refreshToken,
        login,
        logout,
        isAuthenticated: Boolean(accessToken || user?.id),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
