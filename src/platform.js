/* platform-specific setup */

// top-level debug initialization needs this. declare it in case we aren't in the same file as out.js
function h$ghcjszmprimZCGHCJSziPrimziJSRef_con_e() { return h$stack[h$sp]; };

/*
   if browser mode is active (GHCJS_BROWSER is defined), all the runtime platform
   detection code should be removed by the preprocessor. The h$isPlatform variables
   are undeclared.

   in non-browser mode, use h$isNode, h$isJsShell, h$isBrowser to find the current
   platform.

   more platforms should be added here in the future
*/
#ifndef GHCJS_BROWSER
var h$isNode    = false; // runtime is node.js
var h$isJsShell = false; // runtime is SpiderMonkey jsshell
var h$isBrowser = false; // running in browser or everything else
// load all required node.js modules
if(typeof process !== undefined && typeof require !== 'undefined' && typeof module !== 'undefined' && module.exports) {
    h$isNode = true;
    // we have to use these names for the closure compiler externs to work
    var fs            = require('fs');
    var path          = require('path');
    var os            = require('os');
    var child_process = require('child_process');
    var h$fs          = fs;
    var h$path        = path;
    var h$os          = os;
    var h$child       = child_process;
} else if(typeof snarf !== undefined && typeof evalInFrame !== 'undefined' && typeof enableStackWalkingAssertion !== 'undefined') {
    h$isJsShell = true;
    this.console = { log: this.print };
} else {
    h$isBrowser = true;
}
#endif

function h$getGlobal(that) {
    if(typeof global !== 'undefined') return global;
    return that;
}

#ifdef GHCJS_BROWSER
// IE 8 doesn't support Date.now(), shim it
if (!Date.now) {
  Date.now = function now() {
    return +(new Date);
  };
}
#endif
