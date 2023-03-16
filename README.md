# Ecommerce_App_Auth_Server
Auth_Server is separated out from main Ecom_App
As to Keep a user Logged in till the authentication token is expired.

Once this Token is received we can do multiple tasks with same Token
And Won't need keeping login again and again to get Auth Token.

Whenever a User will try to login Main Ecom_App will call Auth_Server,
Auth_Server Will Then Verify User Details And then provide Jwt TOken to proceed.

This Auth_Server Will Store All Active Expired Refresh JWT Tokens.
