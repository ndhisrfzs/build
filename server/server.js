var loopback=require("loopback"),boot=require("loopback-boot"),https=require("https"),app=module.exports=loopback(),favicon=require("serve-favicon"),fs=require("fs"),options={key:fs.readFileSync("./server/key/ttmanage.shijianvip.com.key"),cert:fs.readFileSync("./server/key/ttmanage.shijianvip.com_bundle.crt")};app.start=function(){return https.createServer(options,app).listen(443),app.listen(function(){app.emit("started");var a=app.get("url").replace(/\/$/,"");if(console.log("Web server listening at: %s",a),app.get("loopback-component-explorer")){var b=app.get("loopback-component-explorer").mountPath;console.log("Browse your REST API at %s%s",a,b)}})},boot(app,__dirname,function(a){if(a)throw a;require.main===module&&app.start()}),app.use(favicon(__dirname+"/favicon.ico"));