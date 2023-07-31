// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  }

};

function getHashFilter() {
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

// init Isotope
var $grid = $('.grid');

// bind filter button click
var $filterButtonGroup = $('#filters');
$filterButtonGroup.on( 'click', 'button', function() {
  var filterAttr = $( this ).attr('data-filter');
  // set filter in hash
  location.hash = 'filter=' + encodeURIComponent( filterAttr );
});

var isIsotopeInit = false;

function onHashchange() {
  var hashFilter = getHashFilter();
  if ( !hashFilter && isIsotopeInit ) {
    return;
  }
  isIsotopeInit = true;

  // filter isotope
  $grid.isotope({
    itemSelector: '.grid-item',
    // use filterFns
    filter: filterFns[ hashFilter ] || hashFilter,
    masonry: {
      isFitWidth: true
    }
  });
  // set selected class on button
  if ( hashFilter ) {
    $filterButtonGroup.find('.is-checked').removeClass('is-checked');
    $filterButtonGroup.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
  }
}

$(window).on( 'hashchange', onHashchange );

// trigger event handler to init Isotope
onHashchange();

// prevents images from overlapping
$grid.imagesLoaded().progress(function () {
    $grid.isotope('layout');
  });

  $(window).resize(function(){
   $grid.isotope('reloadItems');
});