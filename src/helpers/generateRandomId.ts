export function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?ضصثقفغعهخمنلبيسشئءؤرلاىم';
  const idLength = Math.floor(Math.random() * 6) + 25;  // Generate a random length between 20 and 25 characters
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}
