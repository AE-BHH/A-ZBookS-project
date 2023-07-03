$(document).ready(function () {
	const searchBoxInput = $('#search-input')
	const searchBtn = $('#search-btn')
	const coverPhoto = $('.coverPhoto')
	const bookInfoBox = $('.bookInfoBox')
	const bookFilterDropdown = $('#filter-dropdown')

    

	handleSearch()
	function handleSearch() {
		searchBtn.on('click', (e) => {
			e.preventDefault()
			console.log('works!')
			const searchInput = searchBoxInput.val()
			const selectedFilter = bookFilterDropdown.val()

			const searchURL = `https://openlibrary.org/search.json?${selectedFilter}=${searchInput}`

			fetch(searchURL)
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					console.log(data.docs)
					data.docs.forEach((element) => {
						console.log(element)

						getBookCover()
						function getBookCover() {
							let coverId = element.cover_i
							coverPhoto.append(
								`<a class="bookLink" href="https://openlibrary.org${element.key}"><img width="100" height="150" margin= "50px" src="https://covers.openlibrary.org/b/id/${coverId}.jpg" alt="Book Cover Photo"/></a>`
							)
						}

						getBookInfo()
						function getBookInfo() {
							let bookTitle = `Title: ${element.title}`
							let bookAuthor = `Author: ${element.author_name}`
							let language = `Language(s): ${element.language}`
							let pages = `Pages: ${element.number_of_pages_median}`
							let firstPublished = `First Published Year: ${element.first_publish_year}`
							bookInfoBox.append(
								`<div class="book-details-container">${bookTitle} <br/> ${bookAuthor} <br/> ${language} <br/> ${pages} <br/> ${firstPublished}</div>`
							)
						}
					})
				})
				.catch((err) => console.error(err.message))
		})
	}
})
