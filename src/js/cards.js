'use strict';

var cardNarrow = { type: 'narrow' };
var cardWide = { type: 'wide' };

var cardsDeck = document.querySelector('.cards');

var checkClick = function(event){
	if(event.altKey === true && event.shiftKey === true)
		{
			cards.push(cardWide);
			console.log(cards);
		}
	else if(event.altKey === false && event.shiftKey === true)
		{
			cards.push(cardNarrow);
			console.log(cards);
		}
	else
		{
			cards.pop();
			console.log(cards);
		}
};

cardsDeck.addEventListener('click', checkClick);

