/*
 * Copyright © 2018 Valentin Sickert aka Lapotor.
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See the LICENSE file or http://www.wtfpl.net/
 * for more details.
 */
/**
 * Created by: Valentin Sicket aka Lapotor
 * Date: 10.07.18 05:08
 * Project: PhantomBot-WarnSys
 */

/**
 * warnSys.js
 *
 * @version 1.0.0
 */
(function () {

    function initText() {
        $.consoleLn("╔═══════════════════╗");
        $.consoleLn("║    Warn System    ║");
        $.consoleLn("║ ░▒▓█ Enabled █▓▒░ ║");
        $.consoleLn("╚═══════════════════╝");
    }

    /**
     * @function userStrings
     * @param {string} user
     * @return {array}
     */
    function userStrings(user) {
        var user_mention = "";
        var user_string = "";
        if (user.substr(0,1) == "@"){
            user_mention = user;
            user_string = user.substr(1);
        } else {
            user_mention = "@" + user;
            user_string = user;
        }
        return [user_mention, user_string];
    }

    /**
     * @function warn1
     * @param {string} user
     * @param {string} reason
     * @returns {void}
     */
    function warn1(user, reason) {
        user = userStrings(user);
        $.say(".timeout " + user[1] + " " + $.lang.get('warnsys.warn1.time') + " " + reason);
        $.say($.lang.get('warnsys.warn1.twitch', user[0]));
        $.consoleLn($.lang.get('warnsys.warn1.console', user[1]));
    }

    /**
     * @function warn2
     * @param {string} user
     * @param {string} reason
     * @returns {void}
     */
    function warn2(user, reason) {
        user = userStrings(user);
        $.say(".timeout " + user[1] + " " + $.lang.get('warnsys.warn2.time') + " " + reason);
        $.say($.lang.get('warnsys.warn2.twitch', user[0]));
        $.consoleLn($.lang.get('warnsys.warn2.console', user[1]));
    }

    /**
     * @function warn3
     * @param {string} user
     * @param {string} reason
     * @returns {void}
     */
    function warn3(user, reason) {
        user = userStrings(user);
        $.say(".ban " + user[1] + " " + reason);
        $.say($.lang.get('warnsys.warn3.twitch', user[0]));
        $.consoleLn($.lang.get('warnsys.warn3.console', user[1]));
    }

    /**
     * @event command
     */
    $.bind('command', function (event) {
        var command = event.getCommand();
        var sender = event.getSender();
        var args = event.getArgs();
        var reason = "";

        if (args[0] !== undefined || args[0] != null) {
            if ($.isBot(args[0]) || $.isMod(args[0]) || $.isOwner(args[0]) || $.isAdmin(args[0])) {
                var user = 0x349;
            } else {
                var user = userStrings(args[0]);
            }

            /**
             * @commandpath warn - Warn a the given player
             */
            if (command.equalsIgnoreCase('warn')) {
                if (user === 0x349) {
                    $.say($.lang.get('warnsys.isstaff.twitch', user[1]));
                    $.consoleLn($.lang.get('warnsys.isstaff.console', user[1]));
                } else {
                    for (var i = 1; i < args.length; i++) {
                        reason += args[i];
                        if (i != args.length - 1) {
                            reason += " ";
                        }
                    }

                    if (!$.inidb.exists('warnSystem', user[1])) {
                        warn1(args[0], reason);
                        $.setIniDbNumber('warnSystem', user[1], 1);
                    } else if ($.getIniDbNumber('warnSystem', user[1]) == 1) {
                        $.inidb.incr('warnSystem', user[1], 1);
                        warn2(args[0], reason);
                    } else if ($.getIniDbNumber('warnSystem', user[1]) == 2) {
                        $.inidb.incr('warnSystem', user[1], 1);
                        warn3(args[0], reason);
                    } else if ($.getIniDbNumber('warnSystem', user[1]) == 3) {
                        $.say($.lang.get('warnsys.already.twitch', sender, user[1]));
                    } else {
                        $.say($.lang.get('warnsys.noexecute.twitch', sender));
                    }
                }
            }

            /**
             * @commandpath delwarn - Remove the given player from the warned list.
             */
            if (command.equalsIgnoreCase('delwarn')) {
                if ((args[1] != undefined || args[1] != null) && args[1].equalsIgnoreCase('all')) {
                    if ($.inidb.exists('warnSystem', user[1])) {
                        $.inidb.del('warnSystem', user[1]);
                        $.say(".unban " + user[1]);
                        $.say($.lang.get('warnsys.delall.twitch', user[1]));
                        $.consoleLn($.lang.get('warnsys.delall.console', user[1], sender));
                    } else {
                        $.say($.lang.get('warnsys.warn.none', sender, user[1]));
                    }
                } else if ($.inidb.exists('warnSystem', user[1])) {
                    if ($.getIniDbNumber('warnSystem', user[1]) == 1) {
                        $.say(".unban " + user[1]);
                        $.say($.lang.get('warnsys.delwarn1.twitch', user[1]));
                        $.consoleLn($.lang.get('warnsys.delwarn1.console', user[1], sender));
                        $.inidb.del('warnSystem', user[1]);
                    } else if ($.getIniDbNumber('warnSystem', user[1]) == 2) {
                        $.say(".unban " + user[1]);
                        $.say($.lang.get('warnsys.delwarn2.twitch', user[1]));
                        $.consoleLn($.lang.get('warnsys.delwarn2.console', user[1], sender));
                        $.inidb.decr('warnSystem', user[1], 1);
                    } else if ($.getIniDbNumber('warnSystem', user[1]) == 3) {
                        $.say(".unban " + args[0]);
                        $.say($.lang.get('warnsys.delwarn2.twitch', user[1]));
                        $.consoleLn($.lang.get('warnsys.delwarn2.console', user[1], sender));
                        $.inidb.decr('warnSystem', user[1], 1);
                    }
                } else {
                    $.say($.lang.get('warnsys.warn.none', sender, user[1]));
                }
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/warnSys.js')) {
            initText();
            $.registerChatCommand('./custom/warnSys.js', 'warn', 2);
            $.registerChatCommand('./custom/warnSys.js', 'delwarn', 2);
        }
    });
})();
