function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // in kilometers
}

function calculateDistancesFromOrigin(route, origin) {
  const distances = route.map((point) => {
    const distanceInKm = calculateDistance(
      origin.latitude,
      origin.longitude,
      point[1],
      point[0]
    );
    const distanceInMiles = distanceInKm * 0.621371; // Convert km to miles
    return distanceInMiles;
  });

  return distances;
}

export default calculateDistancesFromOrigin;
