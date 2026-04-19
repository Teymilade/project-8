export function validatePostcode(postcode: string): boolean {
  const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, '');
  return cleaned.startsWith('BS') || cleaned.startsWith('BA');
}

export function getPostcodeErrorMessage(): string {
  return 'We currently only serve Bristol (BS) and Bath (BA) postcodes. Please check back soon for expansion to your area.';
}
