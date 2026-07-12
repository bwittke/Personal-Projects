$(document).ready(function() {
	"use strict";
	// UW grading scale
	var scale = {"4.0": 4.00, "3.9":3.9, "3.8":3.8, "3.7":3.7, "3.6":3.6, "3.5":3.5,
		"3.4":3.4, "3.3":3.3, "3.2":3.2, "3.1":3.1, "3.0":3.0, "2.9":2.9, "2.8":2.8,
		"2.7":2.7, "2.6":2.6, "2.5":2.5, "2.4":2.4, "2.3":2.3, "2.2":2.2, "2.1":2.1,
		"2.0":2.0, "1.9":1.9, "1.8":1.8, "1.7":1.7, "1.6":1.6, "1.5":1.5, "1.4":1.4,
		"1.3":1.3, "1.2":1.2, "1.1":1.1, "1.0":1.0, "0.9":0.9, "0.8":0.8, "0.7":0.7,
		"0.0":0.0};
	
	// Build select list
	var dropdown = "",
		keys = Object.keys(scale);
	for( var i = 0; i < keys.length; i++ ) {
		dropdown += '<option>' + keys[i] + '</option>';
	}
	
	// Populate select lists
	$('.gpa_select').html(dropdown);
	
	// Delete a table row
	$('#remove_row').click(function() {
		$('#gpa-table tbody tr:last').remove();
	});
	
	// Add a table row
	$('#add_row').click(function() {
		var numOfRows = $('#gpa-table tbody tr').size() + 1;
		var row = '' +
			'<tr>' +
			'<td>' + numOfRows + '</td>' +
			'<td><input type="text" class="coursename"></td>' +
			'<td><input type="text" class="credithours small"></td>' +
			'<td><select class="gpa_select small"></select></td>' +
			'<td><input type="text" class="gradepoint small" readonly="readonly"></td>' +
			'</tr>';
		$('#gpa-table tbody').append(row);
		$('.gpa_select:last').html(dropdown);
	});
	
	// Calculate grade point after user input
	//$('.credithours').blur(function() {
	//	compute($(this));
	//});
	$('body').on('blur', '.credithours', function() {
		compute($(this));
	});
	
	// Calculate grade point after user input 
	$('body').on('change', '.gpa_select', function() {
		compute($(this));
	});
	
	// FUNCTIONS
	function compute(self) { // self = $(this)
		var $tableRow = self.closest('tr'),
			currentRow = $tableRow.index(),
			creditHour = $('.credithours').eq(currentRow).val(),
			letterGrade = $('.gpa_select').eq(currentRow).val();
		//////////////console.log(creditHour, scale[letterGrade], letterGrade, currentRow);
		// Compute if its NOT empty and IS a number
		if (creditHour !== "" && $.isNumeric(creditHour)) {
			var gradepoint = (creditHour * scale[letterGrade]).toFixed(2);
			$('.gradepoint').eq(currentRow).val(gradepoint);
			$('.credithours').eq(currentRow).removeClass('red');
			// Update totals
			sumSemesterCredits();
			sumSemesterGradePoints();
			computeGPA();
		// Alert user that they used an invalid character
		} else{
			$('.credithours').eq(currentRow).addClass('red');
		}
	}
	function sumSemesterCredits() {
		var sum = 0;
		$('.credithours').each(function (){
			var val = $(this).val();
			if (val !== "" && $.isNumeric(val)){ // only process the inputs that have been populated
				sum += parseInt(val, 10);
			}
		});
		$('#semester-credit-hours').val(sum.toFixed(2));
	}
	function sumSemesterGradePoints() {
		var sum = 0;
		$('.gradepoint').each(function (){
			var val = $(this).val();
			if (val !== "" && $.isNumeric(val)){ // only process the inputs that have been populated
				sum += parseFloat(val);
			}
		});
		$('#semester-grade-points').val(sum.toFixed(2));
	}
	function computeGPA() {
		var currentGradePoints = parseFloat($('#current-gpa').val());
		var currentHours = parseInt($('#current-hrs').val(), 10);
		var newGradePoints = parseFloat($('#semester-grade-points').val());
		var newHours = parseInt($('#semester-credit-hours').val(), 10);
		
		// Existing GPA?
		if (trueIfNumber(newGradePoints)) {
			$('#current-gpa').removeClass('red');
			console.log('Current (GPA:', currentGradePoints, ' Hrs:', currentHours, ') New (GPA:', newGradePoints, ' Hrs:', newHours, ')');
			$('#total-grade-points').val(((currentGradePoints * currentHours) + newGradePoints).toFixed(2));
		} else{
			$('#current-gpa').addClass('red');
		}
		
		// Existing credit hours?
		if (trueIfNumber(newHours)) {
			$('#current-hrs').removeClass('red');
			$('#total-credit-hours').val((newHours + currentHours).toFixed(2));
		} else{
			$('#current-hrs').addClass('red');
		}
		
		// Check for errors before computing existing GPA
		if (trueIfNumber(newGradePoints) && trueIfNumber(newHours)) {
			$('#overall-gpa').val( ($('#total-grade-points').val() / $('#total-credit-hours').val()).toFixed(2) );
		} else {
			console.log("Fail");
		}
	}
	// Helper functions
	function trueIfNumber(variable) {
		if (variable !== "" && $.isNumeric(variable)) {
			return true;
		} else {
			return false;
		}
	}
});