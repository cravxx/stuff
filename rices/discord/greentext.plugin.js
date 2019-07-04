//META{"name":"GreentextPlugin"}*//
function GreentextPlugin() {
    this.load = function() {
        $("<style type='text/css'> .greentext{ color:#709900!important; font-family: arial !important;} .command{color:#804c00!important;font-family: monospace!important;text-shadow: -1px -1px rgba(255, 255, 255, 0.43)!important;} .orange{color:#FB910A!important;} .reddit{color:#FF4500!important; font-weight: bolder !important;}</style>").appendTo("head");
        document.addEventListener("DOMNodeInserted", function() {
            $('.da-markup').slice(-10).each(function(index) {
                if ((!($(this).text().startsWith(">>")) && $(this).text().startsWith(">")) && $(this).hasClass("greentext") == false) {
                    $(this).addClass("greentext");
                }
                if (($(this).text().startsWith(",") || $(this).text().startsWith(">>")) && $(this).hasClass("command") == false) {
                    $(this).addClass("command");
                }
                if ($(this).text().startsWith("<") && $(this).hasClass("orange") == false) {
                    $(this).addClass("orange");
                }
                if ($(this).text().startsWith("/r/") && $(this).hasClass("reddit") == false) {
                    $(this).addClass("reddit");
                }
            });
        }, false);
    };
    this.unload = function() {
        removeAllEvents(document, "DOMNodeInsertedIntoDocument");
        removeAllEvents(document, "DOMNodeInserted");
    };
};

GreentextPlugin.prototype.onSwitch = function() {};
GreentextPlugin.prototype.getName = function() {
    return "greentext";
};
GreentextPlugin.prototype.getDescription = function() {
    return "adds some custom text formatting";
};
GreentextPlugin.prototype.getVersion = function() {
    return "0.1.3";
};
GreentextPlugin.prototype.getAuthor = function() {
    return "craynine";
};
GreentextPlugin.prototype.getSettingsPanel = function() {
    return '';
};