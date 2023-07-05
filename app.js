$(document).ready(function () {
	const searchBoxInput = $('#search-input')
	const searchBtn = $('#search-btn')
	const listContainer = $('#search-list-container')
	const bookFilterDropdown = $('#filter-dropdown')
    const main = $('#main')

	handleSearch()
	function handleSearch() {
		searchBtn.on('click', (e) => {
			e.preventDefault()
            main.hide()
            searchBoxInput.empty();
			console.log('works!')
			const searchInput = searchBoxInput.val()
			const selectedFilter = bookFilterDropdown.val()
			if (searchInput === '') {
				alert('Invalid input')
			} else {
				const searchURL = `https://openlibrary.org/search.json?${selectedFilter}=${searchInput}`

				fetch(searchURL)
					.then((res) => res.json())
					.then((data) => {
						data.docs.forEach((element) => {

                            const bookContainer = $('<div></div>').attr('class', 'row bookContainer')
                            
							getBookCover()
							function getBookCover() {
								let coverId = element.cover_i
                                const coverPhoto = $('<div></div>').attr('class', 'col-4 bookImage')
								coverPhoto.append(
									`<span class="imageContainer"><a class="bookLink" href="https://openlibrary.org${element.key}"><img width="100" height="150" margin= "50px" src="https://covers.openlibrary.org/b/id/${coverId}.jpg" alt="Cover not found"/></a></span>`
								)
								bookContainer.append(coverPhoto)
							}

							getBookInfo()
							function getBookInfo() {
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
							listContainer.append(bookContainer)
						})
					})
					.catch((err) => console.error(err.message))
			}
		})
	}
})
