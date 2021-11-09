output = document.querySelector('#output');
deletess = document.querySelectorAll('.delete');

function createCustomElement(el, data = '') {
	let element = document.createElement(el);
	element.textContent = data;
	return element;
}
function deleteEl(e) {
	output.removeChild(newTr);
	i = 0;
	index = e.target.value;

	books.forEach((book) => {
		if (index == book.id) {
			i++;
		} else {
			newBook = [
				...newBook,
				{
					id: book.value,
					title: book.title,
					author: book.author,
					isbn: book.isbn
				}
			];
		}
	});
	localStorage.removeItem('books');
	localStorage.setItem('books', JSON.stringify(newBook));
}

let books = [];

let newBook = [];
window.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('books') !== null && localStorage.getItem('books') !== undefined)
		books = JSON.parse(localStorage.getItem('books'));
	books.forEach((book) => {
		let newTr = createCustomElement('tr');
		let tdTitle = createCustomElement('td', book.title);
		let tdAuthor = createCustomElement('td', book.author);
		let tdIsbn = createCustomElement('td', book.isbn);
		let tdAction = createCustomElement('td');
		let tdDelete = createCustomElement('button', 'X');
		tdDelete.setAttribute('value', book.id);
		tdAction.appendChild(tdDelete);
		tdDelete.classList.add('delete');
		newTr.appendChild(tdTitle);
		newTr.appendChild(tdAuthor);
		newTr.appendChild(tdIsbn);
		newTr.appendChild(tdDelete);
		output.appendChild(newTr);
		tdDelete.addEventListener('click', (e) => {
			output.removeChild(newTr);
			i = 0;
			index = e.target.value;

			books.forEach((book) => {
				if (index == book.id) {
					i++;
				} else {
					newBook = [
						...newBook,
						{
							id: book.value,
							title: book.title,
							author: book.author,
							isbn: book.isbn
						}
					];
				}
			});
			localStorage.removeItem('books');
			localStorage.setItem('books', JSON.stringify(newBook));
		});
	});
});
document.querySelector('#form-control').addEventListener('submit', (e) => {
	e.preventDefault();

	let title = document.querySelector('#title').value;
	let author = document.querySelector('#Author').value;
	let isbn = document.querySelector('#isbn').value;
	let errorDiv = document.querySelector('.error');

	if (!title || !author || !isbn) {
		errorDiv.textContent = 'Missing data !';
		errorDiv.classList.add('active');
		setTimeout(() => {
			errorDiv.textContent = '';
			errorDiv.classList.remove('active');
		}, 3000);

		return;
	}
	let newTr = document.createElement('tr');

	let titleTd = document.createElement('td');
	titleTd.textContent = title;
	newTr.appendChild(titleTd);

	let authorTd = document.createElement('td');
	authorTd.textContent = author;
	newTr.appendChild(authorTd);

	let isbnTd = document.createElement('td');
	isbnTd.textContent = isbn;
	newTr.appendChild(isbnTd);

	let btnDelete = document.createElement('button');
	btnDelete.classList.add('delete');
	btnDelete.innerText = 'X';
	btnDelete.setAttribute('value', books.length);
	books = [
		...books,
		{
			id: btnDelete.value,
			title,
			author,
			isbn
		}
	];

	let actionTd = document.createElement('td');
	actionTd.appendChild(btnDelete);

	newTr.appendChild(actionTd);
	//books
	localStorage.setItem('books', JSON.stringify(books));
	output.appendChild(newTr);
	btnDelete.addEventListener('click', (e) => {
		output.removeChild(newTr);
		i = 0;
		index = e.target.value;

		books.forEach((book) => {
			if (index == book.id) {
				i++;
			} else {
				newBook = [
					...newBook,
					{
						id: book.value,
						title: book.title,
						author: book.author,
						isbn: book.isbn
					}
				];
			}
		});
		localStorage.removeItem('books');
		localStorage.setItem('books', JSON.stringify(newBook));
	});
});
