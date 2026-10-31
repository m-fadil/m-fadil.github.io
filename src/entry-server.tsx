import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { profile, socials } from './content'

export function render(url: string) {
  const name = `${profile.first} ${profile.last}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profile`,
    url,
    name: `${name} — ${profile.role}`,
    inLanguage: 'en',
    mainEntity: {
      '@type': 'Person',
      '@id': `${url}#person`,
      name,
      url,
      image: new URL(profile.avatar, url).href,
      jobTitle: profile.role,
      description: profile.lede,
      homeLocation: { '@type': 'Place', name: profile.location },
      sameAs: socials.map(({ href }) => href),
    },
  }

  return {
    html: renderToString(<StrictMode><App /></StrictMode>),
    // Keep profile content from terminating the JSON-LD script element.
    jsonLd: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
  }
}
