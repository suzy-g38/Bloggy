import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const USER_ID_COOKIE = 'blog_user_id';

export const getUserId = (): string => {
  let userId = Cookies.get(USER_ID_COOKIE);

  console.log('userId', userId);
  if (!userId) {
    userId = uuidv4();
    Cookies.set(USER_ID_COOKIE, userId, { expires: 365 }); // Cookie expires in 1 year
  }
  return userId;
};