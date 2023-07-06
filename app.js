$(document).ready(function () {
	const searchBoxInput = $('#search-input')
	const searchBtn = $('#search-btn')
	const listContainer = $('#search-list-container')
	const bookFilterDropdown = $('#filter-dropdown')
	const spinner = $('#spinner')
	const main = $('#main')
	hideSpinner()

	handleSearch()
	function handleSearch() {
		searchBtn.on('click', (e) => {
			e.preventDefault()
			main.hide()
			searchBoxInput.empty()
			const searchInput = searchBoxInput.val()
			const selectedFilter = bookFilterDropdown.val()
			if (searchInput === '') {
				alert('Invalid input')
			} else {
				const searchURL = `https://openlibrary.org/search.json?${selectedFilter}=${searchInput}`

				showSpinner()

				fetch(searchURL)
					.then((res) => res.json())
					.then((data) => {
						hideSpinner()

						if (data.docs.length === 0) {
							alert('No result found for your search!')
							hideSpinner()
						} else {
							data.docs.forEach((element) => {
								const bookContainer = $('<div></div>').attr(
									'class',
									'row bookContainer'
								)
								getBookCover(element, bookContainer)
								getBookInfo(element, bookContainer)

								listContainer.append(bookContainer)
							})
						}
					})
					.catch((err) => {
						hideSpinner()
						console.error(err.message)
					})
			}
		})
	}

	function getBookInfo(element, bookContainer) {
		let bookAuthor = `Author: ${element.author_name}`
		let language = `Language(s): ${element.language}`
		let pages = `Pages: ${element.number_of_pages_median}`
		let firstPublished = `First Published Year: ${element.first_publish_year}`

		const bookInfo = $('<div></div>').attr('class', 'col bookInfo')
		bookInfo.append(
			`<span class="bookInfoContainer"><a href="https://openlibrary.org${element.key}">${element.title}</a> <br/> ${bookAuthor} <br/> ${language} <br/> ${pages} <br/> ${firstPublished}</span>`
		)
		bookContainer.append(bookInfo)
	}

	function getBookCover(element, bookContainer) {
		let coverId = element.cover_i
		const coverPhoto = $('<div></div>').attr('class', 'col-4 bookImage')
		coverPhoto.append(
			`<span class="imageContainer"><a class="bookLink" href="https://openlibrary.org${element.key}"><img width="100" height="150" margin= "50px" src="https://covers.openlibrary.org/b/id/${coverId}.jpg" alt="Cover not found"/></a></span>`
		)
		bookContainer.append(coverPhoto)
	}

	function showSpinner() {
		spinner.show()
	}

	function hideSpinner() {
		spinner.hide()
	}
})
