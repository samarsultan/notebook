// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define([
        'bidi/js/bidi',
], function(bidi) {
	"use strict";
	
    var regex = /([0-9])|([\u0660-\u0669])|([\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE]+)|([^0-9\u0660-\u0669\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE\u0600-\u0607\u0609-\u060A\u060C\u060E-\u061A\u064B-\u066C\u0670\u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u08E4-\u08FF\uFD3E-\uFD3F\uFDD0-\uFDEF\uFDFD\uFEFF\u0000-\u0040\u005B-\u0060\u007B-\u007F\u0080-\u00A9\u00AB-\u00B4\u00B6-\u00B9\u00BB-\u00BF\u00D7\u00F7\u02B9-\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u02FF\u2070\u2074-\u207E\u2080-\u208E\u2100-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A-\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189\uA720-\uA721\uA788\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE]+)/g;
	
    /**
     * Converts the digits in the text to European or Arabic digits According to
     * the shaperType & the textDir.
     */
    var _shape = function(text, shaperType, textDir) {
        text = text.toString();
        if (!text) { 
            return text;
        }
        switch (shaperType) {
            case "defaultNumeral":
                return _shapeEuropean(text);
            case "national":
                return _shapeArabic(text);
            case "contextual":
                return _shapeContextual(text, textDir === "rtl" ? 2 : 1);
            default:
                return text;
        }
    }
    
    /**
     * Converts the digits in the text to European digits.
     */
    var _shapeEuropean = function(text) {
        return text.replace(/[\u0660-\u0669]/g, function(c) {
            return c.charCodeAt(0) - 1632;
        });
    }
    
    /**
     * Converts the digits in the text to Arabic digits.
     */
    var _shapeArabic = function(text) {
        return text.replace(/[0-9]/g, function(c) {
            return String.fromCharCode(parseInt(c) + 1632);
        });
    }
	
    /**
     * Converts the digits in the text to European or Arabic digits
     * According to the type of the preceding strong character.
     * @param context:The current effective context.
     * Allowed values:
     * '1': European context
     * '2': Arabic context
     */
    var _shapeContextual = function (text, context) {
        return text.replace(regex, function(match, latinDigit, arabicDigit, strongArabic, strongLatin){
            if (latinDigit) {
                return (context === 2) ? String.fromCharCode(parseInt(latinDigit) + 1632) : latinDigit;
            } else if (arabicDigit) {
                return (context === 1) ? arabicDigit.charCodeAt(0) - 1632 : arabicDigit;
            } else if (strongArabic) {
                context = 2;
            } else if (strongLatin) {
                context = 1;
            }
            return match;
        });
    }
    var numericshaping = {
        shape: _shape
    };
    return numericshaping;
})();