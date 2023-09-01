const searchInputLocation = document.getElementById("searchInputLocation");
// const inputDateIn = document.getElementById("searchInputDateIn")
// const inputDateOut = document.getElementById("searchInputDateOut")
// const inputGuests = document.getElementById("searchInputGuests")
const searchButton = document.getElementById("searchButton")

const homePage = document.getElementById("homePage")
const searchPage = document.getElementById("searchPage")

const rapidApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5953486a04msh0f7f3ec335f2438p133af0jsna221e7dcb613',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

let map;
async function initMap() {
	const {Map} = await google.maps.importLibrary("maps");
	map = new Map(document.getElementById("map"), {
		center: userLocation ? userLocation : {lat: 28.7041, lng: 77.1025},
		zoom: 8,
	});
}


function getListings() {
	const location = searchInputLocation.value
	const checkInDate = "2023-10-16"
	const checkOutDate = "2023-10-17"
	const guests = 1

	// const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${guests}&currency=INR`;
	console.log(myData.results)

	const listingsContainer = document.getElementById("listings-container");

	// Clear previous listings
	listingsContainer.innerHTML = "";

	// Append new listings
	myData.results.forEach(listing => {
		const listingCard = createListingCard(listing);
		listingsContainer.appendChild(listingCard);
	});
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
		// console.log(response.rows[0].elements[0].distance.text);

		listingCard.innerHTML = `
        <img src="${listing.images[0]}" alt="${listing.name}">
        <div class="listing-info">
            <div><h4>${listing.name}</h4><div>
            <p>${listing.type} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</p>
            <p>${listing.price.total} ${listing.price.currency} per night</p>
            <p>${listing.address}</p>
            <p>Distance from you: ${response.rows[0].elements[0].distance.text}</p>
           <p>Amenities: ${listing.previewAmenities.join(", ")}</p>
        </div>
    `;
	}


	// Create a marker for this listing on the map
	const marker = new google.maps.Marker({
		position: {lat: listing.lat, lng: listing.lng},
		// icon: "https://maps.google.com/mapfiles/kml/shapes/lodging.png",
		label: {
			text: listing.name.split(' ')[0] + " " + listing.name.split(' ')[1],
			// color: "#00fff7",
			fontSize: "16px",
			fontWeight: "bold",

		},
		animation: google.maps.Animation.DROP,
		map: map,
	});
	// marker.setMap(map)

	return listingCard;
}


function showHideHomePage(show) {
	homePage.className = show ? '' : 'hiddenElement'
	searchPage.className =  !show ? '' : 'hiddenElement'
}
function noLinkAlert(){
	alert("No Links Added")
}

let userLocation={};

window.onload = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			userLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			initMap().catch((error)=>{console.log(error)});
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	searchButton.addEventListener("click", async () => {
		getListings()
		showHideHomePage(false)
	});
})





