const searchInputLocation = document.getElementById("searchInputLocation");
const inputDateIn = document.getElementById("searchInputDateIn")
const inputDateOut = document.getElementById("searchInputDateOut")
const inputGuests = document.getElementById("searchInputGuests")
const searchButton = document.getElementById("searchButton")

const homePage = document.getElementById("homePage")
const searchPage = document.getElementById("searchPage")

let map;
let bounds;

async function initMap() {
	const {Map} = await google.maps.importLibrary("maps");
	map = new Map(document.getElementById("map"), {
		center: userLocation ? userLocation : {lat: 28.7041, lng: 77.1025},
		zoom: 8,
		zoomControl: true,
		scaleControl: true,
		rotateControl: true,
		fullscreenControl: true,
		mapTypeControl: false,
		streetViewControl: false,
	});
}

function getListings() {
	const location = searchInputLocation.value
	const checkInDate = inputDateIn.value
	const checkOutDate = inputDateOut.value
	const guests = inputGuests.value

	bounds = new google.maps.LatLngBounds();

	// Validate form inputs.
	if (location === "" || checkInDate === "" || checkOutDate === "" || guests === "") {
		alert("All Fields are mandatory.");
		return;
	}

	// console.log(`Test-> ${location} -- ${checkInDate} -- ${checkOutDate} -- ${guests}`)

	// const url = 'https://airbnb13.p.rapidapi.com/search-location?location=Goa&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&currency=INR';
	const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${guests}&currency=INR`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '474b39897dmshc565e30d5f66081p1ea33fjsnbb226effb621',
			'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
		}
	};

	fetch(url, options).then(response => response.json()).then(data => {
		// code to display the listings goes here
		console.log(data);

		if (data.error) {
			alert(data.message);
			throw data.message;
		}
		const listingsContainer = document.getElementById("listings-container");
		// Clear previous listings
		listingsContainer.innerHTML = "";
		// Append new listings
		data.results.forEach(listing => {
			const listingCard = createListingCard(listing);
			listingsContainer.appendChild(listingCard);
		});
		map.fitBounds(bounds); //center map to marker locations
		showHideHomePage(false)
	}).catch(error => console.error('Error:', error));
}

function createListingCard(listing) {
	const listingCard = document.createElement("div");
	listingCard.classList.add("listing-card");

	const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
	const matrixOptions = {
		origins: [userLocation],
		destinations: [{lat: listing.lat, lng: listing.lng}],
		travelMode: 'DRIVING',
		unitSystem: google.maps.UnitSystem.METRIC
	};
	// Call Distance Matrix service
	service.getDistanceMatrix(matrixOptions, callback);

	// Callback function used to process Distance Matrix response
	function callback(response, status) {
		if (status !== "OK") {
			alert("Error with distance matrix");
			return;
		}

		// console.log(response);

		listingCard.innerHTML = `
        <img src="${listing.images[0]}" alt="${listing.name}">
        <div class="listing-info">
            <div><h4>${listing.name}</h4></div>
            <div>${listing.type} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</div>
			<div>${listing.previewAmenities.join(" · ")}</div>
            <div>${listing.address}</div>
            <div>${response.rows[0].elements[0].distance.text}(s) away from you</div>
			<div>
				<div class="listingRating">${listing.rating} <span>&#x2605;</span> (${listing.reviewsCount} reviews)</div>
				<div class="listingPrice">&#x20b9 ${listing.price.total}<span> /night</span></div>
			</div>
            
        </div>
		`;

		// 	Add host details
		const hostBox = document.createElement("div")
		hostBox.classList.add("hostBox")
		hostBox.innerHTML = `
		<img class=hostThumbnail src="${listing.hostThumbnail}" alt="host">
		`

		// Add a superhost indicator if the host is a superhost
		if (listing.isSuperhost) {
			const superhostIndicator = document.createElement("img");
			superhostIndicator.classList.add("superHost")
			superhostIndicator.src = "assets/superhost_badge.png"
			superhostIndicator.alt = "superhost"
			hostBox.appendChild(superhostIndicator)
		}
		listingCard.appendChild(hostBox)

		// Add a 'rare find' indicator if the listing is a 'rare find'
		if (listing.rareFind) {
			const rareFindIndicator = document.createElement("p");
			rareFindIndicator.classList.add('rareFind')
			rareFindIndicator.innerText = "Rare Find";
			listingCard.appendChild(rareFindIndicator);
		}

		// Add View Directions Button
		const directionButton = document.createElement("button");
		directionButton.classList.add('dirBtn');
		directionButton.innerText = "Get Directions";
		directionButton.addEventListener("click", function () {
			openDirections(listing.lat, listing.lng);
		});
		const directionLogo = document.createElement('img')
		directionLogo.src = "assets/directions.png"
		directionButton.appendChild(directionLogo)
		// listingCard.appendChild(directionButton);
		listingCard.querySelector(".listing-info").appendChild(directionButton);

		// Add a button for booking cost breakdown
		const costButton = document.createElement("button");
		costButton.classList.add("costBDButton");
		costButton.innerText = "Booking Cost Breakdown";
		costButton.addEventListener("click", () => showBookingCostBreakdown(listing));
		// listingCard.appendChild(costButton);
		listingCard.querySelector(".listing-info").appendChild(costButton);
	}


	// Create a marker on the map
	const marker = new google.maps.Marker({
		position: {lat: listing.lat, lng: listing.lng},
		// icon: "https://maps.google.com/mapfiles/kml/shapes/lodging.png",
		label: {
			text: listing.name.split(' ')[0] + " " + listing.name.split(' ')[1],
			fontSize: "16px",
			fontWeight: "bold",

		},
		animation: google.maps.Animation.DROP,
		map: map,
	});
	// marker.setMap(map)

	bounds.extend(marker.position);


	return listingCard;
}

function showBookingCostBreakdown(listing) {
	const modal = document.createElement("div");
	modal.classList.add("modalBookingCost")

	// Add booking cost breakdown to the modal
	modal.innerHTML = `
        <h3>Booking Cost Breakdown</h3>         
    `;
	for (const priceItem of listing.price.priceItems) {
		const para = document.createElement("p")
		para.innerHTML = `
			<p>${priceItem.title}:  <span>&#x20b9 ${priceItem.amount.toFixed(2)}</span></p>
		`
		modal.appendChild(para)
	}
	const total = document.createElement("p")
	total.innerHTML = `<p>Total Cost:  <span>&#x20b9 ${listing.price.total.toFixed(2)}</span></p>`
	modal.appendChild(total);

	// Add a close button to the modal
	const closeButton = document.createElement("button");
	closeButton.innerText = "Close";
	closeButton.addEventListener("click", () => modal.style.display = "none");
	modal.appendChild(closeButton);

	document.body.appendChild(modal);
}

function openDirections(latitude, longitude) {
	// Open Google Maps directions in a new tab
	const url = `https://www.google.com/maps/dir//${latitude},${longitude}`;
	window.open(url, "_blank");
}

function showHideHomePage(show) {
	homePage.className = show ? '' : 'hiddenElement'
	searchPage.className = !show ? '' : 'hiddenElement'
}

function noLinkAlert() {
	alert("No Links Added")
}

let userLocation = {};
// window.onload = () => {}

document.addEventListener("DOMContentLoaded", () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			userLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			initMap().catch((error) => {
				console.log(error)
			});
			searchButton.addEventListener("click", () => getListings());
		});
	}
})
