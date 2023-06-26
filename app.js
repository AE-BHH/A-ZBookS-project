$(document).ready(function () {
	const searchBtn = $('#search-btn')

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
					console.log(data)
					console.log(`Title: ${data.docs[0].title}`)
					console.log(`Author: ${data.docs[0].author_name[0]}`)
					console.log(`Language: ${data.docs[0].language[0]}`)
					console.log(`Pages: ${data.docs[0].number_of_pages_median}`)
					console.log(
						`Published Year(s): ${
							data.docs[0].publish_year[data.docs[0].publish_year.length - 1]
						}`
					)
				})
				.catch((err) => console.error(err.message))
		})
	}
})
