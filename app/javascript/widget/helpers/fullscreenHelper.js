const buildURL = ({ origin, searchParams }) => {
  const resultURL = new URL('/widget', origin);
  searchParams.forEach(item => {
    resultURL.searchParams.append(item.key, item.value);
  });

  return resultURL.toString();
};

export const openFullScreenWindow = (
  origin,
  websiteToken,
  locale,
  referral,
  conversationCookie
) => {
  try {
    const searchParams = [
      { key: 'website_token', value: websiteToken },
      { key: 'locale', value: locale },
    ];
    if (conversationCookie) {
      searchParams.unshift({ key: 'cw_conversation', value: conversationCookie });
    }
    if (referral) {
      searchParams.push({ key: 'referral', value: referral });
    }
    const windowUrl = buildURL({
      origin,
      searchParams,
    });
    const newWindow = window.open(windowUrl, '_self');
    newWindow.focus();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
