var viewportWith = $(window).width();
var mobileBreakpoint = 760;
var videoWidth = "70%";
var videoHeight = "70%";
var popupWidth = 500;
var popupHeight = 600;
var tbURL = "https://search.amazondelivers.jobs";
var tbFallbackURL = "https://amazon.jobs/en/search?base_query=";
var tbPing = "1";
var fixHeight = $('header').height();

if(viewportWith<mobileBreakpoint)
{
	var videoWidth = "100%";
	var videoHeight = "50%";
	popupWidth = $( document ).width()-80;
	popupHeight = 800;
}

$(function () { //JQuery Ready
	
	initGAEventTracking();
	globalEvents();
	accessibity();
	video();
	externalLink();
	homePopup();
	gaTracking();
	setLocationDrop();
	adobeAnalytics();
	accordion();
	
});


$(window).load(function () {
    resetCardStyleHeight();
});


$(window).resize(function () {
    console.log('RESIZING...');
    waitForResize(function () {
        console.log('RESIZING.Done.');
        if ($('.card-style-container').length && $(window).width() > mobileBreakpoint) {

            location.reload();
        }

    }, 200, "amz-resizse");
});

var waitForResize = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

function resetCardStyleHeight()
{
    if ($('.card-style-container').length && viewportWith > mobileBreakpoint) {

        $('.card-style-container').each(function (i) {

            var cHeight = $(this).closest('.column').height();
            $(this).attr("data-height", cHeight)

        });

        $("[data-height]").each(function () {
            var h = $(this).data('height');
            $(this).css("height", h);
        });
    }
}



function adobeAnalytics()
{

	var cmpid = getParameterByName("CMPID");
	if(cmpid.length>0)
	{
		createCookie('cmpid',cmpid,0);
	}
	
	var ccuid  = getParameterByName("CCUID");
	if(ccuid.length>0)
	{
		createCookie('ccuid',ccuid,0);
	}
	
	var cReferer = getCookie("refer");
	var lReferrer = document.referrer;
	console.log("cReferer "+cReferer);
	console.log("lReferrer "+lReferrer);
	if(cReferer!=lReferrer && lReferrer.indexOf("amazondelivers.jobs")==-1 )
	{
		
		console.log("setting referring cookie ..");
		createCookie("refer",document.referrer);
		
	}
	
	
	
	$('#nav-primary a').click(function (e) {
        pushAdobeTagsMain("navigation click","link",{"name": "header:"+$(this).text()});
		
    });
	
	$('footer .links a, footer .privacy a').click(function (e) {
		
		if(!$(this).hasClass("footer-brand"))
		{
			
			pushAdobeTagsMain("navigation click","link",{"name": "footer:"+$(this).text().replace("- from Footer","")});
			
			
		}
		
    });
	
	$('#primary-header-logo a').click(function (e) {
        pushAdobeTagsMain("navigation click","link",{"name": "header:logo"});
		
    });
	$('footer .logo').click(function (e) {
        pushAdobeTagsMain("navigation click","link",{"name": "footer:logo"});
		
    });
	$('footer .icons a').click(function (e) {
		
		
        pushAdobeTagsMain("navigation click","link",{"name": "footer:"+$(this).attr("id").replace("-link-footer","")});
	
    });
	
	$('.video-container a, .embed-container a').click(function (e) {
		
		var videoTitle =  $(this).attr("href");
		
		if($(this).parent().next('p').text().length>0)
		{
			videoTitle = $(this).parent().next('p').text();
		}
		
        pushAdobeTagsMain("video start","video",{"title": videoTitle});
		
	
    });
	if($('#about-events').length)
	{
		$('#event-location').change(function (e) {
			pushAdobeTagsNoSub({"event":"event location select","eventLocation": $(this).val()});
		
		});
	}
	
	if($('#about-camperforce').length)
	{
		$('.link-button a').click(function (e) {
			
			pushAdobeTagsMain("apply now","name",{"camperforce": $(this).text()});
	
		});
	}
}

function pushAdobeTagsMain(eventName, name, obj)
	{
		var pObj = {"event": eventName};
		pObj[name] = obj;
		
		window.dataLayerArray.push(pObj);
		console.log("debuug dataLayerArry affter push = " + JSON.stringify(window.dataLayerArray));
	}
	
	function pushAdobeTagsNoSub( pObj)
	{
	
		window.dataLayerArray.push(pObj);
		console.log("debuug dataLayerArry affter push = " + JSON.stringify(window.dataLayerArray));
	}

