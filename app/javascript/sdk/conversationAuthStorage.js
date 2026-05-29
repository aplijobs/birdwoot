import Cookies from 'js-cookie';

const storageKey = websiteToken => `cw_conversation_${websiteToken}`;

/** When referral is present on the widget URL, persist auth per tab (sessionStorage). */
export const useSessionStorageForConversation = referral => Boolean(referral);

export const getConversationAuthToken = (websiteToken, referral) => {
  const key = storageKey(websiteToken);
  if (useSessionStorageForConversation(referral)) {
    return sessionStorage.getItem(key) || null;
  }
  return Cookies.get(key) || null;
};

export const setConversationAuthToken = (websiteToken, referral, token) => {
  const key = storageKey(websiteToken);
  if (useSessionStorageForConversation(referral)) {
    sessionStorage.setItem(key, token);
    Cookies.remove(key);
  } else {
    Cookies.set(key, token, {
      expires: 365,
      sameSite: 'Lax',
    });
    sessionStorage.removeItem(key);
  }
};

export const clearConversationAuthToken = websiteToken => {
  const key = storageKey(websiteToken);
  sessionStorage.removeItem(key);
  Cookies.remove(key);
};
