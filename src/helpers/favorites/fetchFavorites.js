import { updateFavoriteMovie } from "../../app/apiFunctions"

export const updateFavorites = async (accountId, sessionId, movieId, isFavorite) => {
    try {
    console.log("Updating favorite:", { accountId, sessionId, movieId, isFavorite });
    await updateFavoriteMovie(accountId, sessionId, movieId, isFavorite);
    const favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []); //set la tap hop ko theo thu tu => dung de loai bo dup
    console.log("Account ID:", accountId);
console.log("Session ID:", sessionId);
    if (isFavorite) {
        favorites.add(movieId)
    } else {
        favorites.delete(movieId)
    }
    localStorage.setItem("favorites", JSON.stringify([...favorites])); //=> tu set thanh array
} catch (error) {
    console.error("Faile to update fav movie:", error)
}
}