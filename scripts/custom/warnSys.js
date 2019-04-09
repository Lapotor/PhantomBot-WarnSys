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
 * @version 2.0.0
 */
(function () {

    var table_entries = 'warnSysEntries',
        table_settings = 'warnSysSettings';
    /**
     * Table name update
     */
    if ($.inidb.FileExists('warnSystem')) {
        $.inidb.RenameFile('warnSystem', table_entries);
    }

    /**
     * Init the Settings table
     */
    if (!$.inidb.FileExists(table_settings)) {
        $.inidb.AddFile(table_settings);
        /* Step 1 */
        $.setIniDbNumber(table_settings, 'step_1_value', 5);
        $.setIniDbString(table_settings, 'step_1_text', "(@name) this is your first warning!");
        /* Step 2 */
        $.setIniDbNumber(table_settings, 'step_2_value', 600);
        $.setIniDbString(table_settings, 'step_2_text', "(@name) this is your last warning! Next time we have to ban you.");
        /* Step 3 */
        $.setIniDbNumber(table_settings, 'step_3_value', 0);
        $.setIniDbString(table_settings, 'step_3_text', "That's it for you (@name). Another wonderful life for you.");
    }

    /**
     * @function initText
     * @return {void}
     */
    function initText() {
        $.consoleLn("╔═══════════════════╗");
        $.consoleLn("║    Warn System    ║");
        $.consoleLn("║ ░▒▓█ Enabled █▓▒░ ║");
        $.consoleLn("╚═══════════════════╝");
    }


    /**
     * @function getSteps
     * @return {number}
     */
    function getSteps() {
        return $.inidb.GetKeyList(table_settings, '').length / 2;
    }

    /**
     * @function userStrings
     * @param {string} user
     * @return {array}
     */
    function userStrings(user) {
        var user_mention;
        var user_string;
        if (user.substr(0, 1) == "@") {
            user_mention = user;
            user_string = user.substr(1);
        } else {
            user_mention = "@" + user;
            user_string = user;
        }
        return [user_mention, user_string];
    }

    /**
     * @function warn
     * @param {string} user
     * @param {string} reason
     * @returns {void}
     */
    function warn(user, reason) {
        user = userStrings(user);
        var steps = getSteps();
        var step = $.getSetIniDbNumber(table_entries, user[1].toLowerCase(), 0);
        if (step < steps) {
            var message;
            if ($.getIniDbNumber(table_settings, 'step_' + (step + 1) + '_value') != 0) {
                $.say('.timeout ' + user[1] + ' ' + $.getIniDbNumber(table_settings, 'step_' + (step + 1) + '_value') + ' ' + reason);
                message = $.getIniDbString(table_settings, 'step_' + (step + 1) + '_text');
                message = $.replace(message, '(@name)', user[0]);
                $.say(message);
            } else {
                $.say('.ban ' + user[1] + ' ' + reason);
                message = $.getIniDbString(table_settings, 'step_' + (step + 1) + '_text');
                message = $.replace(message, '(@name)', user[0]);
                $.say(message);
            }
            $.inidb.incr(table_entries, user[1].toLowerCase(), 1);
        } else {
            $.say($.lang.get('warnsys.already', user[1]))
        }
    }


    /**
     * @function delwarn
     * @param {string} user
     * @param {boolean} complete
     * @return {void}
     */
    function delwarn(user, sender, complete) {
        user = userStrings(user);
        if ($.inidb.exists(table_entries, user[1].toLowerCase())) {
            $.say('.unban ' + user[1]);
            if (complete || $.getIniDbNumber(table_entries, user[1].toLowerCase()) == 1) {
                $.inidb.del(table_entries, user[1].toLowerCase());
                $.say($.lang.get('warnsys.delall', user[1]));
            } else {
                $.inidb.decr(table_entries, user[1].toLowerCase(), 1);
                $.say($.lang.get('warnsys.del', user[1]));
            }
        } else {
            $.say($.lang.get('warnsys.warn.none', sender, user[1]));
        }
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
                } else {
                    for (var i = 1; i < args.length; i++) {
                        reason += args[i];
                        if (i != args.length - 1) {
                            reason += " ";
                        }
                    }
                    warn(user[1], reason);
                }
            }

            /**
             * @commandpath delwarn - Remove the given player from the warned list.
             */
            if (command.equalsIgnoreCase('delwarn')) {
                if (args[0] != undefined || args[0] != null) {
                    if ((args[1] != undefined || args[1] != null) && args[1].equalsIgnoreCase('all')) {
                        delwarn(user[1], sender, true);
                    } else {
                        delwarn(user[1], sender, false);
                    }
                } else {
                    $.say($.lang.get('warnsys.noexecute', sender));
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
