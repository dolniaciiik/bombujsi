import cheerio from 'cheerio';

export async function search(query) {
  const name = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
  const url = `https://www.bombuj.si/online-movie-${name}`;

  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return [];

    return [{
      title: query,
      url: url,
      thumbnail: null
    }];
  } catch (e) {
    console.error('Search error:', e);
    return [];
  }
}

export async function details(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || '';

    return {
      title,
      description,
      thumbnail: image,
      episodes: [
        {
          title: title,
          url: url
        }
      ]
    };
  } catch (e) {
    console.error('Details error:', e);
    return null;
  }
}

export async function stream(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const iframeSrc = $('iframe').attr('src');
    if (!iframeSrc) return [];

    return [{
      url: iframeSrc,
      isPlayable: true
    }];
  } catch (e) {
    console.error('Stream error:', e);
    return [];
  }
}
