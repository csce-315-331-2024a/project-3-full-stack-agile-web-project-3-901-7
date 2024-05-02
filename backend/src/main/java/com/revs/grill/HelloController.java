package com.revs.grill;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class represents a controller that handles requests for the root URL
 * ("/").
 * It returns a greeting message.
 */
@RestController
public class HelloController {

	/**
	 * Returns a greeting message.
	 *
	 * @return a greeting message as a String.
	 */
	@GetMapping("/")
	public String index() {
		return "wassup bro :)";
	}

}
