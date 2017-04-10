var allowPrompt = !0, rileyApp = {
    sendToMailChimp: function (o) {
        $.ajax({
            type: "get", url: "/mailChimp/" + o + "/c0cccfb45a", dataType: "json", success: function () {
                vex.closeAll(), allowPrompt = !1
            }
        })
    }, init: function () {
        var o = 0;
        $(window).scroll(function () {
            allowPrompt && ($(window).scrollTop() + $(window).height() > $(document).height() - 100 ? (o++, 1 >= o && vex.dialog.prompt({
                unsafeMessage: "<h3>Keep up-to-date with Riley.</h3><br />Follow our journey, subscribe to our mailing list.",
                className: "vex-theme-default",
                callback: function (o) {
                    void 0 != o && rileyApp.sendToMailChimp(o)
                }
            })) : (vex.closeAll(), o = 0))
        })
    }
};
!function (o) {
    rileyApp.init()
}(jQuery);