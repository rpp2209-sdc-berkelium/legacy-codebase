import React from 'react';
import styles from '../overview.module.css';

import Thumbnail from './Thumbnail.jsx';
import { useProductContext } from "../../Context/ContextProvider.jsx";
import { useOverviewContext } from "../Context/OverviewProvider.jsx";

function ThumbnailCarousel({ type, selected, setSelected }) {
	const { products, currentProductId, setCurrentProductId } = useProductContext();
	const { pStyles, setStyles } = useOverviewContext();

	if (pStyles[currentProductId]) {
		const carousel = pStyles[currentProductId].map(style => (
			<Thumbnail
				carouselType={type}
				type={type === 'styles__carousel' ? 'thumbnail-square' : 'thumbnail-rounded'}
				key={style.style_id}
				photos={style.photos}
				style={style}
				setSelected={setSelected}
			/>));

		return (
			<div className={`${styles[type]} ${styles.carousel}`}>
				{carousel}
			</div>
		)
	} else {
		return (
			<h3>No Styles to Pass to TN</h3>
		)
	}

};

export default ThumbnailCarousel;