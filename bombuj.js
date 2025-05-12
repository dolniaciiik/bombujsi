async function search(query) {
    const name = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
    const url = `https://www.bombuj.si/online-movie-${name}`;
  
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return [];
  
    return [{
      title: query,
      url: url,
      thumbnail: null // You could update this later in details()
    }];
  }
  
  async function details(url) {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
  
    const title = doc.querySelector('h1')?.textContent.trim();
    const description = doc.querySelector('meta[name="description"]')?.content || '';
    const image = doc.querySelector('meta[property="og:image"]')?.content || '';
  
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
  }
  
  async function stream(url) {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
  
    const iframe = doc.querySelector('iframe');
    if (!iframe) return [];
  
    return [{
      url: iframe.src,
      isPlayable: true
    }];
  }