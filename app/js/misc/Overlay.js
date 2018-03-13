export default class Overlay {
	constructor() {
		let container = document.createElement('div'),
			overlay = document.createElement('div'),
			lightbox = document.createElement('div'),
			closeButton = document.createElement('img'),
			contentOuter = document.createElement('div'),
			content = document.createElement('content');
		container.id = 'overlay-container';
		overlay.className = 'overlay';
		container.appendChild(overlay);
		lightbox.className = 'lightbox';
		container.appendChild(lightbox);
		closeButton.className = 'btn-close';
		closeButton.src = 'img/button-close.png';
		lightbox.appendChild(closeButton);
		contentOuter.className = 'content-outer';
		content.className = 'content';
		contentOuter.appendChild(content);

		document.body.appendChild(container);
		overlay.addEventListener('click', this.closeOverlay);
		closeButton.addEventListener('click', this.closeOverlay);

		request
			.get('somehtmlfile.html')
			.set('Content-Type', 'text/html')
			.end(function(error, response) {
				content.innerHTML = response.text;
			});
		lightbox.appendChild(contentOuter);
	}

	closeOverlay() {
		document.body.removeChild(document.getElementById('overlay-container'));
	}
}
