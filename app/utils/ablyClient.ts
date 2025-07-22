import Ably from 'ably';

export const ablyClient = (contestId: string, userId: string) => {
  return new Ably.Realtime({
    authUrl: `/api/createAblyToken?contestId=${contestId}&userId=${userId}`,
  });
};
