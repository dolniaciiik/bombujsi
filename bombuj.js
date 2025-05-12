async function search(query) {
  console.log("Running search with query:", query);

  // Example fallback result to confirm search works
  return [{
    title: "Test Movie: " + query,
    url: "https://www.bombuj.si/online-movie-test",
    thumbnail: null
  }];
}
  
  async function details(url) {
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
  
  async function stream(url) {
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
