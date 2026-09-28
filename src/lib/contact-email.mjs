// ponytail: uses the visitor's email app; replace with a delivery endpoint when configured.
export function createContactEmail(data) {
  const body = `Name: ${data.get('name')}
E-Mail: ${data.get('email')}

${data.get('nachricht')}`;
  return `mailto:silvo@diomotion.com?subject=${encodeURIComponent('Erstes Gespräch')}&body=${encodeURIComponent(body)}`;
}
