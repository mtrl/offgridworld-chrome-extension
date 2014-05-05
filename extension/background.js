var articleContent = "";
jQuery(document).ready(function(){
    if($('.page-nav-post a').length > 0) {
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
                });
            }
        });
    }
});