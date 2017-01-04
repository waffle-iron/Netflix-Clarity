(function () {
	'use strict';

	describe('Core', function () {
		it('should not run if not netflix', function () {
			var instance = new Clarity();
			expect(instance.valid).to.equal(false);
		});

		it('should run if netflix', function () {
			Clarity.prototype.host = function(){
				return "www.netflix.com";
			}

			var instance = new Clarity();
			expect(instance.valid).to.equal(true);
		});

			

	});
})();
