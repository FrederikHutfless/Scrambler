//Fake window so tnoodle is happy
var window = self;
var document = {};
window.document = document;
document['write'] = function() {};
window.write = document['write'];
document.getElementById = function() {};
document.getElementsByTagName = function() {return [];};
document.readyState = 'loaded';
if(window.location) {
    // Firefox actually does set self.location for webworkers
    document.location = window.location;
} else {
    window.location = { href: "", search: "" };
    document.location = window.location;
}
var puzzles;
function puzzlesLoaded(puzzls) {
	window.puzzles = puzzls;
	self.puzzles = puzzls;
	puzzles = puzzls;
}
onmessage = function(event){
	console.log(event.data);
	if(event.data.fn == "setpuzzles"){
		puzzles = window.puzzles = {"333":event.data.p333}
		return;
	}
	var out = scrambler[event.data.fn](...event.data.args);
	console.log(out);
	postMessage(out);
}