function accessibity()
{
	$("#skip-nav a").focus(function () {
        $(this).parent().removeClass("wai");
    });
	$("#skip-nav a").blur(function () {
        $(this).parent().addClass("wai");
    });
}



function globalEvents()
{
	
	
    $('.country-links-toggle').click(function (e) {


        e.stopImmediatePropagation();
        e.preventDefault();

        $(this).next().toggleClass('open');

    });

    $('#country-link-list a').click(function (e) {

        var langMenuData = {
            "/entrepot/montreal-emplois": "https://www.amazondelivers.jobs/warehouse-jobs/montreal-jobs/",
            "/covid-19-faqs": "https://quebec.amazondelivers.jobs/covid-19-updates/",
            "/warehouse-jobs/montreal-jobs": "https://quebec.amazondelivers.jobs/entrepot/montreal-emplois/",
            "/covid-19-updates": "https://www.amazondelivers.jobs/covid-19-faqs/",
        }

        if (langMenuData.hasOwnProperty(currPage))
        {
            e.preventDefault();
            location.href = langMenuData[currPage];
        }
        

    });
	
	/* =========================================================================
    Header Navigation Toggle
    ========================================================================== */
    $(document).ready(function () {
        $('.page').append('<div class="overlay"></div>');
    });

    $('.menu-toggle').click(function (e) {
        e.preventDefault();
        $('#nav-primary').addClass('opened-menu');
        $('.overlay').addClass('active-overlay');
    });

    $('#nav-primary button').click(function () {
        $('#nav-primary').removeClass('opened-menu');
        $('.overlay').removeClass('active-overlay');
    });

    $('#introductory > div').append('<a href="#scroll-to-content" class="link-explore"><span></span></a>');

    $('a[href$="#scroll-to-content"]').click(function (e) {

       
        $('html,body').animate({ scrollTop: $('#scroll-to-content').offset().top - fixHeight }, '1000', function () { });
    });

    $(".scroll-nav  li:first a").addClass("active");
    $(".scroll-to-content button").text($(".scroll-nav  li:first a").text());

    $(".scroll-to-content button").click(function (e) {

        $(this).next().toggleClass("show");

    });

    $(".scroll-to-content nav a").click(function (e) {

        e.preventDefault();
        var targetID = $(this).attr("href");
        var scrollHeight = fixHeight;
        console.log(targetID);
        $(".scroll-to-content nav a").removeClass("active");
        $(".scroll-to-content button").text($(this).text());
        $(this).addClass("active");
        $(this).closest('nav').addClass("fixed");

        

        var currPosition = $(".scroll-to-content nav").css("position");
        console.log("cpo" + fixHeight);
        console.log("asdfsadfcpo" + $(".scroll-to-content button").height());

        if (currPosition === "fixed") {
            scrollHeight += $(".scroll-to-content button").height();
            console.log("button height " + $(".scroll-to-content button").height());
        }

        $('html,body').animate({ scrollTop: $(targetID).offset().top - scrollHeight }, 1000, 'easeOutCirc');


        $(".scroll-to-content button").next().toggleClass("show");
    });

	$( "#search-box button" ).click(function(e) {
		
	    e.preventDefault();

	    if (!$("#search-box input").is(":visible")) {

	        $("#search-box input").animate({ width: 'toggle' }, 350);
	        //$("#primary-header-logo").css("width", 80);
	        return false;
	    }
		
		var key = $("#search-box input").val().toLowerCase().trim();
		
		

		if (key.length == 0) {

		    alert("Please enter keyword for search.");
		    return false;
		}
		
		
		
		var tbSRURL = "";
	
			
		if(tbPing=="0")
		{
			location.href=tbFallbackURL+key;
			return;
		}
		
		if(key=="warehouse")
		{
			tbSRURL = tbURL+"/search-jobs?ac=27281";  
			
		}
		else if(key=="hourly")
		{
			tbSRURL = tbURL+"/search-jobs?ac=19092";  
		}
		else if(key=="fulfillment")
		{
			tbSRURL = tbURL+"/search-jobs?ac=28155";  
		}
		else if(key=="distribution")
		{
			tbSRURL = tbURL+"/search-jobs?ac=28154";  
		}
		else if(key=="full time" || key=="full-time" || key=="fulltime" )
		{
			tbSRURL = tbURL+"/search-jobs?ac=19795";  
		}
		else if(key=="full time" || key=="full-time" || key=="fulltime" )
		{
			tbSRURL = tbURL+"/search-jobs?ac=19795";  
		}
		else if(key=="work from home" || key=="workfromhome")
		{
			tbSRURL = tbURL+"/search-jobs?ac=27279";  
			
		}
		else if(key=="part-time" || key=="part time"  || key=="parttime" )
		{
			
			tbSRURL= tbURL+"/search-jobs?ac=19794";  
		}
		else 
		{
			tbSRURL = tbURL+"/search-jobs/"+key+"/";
		}
		
		pushAdobeTagsMain("search initiation","search",{"keyword": key});
		
		apppendAdobTagAndredirect(tbSRURL);
		
	});

	
	
	$( "#nav-primary h2").click(function(e) {
		if($("#nav-primary h2").css("display")=="inline")
		{
			e.preventDefault();
			$(this).closest('nav').toggleClass("expanded");
			$(this).closest('nav').find('ul').slideToggle('slow');
		}
	});
	
	
	$( "#other-catg a").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("expanded");
		$('#other-catg-links').slideToggle('slow');
	});
	
}

