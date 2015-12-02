var slideout = new Slideout({
  'panel': document.getElementById('main-content'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70,
  'side': 'right',
});

document.querySelector('.mast__slideout-button').addEventListener('click', function() {
  slideout.toggle();
});

slideout.on('beforeopen', function() {
  document.querySelector('.mast').className += ' mast--menu-open';
});

slideout.on('beforeclose', function() {
  document.querySelector('.mast').className = 'mast';
});

document.querySelector('.slideout-menu').addEventListener('click', function(eve) {
  if (eve.target.nodeName === 'A') { slideout.close();  }
});

$(function () {
  'use strict';

  var slides = document.querySelectorAll(".timeline__slide");
  var dateStat = document.getElementById("date_stat");
  var launchedStat = document.getElementById("launch_stat");
  var usersStat = document.getElementById("users_stat");

  // Controller
  var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'
      }
    });

  // Navigation
  var navigation = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: $('.slide').height(),
      triggerHook: .025,
      reverse: true
    }
  });

  // Enquire
  enquire.register("screen and (min-width:699px)", {

    match: function() {
      // Set-up controller again
      controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: 'onLeave'
        }
      });

      navigation = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: $('.slide').height(),
      triggerHook: .025,
      reverse: true
    }
  });

        navigation.scrollTo(function(target) {
          TweenMax.to(window, 0.5, {
            scrollTo : {
              y : target,
              autoKill : false // Allow scroll position to change outside itself
            },
            ease : Cubic.easeInOut
          });
        });

        $(document).on("click", "#nextSlide", function(e) {
    e.preventDefault();

    // Check which menu item has active
    var current = $(".timeline-navigation .active");
    var next = $current.index() + 1
  
    navigation.scrollTo("#slide-" + next );
  
});

$(document).on("click", "#prevSlide", function(e) {
    e.preventDefault();
    // Check which menu item has active
    var current = $(".timeline-navigation .active");
    var next = current.index() - 1
    console.log("next one needs to go to " + next)
    navigation.scrollTo("#slide-" + next );
});


    $(document).on("click", "a[href^=#]", function(e) {
      var id = $(this).attr("href");

      if($(id).length > 0) {
        e.preventDefault();

        navigation.scrollTo(id);
        
        if (window.history && window.history.pushState) {
          history.pushState("", document.title, id);
        }
      }

    });


      // Iterate over slides
      for (var i = 0; i < slides.length; i++) {

      var nav = new ScrollMagic.Scene({ triggerElement: '#slide-'+i })
        .setClassToggle('#anchor-'+i, 'active')
        .addTo(navigation);
        
        var t = new TimelineMax()
        t.add(TweenMax.to(dateStat, 0.1, { text: slides[i].getAttribute('data-date') } ), "0");
        t.add(TweenMax.to(launchedStat, 0.2, { text: slides[i].getAttribute('data-launched') } ), "0");
        t.add(TweenMax.to(usersStat, 0.2, { text: slides[i].getAttribute('data-users') } ), "0");
       
        var offset = window.innerHeight - (window.innerHeight/2) - 155 + "px"
        
        // Stats
        new ScrollMagic.Scene({
          triggerElement: slides[i],
          triggerHook: "onEnter",
          offset: "-" + offset,   
        })
        .addTo(controller)
        .setTween(t);

        // Slides pinned
        new ScrollMagic.Scene({
          triggerElement: slides[i]
        })
        .setPin(slides[i])
        .addIndicators()
        .addTo(controller)
      }

    },
    unmatch: function() {
      controller.destroy(true);

      $(document).on("click", "a[href^=#]", function(e) {
        // e.preventDefault();
        var $this = $(this),
            href = $this.attr("href"),
            topY = $(href).position().top;

            if(topY > $(window).height()) {
              topY = topY + 94
        }
          TweenMax.to(window, 1, {
              scrollTo:{
                  y: topY, 
                  autoKill: false
              }, 
              ease:Power3.easeOut 
           });
          return false;
        });

    }
  });


});



$('body').keydown(function(e){
   if(e.keyCode == 8){
       // user has pressed backspace

   }
    if(e.keyCode == 38){
       // user has pressed backspace
      e.preventDefault();
       false
   }
     if(e.keyCode == 40){
       // user has pressed backspace
      e.preventDefault();
       false
   }
   if(e.keyCode == 32){
       // user has pressed space
       console.log('keyboard pressed');
         e.preventDefault();
       false
   }
});