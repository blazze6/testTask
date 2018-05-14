'use strict';

// Выбор контейнера с карточками
var cardsDeck = document.querySelector('.cards');

// Функция пересчёта исходного кол-ва карточек
var countCards = function(){
	for (var i = 0; i < cards.length; i++){
	cards[i].count = i + 1;
	}
};

// Посчитали карточки и каждому объекту массива добавили параметр count с порядковым номером
countCards();

// Выбор шаблона Handlebars и его компиляция с данными массива cards
var cardsTemplate = document.getElementById('cards-template');
var sourceContent = cardsTemplate.innerHTML;
var compiledTemplate = Handlebars.compile(sourceContent);
var mainContent = compiledTemplate({ allCards: cards });

// Вывод в HTML данных скомпилированного шаблона
cardsDeck.innerHTML = mainContent;

// Функция отслеживает нажатие кнопок Alt и Shift в момент события (клика по контейнеру с карточками) и добавляет или удаляет карточки в массиве
var checkClick = function(event){
	var cardWide = { type: 'wide' };
	var cardNarrow = { type: 'narrow' };
	
	if(event.altKey === true && event.shiftKey === true)
		{
			cards.push(cardWide);
			cards[cards.length - 1].count = cards.length;
			mainContent = compiledTemplate({ allCards: cards });
			cardsDeck.innerHTML = mainContent;
		}
	else if(event.altKey === false && event.shiftKey === true)
		{
			cards.push(cardNarrow);
			cards[cards.length - 1].count = cards.length;
			mainContent = compiledTemplate({ allCards: cards });
			cardsDeck.innerHTML = mainContent;
		}
	else
		{
			cards.pop();
			mainContent = compiledTemplate({ allCards: cards });
			cardsDeck.innerHTML = mainContent;
		}
};

// Добавление обработчика события (клика по контейнеру с карточками)
cardsDeck.addEventListener('click', checkClick);


// По поводу задания №4 "под звездочкой" - прочитал различные материалы по window.history(), к сожалению, текущих знаний пока что недостаточно для реализации этого пункта, т.к. разобрался, как записывать в стеки истории состояние через window.history.pushState(null, null, '#test'), но до конца не понял, как возвращаться к предыдующему состоянию по нажатию кнопки назад (предполагаю, что это завязано на popstate).