function apppendAdobTagAndredirect(hrfURL)
{
	
		var referCookie = getCookie("refer");
		if(referCookie.length==0)
		{
			referCookie = document.referrer;
		}
			
		var cmpidCookie = getCookie("cmpid");
		
		if(cmpidCookie.length==0)
		{	
			cmpidCookie = getParameterByName("CMPID");
		}
		//hrfURL+= "&CMPID=" + cmpidCookie+ "&AZREF="+referCookie;
		
	   if(hrfURL.indexOf("?")!=-1)
	   {
		   hrfURL+= "&CMPID=" + cmpidCookie+ "&AZREF="+referCookie;
	   }
	   else
	   {
		   hrfURL+= "?CMPID=" + cmpidCookie+ "&AZREF="+referCookie;
	   }
		location.href = hrfURL;
}

function video()
{
	/*Video */
    if ($("a.video").length) {
		
        $.getScript("//clientfiles.tmpwebeng.com/js/lib/fancybox.js?v=2.1.3", function (data, textStatus, jqxhr) {

            $("a.video").fancybox({
	
				maxWidth: 800,
				maxHeight: 600,
				fitToView: false,
				width: videoWidth,
				height: videoHeight,
				autoSize: false,
				closeClick: true,
				openEffect: 'none',
				closeEffect: 'none'
	
			});

        });

    }
	
	/*popup */
    if ($("a.popup").length) {
		
        $.getScript("//clientfiles.tmpwebeng.com/js/lib/fancybox.js?v=2.1.3", function (data, textStatus, jqxhr) {

            $("a.popup").fancybox({
	
				maxWidth: 800,
				maxHeight: 600,
				fitToView: false,
				width: popupWidth,
				height: popupHeight,
				autoSize: false,
				closeClick: true,
				openEffect: 'none',
				closeEffect: 'none'
	
			});

        });

    }
	
	if ($('.video-container').length > 0) {

        $('.video-container a').click(function (e) {

            e.preventDefault();

            var videoSrc = $(this).attr("href");
            if (videoSrc.indexOf('.mp4') != -1)
            {
                var embedVideo = '<video controls="" style="width:100%;height:100%;"   autoplay="true" name="media"><source src="' + videoSrc + '" type="video/mp4"></video>';
                $(this).parent().append(embedVideo);
            }
            else
            {
                var embedFrame = '<iframe allowfullscreen="" style="width:100%;height:100%;"  frameborder="0" src="' + $(this).attr("href") + '"></iframe>';
                $(this).parent().append(embedFrame);
            }
        });

    }
}



