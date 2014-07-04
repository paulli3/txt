
function init_signupform() {

	
	$("#signup-form").validate({
		rules: {
			'company[owner_email]': {
				required:true,
				email:true,
//				remote: 'ajax/validator.php?p=1'
				remote: 'c.php'
			},			
			'company[passwd]': {
				required: true,
				minlength: 4				
			},		
			'company[passwd2]': {
				equalTo: "#passwd1"
			}
		}
	});

}