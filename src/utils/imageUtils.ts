export function getPhoneImagePath(deviceName: string | undefined): string {
  if (!deviceName || typeof deviceName !== 'string') {
    console.error('Invalid device name:', deviceName);
    return '/images/placeholder.png';
  }
  // Remove any special characters and convert to lowercase
  const formattedName = deviceName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `/images/${formattedName}.png`;
}