function accordion() {


    if ($('.accordion').length) {
        $(".accordion h3, .accordion h2").attr('aria-expanded', 'false');
        $(".accordion h3, .accordion h2").attr('aria-selected', 'false');
        $(".accordion h3, .accordion h2").attr('role', 'tab');
        $(".accordion > div").attr('role', 'tabpanel');
        $(".accordion > div").attr('aria-hidden', 'true');



        var currPosition = $(".accordion-twocol div").css("position");



        $(".accordion h3, .accordion h2").click(function () {

            $(".accordion > div").attr('aria-hidden', 'true');
            if ($(this).attr('aria-expanded') == 'false') {
                $(this).attr('aria-expanded', 'true');
                $(this).attr('aria-selected', 'true');
                $(this).next().attr('aria-hidden', 'false');
                $(this).focus();
            }
            else {
                $(this).attr('aria-expanded', 'false');
                $(this).attr('aria-selected', 'false');

            }


            if ($(this).next().prop("tagName") == "DIV") {

                $(".accordion-twocol h3, .accordion-twocol h2").removeClass("anim");

                //To close the on click	
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).removeClass("anim");
                    $(this).addClass("anim-close");
                    $(this).next().fadeOut(500, function () {
                        console.log("aaa" + $('.accordion-twocol').height());
                        if (currPosition === "absolute") {

                            $('.accordion-twocol').css("height", 'initial');
                        }

                    });




                    return;
                }



                $(".accordion-twocol h3, .accordion-twocol h2").removeClass("active");


                $(this).toggleClass("anim");

                /* Accord Right side */
                if (currPosition === "absolute") {
                    $(".accordion-twocol div").fadeOut();

                    if (!$(this).next().find('.head').length) {
                        $(this).next().prepend('<span class="head">' + $(this).text() + '</span>');
                    }

                    $(this).addClass("active");
                    $(this).next().addClass("accordion-anim");
                    $(this).next().fadeIn('slow');

                    var fixHeight = $('header').height();
                    //Scroll to section top
                    $('html,body').animate({ scrollTop: $('article').offset().top - fixHeight }, '1000', function () { });


                    var minHeight = $('.accordion-twocol').height();
                    console.log("minHeightbefore" + minHeight);

                    minHeight = $(this).next().height();


                    console.log("minHeight" + minHeight);
                    $('.accordion-twocol').animate({ height: minHeight }, 600, function () {
                        // Animation complete.
                    });

                }
                else {

                    $(".accordion-twocol div").hide();
                    $(this).next().slideToggle();
                    $(this).toggleClass("active");
                    $('html,body').animate({ scrollTop: $(this).offset().top - $('header').height() }, '1000', function () { });
                }
                
            }
            else {
                $(this).toggleClass("active");
                $(this).toggleClass("anim");
                $(this).parent().find(".tab").slideToggle();
            }

        });

    }
}


function setLocationDrop() {
	

	if($("ul.home-location").length)
	{
		
		var initialDropText = "Select Location";
		$('ul.home-location').each(function (i) {
			$(this).prev().replaceWith('<label for="sel-location-' + i + '">' + $(this).prev().html() + '</label>');
			$(this).after('<button type="submit" id="btn-location-' + i + '"> Explore jobs </button>');
			$(this).each(function () {
				var $select = $('<select id="sel-location-' + i + '"></select>');
				var $option = $('<option>' + initialDropText + '</option>');
				$select.append($option);
				$(this).find('a').each(function () {
					var $option = $('<option />');
					$option.attr('value', $(this).attr('href')).html($(this).html());
					$select.append($option);
				});
				$(this).replaceWith($select);
				$('#sel-location-' + i + '').wrap('<div class="styled-select"></div>');
			});
			$("#btn-location-" + i).click(function (e) {
				e.preventDefault();
				var selLocation = $('#sel-location-' + i + '').val();
				if (selLocation == initialDropText) {
					alert("Please select a location");
					$('#sel-location-' + i + '').focus();
					return false;
				}
				else {
					ga('send', 'event', 'Custom Event Links', 'Click', "Home - Explore Jobs - " + $('#sel-location-' + i + '  option:selected').text());
					location.href = selLocation;
				}
			});
		});
		
		$.ajax({
			url: "https://clientfiles.tmpwebeng.com/amazon/feed/amazon-home-dd.aspx?feed=sdydfjgd",
			type: 'GET',
			success: function (statehide) {
				console.log(statehide);
				$("#sel-location-0 > option").each(function () {
					if(statehide.indexOf("|" + this.text)!=-1)
					{
						//console.log("No job " + this.text);
						if(this.text!="Work From Home")
						{
							$(this).remove();
						}
					}
				});
				$("#sel-location-1 > option").each(function () {
					if(statehide.indexOf("|" + this.text)!=-1)
					{
						
						if(this.text!="Work From Home")
						{
							$(this).remove();
						}
					}
				});
			}
		});
	}
	
}
function externalLink()
{

	
	var cmpidCookie = getCookie("cmpid");
	
	if(cmpidCookie.length==0)
	{	
		cmpidCookie = getParameterByName("CMPID");
	}
	
	var ccuidCookie = getCookie("ccuid");
	
	if(ccuidCookie.length==0)
	{	
		ccuidCookie = getParameterByName("CCUID");
	}
	
	var referCookie = getCookie("refer");
	if(referCookie.length==0)
	{
		referCookie = document.referrer;
	}
	
	var a = new RegExp('/' + window.location.host + '/');
	
	$('a').each(function() {
	
	   
		
	   //update all href reference to /contacts where uRL contains w.amazondelivers.jobs
	   
	 
		
	   if(this.href!="" && !a.test(this.href) &&  $(this).attr('href').indexOf("amazontb.runmytests.com")==-1 && $(this).attr('href').indexOf("search.amazondelivers")==-1  && $(this).attr('href').indexOf("mailto")==-1 && $(this).attr("data-open") != "self"){
		
		$(this).prop("target","_blank");
	   }
	   else {
		
		var attr = $(this).attr('target');

		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).attr("target", "");
		}
	   }
	   
	   
	   //Check for Adobe Analytic tag and ccuidCookie
	   
	   if($(this).attr('href').indexOf("amazon.force.com")!=-1  || $(this).attr('href').indexOf("search.amazondelivers.jobs")!=-1 || $(this).attr('href').indexOf("amazonrefresh.runmytests.com")!=-1  )
	   {	
		   var hrfURL = $(this).attr('href');
		  
		   if(hrfURL.indexOf("?")!=-1)
		   {
			   hrfURL+= "&CCUID=" + ccuidCookie+ "&CMPID=" + cmpidCookie+ "&AZREF="+referCookie;
		   }
		   else
		   {
			   hrfURL+= "?CCUID=" + ccuidCookie+ "&CMPID=" + cmpidCookie+ "&AZREF="+referCookie;
		   }
		   $(this).attr('href',hrfURL);
	   }
	   
	   
	});
	
	
	
	$("a:contains('Join Amazon's Talent Community')").parent().after('<p style="font-size:0.8rem;">"STOP" to opt-out. T&C/Privacy Policy <a target="_blank" rel="noopener"  href="https://www.sms-terms.com/amazon/" aria-label="click here for Privacy Policy">here</a>.</p>');
}

