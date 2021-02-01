(function($){

	//Header
	function headerPos() {
		var Pos = $('body').scrollTop();
		if(Pos >= 1) {
			$('#header').addClass('static');
		} else {
			$('#header').removeClass('static');
		}
	}
	$(window).scroll(headerPos);


	// .moduleContentChanger
	function mobileContentChanger() {
		if (window.matchMedia('(max-width: 700px)').matches) {
			$($('.contentSection')).insertAfter($('.tabs .tab.active'));
		} else {
			$($('.contentSection')).insertAfter($('.tabs'));
		}
	}

	$('.tabs .tab').click(function(event){
		if (window.matchMedia('(max-width: 700px)').matches) {
			event.preventDefault();
			$('.tabs .tab').removeClass('active');
			$(this).addClass('active');
			currentTab = $(this);
			tabRel = currentTab.attr('rel');
			$('.contentSection .module').hide();
			$('.contentSection .module[rel="' + tabRel + '"]').show(0, function(){
				twoColHeightResize();
			});
			$($('.contentSection')).insertAfter($( currentTab));
			var offset = $(this).offset();
			$('html,body').scrollTop(offset.top - 67);
		} else {
			currentTab = $(this);
			tabRel = currentTab.attr('rel');
			$('.contentSection .module').hide();
			$('.contentSection .module[rel="' + tabRel + '"]').show(0, function(){
				if (window.matchMedia('(min-width: 751px)').matches) {
					twoColHeightResize();
				}
			});
		}
	});

	// Scroll button
	$("#button").click(function() {
		if($("#scroll").length) {
			$([document.documentElement, document.body]).animate({
		        scrollTop: $("#scroll").offset().top - 5
		    }, 1500);
		}
	});

	// Mobile Nav Hamburger Button
	$('.mobileNavBtn').click(function(e){
		e.preventDefault();
		$('#mobileNav').slideToggle();
	});

	// .moduleBannerVideo background image resize
	function videoImageSize() {
		$('.moduleBannerVideo').each(function() {
			var aspectRatio = $(this).width() / $(this).height();
			var imgaspectRatio = $(this).children('img').width() / $(this).children('img').height();
			if(aspectRatio > imgaspectRatio) {
				$(this).children('img').css({'width':'100%', 'height': 'auto'});
			} else {
				$(this).children('img').css({'height':'100%', 'width':'auto'});
			}
		});
	}

	// .moduleGreyBoxCTA
	function greyBoxImageSize(){
		$('.moduleGreyBoxCTA .cta').each(function(){
			var aspectRatio = $(this).width() / $(this).height();
			var imgaspectRatio = $('.bgImage', this).width() / $('.bgImage', this).height();
			if(aspectRatio > imgaspectRatio) {
				$('.bgImage', this).css({'width':'100%', 'height': 'auto'});
			} else {
				$('.bgImage', this).css({'height':'100%', 'width':'auto'});
			}
		});
	}
	function greyBoxExpand(){
		if (window.matchMedia('(max-width: 700px)').matches) {
			$('.moduleGreyBoxCTA .ctas:not(.formatsimpleLinks) .cta').hover(function(){
				$(this).addClass('active');
				$('.revealContent', this).show();
				greyBoxImageSize();
			}, function(){
				$(this).removeClass('active');
				$('.revealContent', this).hide();
				greyBoxImageSize();
			});
		}
	}

	// .moduleTwoColTextImage Image column height and image resize
	function twoColHeightResize() {
		$('.moduleTwoColTextImage').each(function(){
			if($(this).hasClass('two_column_with_slider')) {
				// Nope
			} else {
			var bgImage = $('.image', this).attr('data-image');
			$('.image', this).css( 'background-image', 'url(' + bgImage + ')' );
			}
		});
		$('.moduleTwoColTextImage:visible').each(function(){
			var contentHeight = $('.contentWrapper', this).height();
			$('.image', this).height(contentHeight);
		});
	}

	// Timeline
	$('.bxslider').bxSlider({ pager: false, infiniteLoop: false, hideControlOnEnd: true });

	// Interior Slider
	$('.slider').bxSlider({
		pager: false,
		mode: 'fade',
		controls: 'true',
		nextText: '',
		prevText: '',
		infiniteLoop: true,
		touchEnabled: true,
	});

	// Play Video button
	$('a.playVideo').colorbox({ 
		inline: true, 
		width: '800px', 
		maxWidth: '90%',
		maxHeight: '90%',
		onComplete : function() { 
		   $(this).colorbox.resize(); 
		}
	});
	$.colorbox.resize();

	$('a.playVideo-link').colorbox({ 
		inline: true, 
		width: '800px', 
		maxWidth: '90%',
		maxHeight: '90%',
		onComplete : function() { 
		   $(this).colorbox.resize(); 
		}
	});
	$.colorbox.resize();

	// Newsroom - Social Media Hub Navigation
	$('.smNav a').click(function(event){
		event.preventDefault();
		$('.smNav a').removeClass('active');
		$(this).addClass('active');
		var target = $(this).attr('rel');
		$('.smContent .content').hide();
		$('.smContent').find('.content[rel="' + target + '"]').show();
	});

	$(window).load(function(){
		greyBoxExpand();
		greyBoxImageSize();
		twoColHeightResize();
		videoImageSize();
		mobileContentChanger();
		headerPos();
	});

	$(window).resize(function(){
	   greyBoxExpand();
	   greyBoxImageSize();
	   twoColHeightResize();
	   videoImageSize();
	   mobileContentChanger();
	   headerPos();
	});

})(jQuery);