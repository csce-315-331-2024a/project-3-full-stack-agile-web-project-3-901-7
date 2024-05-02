package com.revs.grill;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
public class HelloController {

	/**
	 * @return
	 */
	@GetMapping("/")
	public String index() {
		return "wassup bro :)";
	}

}