function gaTracking()
{
		var eventTrackLabel = "";
		var bodyID = $('body').attr("id");
		
		switch(bodyID) 
		{
			case "about-our-opportunities-hourly-fulfillment-jobs-hourly-faq":
				eventTrackLabel ="Hourly FAQ";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-account":
				eventTrackLabel ="My job page";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-application":
				eventTrackLabel ="My Application";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-appointment":
				eventTrackLabel ="My Appointment";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-contingencies":
				eventTrackLabel ="Drug test backgroud check";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-job-offer":
				eventTrackLabel ="My Job Offer";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-starting":
				eventTrackLabel ="Starting My Job";
				break;
			case "about-our-opportunities-hourly-fulfillment-jobs-faq-vnho":
				eventTrackLabel ="My Online Orientation";
				break;
			default:
		}
		
		if(eventTrackLabel.length>0)
		{
			
			
			$('article a').click(function() {
			  
					ga('send', 'event', 'Custom Event', 'Click',eventTrackLabel + " - " + $(this).text().replace(" >",""));

			});
			
			$('aside #modules a').click(function() {
			  
				var labelTxt = $(this).parent().prev().text();
				ga('send', 'event', 'Custom Event', 'Click',eventTrackLabel + " - "+ labelTxt );

			});
		}
}


function createCookie(name, value, days) {

	
	if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
			var cookiValue = unescape(document.cookie.substring(c_start, c_end));
			
			return XSSValid(unescape(document.cookie.substring(c_start, c_end)));
        }
    }
    return "";
}

function getParameterByName(name) {
    name = name.toLowerCase().replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search.toLowerCase());
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function homePopup()
{
	if($('ul#home-location').length)
	{

		$('ul#home-location').prev().replaceWith('<label for="sel-location">'+$('ul#home-location').prev().html()+'</label>');
		
		$('ul#home-location').after('<button type="submit" id="btn-location" > Go </button>');

		 $('ul#home-location').each(function() {
			var $select = $('<select id="sel-location"/>');

			var $option = $('<option>Select Location</option>');
			$select.append($option);
			
			$(this).find('a').each(function() {
				var $option = $('<option />');
				$option.attr('value', $(this).attr('href')).html($(this).html());
				$select.append($option);
			});
			
			$(this).replaceWith($select);
			$('#sel-location').wrap('<div class="styled-select"></div>');
		});
		
		
		
		
		$( "#btn-location" ).click(function() {
			
			var selLocation = $('#sel-location').val();
			console.log(selLocation);
			if(selLocation=="Select Location")
			{
				alert("Please select a location");
				return false;
			}
			else 
			{
				location.href=selLocation;
			}
			
		});
		
	}
}

	
	
