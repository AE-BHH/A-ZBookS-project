$(document).ready(function () {
	const searchBtn = $('#search-btn')
	const searchResultSection = $('#search-result-section')
	const searchListContainer = $('#search-list-container')
	const coverPhoto = $('.cover-photo')
	const bookInfoBox = $('.book-info-box')

	const bookFilterDropdown = $('#filter-dropdown')

	handleSearch()
	function handleSearch() {
		searchBtn.on('click', (e) => {
			e.preventDefault()
			console.log('works!')
			const bookTitle = $('#search-input')[0].value

			const searchURL = `https://openlibrary.org/search.json?title=${bookTitle}`

			fetch(searchURL)
				.then((res) => res.json())
				.then((data) => {
					data.docs.forEach((element) => {
						let bookTitle = `Title: ${element.title}`
						bookInfoBox.append(
							`<div class="book-details-container">${bookTitle}</div>`
						)

						let coverId = element.cover_i
						handleBookCover()
						function handleBookCover() {
							coverPhoto.append(
								`<img width="100" height="150" margin= "50px" src="https://covers.openlibrary.org/b/id/${coverId}.jpg" alt="Book Cover Photo"/>`
							)
						}
					})
				})
				.catch((err) => console.error(err.message))
		})
	}

	getSearchType()
	function getSearchType() {
		bookFilterDropdown.on('change', (e) => {
			e.preventDefault()

			const selectedBookCategory = bookFilterDropdown.val()

			console.log(`You selected: ${selectedBookCategory}`)
		})
	}
})
