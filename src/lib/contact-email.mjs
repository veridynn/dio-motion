// ponytail: uses the visitor's email app; replace with a delivery endpoint when configured.
export function createContactEmail(data, subject = 'Erstes Gespräch', emailLabel = 'E-Mail') {
  const body = `Name: ${data.get('name')}
${emailLabel}: ${data.get('email')}

${data.get('nachricht')}`;
  return `mailto:silvo@diomotion.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
