import { useState, useEffect } from 'react';
import useRatingsAvg from "./useRatingsAvg/useRatingsAvg.jsx";
import axios from 'axios';

const useOutfitList = () => {
  const [outfitItems, setOutfitItems] = useState([]);
  const [outfitPhotoUrls, setOutfitPhotoUrls] = useState({});
	const [outfitItemRatings, setOutfitItemRatings] = useState({});

		// =============================================
		//                  Effects
		// =============================================
    // get the items once on first load
		useEffect(() => {
			const storedItems = window.localStorage.getItem('OUTFIT_ITEMS');
			if ( storedItems !== null ) setOutfitItems(JSON.parse(storedItems));

			const storedPhotos = window.localStorage.getItem('OUTFIT_PHOTOS');
			if ( storedPhotos !== null ) setOutfitPhotoUrls(JSON.parse(storedPhotos));

			const storedRatings = window.localStorage.getItem('OUTFIT_RATINGS');
			if ( storedRatings !== null ) setOutfitItemRatings(JSON.parse(storedRatings));
		}, []);

		// set the outfit items in local storage, whenever they change
		useEffect(() => {
			window.localStorage.setItem('OUTFIT_ITEMS', JSON.stringify(outfitItems));
			window.localStorage.setItem('OUTFIT_PHOTOS', JSON.stringify(outfitPhotoUrls));
			window.localStorage.setItem('OUTFIT_RATINGS', JSON.stringify(outfitItemRatings));
		}, [outfitItems, outfitPhotoUrls, outfitItemRatings]);

		// =============================================
		//             Utility Functions
		// =============================================
		// Add an item to the outfit list
		const addToOutfit = (product, ...args) => {
			// Related Product Logic
			if (typeof args[0] === 'function') {
				const cp = product;
				const fetchData = args[0];

				if (!outfitItems.some(item => item.id === cp.id)) {
					fetchData(`products/${cp.id}/styles`)
					.then((styles) => {
						var itemPhotoUrl = styles.results[0].photos[0].thumbnail_url;
						setOutfitPhotoUrls({...outfitPhotoUrls, [cp.id]: itemPhotoUrl});
						setOutfitItems([...outfitItems, cp]);
					})
				}
			} else { // Overview Logic
				if (!outfitItems.some(item => item.id === product.id)) {
					const url = args[0];
					setOutfitPhotoUrls({...outfitPhotoUrls, [product.id]: url});
					setOutfitItems([...outfitItems, product]);
				}
			}
		};

		// Remove an item from the outfit list
		const removeFromOutfit = (id) => {
			var newState = outfitItems.filter((item) => {
				return item.id !== id;
			});
			setOutfitItems(newState);
		};

  return { outfitItems, outfitPhotoUrls, addToOutfit, removeFromOutfit, outfitItemRatings, setOutfitItemRatings };
};

export default useOutfitList;