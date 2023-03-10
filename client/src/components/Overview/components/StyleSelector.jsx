import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Button from './Button.jsx';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';

import { useOverviewContext } from "../Context/OverviewProvider.jsx";
import { useProductContext } from '../../Context/ContextProvider.jsx';
import useFetchProduct from '../../Hooks/useFetchProduct.jsx';

import globalStyles from "../../Home/home.module.css";
import styles from '../overview.module.css';

function StyleSelector () {
	const sizes = ['S', 'M', 'L', 'XL', '2XL'];

	// Controlled Drop-Down Component Values
	const [size, setSize] = useState('');
	const [qty, setQty] = useState(0);

	// DOM Element Refs
	const sizeRef = useRef('');
	const qtyRef = useRef(0);

	// Overview Context
	const { allProductStyles, currentProductStyles, selectedStyle } = useOverviewContext();
	const { currentProductId, addToOutfit } = useProductContext();
	const { response } = useFetchProduct(currentProductId);

	// =============================================
	//            FUNCTIONALITY TO-DOs
	// =============================================

	// If the default ‘Select Size’ is currently selected:
	// Clicking this button should open the size dropdown,
	// and a message should appear above the dropdown stating “Please select size”.

	// If there is no stock: This button should be hidden

	// If both a valid size and valid quantity are selected: Clicking this button will add the product to the user’s cart.
	const handleAddToBag = async (e) => {
		e.preventDefault();

		const currentSize = sizeRef.current[sizeRef.current.selectedIndex].value;
		const currentQty = qtyRef.current[qtyRef.current.selectedIndex].value;

		if (currentSize === 'Select Size') {
			window.alert('Please select size');
			console.log('Please select size');

		} else if (currentQty === 'Quantity') {
			window.alert('Please select a Quantity');
			console.log('Please select a Quantity');

		} else {
			const selected = currentProductStyles && currentProductStyles.filter(style => style.style_id === selectedStyle.style_id)
			const skus = selected[0].skus;
			const keys = Object.keys(selected[0].skus);
			var selectedSKU;

			keys.forEach(sku => {
				if (skus[sku].size === currentSize) {
					selectedSKU = sku;
				}
			});

			await axios.post('/api/cart', { sku_id: selectedSKU, count: currentQty });
			console.log(`Added ${currentQty} size ${skus[selectedSKU].size} to Bag!`);
		}

	};

	const handleDropdownChange = (e) => {
		if (e.target.id === 'size') {
			setSize(e.target.value);
		} else if (e.target.id === 'qty') {
			setQty(e.target.value);
		}
	};

	const handleAddToOutfitList = () => {
		const url = selectedStyle && selectedStyle.photos[0].thumbnail_url;
		addToOutfit(response, url);
	};

	return (
		selectedStyle &&
		<div className={styles['overview__style-selector']}>
			<h3 className={styles['style-selector__header']}>Style &gt; <span className={styles['header-undecorated']}>{selectedStyle.name}</span></h3>
			<ThumbnailCarousel type="images__carousel"  />

			<select
				className={`${styles['drop-down']} ${globalStyles['btn-width']} ${globalStyles.btn}`}
				ref={sizeRef}
				id="size" value={size}
				onChange={handleDropdownChange}
			>
				<option value="Select Size">Select Size</option>
				{sizes.map((size, index) => (<option aria-label="size-option" key={index} value={`${size}`}>{size}</option>))}
			</select>

			<select
				className={`${styles['drop-down']} ${globalStyles['btn-width']} ${globalStyles.btn}`}
				ref={qtyRef}
				id="qty"
				value={qty}
				onChange={handleDropdownChange}
			>
				<option value="Quantity">Quantity</option>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (<option aria-label="qty-option" key={num} value={num}>{num}</option>))}
			</select>

			<div className={styles['style-selector__buttons']}>
				<Button value="add-to-bag" type='style-selector__button' handleClick={handleAddToBag}>+ Add to Bag</Button>
				<Button value="add-to-outfit-star" type='style-selector__button' handleClick={handleAddToOutfitList}>⭐</Button>
			</div>
		</div>
	)
};

export default StyleSelector;