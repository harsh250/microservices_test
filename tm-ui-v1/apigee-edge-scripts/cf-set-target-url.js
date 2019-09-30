/* retrieve variable saved from cf-header and assign target.url */
var cfurl = context.getVariable('cf-url');
var rand = Math.floor((Math.random() * 2) + 1);
if(rand % 2 === 0) {
    var cfurl = cfurl.replace("ticket-monster", "tm-ui-v1");
    context.setVariable('request.header.X-Canary', "tm-ui-v1");
} else {
    context.setVariable('request.header.X-Canary', "ticket-monster");
}
context.setVariable('target.url', cfurl);
