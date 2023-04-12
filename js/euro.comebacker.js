$(document).ready(function () {
	let eComebacker = true;

	setTimeout(function () {
		eComebacker = false;
	}, 5000)

	$(document).mouseleave(function () {

		if (!eComebacker) {
			$('.e-comebacker').css('display', 'block');
			// $('body').css(cssValuesOpen);
			eComebacker = true;
		}
	});

	// Вычисление ширины скроллбара
	function scrollbarWidth() {
		var block = $('<div>').css({ height: '50px', width: '50px' }),
			indicator = $('<div>').css({ height: '200px' });

		$('body').append(block.append(indicator));
		var w1 = $('div', block).innerWidth();
		block.css('overflow-y', 'scroll');
		var w2 = $('div', block).innerWidth();
		$(block).remove();
		return w1 - w2;
	}

	var cssValuesOpen = {
		overflow: 'hidden',
		'padding-right': scrollbarWidth() + 'px',
	};
	var cssValuesClose = {
		overflow: 'initial',
		'padding-right': 0,
	};

  // Timer
	(function () {
		'use strict';
		var SECONDS = 900;

		var time = SECONDS;
		var timerId;

		function paddZero(value) {
			if (value < 10) {
				return '0' + value;
			}
			return value;
		}

		function run(callback) {
			timerId = setInterval(function () {
				if (time <= 0) {
					clearInterval(timerId);
					return;
				}
				time--;

				if (callback && typeof callback === 'function') {
					callback();
				}
			}, 1000);
		}

		function getHours() {
			return Math.floor(time / 60 / 60);
		}

		function getMinutes() {
			return Math.floor(time / 60) - getHours() * 60;
		}

		function getSeconds() {
			return time - getMinutes() * 60;
		}

		function reset() {
			clearInterval(timerId);
		}

		window.customTimer = {
			run: run,
			getTime: function () {
				return {
					hours: paddZero(getHours()),
					min: paddZero(getMinutes()),
					sec: paddZero(getSeconds()),
				};
			},
			reset: function () {
				reset();
			},
		};
	})();

	(function () {
		'use strict';
		var MODAL_CONTAINER_SELECTOR = '.e-comebacker__content';

		var hideModals = function () {
			var modalsContainers = document.querySelectorAll(MODAL_CONTAINER_SELECTOR);
			modalsContainers.forEach(function (item) {
				item.classList.remove('e-comebacker-active');
			});
		};

		var closeComebacker = function (e) {
			e.preventDefault();
			$('#e-comebacker').hide();
			$('body').css(cssValuesClose);
		};

		/* Переход к от первого ко второму */
		var modalLeaveButtonsNext = document.querySelectorAll('.js-modal-leave-next');
		modalLeaveButtonsNext.forEach(function (item) {
			item.addEventListener('click', function (e) {
				e.preventDefault();
				hideModals();

				var target = document.getElementById(e.currentTarget.dataset.target);
				if (target) {
					target.classList.add('e-comebacker-active');

					var timer = document.querySelector('.js-custom-timer');
					if (timer) {
						var min = timer.querySelector('.__min');
						var sec = timer.querySelector('.__sec');

						min.textContent = String(window.customTimer.getTime().min);
						sec.textContent = String(window.customTimer.getTime().sec);

						window.customTimer.run(function () {
							min.textContent = String(window.customTimer.getTime().min);
							sec.textContent = String(window.customTimer.getTime().sec);
						});
					}
				}
			});
		});

		var comebackerCloseButtons = document.querySelectorAll('.js-comebacker-close');
		comebackerCloseButtons.forEach(function (item) {
			item.addEventListener('click', closeComebacker);
		});

		var comebackerCloseCapture = document.querySelectorAll('.js-comebacker-close-capture');
		comebackerCloseCapture.forEach(function (item) {
			item.addEventListener(
				'click',
				function (e) {
					if (e.currentTarget === e.target) {
						closeComebacker(e);
					}
				},
				true,
			);
		});
	})();
});
