// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";
/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var QUERY = 'kittens';

var upper = [];
var lower = [];
var symbols = [];
var numbers = [];
var descriptors = [];

var Descriptor = function() {
	this.isUpper = false;
	this.isLower = false;
	this.isSymbols = false;
	this.isNumbers = false;
	this.isCustom = false;
	this.customStr = "";
	this.domainStr = "";
	this.saltStr = "";
	this.lenStr = 10;
};

var ByteArrayUtils = {
	toBaseN : function(str, base) {
		var result = [];
		var i = 0;
		while(i < str.words.length){
			result = result.concat(ByteArrayUtils.numToChar(str.words[i], base));
			i++;	
		}		
		return result;
	},
	//converts javascript number to array of desired base
	numToChar : function(num, base){
		var result = [];
		while(num > 0){
			result[result.length] = num % base;
			num = Math.floor(num/base);
		}
		return result;
	}
	
};


var IOUtils = {
	initTables : function() {
		for (var i = "a".charCodeAt(0); i < "z".charCodeAt(0) + 1; i++) {
			lower[i - "a".charCodeAt(0)] = String.fromCharCode(i);
		};
		for (var i = "A".charCodeAt(0); i < "Z".charCodeAt(0) + 1; i++) {
			upper[i - "A".charCodeAt(0)] = String.fromCharCode(i);
		};
		for (var i = "0".charCodeAt(0); i < "9".charCodeAt(0) + 1; i++) {
			numbers[i - "0".charCodeAt(0)] = String.fromCharCode(i);
		};
		for (var i = "#".charCodeAt(0); i < "-".charCodeAt(0) + 1; i++) {
			symbols[i - "#".charCodeAt(0)] = String.fromCharCode(i);
		};
	},
};

var DescriptorUtils = {
	createDescriptor : function() {
	    var current = new Descriptor();
	    current.isUpper = $("#upper").prop("checked");
	    current.isLower = $("#lower").prop("checked");
	    current.isSymbols = $("#symbol").prop("checked");
	    current.isNumbers = $("#number").prop("checked");
	    current.isCustom = $("#custom").prop("checked");
	    current.domainStr = $("#domain").prop("value");
	    current.customStr = $("#customText").prop("value");
	    current.saltStr = $("#salt").prop("value");
	    current.lenStr = $("#lenStr").prop("value");
	    console.log(current);
	    descriptors[current.domainStr] = current;
//	    window.localStorage.setItem("descriptors", JSON.stringify(descriptors));
//	    console.log(window.localStorage.getItem(JSON.parse(current.domainStr)));
//	    console.log("after");
	    return current;
	},
	
	getCharArray : function(desc){
		var result = [];
		if(desc.isUpper){ result = result.concat(upper);}
		if(desc.isLower){ result = result.concat(lower);}
		if(desc.isSymbols){ result = result.concat(symbols);}
		if(desc.isNumbers){ result = result.concat(numbers);}
		if(desc.isCustom){ result = result.concat(desc.customStr.split(""));}
		console.log(result);
		return result;
	},
	
	loadDescriptor : function() {
		if($("#autodomain").prop("checked") && 
					typeof descriptors[$("#domain").prop("value")] !== 'undefined'){
		  	var current = descriptors[$("#domain").prop("value")];
			$("#upper").prop("checked", current.isUpper);
	    	$("#lower").prop("checked", current.isLower);
	    	$("#symbol").prop("checked", current.isSymbols); 
	    	$("#number").prop("checked", current.isNumbers);
	    	$("#custom").prop("checked", current.isCustom);
	    	$("#domain").val(current.domainStr); 
	    	$("#customText").val(current.customStr);
	    	$("#salt").val(current.saltStr); 
	    	$("#lenStr").val(current.lenStr);
		}
	}
};


var PassGen = {
	generatePassword : function() {
		var desc = DescriptorUtils.createDescriptor();
		var step1 = $("#master").prop("value");
		step1 = (step1+"0000000000"+$("#salt").prop("value"));
		var step2 = CryptoJS.SHA3(step1);
		var charArray = DescriptorUtils.getCharArray(desc);
		if(charArray.length > 1){
			var step3 = ByteArrayUtils.toBaseN(step2, charArray.length);
			var step4 = [];
			for (var i=0; i < step3.length; i++) {
		 	 step4[i] = charArray[step3[i]];
			};
			console.log(step4);
			var step5 = step4.join("").substr(0, desc.lenStr);
			console.log(step5);
			$("#output").val(step5);
		}else{
			alert("Insufficient characters selected.");
		}
//		console.log($("#output"));
	}
};
document.addEventListener('DOMContentLoaded', function() {
	IOUtils.initTables();
});
