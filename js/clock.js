// Interactiveness now

$(document).ready(function() {

	var clock = document.getElementById('clock');
	
	// But there is a little problem
	// we need to pad 0-9 with an extra
	// 0 on the left for hours, seconds, minutes
	
	var pad = function(x) {
		return x < 10 ? '0'+x : x;
	};
	
	var ticktock = function() {
		var d = new Date();
		var h = pad( d.getUTCHours() );
		var m = pad( d.getUTCMinutes() );
		var s = pad( d.getUTCSeconds() );
		
		var current_time = [h,m,s].join(':');
		
		clock.innerHTML = current_time;
		
	};
	
	ticktock();
	
	// Calling ticktock() every 1 second
	setInterval(ticktock, 1000);
	
}());

$(document).ready(function() {

	var clock = document.getElementById('clock1');
	
	// But there is a little problem
	// we need to pad 0-9 with an extra
	// 0 on the left for hours, seconds, minutes
	
	var pad = function(x) {
		return x < 10 ? '0'+x : x;
	};
	
	var ticktock = function() {
		var d = new Date();
		var h = pad( (d.getUTCHours()-5)%24 );
		var m = pad( d.getUTCMinutes() );
		var s = pad( d.getUTCSeconds() );
		
		var current_time = [h,m,s].join(':');
		
		clock.innerHTML = current_time;
		
	};
	
	ticktock();
	
	// Calling ticktock() every 1 second
	setInterval(ticktock, 1000);
	
}());

$(document).ready(function() {

	var clock = document.getElementById('clock2');
	
	// But there is a little problem
	// we need to pad 0-9 with an extra
	// 0 on the left for hours, seconds, minutes
	
	var pad = function(x) {
		return x < 10 ? '0'+x : x;
	};
	
	var ticktock = function() {
		var d = new Date();
		var h = pad((d.getUTCHours()+8)%24);
		var m = pad( d.getUTCMinutes() );
		var s = pad( d.getUTCSeconds() );
		
		var current_time = [h,m,s].join(':');
		
		clock.innerHTML = current_time;
		
	};
	
	ticktock();
	
	// Calling ticktock() every 1 second
	setInterval(ticktock, 1000);
	
}());