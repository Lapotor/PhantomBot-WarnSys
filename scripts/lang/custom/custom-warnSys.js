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

/*
 * Warning 1
 */
$.lang.register('warnsys.warn1.time', '5'); /* The time the user get timouted on the first warning. */
$.lang.register('warnsys.warn1.twitch', '$1 this is your first warning!');
$.lang.register('warnsys.warn1.console', '[WarnSyS] First warning for $1');
$.lang.register('warnsys.delwarn1.twitch', '$1 has been removed of the warning list.');
$.lang.register('warnsys.delwarn1.console', '[WarnSyS] $1 has been removed of the warning list from $2.');

/*
 * Warning 2
 */
$.lang.register('warnsys.warn2.time', '600'); /* The time the user get timouted on the second warning. */
$.lang.register('warnsys.warn2.twitch', '$1 this is your last warning! Next time we have to ban you.');
$.lang.register('warnsys.warn2.console', '[WarnSyS] Second warning for $1');
$.lang.register('warnsys.delwarn2.twitch', '$1 has been downgraded to the first warning on the warning list.');
$.lang.register('warnsys.delwarn2.console', '[WarnSyS] $1 has been downgraded to the first warning on the warning list from $2.');

/*
 * Warning 3
 */
$.lang.register('warnsys.warn3.twitch', 'That\'s it for you $1. Another wonderful life for you.');
$.lang.register('warnsys.warn3.console', '[WarnSyS] $1 got banned.');
$.lang.register('warnsys.delwarn3.twitch', '$1 has been downgraded to the second warning on the warning list.');
$.lang.register('warnsys.delwarn3.console', '[WarnSyS] $1 has been downgraded to the second warning on the warning list from $2.');

/*
 * Delete all warnings
 */
$.lang.register('warnsys.delall.twitch', 'The warnings of $1 got removed of the list.');
$.lang.register('warnsys.delall.console', '[WarnSyS] $1 has been removed of the warning list from $2.');

/*
 * Other text
 */
$.lang.register('warnsys.warn.none', '@$1 $2 has not been warned yet.');
$.lang.register('warnsys.isstaff.twitch', 'You can\'t warn $1.');
$.lang.register('warnsys.isstaff.console', '[WarnSyS] $1 couldn\'t get warned.');
$.lang.register('warnsys.already.twitch', '@$1 $2 is already banned.');
$.lang.register('warnsys.noexecute.twitch', '$1 i couldn\'t execute that command.');
