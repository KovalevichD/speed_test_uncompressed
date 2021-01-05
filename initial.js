"use strict"
window.onload = function() {
	 
    
    
/******************** ENABLER  ********************/     
	if (Enabler.isInitialized()) {
		init();
	} else {
	  	Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
	}

	function init() {
	  	if (Enabler.isPageLoaded()) {
	    	//Enabler.setProfileId(10561486);
	    	politeInit();
	  	} else {
	  		//Enabler.setProfileId(10561486);
	    	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
	 	}
	};
/***************** //end ofENABLER  *****************/   
    
    
    
/******************** VARIABLES  ********************/ 
	function politeInit(){		
        var select = function(s) {
                return document.querySelector(s);
            },
            selectAll = function(s) {
                return document.querySelectorAll(s);
            },
            wrect = select('#wrect'),
            cta = select('#cta'),
            headlines = selectAll('.headline'),
            blueWords = selectAll('.blue'),
            imagesCont = select('#images'),
            images = [],
            imagesSrc = ['img1.jpg', 'img2.jpg', 'img3.jpg'],
            headlinesArray = [],
            tl = gsap.timeline();
/***************** //end of VARIABLES  *****************/
        for (let i = 0; i < headlines.length; i++) {
            const headlineSplitted = new SplitText(headlines[i], {type:"words, chars"})
            
            headlinesArray.push(headlineSplitted)
        }
/*******  PRELOADING IMAGES  ** ** */

        preloadImages(imagesSrc, imagesPreloaded)
        

        function preloadImages(arrayWithImages, callback) {
            let img
            let remaining = arrayWithImages.length

            for (let i = 0; i < arrayWithImages.length; i++) {

                img = new Image()
                img.onload = function () {
                    --remaining
                    if (remaining <= 0) {
                        callback()
                    }
                }

                img.src = arrayWithImages[i]
                images[i] = img
            }
        }

        function imagesPreloaded() {
            cta.style.backgroundColor = "#a5cf4d"
            
            for (let i = 0; i < images.length; i++) {
                const imgDiv = document.createElement('div')
                
                imgDiv.classList.add('img')
                imgDiv.style.background = `url('${images[i].src}') no-repeat`
                
                imagesCont.append(imgDiv)
            }

            animate()
        }

/*******  // end of PRELOADING IMAGES  *****/
        
/******************  MAIN ANIMATION  ******************/ 
		function animate() {
            const imagesElem = selectAll('.img')
            
			tl
            .to(wrect, {duration:0.7, alpha:0, ease:"none"})
            
            .from(headlinesArray[0].chars, {duration:0.7, rotationY: 180, force3D: true,transformOrigin:"50% 80%", alpha:0, ease:"power", stagger: 0.02}, ">-0.5")
            .from(blueWords[0], {duration: 0.4, color: "#ffffff", ease:"none"}, ">-0.5")
            .from(cta, {duration: 1, alpha:0, y:"+=20", ease:"sine"}, ">0.1")
            .to(headlines[0], {duration:0.7, alpha: 0, ease:"none"}, ">2.4")
            .from(imagesElem[1], {duration: 0.7, alpha: 0, ease:"none"}, "<")
            
            
            .from(headlinesArray[1].chars, {duration:0.7, rotationY: 180, force3D: true, transformOrigin:"50% 80%", alpha:0, ease:"power", stagger: 0.02}, ">")
            .from(blueWords[1], {duration: 0.4, color: "#ffffff", ease:"none"}, ">-0.5")
            .to(headlines[1], {duration:0.7, alpha: 0, ease:"none"}, ">3.5")
            .from(imagesElem[2], {duration: 0.7, alpha: 0, ease:"none"}, "<")
            
            
            .from(headlinesArray[2].chars, {duration:0.7, rotationY: 180, force3D: true, transformOrigin:"50% 80%", alpha:0, ease:"power", stagger: 0.02}, ">")
            .from(blueWords[2], {duration: 0.4, color: "#ffffff", ease:"none"}, ">-0.5")
		}
/******************  //end of MAIN ANIMATION  ******************/    
        
        

    
        
/********************  EVENTS  ********************/ 
        let type = ((Modernizr.touchevents) && (!isChrome)) ? 'touchend' : 'click',
            clickable = selectAll('.clickable')

        clickable.forEach(element => element.addEventListener(type, function(e) {
            Enabler.exit('Exit')
            return false }, false))
        
        cta.addEventListener('mouseenter', function() {
            this.style.backgroundColor = "#fff"
            this.style.color = "#00AEEF"
        }, false)
        
        cta.addEventListener('mouseleave', function() {
            this.style.backgroundColor = "#a5cf4d"
            this.style.color = "#fff"
        }, false)
        /****************** //end of  EVENTS  ******************/

	}
    
 
}