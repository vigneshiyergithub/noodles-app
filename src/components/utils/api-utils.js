export const fetchData = async () => {
  return fetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json"
  ).then((resp) => resp.json());
};

export const fetchImages = async () => {
  return fetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json"
  ).then((resp) => resp.json());
};
