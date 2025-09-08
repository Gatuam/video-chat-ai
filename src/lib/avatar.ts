export const generateAvatarUrl = (username: string): string => {
  return `https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(username)}`;
};
