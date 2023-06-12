function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach(modal => modal.hide());
}

document.addEventListener('shopify:block:select', function(event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function() {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft
    });
  }, 200);
});
$('.js-load-more').on('click', function(){
 var $this =$(this),
 totalPages = parseInt($('[data-all-pages]').val()),
 currentPage = parseInt($('[data-this-page]').val()),
 datacollurl = $('[data-coll-url]').val();;
 $this.attr('disabled', true);
 $this.find('[load-more-text]').addClass('hide');
 $this.find('[loader]').removeClass('hide');
 var nextUrl = $('[data-next-link]').val();
 var current_page_new = currentPage + 1;
 var next_coll = currentPage + 2;
 //alert(current_page_new)
 //return false;
 $.ajax({
 url: nextUrl,
 type: 'GET',
 dataType: 'html',
 success: function(responseHTML){
 $('[data-next-link]').val(datacollurl + "?page="+next_coll);
 $('[data-this-page]').val(current_page_new);
 $('.grid--view-items').append($(responseHTML).find('.grid--view-items').html());
 },
 complete: function() {
 if(current_page_new < totalPages) {
 $this.attr('disabled', false); $this.find('[load-more-text]').removeClass('hide'); $this.find('[loader]').addClass('hide');
 } 
 if(current_page_new >= totalPages) {
 $this.find('[load-more-text]').text('Products Finished').removeClass('hide'); $this.find('[loader]').addClass('hide');
 } 
 }
 })
});
document.addEventListener('shopify:block:deselect', function(event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());
