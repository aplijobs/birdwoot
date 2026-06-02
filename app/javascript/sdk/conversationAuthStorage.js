import Cookies from 'js-cookie';

const storageKey = websiteToken => `cw_conversation_${websiteToken}`;

/**
 * Conversation widget auth is always stored in sessionStorage (per tab).
 * Any legacy cookie with the same key is removed on write/clear.
 */
export const getConversationAuthToken = websiteToken => {
  const key = storageKey(websiteToken);
  return sessionStorage.getItem(key) || null;
};

export const setConversationAuthToken = (websiteToken, token) => {
  const key = storageKey(websiteToken);
  sessionStorage.setItem(key, token);
  Cookies.remove(key);
};

export const clearConversationAuthToken = websiteToken => {
  const key = storageKey(websiteToken);
  sessionStorage.removeItem(key);
  Cookies.remove(key);
};