// Data Example
const myData = {
	"error": false,
	"headers": {
		"response_time": 1017,
		"response_timestamp": "2023-09-01T05:29:29.064Z",
		"response_id": 25673715
	},
	"results": [
		{
			"id": "590038",
			"url": "https://www.airbnb.com/rooms/590038",
			"deeplink": "https://www.airbnb.com/rooms/590038?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 1,
			"name": "Heritage Apt 2@ Hauz Khas Village",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/7517954/21419416_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517098/0ef515a9_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517885/0f379d5c_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7518010/32ea77cc_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7518076/f7630c35_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517700/ab7ea418_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7518171/6990fac4_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517611/9a0a9c0d_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7518209/ab489800_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7518275/aaef0ff3_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517254/f522a886_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517182/6e7aaea9_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517823/a132cd42_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7517029/c6b10877_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7516976/78a3e6dd_original.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/e05ca607-cfef-4df7-b4a3-e0033f041ba7.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": true,
			"lat": 28.5545,
			"lng": 77.19417,
			"persons": 2,
			"reviewsCount": 300,
			"rating": 4.87,
			"type": "Entire rental unit",
			"userId": 2428122,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				3,
				4,
				5,
				133,
				8,
				10,
				77,
				85,
				86,
				89,
				91,
				28,
				93,
				30,
				94,
				96,
				33,
				34,
				35,
				36,
				100,
				37,
				39,
				103,
				40,
				104,
				41,
				44,
				45,
				46,
				49,
				50,
				51,
				55,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 67,
				"currency": "USD",
				"total": 67,
				"priceItems": [
					{
						"title": "$52 x 1 night",
						"amount": 52
					},
					{
						"title": "Airbnb service fee",
						"amount": 9
					},
					{
						"title": "Taxes",
						"amount": 6
					}
				]
			}
		},
		{
			"id": "31999434",
			"url": "https://www.airbnb.com/rooms/31999434",
			"deeplink": "https://www.airbnb.com/rooms/31999434?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 2,
			"name": "Private Room near New Delhi Station & City Centre",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/ac1b6973-e328-4a95-b7f6-c8a90a9c0a21.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/72ea3832-1e61-469f-ac1e-8a034f208317.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6a388a28-49b4-45b2-bf02-1430e0edf032.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/eab5dce2-ea7c-47d9-91e2-b167acdfb967.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9dc47ca2-7790-42b5-877f-aa4b6f155c0f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/81243983/03dee2a2_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ea90bf64-4233-489c-bf3b-465bceb5e195.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7099c2ae-4c0d-4aa1-a19e-13db6697b1b9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/71f3d5f7-81fa-45f4-be3c-e0c3426f283f.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/1e052fd9-a08e-4365-8f45-b107af76f88f.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.64167,
			"lng": 77.21468,
			"persons": 2,
			"reviewsCount": 238,
			"rating": 4.55,
			"type": "Room in bed and breakfast",
			"userId": 14999954,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				66,
				3,
				4,
				5,
				392,
				10,
				394,
				139,
				77,
				16,
				85,
				86,
				28,
				30,
				31,
				415,
				35,
				36,
				37,
				38,
				39,
				103,
				40,
				104,
				232,
				42,
				43,
				44,
				45,
				46,
				51,
				55
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 21,
				"currency": "USD",
				"total": 21,
				"priceItems": [
					{
						"title": "$16 x 1 night",
						"amount": 16
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "897799097410551144",
			"url": "https://www.airbnb.com/rooms/897799097410551144",
			"deeplink": "https://www.airbnb.com/rooms/897799097410551144?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 3,
			"name": "Beautiful Living room and Bedroom with Balcony",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/1b2e9f3a-9eff-4950-aab3-24b9900ad29e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/f3d20285-8538-4fc3-a44e-0f77481c1a2a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/d857b247-e07c-4018-91e3-890ca41de7c3.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/63ad68cb-bb69-41ea-bf66-30d0c765fd1d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/27168027-136e-46a5-bfd2-9de5101c691c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/de879cf1-42e8-4151-89af-271c4970c2bd.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/8f375352-08ae-4b76-886b-6fc83006b9c6.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/0b7a22ef-33ee-45b1-a9d1-315744e03935.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/72429220-a6af-48cd-8e0a-900a3fa5873f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/0934b216-5a7e-4f65-836b-49c6365d3e6c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/2c6ca6f2-998f-4f35-87e0-24eb78ed7341.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/b88c0941-d8e5-4f58-8c2b-4f1ff274e10e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/e04035b0-634e-4328-9f3b-fc590be96891.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/2e89dd48-3f86-40fd-9b11-8619d476ba3c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/3c76b84f-7da5-4c47-a50c-26525c482a00.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/2c0740cd-5f5e-425c-9640-69204ee7d071.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/5e2a520a-a745-4e6c-82e2-74d09b0153a0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/4b30e5f6-6979-435c-9373-d5e929c14eb2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/65332170-5225-4774-ad5e-0fa8ff5854de.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/45b092e0-6282-4f7f-b30c-827fe4aa8325.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/a3c113af-dee1-49c7-b3e3-370109bfb462.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/45916c3c-781e-45b3-ae0e-4aee185cefdb.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/4704e767-a241-4739-90c4-87ee4a7e5d90.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/93fe606d-7313-4b32-91fb-42c5764bd555.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/b817882f-80e5-47aa-b500-d5b5464ce96e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/842ddc61-cd01-4838-adfd-9310abf023c8.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/982367bb-2d2c-4f48-89ca-e891c368a496.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/8ecda954-0310-4bd7-8abe-b58e14485259.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/fd1531ac-357f-4764-9931-07afe922b857.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-897799097410551144/original/c4eb6b4f-7139-4efc-872a-00e2266839a3.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/eca4e831-196b-4d78-9493-af3ae0f2c53f.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": true,
			"lat": 28.52483,
			"lng": 77.13712,
			"persons": 3,
			"reviewsCount": 33,
			"rating": 4.82,
			"type": "Entire rental unit",
			"userId": 112344136,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				4,
				5,
				392,
				9,
				137,
				11,
				139,
				12,
				146,
				21,
				23,
				89,
				665,
				93,
				30,
				415,
				671,
				672,
				611,
				100,
				37,
				40,
				41,
				364,
				45,
				46,
				47,
				51,
				53,
				57,
				510
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 40,
				"currency": "USD",
				"total": 40,
				"priceItems": [
					{
						"title": "$30 x 1 night",
						"amount": 30
					},
					{
						"title": "Cleaning fee",
						"amount": 1
					},
					{
						"title": "Airbnb service fee",
						"amount": 5
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "815658865079930902",
			"url": "https://www.airbnb.com/rooms/815658865079930902",
			"deeplink": "https://www.airbnb.com/rooms/815658865079930902?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 4,
			"name": "Duchatti@haveli loft in Green Park",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/a57b9af6-8277-4a08-a3f2-38fa17af4b9e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/95f388f8-ef92-453e-9271-edbed88b0bb1.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/eae0a092-14d8-4aff-9f44-ee9cc186a06b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/10292993-d8f0-4b15-acfd-3da02f840ee4.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/096feb3b-3a41-472c-a319-d78658f7d9c7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/da3928cd-7288-486d-a9c0-eaa5ab0a55c8.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/b5918000-93df-468b-a711-a862a46d5cfc.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/9e019339-cf53-4b16-8175-f4ac83c590fe.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/9ae80df4-7d42-4ee1-9fc9-6e597c2d1acf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/f3bfeb3f-ec41-4718-8e8c-69cedf3e8a99.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-815658865079930902/original/aaed5ec4-c02d-4111-a893-ea382d46a1e9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/24cb8ba3-00ff-468d-a6fe-98ba4363f500.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/315640b0-f69d-47e2-92b3-27a16b3d2008.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d5894746-86d5-4437-89b5-bbd307f3622a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/545bda42-9093-45c7-a731-edb1b6e1b014.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6297111f-d57e-4f85-857c-c6b9c81ce073.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/aa22c205-1907-4038-8ff0-4ef3f820ccbc.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1578f5ba-133b-4c23-ac79-e5e8cfb4bc7a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0c8bd305-317e-4be2-af43-4cdc9df4f123.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/75830bb0-4416-4622-a3f9-6ae76bd8c67c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7f325d76-4551-4e65-a319-7b6c59658777.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5b1fa238-ecc4-400a-8101-76c0be38f963.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/32bc2b18-0a7f-45ff-ae85-3e3376cb9a83.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/06de0529-b104-4f7b-a37a-16ca962999ab.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7c056ae4-c30d-410c-9289-afb3ff80d577.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6054cb07-c782-48e9-9302-9eb6e0eb3163.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/8d892704-0d26-419f-bf5e-7bf58752bee3.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.55924,
			"lng": 77.20518,
			"persons": 2,
			"reviewsCount": 49,
			"rating": 4.94,
			"type": "Entire home",
			"userId": 166198415,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				4,
				100,
				5,
				8,
				9,
				46
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 54,
				"currency": "USD",
				"total": 54,
				"priceItems": [
					{
						"title": "$42 x 1 night",
						"amount": 42
					},
					{
						"title": "Airbnb service fee",
						"amount": 7
					},
					{
						"title": "Taxes",
						"amount": 5
					}
				]
			}
		},
		{
			"id": "828712888918632502",
			"url": "https://www.airbnb.com/rooms/828712888918632502",
			"deeplink": "https://www.airbnb.com/rooms/828712888918632502?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 5,
			"name": "Ficus - a cosy terrace room with open space",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-828712888918632502/original/ee9ccf02-8774-456d-82cb-e9fd80016093.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/8aa5a752-c7c8-471b-b1a7-9d71b58092e8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/bcba099c-ea48-442d-b525-3c9a61f1360c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/be7f9666-9ea1-4c51-9d68-d97f880a826f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/68f6f0b4-241a-4874-942f-2801616c1940.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-828712888918632502/original/0211384b-e84a-491e-a940-022ef90c8717.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/cf92e334-957d-4724-abc2-c29636381f3b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/16450eb1-6510-4983-be98-cc56e4744322.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/9c1fc42d-f9d1-405e-a757-662415b38bce.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-828712888918632502/original/7fce8fd8-c9e7-4a07-97e1-e9d5e8635501.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-828712888918632502/original/d91f1f9d-f15d-4c98-a2b5-f5591e957c6e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-828712888918632502/original/5173e2be-0e02-42bd-a048-cede47ae5051.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-828712888918632502/original/39816417-9751-4fdd-9c8f-85b208859189.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-828712888918632502/original/0516f2e6-8972-4c38-94dd-439488e09ad8.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/1c97bae9-cb3f-4f32-b1c5-c596981031c9.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.55623,
			"lng": 77.20025,
			"persons": 1,
			"reviewsCount": 36,
			"rating": 4.94,
			"type": "Private room in home",
			"userId": 218199774,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				129,
				322,
				4,
				5,
				133,
				71,
				73,
				137,
				394,
				522,
				77,
				79,
				657,
				85,
				86,
				23,
				663,
				88,
				280,
				665,
				91,
				667,
				93,
				30,
				95,
				415,
				96,
				33,
				611,
				100,
				37,
				103,
				40,
				104,
				41,
				42,
				107,
				44,
				236,
				46,
				47,
				308,
				251,
				61
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_BETTER_STRICT_WITH_GRACE_PERIOD",
			"price": {
				"rate": 29,
				"currency": "USD",
				"total": 29,
				"priceItems": [
					{
						"title": "$21 x 1 night",
						"amount": 21
					},
					{
						"title": "Cleaning fee",
						"amount": 1
					},
					{
						"title": "Airbnb service fee",
						"amount": 4
					},
					{
						"title": "Taxes",
						"amount": 3
					}
				]
			}
		},
		{
			"id": "41920223",
			"url": "https://www.airbnb.com/rooms/41920223",
			"deeplink": "https://www.airbnb.com/rooms/41920223?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 6,
			"name": "Gracious by Vishesh Hotels & Home Stay Listing 3",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/1d23ad1a-cb06-45c1-a35d-f01598c9ea51.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/a959a4d9-cf85-4ba3-9052-963e3f6218ca.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/cf2ce176-2532-4c58-bd3d-300553e7929e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7e53746b-23a5-4f88-a720-f314f1df63de.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d08fe077-637f-4356-bbb4-1260f692c42f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f2bc052d-cdea-46e0-a4d5-8950f1d2a8fa.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/4c1f60df-2934-4b8e-8c72-c31ba4d0ce66.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/f4983d61-396a-4bb9-aa05-1be706375073.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/b7d48e7e-ddfb-485a-b773-b252b4818ad3.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/4aeead53-2c55-4257-a000-fb53e23a498a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/6c692074-d372-4532-bb7c-2731b60355b6.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/81ab7834-f951-48a7-bb19-13e2195e2fab.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/8f568b47-ffcf-48ff-bcdf-3d756d61255e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/465b02a7-76a2-4e55-9bf6-16637c55b407.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/309c19be-c99e-4502-b2dc-a6937d15a8b2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/dafbd89c-6c84-4f32-95d0-cd1e9596592f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/2bced6d7-01d1-4651-84c9-e74f09b026ba.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/f3454bfb-4d2f-4859-ab44-60cbb7086b4a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/98a83d97-d1c0-4e82-86c6-86c72d133bda.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/fa8b6bc1-c67a-424d-aa4e-844a7a7cf204.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/da568a2a-11db-4069-8934-3d7a7716359d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/3ddfc120-93bb-4084-9b6c-c5e81597c7c9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/e7ed3d23-8acc-4f23-8ada-d412794925c5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/ee25077c-8fb6-46ac-953d-5a30c34192cc.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-41920223/original/2d10104f-9385-46b4-85d3-c4e213bfe3db.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/5fcb7e09-2c8c-41e2-aa69-805180479046.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.5554,
			"lng": 77.10102,
			"persons": 2,
			"reviewsCount": 134,
			"rating": 4.51,
			"type": "Private room in bed and breakfast",
			"userId": 305645081,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				64,
				1,
				2,
				66,
				4,
				5,
				392,
				9,
				137,
				139,
				77,
				15,
				79,
				16,
				657,
				21,
				85,
				86,
				280,
				90,
				91,
				93,
				30,
				33,
				34,
				35,
				227,
				611,
				36,
				37,
				101,
				39,
				40,
				104,
				41,
				42,
				44,
				236,
				45,
				46,
				47,
				51,
				179,
				55,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_STRICT_14_WITH_GRACE_PERIOD",
			"price": {
				"rate": 34,
				"currency": "USD",
				"total": 34,
				"priceItems": [
					{
						"title": "$27 x 1 night",
						"amount": 27
					},
					{
						"title": "Airbnb service fee",
						"amount": 4
					},
					{
						"title": "Taxes",
						"amount": 3
					}
				]
			}
		},
		{
			"id": "21452537",
			"url": "https://www.airbnb.com/rooms/21452537",
			"deeplink": "https://www.airbnb.com/rooms/21452537?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 7,
			"name": "PrivateRoom with International Airport View",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "Shahabad Muhammadpur",
			"images": [
				"https://a0.muscache.com/im/pictures/e4d46663-d8c7-46d7-b8ff-892964334ecb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/aff06908-8aba-4242-b253-808ff9919ed9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/edd2558c-f2c0-48d9-b2e0-1482d2a695d5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/05f4811b-176f-451d-8cab-c39afac056a1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-21452537/original/1e88ebfb-6248-49b7-8d43-a9575bb062b2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-21452537/original/89798701-7f0e-4136-bcb2-d97b453113cf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/b25f0a98-e60c-46de-994a-d3be41dcb6e6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5ad29544-3da7-42cb-906c-3e9b05eb44b2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7151b3a2-d59c-40a8-a738-3e4338271272.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6d752a81-6683-4ec9-ba4b-da9dd282eb55.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f6cec297-f134-4ce2-bc65-fe6769007d1d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a64a8674-b387-44f1-8bd1-1ae0edbbcf6c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b2b437ee-bbd5-4d18-844d-140522e3559f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bbc68b63-6471-4807-9bf1-dd064f030513.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/888a3b1d-7c69-4fcd-a226-8a3e5c21ac12.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e5a8d786-78a8-42db-8cc9-14dd5975ab0f.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/e09b5746-f16e-47dd-a0e0-c1eedeb4f86b.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.553436,
			"lng": 77.073791,
			"persons": 2,
			"reviewsCount": 386,
			"rating": 4.76,
			"type": "Room in boutique hotel",
			"userId": 128533203,
			"address": "Shahabad Muhammadpur, New Delhi, India",
			"amenityIds": [
				1,
				33,
				129,
				4,
				5,
				37,
				101,
				39,
				103,
				40,
				104,
				9,
				42,
				11,
				139,
				44,
				45,
				77,
				46,
				85,
				31
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_STRICT_14_WITH_GRACE_PERIOD",
			"price": {
				"rate": 21,
				"currency": "USD",
				"total": 21,
				"priceItems": [
					{
						"title": "$16 x 1 night",
						"amount": 16
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "804342350317262957",
			"url": "https://www.airbnb.com/rooms/804342350317262957",
			"deeplink": "https://www.airbnb.com/rooms/804342350317262957?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 8,
			"name": "Fully furnished 1BHK",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/a0c6e4b1-04ce-4b5e-97fb-cf34e4753b47.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/5186fe56-d58a-423a-9d25-5a2993e8bb87.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/7d80cb78-c354-4595-b9a2-72ca96cbdd96.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/f4311a91-6a65-49b3-8208-69135870400e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/2953683b-a6e7-4d4b-88e6-20f329567dde.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/faa1ac88-d82f-4823-b147-7d72b9cd09d2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/620e7518-9441-4ecb-95c0-bdf41bf7d663.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/7b0862a6-79ff-4237-819d-ebc06ba7ae26.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/ad187d47-851a-49c6-b91a-5e20c18b9436.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/75983bf2-a3fe-4f37-8127-ce48c440a1eb.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/6a565203-df6a-44fc-8cf7-5222b0857e7a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-804342350317262957/original/3352fbef-1b36-4c9f-af8d-2ac9acfe1b27.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=S&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff",
			"isSuperhost": false,
			"rareFind": true,
			"lat": 28.56132,
			"lng": 77.25689,
			"persons": 2,
			"reviewsCount": 17,
			"rating": 4.88,
			"type": "Entire rental unit",
			"userId": 496047625,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				33,
				4,
				100,
				5,
				37,
				101,
				39,
				8,
				9,
				11,
				45,
				46,
				47,
				51,
				54,
				91,
				93
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 32,
				"currency": "USD",
				"total": 32,
				"priceItems": [
					{
						"title": "$25 x 1 night",
						"amount": 25
					},
					{
						"title": "Airbnb service fee",
						"amount": 4
					},
					{
						"title": "Taxes",
						"amount": 3
					}
				]
			}
		},
		{
			"id": "42462375",
			"url": "https://www.airbnb.com/rooms/42462375",
			"deeplink": "https://www.airbnb.com/rooms/42462375?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 9,
			"name": "Private Room near New Delhi Stn ,City Centre & VFS",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/ac1b6973-e328-4a95-b7f6-c8a90a9c0a21.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/72ea3832-1e61-469f-ac1e-8a034f208317.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6a388a28-49b4-45b2-bf02-1430e0edf032.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9dc47ca2-7790-42b5-877f-aa4b6f155c0f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/81243983/03dee2a2_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ea90bf64-4233-489c-bf3b-465bceb5e195.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7099c2ae-4c0d-4aa1-a19e-13db6697b1b9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/71f3d5f7-81fa-45f4-be3c-e0c3426f283f.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/1e052fd9-a08e-4365-8f45-b107af76f88f.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.64167,
			"lng": 77.21468,
			"persons": 2,
			"reviewsCount": 122,
			"rating": 4.53,
			"type": "Private room in bed and breakfast",
			"userId": 14999954,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				66,
				3,
				4,
				5,
				392,
				10,
				394,
				139,
				77,
				16,
				85,
				86,
				28,
				30,
				31,
				671,
				35,
				36,
				37,
				38,
				39,
				103,
				40,
				104,
				232,
				42,
				43,
				44,
				45,
				46,
				47,
				51,
				55
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 21,
				"currency": "USD",
				"total": 21,
				"priceItems": [
					{
						"title": "$16 x 1 night",
						"amount": 16
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "42882323",
			"url": "https://www.airbnb.com/rooms/42882323",
			"deeplink": "https://www.airbnb.com/rooms/42882323?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 10,
			"name": "Couple-Friendly with  private entrance in S. Delhi",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/abcd32dd-b6d2-4253-ae54-2f78ff5dfdcf.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/58928525-c542-4680-bfc8-7a7ca75c6937.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fcf7ece6-0d0f-433a-9588-4ff2c66ef8c1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ebdbdfd4-a04e-4bf6-bc3e-229eb515f4a0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/04e69656-f7d8-4360-9f85-3a15ce79ec6a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/2d4acba6-901b-4f9a-b939-67223adc67e0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/b48e94d7-37a5-435a-8209-b763bba451d9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/67b4935b-8e0b-4934-a6f8-8cd77a35ff32.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/c1576b09-14e3-4117-8e69-712c1b682008.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/76698956-edff-45d4-8755-c8dbe7be40bf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-42882323/original/79e94c3a-6ae6-4738-9181-cd2b4edd2767.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/91317dfa-197d-4c66-b6e6-79db9292086a.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.57954,
			"lng": 77.24628,
			"persons": 2,
			"reviewsCount": 169,
			"rating": 4.79,
			"type": "Private room in home",
			"userId": 285233613,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				4,
				5,
				9,
				137,
				139,
				77,
				79,
				85,
				86,
				23,
				90,
				30,
				671,
				33,
				101,
				40,
				104,
				41,
				42,
				44,
				236,
				45,
				46,
				47,
				51,
				55,
				57,
				61
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_BETTER_STRICT_WITH_GRACE_PERIOD",
			"price": {
				"rate": 29,
				"currency": "USD",
				"total": 29,
				"priceItems": [
					{
						"title": "$21 x 1 night",
						"amount": 21
					},
					{
						"title": "Cleaning fee",
						"amount": 1
					},
					{
						"title": "Airbnb service fee",
						"amount": 4
					},
					{
						"title": "Taxes",
						"amount": 3
					}
				]
			}
		},
		{
			"id": "687323774904361374",
			"url": "https://www.airbnb.com/rooms/687323774904361374",
			"deeplink": "https://www.airbnb.com/rooms/687323774904361374?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 11,
			"name": "Nanami Cha Penthouse Apartment in South Delhi",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/b8573fec-ee0c-4096-a75c-5df670ee8093.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/cb79a5b6-1369-4002-84f0-aed7de3049a5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e8cf37ae-0015-4f5f-a894-0f14a6fd1534.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/12b408fb-f370-4462-aa68-f3fd88fcf2c5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6980250f-bfd7-4018-8f15-1639bc353a08.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/55bd1b08-c860-4892-b520-5ed3228fd1cd.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ccb433e4-0a66-47c1-afe0-45c9dd83bbf5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2bd0cfac-ce5a-426f-a16c-0130682c0a28.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/676d46ad-193a-4d85-ad8f-b10a31b1952e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/85bf6b94-e1bf-4d88-94e7-6b9495d5e3d9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/db0cccf4-4070-4c8c-9b2e-d237ff650980.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4cafa5da-246a-450a-8865-62c5a9249f6a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/445ba87b-4289-456f-be31-2dc3a4fcd005.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/47826a36-f561-413c-9060-10b10f5cdb17.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/36f68d4d-c823-45f2-a5b1-530b6affc71b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4ef0a219-da6a-47b9-bd2d-52584425720c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/58a2becc-776d-45bd-8f5c-32cd71c48a5e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c45bd255-8802-459b-8879-b3d3486f36e7.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9fc8b0e8-9726-4111-85bf-0a15353afa4b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/246a2462-7a18-4f63-bec5-fb0ef468cd71.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5fd4722c-3a51-40fd-90af-f340406867e0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/67ed55ed-7d79-4cfa-bda9-3d88a5ce98e8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ff47cff1-71d7-4cd6-94dc-2a47f5f91e46.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/17ea476e-aba3-4b15-bb7f-0d673b16d553.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/acc247eb-273a-4918-9d54-6d7a64ca77fa.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": true,
			"lat": 28.55798,
			"lng": 77.24429,
			"persons": 4,
			"reviewsCount": 29,
			"rating": 4.97,
			"type": "Entire condo",
			"userId": 473569242,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				66,
				322,
				4,
				5,
				8,
				392,
				137,
				394,
				522,
				11,
				139,
				77,
				145,
				85,
				86,
				23,
				663,
				89,
				665,
				91,
				93,
				94,
				671,
				96,
				672,
				611,
				100,
				37,
				167,
				40,
				104,
				44,
				236,
				45,
				46,
				47,
				51,
				371,
				308,
				53,
				57,
				251,
				510
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_BETTER_STRICT_WITH_GRACE_PERIOD",
			"price": {
				"rate": 44,
				"currency": "USD",
				"total": 44,
				"priceItems": [
					{
						"title": "$34 x 1 night",
						"amount": 34
					},
					{
						"title": "Airbnb service fee",
						"amount": 6
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "31940476",
			"url": "https://www.airbnb.com/rooms/31940476",
			"deeplink": "https://www.airbnb.com/rooms/31940476?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 12,
			"name": "Monuments View - The Best",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/bd4d604f-1aca-458d-84a8-c980a939ee64.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/51c0ee6d-834f-4a5b-b6f4-f9b98556ce7c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/b1b32a3d-cb12-4448-b56e-9e5651ecb237.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/bd28b02a-20a4-4c51-b0d4-d2713e18105e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/a119ea64-c5f2-4852-a166-922e6bd70999.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/67dfdd4d-df4f-4b5a-bd7d-59c3286cd051.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/32b56e83-6d40-4841-b62d-0d5823d82348.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/d13fa920-530d-464c-b80c-edc104c6aac5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/5f6cfa3f-9283-4e74-879d-371c00e32f3a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/1a37f20d-19fb-46f4-a7ac-70c2d14359a4.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/5e2569f3-73eb-4688-a255-568333e5916a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-31940476/original/808ac9d8-0c64-43cd-ac07-d5f75764691e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/4b989192-ce55-42a0-83ac-873ccba8df73.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/05e9dfe5-d986-4ead-acb1-4b1bc63dcb2b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b22a6f18-1ad7-4f96-99b9-8ce6b6bd6a77.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0cbf2d8c-de05-484e-a091-90f3063773b5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e053af53-b492-4d6b-8d7a-da64992ab337.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1152ac61-06c8-4114-92eb-184955fa12da.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ed62c55f-dc43-4b4e-8c79-a5810348a7b0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5cdcd9c4-43b2-4938-8041-f4a9deeb0905.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/579b1a5f-c7f9-4746-a43c-9fe8ca9a50b9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/02e80ab4-dd16-4afd-9fde-e0e8c3b32f6a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1a81edd2-6a4b-4928-9e8b-e433e8b4095c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2780e132-6a1e-492b-85fe-1d4a7e0e5437.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/12b3c4bc-230e-40d5-8701-7f5841227f7d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bc903624-b314-40b6-9f66-73aa75e86f77.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d836a808-d56e-427d-ab4e-ad4cc66bf14f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d4e4a6d7-57bb-420f-bd0c-23be2a33501e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5ec36035-cfdc-4c57-bb23-054f7aadada0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7c67a873-cb12-45af-ad4d-ffad47246569.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/05186cdd-5e13-43df-9150-32eed5448794.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.55265,
			"lng": 77.19315,
			"persons": 2,
			"reviewsCount": 183,
			"rating": 4.52,
			"type": "Entire condo",
			"userId": 233492632,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				4,
				5,
				133,
				8,
				10,
				11,
				77,
				89,
				91,
				93,
				30,
				94,
				95,
				33,
				100,
				37,
				103,
				40,
				104,
				41,
				42,
				44,
				45,
				46,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 56,
				"currency": "USD",
				"total": 56,
				"priceItems": [
					{
						"title": "$44 x 1 night",
						"amount": 44
					},
					{
						"title": "Airbnb service fee",
						"amount": 7
					},
					{
						"title": "Taxes",
						"amount": 5
					}
				]
			}
		},
		{
			"id": "680065019492851775",
			"url": "https://www.airbnb.com/rooms/680065019492851775",
			"deeplink": "https://www.airbnb.com/rooms/680065019492851775?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 13,
			"name": "Your own little space : )",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/f90e140d-3e31-468d-89a4-d21bb18b86eb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/050da912-c916-4744-bca4-5dd690291fab.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/723605ce-f604-4f93-92d1-fc290175b502.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/afafcced-1898-4758-8698-c956076be672.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/31010491-57f8-420e-9941-6aea27df6bbe.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d1a29c0f-a18b-45d5-81aa-bfe5981f190f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f3d346ed-6854-4532-a4ca-33f925611e4d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/3507e6cc-bed3-490f-ad7e-00a6aae62e2e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ad13a963-2f43-49d4-abb3-a7b6061221d8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/700057cf-28e5-47ee-bd89-1980bfa399cc.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b5a1fabe-94bc-405a-9726-9d7c01bd8946.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/510623a4-cd7d-4143-9598-e667a6733822.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-680065019492851775/original/4c0ad3fb-ad77-4caf-9480-4bc1b25906ae.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/bfe4bff0-d61e-490e-bda6-810f4e6640b5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b8334e38-9d66-47b9-a6db-df03e1b1672c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fe64e7a5-c500-44e0-b5f4-937c51e45548.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-680065019492851775/original/9ef00e28-3c4b-4ff7-811f-39e2ac9415fe.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/101360bb-87a7-47a4-90c1-9b7cf3007266.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-680065019492851775/original/7b16eebe-5fc0-4d4a-af35-8c7212e13e25.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/0bb7aa42-e188-4585-91ec-ad60dd573a22.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/55210f1c-fedd-4cb3-8afd-16b69683d0bb.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/45b35f88-243c-413a-a935-d6333251818a.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.533119945584552,
			"lng": 77.08941043480299,
			"persons": 2,
			"reviewsCount": 77,
			"rating": 4.83,
			"type": "Private room in bungalow",
			"userId": 362341278,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				129,
				4,
				5,
				73,
				137,
				394,
				139,
				12,
				77,
				79,
				145,
				657,
				85,
				86,
				23,
				665,
				91,
				93,
				96,
				611,
				100,
				37,
				101,
				40,
				104,
				41,
				42,
				45,
				46,
				308,
				61,
				510
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 23,
				"currency": "USD",
				"total": 23,
				"priceItems": [
					{
						"title": "$18 x 1 night",
						"amount": 18
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "655211",
			"url": "https://www.airbnb.com/rooms/655211",
			"deeplink": "https://www.airbnb.com/rooms/655211?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 14,
			"name": "Quaint and cosy room in south delhi",
			"bathrooms": 0.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/05f8cb6e-6ecb-49d7-b2d1-a8cb0ef001f5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/a72995ed-fb65-42ba-8cde-59c55ed55cd2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/b93ca0a4-38ab-4823-9f0e-2d1bf1b03811.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/e37d7dc3-8bc7-4b36-84c8-dc1c5baaa3ad.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/5de1a1c8-e624-48e0-a0f2-d4869f68903f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/a0ffb9cd-cfaa-4304-adbc-18ffca8d2039.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/e017237d-ef49-491c-8be9-c6f32fe998d3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/9483a1fe-fe32-4f1b-acb4-e2e0fef82453.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/3d293ae3-5913-4105-bd0f-b46c77650595.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/2d41e99e-b210-42c6-baf7-d903643e5448.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/f09301cd-4479-42fd-a42d-120884c97817.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-655211/original/c9a4307e-f67b-487a-8d11-372a543c57dc.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029226/72864a37_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029891/afbad42d_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029830/b7ec1d62_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029761/351f0f7e_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029581/974d4cc2_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029617/4860a2fb_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9029668/f8794fa0_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9030044/5a1db925_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9030159/0eb36e1e_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9030279/8304d15a_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9030417/0c1bc741_original.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/4b43c43e-2bb6-4add-b739-1d17de67fc19.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.54191,
			"lng": 77.24142,
			"persons": 1,
			"reviewsCount": 79,
			"rating": 4.86,
			"type": "Private room in rental unit",
			"userId": 870028,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				129,
				322,
				4,
				5,
				8,
				137,
				394,
				11,
				139,
				77,
				79,
				17,
				18,
				85,
				23,
				89,
				90,
				91,
				93,
				94,
				31,
				95,
				96,
				33,
				98,
				103,
				40,
				104,
				41,
				42,
				107,
				236,
				47,
				625,
				50,
				251
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 25,
				"currency": "USD",
				"total": 25,
				"priceItems": [
					{
						"title": "$18 x 1 night",
						"amount": 18
					},
					{
						"title": "Cleaning fee",
						"amount": 2
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "10306486",
			"url": "https://www.airbnb.com/rooms/10306486",
			"deeplink": "https://www.airbnb.com/rooms/10306486?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 15,
			"name": "Architect's Haveli - Krishna Lodge",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/792682c5-31e7-4719-9a64-e5d21af48793.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/e981bba8-14ce-4c60-bd23-9cc513346d41.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/491d0b13-abf2-4c57-9b57-23752b9cc34c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/d86e10db-e4c8-4b12-9591-d12e53c978c7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/c2e6b060-5cc9-46f4-9fe9-c3a93b5daa58.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/ef43e620-584d-4970-a815-e226dfcdc733.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/45b89a6f-7fa3-4084-aeff-c277157ccd18.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/9d47f204-ea7b-4d66-94f7-ed1dd2800b4b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/0293b091-fc1a-4f02-8774-b56384cd0ae2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fc9f02b4-f814-43b0-af9a-6c320cdfcb97.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/589b44cb-9d6d-4091-8d42-4c89b97f759b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/13c5eef3-048c-425f-ac6e-2b91288f66bc.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/53f0110f-aed9-411a-9e28-5784f9fc6dc7.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-10306486/original/f26166f8-f289-4801-8651-32e7b8a9b58a.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/97af8cf2-900f-4735-8195-7bcccb3e7247.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.67782,
			"lng": 77.2303,
			"persons": 2,
			"reviewsCount": 85,
			"rating": 4.94,
			"type": "Private room in home",
			"userId": 53029616,
			"address": "Delhi, Delhi, India",
			"amenityIds": [
				4,
				5,
				73,
				137,
				394,
				11,
				139,
				77,
				79,
				16,
				211,
				85,
				280,
				667,
				30,
				31,
				415,
				33,
				227,
				101,
				38,
				103,
				40,
				104,
				41,
				42,
				43,
				46,
				47,
				51,
				179,
				55
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_BETTER_STRICT_WITH_GRACE_PERIOD",
			"price": {
				"rate": 44,
				"currency": "USD",
				"total": 44,
				"priceItems": [
					{
						"title": "$28 x 1 night",
						"amount": 28
					},
					{
						"title": "Cleaning fee",
						"amount": 6
					},
					{
						"title": "Airbnb service fee",
						"amount": 6
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "17576469",
			"url": "https://www.airbnb.com/rooms/17576469",
			"deeplink": "https://www.airbnb.com/rooms/17576469?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 16,
			"name": "Casa Paradise @hkv",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/cc38c71c-fc05-4df8-b291-d058a3395bea.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e59f49c6-bd78-438b-a8ed-646843120a43.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/eb005815-bfc3-4811-9a21-74fcaf6c14b2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/22e27ebd-0df7-4f1c-85b9-b2485b3d807b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fa120c2e-74d1-409a-8883-f62ba9280bb2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b0a17059-97e2-4015-bcf6-f7925106f857.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1fa91f97-4b1f-4572-8ec7-6bfbaccccb59.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4b6197cc-fdec-48dd-b99c-262952232b57.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2b768a36-fd00-4d18-b373-f6545bcfbd08.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/99521ba9-13ee-46aa-bedc-6c4e76ba8a41.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/db785b61-53be-45d6-a0f3-c520786e6f78.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/8ac99997-7cd9-42bb-ac49-29bc7a277ad9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fc80482a-2070-4e03-927f-d4f7cb805720.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bddcaf69-afad-4455-85ae-359d60537cbc.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7adc9eb6-8387-495c-8bae-854a302f540b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5c2a2893-3ef1-48ae-a964-6d7c93a030ed.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/55a96dbf-7faf-41cc-aa2b-c28f1ccdd2c5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bacd748b-d4e0-40c2-8981-4339b70aea30.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a5ee9b22-a96b-4994-93ef-9ca0edd302ff.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b0ff20ce-68d4-46db-83a1-bd3e4202fae9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0d80756a-c1c7-4a0a-844c-1326f399e9eb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4373125c-5ec3-42af-a9e1-9c5e0b7ee4b5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/15c1d42c-3f6e-4e00-be5b-5ff94ea73082.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/59612feb-72c9-4015-a758-059a27fa37c8.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/06b82421-c324-4593-b864-747f6633d889.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.55409,
			"lng": 77.19511,
			"persons": 2,
			"reviewsCount": 176,
			"rating": 4.74,
			"type": "Entire rental unit",
			"userId": 119377804,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				4,
				132,
				5,
				8,
				137,
				10,
				11,
				139,
				77,
				79,
				146,
				85,
				86,
				89,
				90,
				91,
				93,
				30,
				94,
				31,
				671,
				32,
				96,
				672,
				33,
				34,
				99,
				100,
				39,
				103,
				40,
				104,
				41,
				42,
				44,
				236,
				45,
				46,
				51,
				308,
				55,
				251
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 77,
				"currency": "USD",
				"total": 77,
				"priceItems": [
					{
						"title": "$60 x 1 night",
						"amount": 60
					},
					{
						"title": "Airbnb service fee",
						"amount": 10
					},
					{
						"title": "Taxes",
						"amount": 7
					}
				]
			}
		},
		{
			"id": "9354324",
			"url": "https://www.airbnb.com/rooms/9354324",
			"deeplink": "https://www.airbnb.com/rooms/9354324?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 17,
			"name": "Terrace Room wt Gazebo @ Green Park Hauz Khaz Vill",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/01b409eb-dc3f-4337-8f46-f424efd0dd74.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5b57d64b-9fcd-4c1b-a9a7-4476325f14ce.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6be2387e-cfa3-44ce-8239-4f91f80b85c9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/adcfbcba-2d34-45c3-a894-23d5be5e64bb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/97331abd-ca5b-43f8-9c0f-50e8072ee14c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/8999173b-2552-4e5e-affb-2d1a656c0d97.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/636b5e89-c1c7-44fb-8b35-b446c5676545.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ea6447f8-249b-4300-9aea-396073f6d900.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/77281024-3d94-40d2-a83b-a92b74720d99.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/be92ff7b-e03e-4db9-a182-c66fe542bc21.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0892880a-5024-4fe5-9e65-d997160ebf1c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/39edc856-9af3-402a-b82b-88e667cf1744.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a10b9bc0-d59e-4793-aaf4-c3fc55715d80.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/20cb1e3d-510c-4988-ba11-2dc8055dd661.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/befd5d50-0848-423f-9e80-26da15e88a0a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0f4277d1-9735-4fe8-870b-6c937605a354.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fb917b0f-5d1d-4dcc-b770-66603a63fc61.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/749c7d37-fb0b-4e72-88af-2160a363a467.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e12c2833-a370-4a04-b9db-a6fea15181c9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2503a27a-926b-4c5c-8a87-a1dee950722d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/156c9cf9-98bf-4397-8dc1-8ee9d35a4122.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f60a5a59-7819-4ca4-938d-7b8f99c50166.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a479b3b8-234c-42e8-9f9a-bb7b22116ce2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2ecd23aa-ccb0-4797-9857-6ed65b6ae0d0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4448814d-648b-4b90-9df3-1bacbb57f9da.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/f22833af-6f57-4fc2-99f9-9b9902c31d7f.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.55806,
			"lng": 77.20432,
			"persons": 2,
			"reviewsCount": 377,
			"rating": 4.8,
			"type": "Entire loft",
			"userId": 24066165,
			"address": "New Delhi, DL, India",
			"amenityIds": [
				1,
				4,
				5,
				8,
				9,
				11,
				77,
				528,
				21,
				85,
				86,
				23,
				87,
				89,
				91,
				93,
				30,
				94,
				31,
				96,
				34,
				35,
				36,
				100,
				37,
				101,
				103,
				40,
				104,
				41,
				44,
				45,
				46,
				47,
				51,
				55,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 53,
				"currency": "USD",
				"total": 53,
				"priceItems": [
					{
						"title": "$39 x 1 night",
						"amount": 39
					},
					{
						"title": "Cleaning fee",
						"amount": 2
					},
					{
						"title": "Airbnb service fee",
						"amount": 7
					},
					{
						"title": "Taxes",
						"amount": 5
					}
				]
			}
		},
		{
			"id": "37416578",
			"url": "https://www.airbnb.com/rooms/37416578",
			"deeplink": "https://www.airbnb.com/rooms/37416578?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 18,
			"name": "Studio apartment with common terrace",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/79fe23b3-2517-4d7d-a0a3-8f997676de84.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e14840bf-1e45-4496-acc4-d400542975d2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c65f8d20-4c37-4abb-9197-7c633be5bd18.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f9a1430f-a0b7-484e-a429-af3b287ae30c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/00410dfd-8261-47ec-9640-e35e911a1c9d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/cc741ef5-6970-46c8-8c0e-d0d8d63a3c36.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/faa7f3a8-a690-4fb6-8d00-d8bcc5cd65a4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e919347c-26fc-4bb6-8eeb-eaee7fd130e1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a730f17f-804e-4edc-895c-db749d39ed84.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f888ee57-b78f-41f4-a900-9bf2536b3955.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d130d965-31ce-468a-a8f5-e770cfd8d448.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c37f9f7d-b781-40d6-aec2-fd651ac9a2ad.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/8cad77d0-21ea-4dad-a678-2a4764976df4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/3ef3690d-f86a-48fa-a894-4ddfae230a50.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/08964230-47bc-401c-817d-002051a8dcd6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4613c227-118a-4263-8c31-3fdaf26a1033.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/98fb13ea-c5b6-49ea-be9f-3aebe322f356.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d28471ff-f713-4664-8b43-49411b4342e2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/655e96f3-c412-4240-8813-df6c527ee7a7.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5eb385b2-6218-4320-a452-dca0a5409e4e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f9ebdee0-af59-4370-9d6f-16cc7c96f580.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/06b82421-c324-4593-b864-747f6633d889.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.55227,
			"lng": 77.19363,
			"persons": 2,
			"reviewsCount": 103,
			"rating": 4.6,
			"type": "Entire vacation home",
			"userId": 119377804,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				4,
				5,
				8,
				10,
				139,
				77,
				79,
				146,
				85,
				89,
				93,
				30,
				94,
				96,
				672,
				33,
				99,
				37,
				39,
				103,
				167,
				40,
				104,
				41,
				44,
				236,
				45,
				57,
				61,
				510
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 52,
				"currency": "USD",
				"total": 52,
				"priceItems": [
					{
						"title": "$40 x 1 night",
						"amount": 40
					},
					{
						"title": "Airbnb service fee",
						"amount": 7
					},
					{
						"title": "Taxes",
						"amount": 5
					}
				]
			}
		},
		{
			"id": "5948459",
			"url": "https://www.airbnb.com/rooms/5948459",
			"deeplink": "https://www.airbnb.com/rooms/5948459?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 19,
			"name": "Beautiful warm home away from home",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/84369485/91f5c0d3_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84334834/996e95fe_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84353978/681d28c7_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84334900/ab96efe4_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84354724/663bd8ae_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84335171/d2c50964_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84336567/6a04268c_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84355009/a66dd58a_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84338052/2684fc9b_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84355574/9cb6d0e9_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84338848/8249dd45_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84851127/84e0098d_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84356083/0dd59c5f_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84338857/b0c16530_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84356775/e8a1e9fd_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84338865/08983e67_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84339300/7837e4ee_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84851497/1e6f16d6_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84357390/454e7621_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84358431/13f74070_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84366661/6f8a7036_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84367531/ee13b266_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84368531/fccd343d_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84370321/bc01be6b_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84370941/73052643_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84371779/4bccc860_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84372576/e4ebce89_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84373743/fd3c303f_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84375188/065368d5_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84376101/34b2e623_original.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/users/12524649/profile_pic/1433403115/original.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.5349,
			"lng": 77.25182,
			"persons": 2,
			"reviewsCount": 66,
			"rating": 4.95,
			"type": "Private room in rental unit",
			"userId": 12524649,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				129,
				66,
				4,
				5,
				71,
				8,
				74,
				11,
				77,
				16,
				23,
				280,
				91,
				93,
				30,
				31,
				33,
				34,
				100,
				37,
				101,
				39,
				103,
				40,
				104,
				41,
				42,
				44,
				45,
				46,
				47,
				49,
				179
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 46,
				"currency": "USD",
				"total": 46,
				"priceItems": [
					{
						"title": "$36 x 1 night",
						"amount": 36
					},
					{
						"title": "Airbnb service fee",
						"amount": 6
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "25848884",
			"url": "https://www.airbnb.com/rooms/25848884",
			"deeplink": "https://www.airbnb.com/rooms/25848884?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 20,
			"name": "Super Luxury Suite Room Near C.P. / India Gate",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/fcb2dd1c-6c2f-4203-98ea-4b8b81a19804.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5ca1a2fe-c257-4203-a4fa-4f8ad75b1865.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/38f81453-1cc4-4178-a649-fc4325ace9b1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c854ca25-e2f8-4e74-b165-3860161e0ede.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5b58aee0-b1ef-42b0-8f0b-d1548fe9557d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2d1a30c9-1215-4b3e-ba07-dc20a26c81ee.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bb7adffe-01d9-4675-924b-c0ce21606bd6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/eb9af008-fa5c-4288-a39c-21abb463616d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f2b9b4eb-6610-4522-a1d9-91d8d3c284fb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ef66a842-f7e2-41e8-8995-fd52ff462fa6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f2e0e8f0-3116-41cf-9c61-904f22bd033a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e4f81f06-169f-4cc1-b059-bb98b9bb6c89.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/808e5975-7027-4abb-8101-baf758626246.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/40c7696b-430d-41d9-ad1d-c10a7276951e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b478fdcc-94d4-4ed3-9de4-3059ff3d5f89.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4a85de49-9880-433f-af99-7ca52f8b05b4.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/39d41e2b-0743-4035-b273-28ae5d906a37.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.62371,
			"lng": 77.22832,
			"persons": 2,
			"reviewsCount": 48,
			"rating": 4.46,
			"type": "Private room in rental unit",
			"userId": 156183603,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				4,
				5,
				37,
				39,
				40,
				9,
				41,
				42,
				11,
				44,
				77,
				21,
				85,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 39,
				"currency": "USD",
				"total": 39,
				"priceItems": [
					{
						"title": "$30 x 1 night",
						"amount": 30
					},
					{
						"title": "Airbnb service fee",
						"amount": 5
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "856181886265359560",
			"url": "https://www.airbnb.com/rooms/856181886265359560",
			"deeplink": "https://www.airbnb.com/rooms/856181886265359560?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 21,
			"name": "Safe Turkey studio Vasant Kunj near mall airport ॐ",
			"bathrooms": 1,
			"bedrooms": 2,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/41c70150-61c5-4832-b838-a83e37bb6bae.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/96628d8c-3ba2-4207-b332-8fbe48397723.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/24709bfe-4e2b-4019-b38b-b3dbe855832a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6ef4aacf-96c1-47d9-a9b6-59b97397a77f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4b3149c0-b791-426f-b947-61dc85d18377.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/39d9b065-1d9a-4bdd-a04c-bf59739f5c04.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c7bcb436-ab30-4e87-8733-ffcec54753f9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/17d5e125-e3e7-4754-aed4-a0d226a4a076.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b340f598-6918-4ebb-8cca-102f4f18cdc0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/65ff5094-cb3c-44ef-ac0d-2a909833dd04.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2f20b4bb-ef67-45af-93d0-b59ee9e9f851.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1a70223f-32f5-41bb-86b9-b5dd242b8853.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/8618d17e-f6a7-48e5-a1c6-31f5d774efd8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/75529ee6-5fde-4559-ba7f-362985e27fed.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2783e4a2-56be-4f54-b1e5-e3ab11b60661.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7484907b-8e48-423d-b063-394cb790434b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c222f60d-ce3f-4584-91ac-cb229a4a2de9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5c91d1b4-a655-43c6-9eef-58eebb098ff1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/40ca8825-e348-490b-8eb1-cce5eec3bffa.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/19703d64-8c87-43d2-bd55-8260a2432078.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1b57035d-11de-45db-b26a-935320938d75.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e13c1557-53bd-4342-89b6-c7e1df570e7d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/76c0faec-bf59-47d2-bc30-47dd521d5b59.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/74e71eae-23d4-47e1-ab94-9e59244e31dd.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f95a88e0-7717-4440-bafc-daa048fc5dcf.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2e554dd5-5bb5-4752-b3ce-bda61a89b5d4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a4a38bd9-b65b-48d0-bbd2-cf21921aa44a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ec2a20af-f34f-4da4-88e6-4965d6d2294d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/736bab76-5ef8-44aa-879a-b707e2569015.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1837344f-a2bd-456a-b2bc-ebfe17ba31ae.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/acaef5d1-bec7-40df-aeae-412ba7eac2e3.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.53822,
			"lng": 77.1345,
			"persons": 2,
			"reviewsCount": 31,
			"rating": 4.84,
			"type": "Entire rental unit",
			"userId": 64995119,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				4,
				5,
				101,
				8,
				40,
				9,
				11,
				139,
				44,
				45,
				77,
				46,
				47,
				51,
				53,
				85,
				86,
				665,
				91,
				61,
				93,
				30,
				94
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 45,
				"currency": "USD",
				"total": 45,
				"priceItems": [
					{
						"title": "$35 x 1 night",
						"amount": 35
					},
					{
						"title": "Airbnb service fee",
						"amount": 6
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "33728999",
			"url": "https://www.airbnb.com/rooms/33728999",
			"deeplink": "https://www.airbnb.com/rooms/33728999?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 22,
			"name": "Private room nr City Centre &New Delhi Railway stn",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/ac1b6973-e328-4a95-b7f6-c8a90a9c0a21.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/72ea3832-1e61-469f-ac1e-8a034f208317.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6a388a28-49b4-45b2-bf02-1430e0edf032.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/eab5dce2-ea7c-47d9-91e2-b167acdfb967.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9dc47ca2-7790-42b5-877f-aa4b6f155c0f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/81243983/03dee2a2_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ea90bf64-4233-489c-bf3b-465bceb5e195.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7099c2ae-4c0d-4aa1-a19e-13db6697b1b9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/71f3d5f7-81fa-45f4-be3c-e0c3426f283f.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/1e052fd9-a08e-4365-8f45-b107af76f88f.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.64167,
			"lng": 77.21468,
			"persons": 2,
			"reviewsCount": 197,
			"rating": 4.56,
			"type": "Room in bed and breakfast",
			"userId": 14999954,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				66,
				3,
				4,
				5,
				392,
				10,
				394,
				139,
				77,
				79,
				16,
				85,
				86,
				28,
				30,
				31,
				671,
				35,
				36,
				37,
				38,
				39,
				103,
				40,
				104,
				232,
				42,
				43,
				44,
				45,
				46,
				47,
				51,
				55,
				61
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 21,
				"currency": "USD",
				"total": 21,
				"priceItems": [
					{
						"title": "$16 x 1 night",
						"amount": 16
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "39241110",
			"url": "https://www.airbnb.com/rooms/39241110",
			"deeplink": "https://www.airbnb.com/rooms/39241110?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 23,
			"name": "Monuments View - The Best 2",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/9a24bdd1-23b7-4fd7-804e-f224a4b7744e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/fcfa7e4e-d886-4757-a76f-f41adae7ec45.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/5401380d-b162-4223-a842-a7a2413346d2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/6b7b67a0-40c5-48e2-a6a7-72fe614d7621.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/248121b6-8861-4c92-b7e7-66ccceeb62d8.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/7f4403ad-4422-4f21-b1c5-334fdefa29fa.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/7374e610-09b3-4779-9f4f-4099737b5106.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/ad541f46-9d0e-46e9-b1b4-6ff263bbd0f2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/e381a5e7-adf4-49ba-aec7-1272a414803f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/271f513c-ee36-456f-975a-d89fdadb0ff9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/20df6b41-8e3d-4489-9907-367a3acef857.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/f0089df9-7a8f-471b-a242-75dfb75ca5b7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/5994c9f7-93f1-42d7-8d1d-adbd45b04894.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/140e271c-b4b0-48e4-93a4-9a044bbe75d0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39241110/original/f93a904a-39d3-4194-8c7e-6e83ae9118fb.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/dd6660bc-48ae-4bcd-9325-958e6dc2a473.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/692424ab-6708-404d-b02b-d415547bb8c1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1152ac61-06c8-4114-92eb-184955fa12da.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e053af53-b492-4d6b-8d7a-da64992ab337.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/05e9dfe5-d986-4ead-acb1-4b1bc63dcb2b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b22a6f18-1ad7-4f96-99b9-8ce6b6bd6a77.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0cbf2d8c-de05-484e-a091-90f3063773b5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ed62c55f-dc43-4b4e-8c79-a5810348a7b0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5cdcd9c4-43b2-4938-8041-f4a9deeb0905.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/579b1a5f-c7f9-4746-a43c-9fe8ca9a50b9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/02e80ab4-dd16-4afd-9fde-e0e8c3b32f6a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1a81edd2-6a4b-4928-9e8b-e433e8b4095c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2780e132-6a1e-492b-85fe-1d4a7e0e5437.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/12b3c4bc-230e-40d5-8701-7f5841227f7d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bc903624-b314-40b6-9f66-73aa75e86f77.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/05186cdd-5e13-43df-9150-32eed5448794.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.54802,
			"lng": 77.19951,
			"persons": 2,
			"reviewsCount": 112,
			"rating": 4.56,
			"type": "Entire rental unit",
			"userId": 233492632,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				4,
				5,
				133,
				8,
				10,
				11,
				77,
				85,
				86,
				89,
				91,
				93,
				30,
				94,
				95,
				96,
				33,
				100,
				37,
				103,
				40,
				104,
				41,
				42,
				44,
				45,
				46,
				56,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 62,
				"currency": "USD",
				"total": 62,
				"priceItems": [
					{
						"title": "$48 x 1 night",
						"amount": 48
					},
					{
						"title": "Airbnb service fee",
						"amount": 8
					},
					{
						"title": "Taxes",
						"amount": 6
					}
				]
			}
		},
		{
			"id": "20883343",
			"url": "https://www.airbnb.com/rooms/20883343",
			"deeplink": "https://www.airbnb.com/rooms/20883343?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 24,
			"name": "Village Residency 2 @  Hauz Khas village",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/4ce85da8-3bb4-41db-a386-063dab451cb7.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ea4f0f2b-03b0-4789-95e5-59f11ed0ed92.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d4ddf6a6-795e-407e-bc89-10697e32236b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a626deee-1734-4fcf-a09f-cccff6ccaf2c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bb2f44df-5d3c-44c2-9738-5f36dc4123a9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/afbd51cf-efe1-41e8-ba66-d59eb8bfcef3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/dcc83f17-959f-48d9-aab4-0c6ac50d6833.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b2a51879-cb0e-427e-9f7f-611c0cfc396d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/912bd231-6120-4a9b-93df-48d371aa7a13.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7f177eaf-6700-45be-bdb8-050b508ffc9a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c8146c7b-5315-4203-a5ba-112edfabd58a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/55a03ff3-3d37-4b16-9b3b-f96e6dd96654.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2512c47f-9e9a-4625-ad16-fd38fb8d5a32.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/64520479-719a-4151-b74f-8f9d6f308471.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e72315a9-decd-435d-b7b1-f8df6c4af75a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/550ad505-5974-4b6d-b4f6-4426f59a5a3f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/77688b05-d448-4463-b966-6f25730559ec.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/30803c96-6db1-474b-bd9b-4599c111f7cb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2af81a06-4908-4c68-af9b-af39ef577468.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1d28c5a3-a141-460f-b7ce-e086161a19c2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/3425ce9d-6fb3-4250-9bcb-52c49936a5b6.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/06b82421-c324-4593-b864-747f6633d889.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.5529,
			"lng": 77.19296,
			"persons": 2,
			"reviewsCount": 243,
			"rating": 4.62,
			"type": "Entire rental unit",
			"userId": 119377804,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				4,
				132,
				5,
				8,
				137,
				10,
				11,
				77,
				79,
				657,
				146,
				85,
				86,
				89,
				91,
				93,
				30,
				94,
				96,
				672,
				33,
				34,
				99,
				37,
				39,
				103,
				167,
				40,
				104,
				41,
				44,
				236,
				45,
				46,
				51,
				55,
				251
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 49,
				"currency": "USD",
				"total": 49,
				"priceItems": [
					{
						"title": "$38 x 1 night",
						"amount": 38
					},
					{
						"title": "Airbnb service fee",
						"amount": 6
					},
					{
						"title": "Taxes",
						"amount": 5
					}
				]
			}
		},
		{
			"id": "28451232",
			"url": "https://www.airbnb.com/rooms/28451232",
			"deeplink": "https://www.airbnb.com/rooms/28451232?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 25,
			"name": "Zostel Delhi | Bed in 6 Bed Mixed Dorm",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/84e59a99-1044-44a0-8013-31c7e9cc564f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/b6973d36-cae8-4ce2-ac89-1cd8ac2f7454.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/f769d62f-0f17-47df-8558-ff668c64a069.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/24221b65-2e8e-4638-b8c0-0282331bb4ac.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/3c56e5b4-da07-4fb8-8a9f-dd0da9f1e165.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/babad4cd-f69d-4dff-9a30-a608848f70cf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/244c732e-1d19-49e6-b48e-5ad65ca25ba5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/64b7a30b-3bcc-4830-8857-431a2869396e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/67a6c144-100e-4cf0-919d-2ed9f3608780.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/c93d0693-c61a-4aa3-9a65-caa95058342e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/25cbdbfb-b007-4357-afff-dba63b2c684b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/dbc308a6-1bb8-4539-825c-53148e224270.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/7241b302-e766-474a-a44f-b5ce87f33f19.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/92a7eed2-9055-47a1-b39d-bfed4c00a6f4.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/9309fa70-a21b-49e8-a976-d1c60322e88c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/fe69f8b1-2b74-416f-b340-f7c3713f18d3.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/cb10fa18-5c73-4b3e-bf0a-7a45c1b95cff.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/4a63440d-3648-4751-a7ac-fc00b179ce87.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/c5051d88-e7ac-442b-ae31-a552320f30e5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/1cdb05be-0b45-4773-9a4d-c8f1debc4a3c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/5fadb7f9-4bed-4e92-bd4a-1dbb5aa3731b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/17a87d27-9b7d-4388-9b83-3e94db279be6.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/63bd4898-a19d-4cd6-91c3-f3e5c20f9992.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/f77c7579-09b8-43a8-b1a0-96054949cf38.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/a61f8faf-549e-430b-9aa5-fe15aa0a6b4a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/89698d28-0dd4-432a-a0d6-5ae39cdb9a4b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/107866d3-d731-4dc3-82e6-5aeecb919be6.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/6f353bc3-9eda-4697-a92d-d93c3bd0a1cf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/69cbab57-552e-4fa2-ba42-977efd28cb89.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-28451232/original/236b4cd9-dd9b-4f7d-82b3-f23bf3e199e5.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/8a4ee665-851a-4bef-bfdb-c7422dc4e497.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.64559,
			"lng": 77.21738,
			"persons": 1,
			"reviewsCount": 30,
			"rating": 4.57,
			"type": "Shared room in hostel",
			"userId": 156292477,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				33,
				34,
				4,
				5,
				37,
				39,
				103,
				40,
				104,
				44,
				77,
				47,
				51,
				85,
				23,
				55,
				671
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 11,
				"currency": "USD",
				"total": 11,
				"priceItems": [
					{
						"title": "$10 x 1 night",
						"amount": 10
					},
					{
						"title": "Taxes",
						"amount": 1
					}
				]
			}
		},
		{
			"id": "4858136",
			"url": "https://www.airbnb.com/rooms/4858136",
			"deeplink": "https://www.airbnb.com/rooms/4858136?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 26,
			"name": "Service Apartment/Bed and breakfast In South Delhi",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/fd697895-1ea7-48ff-bda3-ae9ef6af4d44.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/83664a57-092b-4433-808b-45cc3f260f52.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5680f108-1db4-4c9a-b418-02b274e4ecab.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/15acfdac-8788-4252-826d-2e4b0623e1d2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0293338a-65fe-4c30-bf32-478e7b43a020.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/28da9f97-dd4d-40af-a998-3e49c352bc27.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/41d27727-3e25-4d8f-968a-38369cb9730f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b5d80568-221e-4ef0-a0c2-f86cb0efbaee.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/99782e37-6b1b-480d-bbce-dfc512402d5b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1781f5b7-b64d-49c3-9100-a694521b217b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4cedfac2-e95d-42b2-8e2d-6da5edafad5a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7435eef9-9894-4581-a8ab-0904022eb76f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e339572b-8338-4328-a26b-26bd51f810d6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2357ad11-6cec-4c72-887c-dc97718ddef2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c7469e0e-d2aa-40ee-8c42-27e64c79f3e5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/af222948-a15c-4cb9-9301-9a47cc0885cf.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d33bc8e2-ea0a-4cf1-998c-fbe8fae59152.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e329b5df-29be-48ac-8bca-d0e51a8a4b59.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/678f5100-0c65-4592-b5bb-b4c09cf66360.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/3d603241-38d8-49cc-b21d-c254dbd5ef6c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b0ba34e3-8d93-45b2-b0f2-61d584e0c173.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/8a730b52-1b3b-4df2-929a-61c13ceebc09.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1a154cfc-f996-43b8-a358-79e2a9d02616.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0d2ed4b8-4d86-4611-b203-4a8fe3d7547f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2c514ad9-d3a7-4884-92a8-380b38b68061.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b87e10d7-7861-40e2-b4c7-78701735334d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a5733ea2-7ec5-4af1-b7a2-64e180d01841.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/906e3322-0e8c-4fe6-be0e-ea850fbefe4c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0fed754c-8278-4186-bfa6-128bd42169a0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0cf9d319-3f6d-4708-b2a4-b07d251c76a2.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/users/1420268/profile_pic/1326883186/original.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.5837,
			"lng": 77.25128,
			"persons": 3,
			"reviewsCount": 133,
			"rating": 4.57,
			"type": "Private room in bed and breakfast",
			"userId": 1420268,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				66,
				3,
				4,
				5,
				8,
				9,
				74,
				11,
				12,
				77,
				16,
				23,
				280,
				89,
				91,
				93,
				30,
				94,
				31,
				33,
				34,
				35,
				36,
				100,
				37,
				101,
				38,
				39,
				103,
				40,
				104,
				41,
				43,
				44,
				45,
				46,
				47,
				51,
				179,
				55,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 53,
				"currency": "USD",
				"total": 53,
				"priceItems": [
					{
						"title": "$47 x 1 night",
						"amount": 47
					},
					{
						"title": "Taxes",
						"amount": 6
					}
				]
			}
		},
		{
			"id": "6681604",
			"url": "https://www.airbnb.com/rooms/6681604",
			"deeplink": "https://www.airbnb.com/rooms/6681604?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 27,
			"name": "Sunny Room with Green View BED 2",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 2,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/84871712/7d8e2e5a_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84872330/8bc507d5_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84870719/3caf3cad_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84870270/950261a6_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84873458/9a21a8dd_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84872877/bbf54d63_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84868734/b73213ce_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84869115/c3e6a820_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84869494/d121ad77_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84875378/40dc1543_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84875823/fc19c3c0_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84868230/39b36c6e_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84874276/0aaaba73_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84874778/6332c009_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84873891/00b77a7b_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84877338/08204ed4_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84871167/51fe4001_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84884384/9692194e_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84876751/4c886f72_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84885552/fa475995_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84266113/ca02ea0e_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84888803/32ce781e_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84886001/646f0ff6_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84886594/231b4bb3_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84887412/a03705d8_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84887992/0bd2b7e0_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84266936/dad87163_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84885113/14aa9673_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84265029/df09d191_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/84265470/ababce4e_original.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/users/12524649/profile_pic/1433403115/original.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.53645,
			"lng": 77.25082,
			"persons": 1,
			"reviewsCount": 87,
			"rating": 4.94,
			"type": "Shared room in rental unit",
			"userId": 12524649,
			"address": "New Delhi, DL, India",
			"amenityIds": [
				33,
				34,
				3,
				4,
				100,
				5,
				101,
				8,
				40,
				9,
				41,
				11,
				44,
				45,
				77,
				46,
				47,
				16,
				49,
				91,
				93,
				30,
				94,
				31
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 25,
				"currency": "USD",
				"total": 25,
				"priceItems": [
					{
						"title": "$20 x 1 night",
						"amount": 20
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "843367037817817435",
			"url": "https://www.airbnb.com/rooms/843367037817817435",
			"deeplink": "https://www.airbnb.com/rooms/843367037817817435?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 28,
			"name": "Cozy Cute Love Nest in South Delhi",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/73c909b0-8e96-43b1-9718-f7dc9f9024d1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a2d4f48e-33bf-429e-8db2-7673f7742a9f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/97fd913c-ab02-40dd-806b-8ee9489bfcc0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2d45207d-5552-4ea4-9940-d8136a2feefa.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2e2e3515-3a0f-496c-8d83-f16d8353d37e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4ccb2998-1e91-4f71-a603-fa81c924251a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1ee3500f-ea26-47ee-83dd-4e9f8b5490fd.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/42159d93-7ab5-4cd0-b48c-e44cf54377b8.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/a077078a-164c-40b9-9aac-6e06d93ab02d.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.5277945,
			"lng": 77.25516429999999,
			"persons": 1,
			"reviewsCount": 14,
			"rating": 4.93,
			"type": "Entire rental unit",
			"userId": 74956686,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				129,
				4,
				100,
				5,
				8,
				11,
				91,
				12,
				93,
				47
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 18,
				"currency": "USD",
				"total": 18,
				"priceItems": [
					{
						"title": "$12 x 1 night",
						"amount": 12
					},
					{
						"title": "Cleaning fee",
						"amount": 2
					},
					{
						"title": "Airbnb service fee",
						"amount": 2
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "583117564838269355",
			"url": "https://www.airbnb.com/rooms/583117564838269355",
			"deeplink": "https://www.airbnb.com/rooms/583117564838269355?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 29,
			"name": "Space",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 2,
			"city": "Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/26e82b17-3d4b-4332-8656-76ad11d170f0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/fa98bad9-f4ba-49a3-b552-73effde7569a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/94046928-b142-467e-a256-dd8d2f8671a8.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/64c51dde-9fd6-4a9b-892b-42b52d8c6260.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/15504010-7613-4a89-8041-693a1e0acf56.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/0135b44f-ffa2-4a0a-aed2-3256cef4bba8.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/337482ec-36bf-432d-9f90-a649f0a350f1.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/36b2ae69-9079-46ad-a86d-6cdb6b8c0fa2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/8d4feb4b-a66e-4f7a-9a31-010c0b210996.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-583117564838269355/original/edd8a6d8-7755-4e63-9b8d-645adbf8ee37.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/8d957198-dc12-4e07-9f35-cb28e8c78c37.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/81e86c67-09d8-4769-8c81-1c3de0cd1218.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6e702ba9-8061-48e0-96db-85567b40f70f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/06ce76b8-ded1-4191-a263-165a0b911fa7.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9e3458f9-1d02-4c1b-b0eb-4b259247f7d0.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/f1bd2337-10c7-488c-85b9-9c190fbb030a.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.58007,
			"lng": 77.06931,
			"persons": 2,
			"reviewsCount": 66,
			"rating": 4.85,
			"type": "Private room in guest suite",
			"userId": 21601111,
			"address": "Delhi, Delhi, India",
			"amenityIds": [
				1,
				65,
				129,
				322,
				67,
				4,
				5,
				8,
				9,
				73,
				137,
				10,
				11,
				139,
				12,
				77,
				15,
				146,
				85,
				86,
				663,
				89,
				665,
				667,
				93,
				30,
				94,
				415,
				96,
				672,
				33,
				34,
				98,
				37,
				101,
				39,
				103,
				40,
				104,
				42,
				236,
				46,
				47,
				57,
				61
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 15,
				"currency": "USD",
				"total": 15,
				"priceItems": [
					{
						"title": "$12 x 1 night",
						"amount": 12
					},
					{
						"title": "Airbnb service fee",
						"amount": 2
					},
					{
						"title": "Taxes",
						"amount": 1
					}
				]
			}
		},
		{
			"id": "887488836233232414",
			"url": "https://www.airbnb.com/rooms/887488836233232414",
			"deeplink": "https://www.airbnb.com/rooms/887488836233232414?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 30,
			"name": "Fully furnished AC Rooms with classy washroom.",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/b6840802-d5c1-454e-b1e8-010691ee5393.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/0b2fc544-1353-4285-bc48-b3f2cf0cd63e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/f6b7f626-a8f0-478c-b7bb-c16db0e9cd55.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/f918c3eb-087b-4bfe-aaaa-218093214c91.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/8fe3f1f9-3c1b-497f-a3d9-4e147d7610f9.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/8af99a87-1c69-4c2f-8f2d-066afdf9932a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/594b23a1-e15b-4645-9e35-64fb854f7134.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/c7544f2e-0c05-4b2b-b1ad-7f57ec877172.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/256bf061-bd2e-41a7-ad70-31f9868eacbd.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/057ec0ff-793b-43fc-b7a2-0c772b399430.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/64f85de6-d38e-409b-8412-181729deab62.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/cbc8fbed-bac2-4a6c-8957-345b4e56dc2c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ded66242-7cda-4c35-8193-057d26ced470.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d9949cab-c71f-4aa8-b92c-bec46dfafb06.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/05649797-7ba7-4b6f-832a-28c10d6b7164.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a173f36d-7792-41bd-b78e-95d827a29339.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/8bf42835-f5f6-4f2c-bdeb-49d5655e6288.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/969f0d39-8ef0-4b66-b652-2f9a7d6b91e5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/326ba512-fd48-480e-a2ca-571fcbc559e5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/81379461-ef44-41cb-a828-6cdf46557ec2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/fb85c5d9-308b-493a-8ef0-59273fa8d3e4.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/b413aa39-50d8-41c3-8d34-282494f48455.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/5967282e-3325-4e4d-8eb7-ae539a33fe0f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/6fb291e9-5ce0-43e7-8f78-b8599740da31.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/b09240f1-f9a8-4d64-99c4-d471ed166809.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/f5e28a7c-f7da-4132-acf8-44d118c9f0e0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/068c8ce9-ca3f-4b0d-9926-0568ade9851c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/52317759-56e9-4f6b-be56-222d747d2db4.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/89943d3a-3d00-4b39-b9bf-357876948805.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-887488836233232414/original/d0fbf7de-7927-49f4-8c78-65c041e2de1b.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/User-479314419/original/32ffcb05-6ab8-44df-88ae-5bc73b4f305f.jpeg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.70317521137514,
			"lng": 77.16397427022457,
			"persons": 2,
			"reviewsCount": 12,
			"rating": 5,
			"type": "Room in hotel",
			"userId": 479314419,
			"address": "Delhi, Delhi, India",
			"amenityIds": [
				4,
				5,
				37,
				101,
				8,
				91,
				93
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 19,
				"currency": "USD",
				"total": 19,
				"priceItems": [
					{
						"title": "$15 x 1 night",
						"amount": 15
					},
					{
						"title": "Airbnb service fee",
						"amount": 2
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "613592233343310832",
			"url": "https://www.airbnb.com/rooms/613592233343310832",
			"deeplink": "https://www.airbnb.com/rooms/613592233343310832?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 31,
			"name": "Anuraag's PurnTosh Air",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-613592233343310832/original/3312e395-90da-4b2e-aac2-b4545a0123e7.png?im_w=720",
				"https://a0.muscache.com/im/pictures/8bc824b0-57cc-489d-86df-6f0b4cd38ae2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d3eb6e88-e6a3-4259-bd42-10edc972afea.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fde295c1-3cec-496b-9567-bc8b6d2cfef8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4b6f92a8-ab2f-486f-b108-31aca1b13a81.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1b6f156d-cdc0-48c0-9ea2-251a9aead825.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b3792005-efba-428d-8fc1-53170b3b74c3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-613592233343310832/original/7cb80857-1c51-4dbd-aec5-d186a7161761.png?im_w=720",
				"https://a0.muscache.com/im/pictures/6038512f-ff43-4649-9a35-ad3d430f6eb4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b46c8c5e-d8c1-48fe-a5ae-3c9fef10095a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0c5eaade-33e0-410c-a0e1-b3ca7f527238.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/3686cbe5-be94-498b-9c48-955ff20c1877.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e2eeec81-da62-46eb-9cd0-cd63cf937fe3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/351cf781-d67a-4e47-98af-7a71c85aa696.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/971f8366-fc57-457d-8f88-97498c4ac23a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0ebae857-c57a-4dfc-851a-493c9d969976.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/fad2ce9b-9cb5-46f3-b888-de8205bb2f7b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/33ba07dc-9f68-40c7-b593-b4239afa98b0.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/3ffe5417-46d9-4141-acfd-5ff8dde77908.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.64235,
			"lng": 77.20853,
			"persons": 1,
			"reviewsCount": 15,
			"rating": 4.93,
			"type": "Private room in bed and breakfast",
			"userId": 456113987,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				4,
				5,
				8,
				137,
				10,
				394,
				522,
				11,
				139,
				657,
				280,
				665,
				667,
				30,
				415,
				671,
				672,
				33,
				34,
				37,
				40,
				41,
				42,
				44,
				45,
				46,
				47,
				51,
				179,
				55,
				315,
				61,
				322,
				73,
				77,
				85,
				86,
				89,
				90,
				91,
				93,
				94,
				95,
				96,
				611,
				100,
				103,
				104,
				107,
				236,
				251
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 36,
				"currency": "USD",
				"total": 36,
				"priceItems": [
					{
						"title": "$26 x 1 night",
						"amount": 26
					},
					{
						"title": "Cleaning fee",
						"amount": 2
					},
					{
						"title": "Airbnb service fee",
						"amount": 5
					},
					{
						"title": "Taxes",
						"amount": 3
					}
				]
			}
		},
		{
			"id": "888369044878556427",
			"url": "https://www.airbnb.com/rooms/888369044878556427",
			"deeplink": "https://www.airbnb.com/rooms/888369044878556427?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 32,
			"name": "Your hideout : )",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-888369044878556427/original/79778572-cff0-4fbe-9e19-9682defa8a80.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-888369044878556427/original/a2f9f37b-db12-4b85-a891-b9ef1c33207c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/050da912-c916-4744-bca4-5dd690291fab.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/31010491-57f8-420e-9941-6aea27df6bbe.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/44599b3b-448c-4acf-863a-f22b13925750.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ba2aee87-b56e-45b6-ad66-bed40d49c55e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4df0f95f-f244-4a26-8983-55bae722c872.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4149e42d-c380-4658-abdd-1651fe7829a1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-888369044878556427/original/d06eeeab-4159-4f34-909d-f21f41362720.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-888369044878556427/original/c97d4189-65a8-4d6a-8a39-219e7af0d695.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/fe64e7a5-c500-44e0-b5f4-937c51e45548.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b8334e38-9d66-47b9-a6db-df03e1b1672c.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-680065019492851775/original/9ef00e28-3c4b-4ff7-811f-39e2ac9415fe.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/b5a1fabe-94bc-405a-9726-9d7c01bd8946.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/45b35f88-243c-413a-a935-d6333251818a.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.53395,
			"lng": 77.08879,
			"persons": 3,
			"reviewsCount": 18,
			"rating": 4.94,
			"type": "Private room in home",
			"userId": 362341278,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				4,
				5,
				8,
				73,
				137,
				394,
				139,
				12,
				79,
				657,
				85,
				86,
				23,
				665,
				91,
				667,
				93,
				671,
				611,
				100,
				37,
				101,
				103,
				40,
				104,
				41,
				42,
				45,
				46,
				51,
				55,
				61,
				510
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 23,
				"currency": "USD",
				"total": 23,
				"priceItems": [
					{
						"title": "$18 x 1 night",
						"amount": 18
					},
					{
						"title": "Airbnb service fee",
						"amount": 3
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "29936308",
			"url": "https://www.airbnb.com/rooms/29936308",
			"deeplink": "https://www.airbnb.com/rooms/29936308?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 33,
			"name": "Old Delhi indulgence",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/ae22477b-8461-4dfd-b835-c789afbcd216.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5aaadee3-f63a-4951-bbc3-f7f30c9ba54e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/464f2953-e525-4c62-b116-9ecd5a42f1f1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5fa1c1cb-8abe-4236-8b5b-3184b2ade451.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/481f1e00-478a-4cf7-8000-b9070a4a85f8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2575666f-e1b3-4ef3-bd4a-969aac2a6901.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1746bab2-1729-4e11-8040-cd044f0399cb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/845d619a-3f3a-4993-b775-e3b9327a2c2a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/d1fabb0a-3c8f-44eb-983a-ed4fb0e0b2ad.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/af2177fb-60ee-4d2e-b347-b6955b14fee1.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/3b59a7f0-9c5b-44e7-8aef-7b639be1e4a7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/0d636c19-ea82-40c9-bca9-47f70a2e8347.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/08461006-0e8e-4767-83c9-2c7e4ce2d7ca.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-29936308/original/4437097f-5aa6-4a75-bb5e-26e5e2dac19c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/2be81e94-8371-4e4d-b3fa-dc4a0cdb22f1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/35ca48c8-9846-4a17-8ae7-56973a9dff71.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/User-225078450/original/c422afc2-ecb7-4623-9351-5340ce307d65.jpeg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.65186,
			"lng": 77.23242,
			"persons": 2,
			"reviewsCount": 5,
			"rating": 5,
			"type": "Private room in home",
			"userId": 225078450,
			"address": "Delhi, Delhi, India",
			"amenityIds": [
				1,
				33,
				4,
				5,
				37,
				40,
				42,
				139,
				12,
				44,
				46,
				47,
				16,
				86,
				667,
				30,
				671
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 39,
				"currency": "USD",
				"total": 39,
				"priceItems": [
					{
						"title": "$30 x 1 night",
						"amount": 30
					},
					{
						"title": "Airbnb service fee",
						"amount": 5
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "782420987971376393",
			"url": "https://www.airbnb.com/rooms/782420987971376393",
			"deeplink": "https://www.airbnb.com/rooms/782420987971376393?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 34,
			"name": "cottage Indian Blues Greater Kailash Nehru place",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/airflow/Hosting-782420987971376393/original/c3392bc8-a4a2-4efb-ac0f-746b2268a1c4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a69517bc-767a-466f-b3f6-e46bfee4b1b4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-782420987971376393/original/00dca639-6f73-4a9e-a8b1-8d17fb9964a5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/airflow/Hosting-782420987971376393/original/bd4f2cc0-fe76-4a58-80e2-7852601eb9f3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/31a223fa-360f-4909-b139-be62cb1c45ac.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/65d9ae44-482f-41c7-9220-bf84aa7b90fb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/412ea0b3-7d81-4a17-9d93-12427a4dc7d8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e5012c42-a1d0-4bec-8e21-213b083360bf.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/8b3246f3-49d9-4b63-b5c4-54b5933b71cd.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9daf8ed3-e2bb-4b13-b740-c759f898b344.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c36fcc28-70d1-4243-bfa9-900b737757b8.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/51e42da0-27ac-4bee-8430-1a8bb8c81cd6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b9a91854-82fb-4276-84af-8b96037318a2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/88cd4b22-1986-4f4b-88a8-7b42af62ee99.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e5a27ff9-d8b9-4843-9fe5-0ab3dc93c5e8.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/User-491522936/original/90fb64ee-5ed6-454a-9a45-bb078d805637.jpeg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.54844,
			"lng": 77.2512917,
			"persons": 2,
			"reviewsCount": 41,
			"rating": 4.85,
			"type": "Private room in rental unit",
			"userId": 491522936,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				33,
				4,
				100,
				5,
				40,
				104,
				9,
				137,
				107,
				139,
				44,
				77,
				46,
				47,
				79,
				21,
				85,
				665,
				91,
				61,
				671
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 31,
				"currency": "USD",
				"total": 31,
				"priceItems": [
					{
						"title": "$24 x 1 night",
						"amount": 24
					},
					{
						"title": "Airbnb service fee",
						"amount": 4
					},
					{
						"title": "Taxes",
						"amount": 3
					}
				]
			}
		},
		{
			"id": "52973352",
			"url": "https://www.airbnb.com/rooms/52973352",
			"deeplink": "https://www.airbnb.com/rooms/52973352?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 35,
			"name": "Reebah Inn & Suites - 2",
			"bathrooms": 26,
			"bedrooms": 28,
			"beds": 28,
			"city": "Gurugram",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/556f1be0-79a6-4d58-8d1c-b48707714f4a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/3e425fab-7035-4441-8e8c-956d98826a15.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/9541cdc2-c723-4409-98c7-174ba5088b7c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/ad63072b-2b55-4bc8-9b70-d586f1612f93.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/820d2796-324a-4c5b-8e45-3b2aec283516.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/9aa96e50-a531-43ef-91e7-513337579d1d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/e6e27c91-2f8c-463b-be48-e478cad5bf0e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/118ee61c-4a80-4d3f-b5ed-7f7a729d2f8a.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/36a7d4c3-8068-45af-8b30-647bf765485f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/e32a5b1d-9c85-42a3-a7f0-b77388a39fd0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/be7e9a7f-f341-4606-bb56-9710bfbba090.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/ce24e871-fec8-4530-826e-e38141a71e5e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/35a496d0-35d7-4b4e-ac75-37318585ade2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/26811a2d-0023-4450-8485-e6c89145aba9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/55839aac-a528-4780-82c3-c4fd5b4ae0bb.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/aa1a9a21-1de8-4afb-bb9d-7320bf874ee5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/6542d973-915a-4517-a9db-52f3edaeeae3.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/9b344b44-d1b4-4d5d-8488-98f39d980e4e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/2fc12a57-c053-418e-a229-f921d8bc6904.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/823c328f-6b30-411a-ba05-66d91e3f3e4f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/ac53c5ec-ef7d-427f-bb3b-d431e0f5589c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/11d87903-5e2c-423d-b0af-baa2da4c3c8b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/590de796-67bc-4364-a7d9-859752840773.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/f9f29731-2fe1-4fa8-b023-304e356b960d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/4f9ae7d2-3923-4bcf-9d9c-be003e14e26f.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/5da6953e-a301-4927-bf22-df55632694b7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/4561e767-1e4c-416c-967d-ba572e344448.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/6f09751f-3383-4c20-ab20-7d55a473208c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/1c66612e-1f1c-4c19-8593-f8ebc21ad898.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-52957679/original/ed6ff9b7-4f52-465e-a756-1efd1e499faa.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/59ea0776-eef5-49b4-8700-867137de7eb3.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": true,
			"lat": 28.431303024291992,
			"lng": 77.06246185302734,
			"persons": 16,
			"reviewsCount": 116,
			"rating": 4.72,
			"type": "Private room in bed and breakfast",
			"userId": 428523966,
			"address": "Gurugram, Haryana, India",
			"amenityIds": [
				1,
				4,
				5,
				37,
				39,
				103,
				8,
				40,
				104,
				9,
				41,
				42,
				44,
				45,
				77,
				46,
				47,
				51,
				55,
				94
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_MODERATE",
			"price": {
				"rate": 18,
				"currency": "USD",
				"total": 18,
				"priceItems": [
					{
						"title": "$14 x 1 night",
						"amount": 14
					},
					{
						"title": "Airbnb service fee",
						"amount": 2
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "46230163",
			"url": "https://www.airbnb.com/rooms/46230163",
			"deeplink": "https://www.airbnb.com/rooms/46230163?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 36,
			"name": "Private room near the Airport & unique Rooms",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/e592ad59-6a3b-427a-beff-b09c2e357730.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ad83a668-528f-4e4b-97f1-af003c0379b2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/311c5613-2976-40a9-83d7-361d3c1fccfa.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0e389b7e-0105-425f-ba46-601fb4744621.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/20701572-148b-4eff-991d-64f3da17bf9a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c2aaccf0-f362-4141-b9b7-9407e318f135.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0036748d-9d74-4351-a27b-9c20b68e21e3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/f2c4e61f-ef79-48dc-986e-406867db9203.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/a7fb3a89-d658-488a-b266-0d9bb2814750.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/aa8b33f6-e0a1-4e8d-bfc3-e337c344f950.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6c57e700-0bcd-44ff-8957-41d7a7125356.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/cecec247-ed0a-4bb5-908b-007ef24c7778.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e45cd298-de41-42eb-980b-6857eaf55e2a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d4ea7c00-c8e6-46a5-a3cb-ab0147b091a3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4c27f3f4-8114-4725-80e8-b0b53b372c7d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/4603ef03-5b03-433c-827d-bbba793b38f7.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2eea6618-bc6b-48a3-a9fb-8ef446588cbb.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6eab3332-6294-4564-9b67-3fa3cc600396.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/e09b5746-f16e-47dd-a0e0-c1eedeb4f86b.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.553449630737305,
			"lng": 77.07376861572266,
			"persons": 2,
			"reviewsCount": 78,
			"rating": 4.83,
			"type": "Room in boutique hotel",
			"userId": 128533203,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				129,
				4,
				5,
				37,
				101,
				39,
				40,
				9,
				42,
				11,
				139,
				44,
				45,
				77,
				46,
				47,
				85,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_STRICT_14_WITH_GRACE_PERIOD",
			"price": {
				"rate": 19,
				"currency": "USD",
				"total": 19,
				"priceItems": [
					{
						"title": "$15 x 1 night",
						"amount": 15
					},
					{
						"title": "Airbnb service fee",
						"amount": 2
					},
					{
						"title": "Taxes",
						"amount": 2
					}
				]
			}
		},
		{
			"id": "48451622",
			"url": "https://www.airbnb.com/rooms/48451622",
			"deeplink": "https://www.airbnb.com/rooms/48451622?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 37,
			"name": "A Chic & Bohemian style room  with WIFI & Terrace",
			"bathrooms": 1,
			"bedrooms": 1,
			"city": "Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/847f147f-56dd-4d1f-8c30-553c3d7f73e5.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/47c94642-da30-41ea-9b95-17e8c3a052f6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/eedfbd49-8352-4f7c-bd2e-b9fdc05c7e9e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d5e3a596-1d40-430a-9d76-0b6abafd677e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7762fa29-9da0-43f0-949b-31e4ffd6f796.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/47007212-ac3d-4e4c-9088-46d82a57c15b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ecbf776b-8006-45f9-aa06-5c2458cf6da3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2a8aa95a-4c1e-41bb-be6c-3a9a77f636ae.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2ece9948-a172-4d44-bc75-206d72121c49.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2d43fdd6-ebcc-4dd4-b0e1-c8660f0804ca.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/92e97c56-3b11-4b13-b73c-f8daf3c7c0df.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/bf65aefc-a08c-4da4-b969-1c1e36ed87e1.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/16755fb1-342a-406b-8e21-25909128e32f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/1c86a8b8-fc18-4222-8ab8-447f58c3d76f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d6f448e3-3292-4090-aa8b-02cd4b87035b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9788c2e5-3056-41e8-8be8-a6215fcebbed.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/79b24ad7-f2dc-46d1-9dae-1e7132de381d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/06868859-d424-4951-9081-34941d833709.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6466778b-39bb-4100-86c0-c0f18ebec281.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/60954904-d8a0-47e5-8ba9-61a2942eb3e2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/2a9cec35-0e15-4e42-918e-0971e27eec1b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/397b24ee-168a-4fe5-bec2-d7cc87884988.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/0d8d3297-3bd5-455e-be71-1801333b87a6.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/92b2fcf5-c521-4b72-b104-e7d3d43d8f4a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/5fcc29d6-9f1d-470d-804b-8ce1fc38bbfe.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/e12a862b-0e88-4bb1-aa94-a20f37cd625d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/37c96f1b-e5d8-46d9-a6ac-1c9500b5b71d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d44a33ae-40ad-4394-bbf4-159e1eec8547.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/7472098f-3271-46d9-9441-eebed7edbadd.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/c67ee210-3d31-47f9-acc3-d6962bbed7b7.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/dea9d0ba-95af-44bd-9825-1cd577472053.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.54778,
			"lng": 77.19465,
			"persons": 2,
			"reviewsCount": 150,
			"rating": 4.21,
			"type": "Private room in home",
			"userId": 173127768,
			"address": "Delhi, Delhi, India",
			"amenityIds": [
				1,
				34,
				35,
				4,
				5,
				37,
				39,
				8,
				40,
				41,
				42,
				44,
				45,
				46,
				47,
				57,
				30
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_BETTER_STRICT_WITH_GRACE_PERIOD",
			"price": {
				"rate": 39,
				"currency": "USD",
				"total": 39,
				"priceItems": [
					{
						"title": "$35 x 1 night",
						"amount": 35
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "30100119",
			"url": "https://www.airbnb.com/rooms/30100119",
			"deeplink": "https://www.airbnb.com/rooms/30100119?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 38,
			"name": "Luxury Rooms for Comfortable stay Near Aerocity",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/4181871b-bb36-4686-af15-48cdeaedaad3.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/ad967530-53a2-4496-87a3-31b3350deb0f.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d644a7cd-55c4-4177-a1a8-0012605eb66d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/254f6b9c-44a7-4dea-8242-fcac54198581.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/b29eefe8-19bb-4268-ba3e-5145d9349a7b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/9a56e922-63a6-42de-aec0-2bfaf433a7d2.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/96f6101e-de5c-4868-88db-6056e938a95e.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d14bfe94-be65-4672-9075-644ca67fe76b.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/d28d1d67-cbbc-4f1d-b028-fae644f1fe78.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/af0e4797-6417-4238-ac38-f13fc062ce3d.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6e177f79-2d54-4c39-abd5-4682615bd197.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/42eb4f2a-6dba-47c3-b4fa-33c96897cd83.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6a16cc2c-52a9-4328-8498-90c558f73632.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/25249aa9-ce3b-40ac-bcea-60a5be259fc4.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/018cde9e-db04-4484-a015-88762d5e99e5.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/6bc2999a-bcfd-46e9-8adf-0705e79b9de1.jpg?aki_policy=profile_x_medium",
			"isSuperhost": false,
			"rareFind": false,
			"lat": 28.54922,
			"lng": 77.12819,
			"persons": 2,
			"reviewsCount": 7,
			"rating": 4.71,
			"type": "Room in hotel",
			"userId": 226164027,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				2,
				4,
				5,
				9,
				74,
				11,
				77,
				16,
				21,
				23,
				280,
				90,
				27,
				93,
				30,
				32,
				35,
				37,
				39,
				103,
				40,
				104,
				41,
				42,
				107,
				44,
				45,
				46,
				47,
				51,
				179,
				55,
				56,
				57
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 39,
				"currency": "USD",
				"total": 39,
				"priceItems": [
					{
						"title": "$30 x 1 night",
						"amount": 30
					},
					{
						"title": "Airbnb service fee",
						"amount": 5
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "353215",
			"url": "https://www.airbnb.com/rooms/353215",
			"deeplink": "https://www.airbnb.com/rooms/353215?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 39,
			"name": "Sun drenched South Delhi Apartment",
			"bathrooms": 1.5,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/12a1a505-485e-4e96-a2d7-db2fcabba4cb.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/90cbc47e-d47b-4506-9d58-5e747e781f6e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/a75dfb8a-4de6-45f6-998e-1c1af55e29bf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/8a4c2b73-b726-4842-a992-b0ad742001af.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/50e7e593-f735-499e-bfa9-8b886cec4cd2.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/721dd605-411d-4946-ac68-efb76ccc08f9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/3d7adf0c-f5b4-40d2-80b6-6c360e2f7e04.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/aa882946-d91c-4d9a-9a2e-98aa338a8ba7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/59b69a32-7c54-49e2-b360-79151453a405.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/ba129529-4779-4c86-8a0b-6c2643d0ea07.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/f0404b1f-a8b8-4aec-9362-28b7999dda02.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/0a027aba-4fa8-4280-9078-1dea2da1e4fd.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/af83ae6a-133a-460f-8cae-5ad4350841a0.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/403e1233-22e9-4f8f-aaa7-26c3f8dc472c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/75b51c30-56fe-4f29-b5f6-6edcdd18e73a.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6950771/f8d4de36_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/e07ad995-9b51-4752-af77-3413dc0722af.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/85dab6d6-de53-4926-ab08-99ddb068045e.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/9255c397-54e8-4d83-bcde-d9df80b5faa3.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-353215/original/faae0941-ac6f-496b-970c-70ae9a09d982.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/3921267/72a26e44_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/3921270/33c7da37_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6952344/854e2046_original.jpg?im_w=720",
				"https://a0.muscache.com/im/pictures/6952296/d6d53be2_original.jpg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/bb01759f-5f54-4d0c-a863-dfe52fee92ca.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.55957,
			"lng": 77.22008,
			"persons": 2,
			"reviewsCount": 70,
			"rating": 4.76,
			"type": "Private room in condo",
			"userId": 1784085,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				3,
				4,
				5,
				6,
				8,
				9,
				394,
				11,
				139,
				12,
				146,
				21,
				23,
				667,
				30,
				671,
				672,
				33,
				38,
				40,
				44,
				46,
				47,
				49,
				50,
				51,
				52,
				308,
				57,
				61,
				322,
				73,
				201,
				77,
				85,
				86,
				87,
				89,
				90,
				91,
				93,
				94,
				95,
				96,
				97,
				100,
				101,
				104,
				232,
				236,
				110
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Kitchen",
				"Iron"
			],
			"cancelPolicy": "CANCEL_FLEXIBLE",
			"price": {
				"rate": 44,
				"currency": "USD",
				"total": 44,
				"priceItems": [
					{
						"title": "$34 x 1 night",
						"amount": 34
					},
					{
						"title": "Airbnb service fee",
						"amount": 6
					},
					{
						"title": "Taxes",
						"amount": 4
					}
				]
			}
		},
		{
			"id": "39618986",
			"url": "https://www.airbnb.com/rooms/39618986",
			"deeplink": "https://www.airbnb.com/rooms/39618986?check_in=2023-09-16&check_out=2023-09-17&adults=1&children=0&infants=0&pets=0",
			"position": 40,
			"name": "sanjay puris room  two",
			"bathrooms": 1,
			"bedrooms": 1,
			"beds": 1,
			"city": "New Delhi",
			"images": [
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/db15bf2f-d52d-4216-852a-061cda928966.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/0bc7c397-92b9-44a9-bec8-1e3989fb7fd5.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/e03c7016-6dbc-4f05-aead-60c5b1e7a4cb.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/c1d2b1ea-285b-4aff-86aa-3c1faa9aa1b4.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/68b06618-bb93-4e97-b432-0df384704271.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/c12d89a3-c2b1-41bb-8bd5-5c028a8baf85.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/a63e2c58-b41c-4895-9aca-151785e02ea0.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/f124ec27-0f2e-44bc-9e22-0d7c69924560.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/0ffcf59a-906c-496f-99ac-e1d678317f25.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/97baa49b-38a4-4a50-8b79-c7f56eff9a4c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/f89a5a1d-b8da-4dc8-9f0e-36a75dfd848d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/a02cc26f-562b-42f7-8fb6-332a9341a6f8.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/b10446a6-d5ec-4f0f-a10e-479c1ed3902c.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/ae8905d1-904b-4764-a21f-725a3ccfe2af.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/a9099e51-f083-4859-837c-3962653e366b.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/c2d343b7-2aae-4c7a-85aa-b6b69b5cce0d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/7935b075-831d-4787-b8c0-3c79d232e7cf.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/17904a3e-b5a1-49dc-8dad-3268d1a87d7d.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/7abc08d4-e795-4de3-bab4-82fb1d19c2c9.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/db324a28-ee6d-403e-84d5-a69bb11481a7.jpeg?im_w=720",
				"https://a0.muscache.com/im/pictures/miso/Hosting-39618986/original/63dac598-84fa-4df2-8899-b10bec42ecf4.jpeg?im_w=720"
			],
			"hostThumbnail": "https://a0.muscache.com/im/pictures/user/1fcf88dc-90de-4e90-a2ea-369bae9d8672.jpg?aki_policy=profile_x_medium",
			"isSuperhost": true,
			"rareFind": false,
			"lat": 28.64224,
			"lng": 77.20499,
			"persons": 2,
			"reviewsCount": 64,
			"rating": 4.86,
			"type": "Private room in bed and breakfast",
			"userId": 152138126,
			"address": "New Delhi, Delhi, India",
			"amenityIds": [
				1,
				129,
				67,
				4,
				5,
				9,
				11,
				77,
				79,
				16,
				23,
				90,
				91,
				30,
				31,
				100,
				101,
				40,
				41,
				42,
				44,
				45,
				46,
				57,
				61
			],
			"previewAmenities": [
				"Air conditioning",
				"Wifi",
				"Iron"
			],
			"cancelPolicy": "CANCEL_STRICT_14_WITH_GRACE_PERIOD",
			"price": {
				"rate": 61,
				"currency": "USD",
				"total": 61,
				"priceItems": [
					{
						"title": "$47 x 1 night",
						"amount": 47
					},
					{
						"title": "Airbnb service fee",
						"amount": 8
					},
					{
						"title": "Taxes",
						"amount": 6
					}
				]
			}
		}
	]
}