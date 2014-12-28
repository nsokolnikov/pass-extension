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
		console.log("start"	);
		console.log($( "#upper" ).prop("checked"));
	},

	loadDescriptor : function() {
		console.log("loadDescriptor called!");

	}
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
	    console.log(current);
	}
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
	IOUtils.initTables();
	kittenGenerator.requestKittens();
});
