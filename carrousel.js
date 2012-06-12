window.onload = function(){
	carrousel.init();
}
var carrousel = {};
carrousel.config = { 
			id:'carrousel', 
			tagContent:'ul', 
			tagContentChildren:'li', 
			step: 1, 			// pixel to move per interaction
			speed:5, 			// time to start a new interaction (milliseconds)
			timeToBreath:1500 	// time to show the slide (milliseconds)
		};
carrousel.init = function(){
	carrousel.mainDiv = document.getElementById( carrousel.config.id );
	carrousel.content = carrousel.mainDiv.getElementsByTagName( carrousel.config.tagContent )[0];
	carrousel.contentChildren = carrousel.mainDiv.getElementsByTagName( carrousel.config.tagContentChildren );
	var child = ( carrousel.contentChildren.length > 1 ) ? carrousel.contentChildren[0] : carrousel.contentChildren;

	carrousel.totalElements = carrousel.contentChildren.length + 1;
	carrousel.childWidth = child.offsetWidth;
	carrousel.isShowingTheElement = 1;

	carrousel.positionX = 0;
	carrousel.positionXMin = ( ( carrousel.contentChildren.length - 1 ) * carrousel.childWidth ) * -1;

	carrousel.configWrapper();
	carrousel.prepareToNextSlide();
}
carrousel.configWrapper = function(){
	var wrapper = document.getElementById( 'wrapper' );
	wrapper.style.width = ( carrousel.totalElements * carrousel.childWidth ) + 'px';
}
carrousel.prepareToNextSlide = function(){
	if( carrousel.elementShowing > carrousel.totalElements ){
		carrousel.elementShowing = 1;
	}
	until = carrousel.positionX - carrousel.childWidth;
	carrousel.doTheAnimation( until );
	
}
carrousel.doTheAnimation = function( until ){
	var newPositionX = carrousel.positionX - ( carrousel.config.step );
	carrousel.positionX = newPositionX;
	if( carrousel.positionX <= carrousel.positionXMin || carrousel.positionX <= until ){
		if( carrousel.positionX <= carrousel.positionXMin ){
			carrousel.positionX = 0;
		}
		setTimeout( function(){ carrousel.prepareToNextSlide() }, carrousel.config.timeToBreath );
		return;
	} 
	carrousel.content.style.marginLeft = newPositionX + 'px';
	setTimeout( function(){carrousel.doTheAnimation( until )}, carrousel.config.speed );
}