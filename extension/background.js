var loading_message = "\
<p>This article has multiple pages.</p>\
<img src=\"http://mtrl.co.uk/img/loading.gif\" class=\"ofg-loading\">\
<p>Currently loading all article content onto this page...</p>\
";

var ofg_css = "\
.ofg-one-page-loading {\
    width: 400px;\
    border-radius: 10px;\
    display: block;\
    margin: 20px auto;\
    background: #efefef;\
    padding: 10px;\
    text-align: center;\
}\
\
img.ofg-loading-img {\
    width: 30px;\
    height: auto;\
}\
";

jQuery.fn.make_one_page = function() {
    var articleContent = "";
    if(jQuery('.page-nav-post a').length > 0) {
        jQuery.fn.loading(true);
        var links = jQuery('.page-nav-post a');
        links.each(function() {
            if(jQuery(this).text().trim() != 'Next') {
                jQuery.get(jQuery(this).attr('href'), function(data) {
                    articleContent = jQuery(data).find('article.post').html();
                }).done(function(){
                    jQuery('article.post').append(articleContent);
                    jQuery('article footer, .td-more-articles-box, article header').hide();
                    jQuery('article header:first-child, article footer:last-child').show();
                    jQuery('.page-nav-post').hide();
                    // Show loaded
                    jQuery.fn.loading(false);
                });
            }
        });
    }
    return this;
}

jQuery.fn.loading = function(do_show) {
    // Add css
    if(do_show){
        $('head').append('<style>' + ofg_css + '</style>');
        $('<div class="ofg-one-page-loading">' + loading_message + '</div>').insertAfter('article header:first-child');
    } else {
        $('.ofg-one-page-loading').html('Loaded content');
        $('.ofg-one-page-loading').fadeOut(1000);
    }
}

jQuery(document).ready(function(){
    jQuery.fn.make_one_page();
});