function XSSStringValidateURL(inString)
{

	//DO URL specific validation
	if (inString.indexOf(")")!=-1 ||
	   inString.indexOf("(")!=-1 ||
	   inString.indexOf("alert(")!=-1 ||
	   inString.indexOf("mouse")!=-1 ||
	   inString.indexOf("click")!=-1 ||
	   inString.indexOf("%22")!=-1 ||
	   inString.indexOf("%28")!=-1 ||
	   inString.indexOf("%29")!=-1 ||
	   inString.indexOf("%3E")!=-1 ||
	   inString.indexOf("%3C")!=-1 ||
	   inString.indexOf("%29")!=-1 ||
	   inString.indexOf("<")!=-1)
	{
		return "http://careers.bankofamerica.com";
	} 

	return inString;
}

function XSSValid(inString)
{

	//DO URL specific validation
	if (inString.indexOf(")")!=-1 ||
	   inString.indexOf("(")!=-1 ||
	   inString.indexOf("alert(")!=-1 ||
	   inString.indexOf("mouse")!=-1 ||
	   inString.indexOf("click")!=-1 ||
	   inString.indexOf("%22")!=-1 ||
	   inString.indexOf("%28")!=-1 ||
	   inString.indexOf("%29")!=-1 ||
	   inString.indexOf("%3E")!=-1 ||
	   inString.indexOf("document")!=-1 ||
	   inString.indexOf("location")!=-1 ||
	   inString.indexOf("%3C")!=-1 ||
	   inString.indexOf("%29")!=-1 ||
	   inString.indexOf("<")!=-1)
	{
		location.href =  "/";
		return "";
	}

	return inString;
}



function initGAEventTracking()
{

	$('#announcement a').click(function() {
	
		ga('send', 'event', 'COVID19', 'Click', "Banner click");
		
	});
	
	if($('body#covid-19-updates').length)
	{
		
		$('.accordion h2').click(function() {
	
			var h2Txt = $(this).text();
			var gaLabel = "";
			if(h2Txt.indexOf("Is Amazon hiring during")!=-1)
			{
				gaLabel = "Is Amazon hiring";
			}
			else if (h2Txt.indexOf("What is Amazon doing to provide a safe")!=-1)
			{
				gaLabel = "Employee safety";
			}
			else if (h2Txt.indexOf("Can I work for Amazon if there is a Curfew")!=-1)
			{
				gaLabel = "Shelter in place";
			}
			else if (h2Txt.indexOf("What is Amazon doing to help employees")!=-1)
			{
				gaLabel = "Employee help";
			}
			else if (h2Txt.indexOf("I’m laying off my employees because of COVI")!=-1)
			{
				gaLabel = "For employers";
			}
			ga('send', 'event', 'COVID19', 'Click', gaLabel);
		});
	}

	$('#nav-primary ul a').click(function() {
		
		var label  = 'Purple Nav wwwamazondelivers.jobs '+clean($(this).text());
		ga('send', 'event', 'Custom Event Links', 'Click', label);
		
	});
	
	$('.accordion-twocol h3').click(function() {
		
		var title = $('#introductory').find("h1").text();
		var label  = title + " "+ clean($(this).text());
		ga('send', 'event', 'Custom Event Links', 'Click', label);
	});
	
	$('.link-button').click(function() {
		
		var label  = clean($(this).text()) + " (orange)";
		ga('send', 'event', 'Custom Event Links', 'Click', label);
		
	});


	if($('body#home').length)
	{
	    $('.view-all-bar a').click(function () {

	        var label = 'Home - View All Jobs ';
	        ga('send', 'event', 'Custom Event Links', 'Click', label);

	    });

	    $('.reasons a').click(function () {

	        var label = 'Home - 5 Content Icon - '+ $(this).text();
	        ga('send', 'event', 'Custom Event Links', 'Click', label);

	    });

	}
}

function clean(text)
{
	return text.replace(/,/g,"-");
}

if ($('.scroll-to-content').length)
{
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        var topNav = $('.scroll-to-content').offset().top - scroll;
        var hHeight = $('header').height();

        if (topNav < hHeight) {

            $('.scroll-to-content nav').addClass("absolute");
            $('.scroll-to-content nav > ul').css("top", -topNav + hHeight);
        }
        else {
            $('.scroll-to-content nav').removeClass("absolute");
        }
    });
}
