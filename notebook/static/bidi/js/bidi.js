// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define([
        'bidi/js/numericshaping',
],function (numericshaping){
    "use strict";
    var calendarType="";
    var textDir="";
    var shaperType="";
    
    var _setCalendarType = function(val){
        calendarType=val;
    };
    
    var _setTextDir = function (dir){
    	textDir=dir;
    };
    
    var _setNumericShaping = function (val){
    	shaperType=val;
    };
    
    var _flags= {
    		NS: 0,
    		Calendar : 1
    };
   
    /**
    * Formats the date according to the current selected calendar 
    * @param date - the date object to be formatted
    */
    var _getGlobalizedDate = function(date) {
        var options = {};
        var lang = navigator.language;
        if (calendarType === "hijri") {
            options = lang + "-u-ca-islamic";
        } else if (calendarType === "hebrew") {
            options = lang + "-u-ca-hebrew";
        }
        return date.toLocaleString(options);
    };

    var _isMirroringEnabled= function()  {
        return (new RegExp("^(ar|he)").test(navigator.language));
    };
    
    var _applyBidi = function (value , flag){
    	switch (flag) {
    	case 0:
    		numericshaping.shape(value,shaperType,textDir);
    	case 1:
    		_getGlobalizedDate(value);
    		
    	}
    };
    
    var bidi = {
    	isMirroringEnabled : _isMirroringEnabled,
    	setNumericShaping : _setNumericShaping,
    	setCalendarType: _setCalendarType,
    	setTextDir : _setTextDir,
    	getGlobalizedDate: _getGlobalizedDate,
    	flags : _flags,
    	applyBidi : _applyBidi,
    };
    
    return bidi;
});
