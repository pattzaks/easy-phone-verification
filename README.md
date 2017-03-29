# easy-phone-verification

Sample to show the signup of users on a web page accessed from mobile which requires phone verification.
Use case : Most Indian governments services, operator sign-ups, free WiFi sign ups require people to 
           verify the phone number for authorization.

This project gives a basic overview of usage of *webtask* and serverless architecture.
Front-end is hosted on akshay.surge.sh

Webtask gives you a serverless backend. Don't host a server resources for trivial tasks. You can offload to webtask. This is my single click auto-login &amp; verification. Learn more at webtask.io

Security is taken care by tokens while you create your bundles or webtasks.


How to get started with your project of webstart:
1) Requirements : 
  - latest version of npm, nodejs
  - wt-cli node module.
  Make sure you clear the npm package cache as it will gives syntax erros in modele of wt-cli like "strict coding standard"  
2) For hosting my front-end files. I've used surge.sh (A free static page hosting service, you can push the files from command line to your own surge.sh subdomain)
  This project's domain is akshay.surge.sh for a simple showcase.
  
3) For sending out SMSes, I've used Twilio's programmable SMS product.

4) create a webtask by running 
   wt-cli create autologin-webtask.js
   Output : 
   your URL for webtask. Example : https://wt-5672f44eeb7bd7615e3a301ff4c8321b-0.run.webtask.io/autologin-webtask
   then monitor the logs & activity using 
   wt logs
   
 
I am just a beginer at node.js & Webtask. 

Let me know what you think.   
Reviews & suggestions are welcome.

Login Screen here :- 
![Login Screen](https://cloud.githubusercontent.com/assets/693732/24478638/3a777866-14f9-11e7-99e4-36c08b82109f.PNG)

Profile screen here :-
![Profile screen](https://cloud.githubusercontent.com/assets/693732/24478652/478bc3ae-14f9-11e7-8e12-effb91357cd8.PNG)


