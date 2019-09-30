/* retrieve variable saved in cf-url and X-Dark-Launch request header */
/* assign target.url and X-Canary request header */
var cfurl = context.getVariable('cf-url');
var userGroup = context.getVariable('request.header.X-Dark-Launch');
var xCanary = '';

context.setVariable('request.header.X-Canary', 'ticket-monster');

if(userGroup === 'internal') {
    cfurl = cfurl.replace('ticket-monster', 'tm-ui-v2');
    xCanary = "tm-ui-v2";
 } else {
    var rand = Math.floor((Math.random() * 4) + 1);
    if(rand % 4 === 0) { // route 25 percent of external users to tm-ui-v2
      cfurl = cfurl.replace('ticket-monster', 'tm-ui-v2');
      xCanary = "tm-ui-v2";
    } else {
       cfurl = cfurl.replace('ticket-monster', 'tm-ui-v1');
      xCanary = "tm-ui-v1";
    }
 }

context.setVariable('request.header.X-Canary', xCanary);
context.setVariable('target.url', cfurl);