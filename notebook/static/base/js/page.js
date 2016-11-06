// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define([
    'jquery',
    'base/js/events',
], function($, events){
    "use strict";

    var Page = function () {
        this.bind_events();
    };
    
    function isMirroringEnabled() {
        return (new RegExp("^(ar|he)").test(navigator.language));
    }
    
    if (isMirroringEnabled()) {
    	 $("body").attr("dir","rtl");
    }
    
    Page.prototype.bind_events = function () {
        // resize site on:
        // - window resize
        // - header change
        // - page load
        var _handle_resize = $.proxy(this._resize_site, this);
        
        $(window).resize(_handle_resize);

        // On document ready, resize codemirror.
        $(document).ready(_handle_resize);
        events.on('resize-header.Page', _handle_resize);
    };

    Page.prototype.show = function () {
        /**
         * The header and site divs start out hidden to prevent FLOUC.
         * Main scripts should call this method after styling everything.
         */
        this.show_header();
        this.show_site();
    };

    Page.prototype.show_header = function () {
        /**
         * The header and site divs start out hidden to prevent FLOUC.
         * Main scripts should call this method after styling everything.
         * TODO: selector are hardcoded, pass as constructor argument
         */
        $('div#header').css('display','block');
    };

    Page.prototype.show_site = function () {
        /**
         * The header and site divs start out hidden to prevent FLOUC.
         * Main scripts should call this method after styling everything.
         * TODO: selector are hardcoded, pass as constructor argument
         */
        $('div#site').css('display', 'block');
        this._resize_site();
    };

    Page.prototype._resize_site = function() {
        // Update the site's size.
        $('div#site').height($(window).height() - $('#header').height());
    };

    return {'Page': Page};
});
