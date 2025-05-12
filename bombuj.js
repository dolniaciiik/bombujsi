async function searchResults(query) {
  console.log("Sora: searchResults called with query:", query);

  // Example static return to confirm it works
  return [
    {
      title: "Example: " + query,
      url: "https://www.bombuj.si/online-movie-" + query,
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
