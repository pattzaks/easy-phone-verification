function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function sendTwilioSMS (receiver, smsBody) {

    console.log("Now Sending SMS.. ... . ");

    var twilioNumber = "+12482663045";
    var accountSid   = 'AC0c7b92c985a2a40ca1b836e723587831'; 
    var authToken    = ''; // Demo account token

    var client       = require('twilio')(accountSid, authToken); 

    client.messages.create({ 
        to  : receiver, 
        from: twilioNumber, 
        body: smsBody,
    }, function(err, message) { 
        console.log(message.sid); 
    }); 

}

module.exports = function (ctx, cb) {

    // Start with a Data lookup first
    ctx.storage.get(function (error, data) {
        if (error) {
           
            console.log("Unable to get storage of this container."); 
        	var response = {'state':'notok', 'message':'Something went wrong with webtask'};
            cb (null, response);
        }
        else if (data !=null && ctx.data.method == 'verify') {

            if (data.phone == ctx.data.phone && data.otp == ctx.data.otp){
                data = {phone : ctx.data.phone, auth: "done"};
                ctx.storage.set(data, function (error) {
               
                if (error) { return cb(error); }
                console.log("Now user is verified" + data);

        	    var response = {'state':'ok', 'message':'http://akshay.surge.sh/profile.html?auth=ok'};
                cb (null, response);
            });
            }
        }
        else if (data != null && data.phone == ctx.data.phone && data.auth == "done" ) { // Existing user jumps here
            console.log ("NO signup just Login :" + data.phone);
            // Check if the auth status = done in order to login
        	var response = {'state':'ok', 'message':'http://akshay.surge.sh/profile.html?auth=ok'};
            cb (null, response);
        } 
         // user who requested acces but did not veriy yet, For demo purpose we cannot afford to send a SMS again.
        else if (data !=null && data.phone == ctx.data.phone && data.auth == "pending" ) {
            console.log  ("Pending auth. Don't send SMS, just remind on Front-end. We don't want to send another SMS for demo");
        	var response = {'state':'pending', 'message':'You havent verified your phone. Please get in touch with us to access this service now'};
            cb (null, response);
        }

         else { // -- New user sign-up process -- 
            console.log ("You need to sign up bro. We've sent SMS of auto-login link");

            data = {phone : ctx.data.phone, otp : random(1000, 9999), auth: "pending"};
            console.log(data);
            ctx.storage.set(data, function (error) {
               if (error) { return cb(error); }
                console.log("data successfully STORED" + data);

                // Now Send SMS link which does auto-login & phone number verification of user
                link     = "http://akshay.surge.sh/?phone="+data.phone+"&otp="+data.otp;
                sms_body = "Hi, Please verify your phone number. Here is your auto-login link. Click to log in automatically. " + link;
                sendTwilioSMS (ctx.data.phone, sms_body);
        	    var response = {'state':'init', 'message':'Thank you for signing up. We have sent a SMS of auto-login link for your phone number verification'};
                cb (null, response);
            });

        }
        console.log ("-------------------------------------------------------------") ;
    });
}
