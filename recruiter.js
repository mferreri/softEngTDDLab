'use strict';

// Object containing starting wages for various 4 year degrees
var degreeSWage = require('./degreeSWage.json');
// File containing some of our utility functions (already written)
var util = require('./util.js');

//TODO: You need to write this function AND utilize it.
// bracketFromGPA(decimal GPA);
function bracketFromGPA(gpa) {
	var b;
	if(gpa>=3.5){
		b = 3;
	}
	else if(gpa>=3){
		b = 2;
	}
	else if (gpa >= 2.5){
		b = 1;
	}
	else{
		b = 0;
	}
	// 4-3.5, 3.49 - 3.0, 2.99 - 2.5
	return b; //some form of bracket number
}

// TODO: recruiter( Array of hireables )
function recruiter(internArr) {

	// Below is just to help show the syntax you need,
	// you'll need to process ALL of the hireables like this one and sort

	var index = 0;
 for(index = 0; index <internArr.length;index++){
	var iname = internArr[index].name;
	var idegr = internArr[index].degree;
	var igpa = internArr[index].gpa;
	var iexp = internArr[index].experiance;
	var iwage, ivalue, ibracket, imetric;

	// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
	idegr = idegr.toLowerCase();
	iwage = degreeSWage[idegr];


	if(iwage === undefined){
			internArr.splice(index,1);
	}

   // console.log(typeof internArr[index].degree);

		if(internArr[index].gpa<2.5 && !( (internArr[index].degree).includes("astrology"))){
			internArr.splice(index,1);
		}
	// You should use these functions at some point
	ivalue = util.getValueFromWageAndExp( iwage, Math.floor(iexp) );
	ibracket = bracketFromGPA ( igpa );

	// Hmm... this doesn't seem to follow the spec - fix it
	imetric = 4*ivalue + ibracket;

	// We really want to add our sorting number "metric" to objects (it really is this easy)
	internArr[index].metric = imetric;

}
	// and then sort them all (it doesn't return anything, it modifies the array sent)
	util.sortInternObjects( internArr );


	// Output
	// An array of HIREABLE 'intern objects' (in order of most valueable to least valueable)
	// with at least the properties "name", "metric", "degree"
	// You can come up with any number you want for "metric" as long as it corresponds to the spec
	// and people earlier in the array have equal or greater values for "metric" than
	// people further down.

	return internArr;
};

module.exports = {
	recruiter: recruiter,
	bracketFromGPA: bracketFromGPA
};
