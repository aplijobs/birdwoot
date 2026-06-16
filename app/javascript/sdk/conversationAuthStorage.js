import Cookies from 'js-cookie';

const conversationKey = websiteToken => `cw_conversation_${websiteToken}`;

/**
 * Referral from run({ referral }) or, if omitted, from the host page ?referral=.
 * Non-empty referral enables sessionStorage (one conversation per browser tab).
 */
export const resolveReferralForSDK = explicitReferral => {
  const explicit =
    explicitReferral == null ? '' : String(explicitReferral).trim();
  if (explicit) return explicit;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('referral');
    return fromUrl && String(fromUrl).trim() ? String(fromUrl).trim() : '';
  } catch {
    return '';
  }
};

export const getConversationAuthToken = (websiteToken, useSession) => {
  const key = conversationKey(websiteToken);
  if (useSession) {
    try {
      return window.sessionStorage.getItem(key) || undefined;
    } catch {
      return undefined;
    }
  }
  return Cookies.get(key);
};

export const setConversationAuthToken = (websiteToken, token, useSession) => {
  const key = conversationKey(websiteToken);
  if (useSession) {
    try {
      window.sessionStorage.setItem(key, token);
    } catch {
      // sessionStorage may be unavailable; token still works for current load via iframe
    }
    Cookies.remove(key);
  } else {
    Cookies.set(key, token, {
      expires: 365,
      sameSite: 'Lax',
    });
  }
};

export const removeConversationAuthToken = (websiteToken, useSession) => {
  const key = conversationKey(websiteToken);
  if (useSession) {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
  } else {
    Cookies.remove(key);
  }
  Cookies.remove('cw_conversation');
};
