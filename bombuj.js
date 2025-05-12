async function searchResults(query) {
  console.log("Sora: searchResults called with query:", query);

  return [
    {
      title: "Forrest Gump",
      url: "https://www.bombuj.si/online-film-forrest-gump",
      thumbnail: null
    }
  ];
}

async function details(url) {
  return {
    title: "Test Movie",
    description: "This is a test description.",
    thumbnail: null,
    episodes: [{ title: "Episode 1", url }]
  };
}

async function stream(url) {
  return [{
    url: url,
    isPlayable: true
  }];
}
