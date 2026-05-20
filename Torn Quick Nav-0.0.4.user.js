// ==UserScript==
// @name         Torn Quick Nav
// @namespace    https://github.com/MandlyBanana
// @version      0.0.4
// @description  Press Ctrl+Shift+F to open a quick navigation dialog with most Torn subpages
// @author       You
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Settings

    const hoverToSelect = false // Changes whether to slect or not to select an item when hovering over it.

    // -------------------------------------------------------------------------
    //  SITE LIST  - edit freely, categories are for display only
    // -------------------------------------------------------------------------

    const SITES = [
        //  Personal Pages 
        { label: 'Home',                   path: '/index.php',                                                             category: 'Personal' },
        { label: 'Messages',               path: '/messages.php',                                                          category: 'Personal' },
        { label: 'Messages - Inbox',       path: '/messages.php#/p=inbox',                                                 category: 'Personal' },
        { label: 'Messages - Compose',     path: '/messages.php#/p=compose',                                               category: 'Personal' },
        { label: 'Messages - Outbox',      path: '/messages.php#/p=outbox',                                                category: 'Personal' },
        { label: 'Messages - Saved',       path: '/messages.php#/p=saved',                                                 category: 'Personal' },
        { label: 'Messages - Ignore List', path: '/messages.php#/p=ignorelist',                                            category: 'Personal' },
        { label: 'Events',                 path: '/events.php#/step=all',                                                  category: 'Personal' },
        { label: 'Awards',                 path: '/awards.php',                                                            category: 'Personal' },
        { label: 'Log',                    path: '/page.php?sid=log',                                                      category: 'Personal' },
        { label: 'Personal Stats',         path: '/personalstats.php',                                                     category: 'Personal' },
        { label: 'Friends',                path: '/friendlist.php',                                                        category: 'Personal' },
        { label: 'Enemies',                path: '/blacklist.php',                                                         category: 'Personal' },
        { label: 'Targets',                path: '/page.php?sid=list&type=targets',                                        category: 'Personal' },
        { label: 'Settings / Preferences', path: '/preferences.php',                                                       category: 'Personal' },

        //  Items 
        { label: 'Items',                  path: '/item.php',                                                              category: 'Items' },
        { label: 'Ammo',                   path: '/page.php?sid=ammo',                                                     category: 'Items' },
        { label: 'Mods',                   path: '/page.php?sid=itemsMods',                                                category: 'Items' },
        { label: 'Trade',                  path: '/trade.php',                                                             category: 'Items' },
        { label: 'Bazaar',                 path: '/bazaar.php#/',                                                          category: 'Items' },
        { label: 'Bazaar - Add Items',     path: '/bazaar.php#/add',                                                       category: 'Items' },
        { label: 'Bazaar - Personalize',   path: '/bazaar.php#/personalize',                                               category: 'Items' },
        { label: 'Bazaar - Manage',        path: '/bazaar.php#/manage',                                                     category: 'Items' },
        { label: 'Display Case',           path: '/displaycase.php#display/',                                              category: 'Items' },
        { label: 'Display Case - add',     path: '/displaycase.php#add',                                                   category: 'Items' },
        { label: 'Display Case - manage',  path: '/displaycase.php#manage/',                                               category: 'Items' },
        { label: 'PC / Laptop',            path: '/pc.php',                                                                category: 'Items' },

        //  Sidebar 
        { label: 'City Map',               path: '/city.php',                                                              category: 'Sidebar' },
        { label: 'Job',                    path: '/companies.php',                                                         category: 'Sidebar' },
        { label: 'Company Profile',        path: '/joblist.php#/p=corpinfo&userID=1699485',                                category: 'Sidebar' },
        { label: 'Gym',                    path: '/gym.php',                                                               category: 'Sidebar' },
        { label: 'Properties',             path: '/properties.php',                                                        category: 'Sidebar' },
        { label: 'Education',              path: '/education.php#/step=main',                                              category: 'Sidebar' },
        { label: 'Criminal Record',        path: '/page.php?sid=crimesRecord',                                             category: 'Sidebar' },
        { label: 'Crimes',                 path: '/crimes.php#/step=main',                                                 category: 'Sidebar' },
        { label: 'Crimes - Search for Cash', path: '/loader.php?sid=crimes#/searchforcash',                                category: 'Sidebar' },
        { label: 'Crimes - Bootlegging',   path: '/loader.php?sid=crimes#/bootlegging',                                    category: 'Sidebar' },
        { label: 'Crimes - Graffiti',      path: '/loader.php?sid=crimes#/graffiti',                                       category: 'Sidebar' },
        { label: 'Crimes - Shoplifting',   path: '/loader.php?sid=crimes#/shoplifting',                                    category: 'Sidebar' },
        { label: 'Crimes - Pickpocketing', path: '/loader.php?sid=crimes#/pickpocketing',                                  category: 'Sidebar' },
        { label: 'Crimes - Skimming',      path: '/loader.php?sid=crimes#/cardskimming',                                   category: 'Sidebar' },
        { label: 'Crimes - Burglary',      path: '/loader.php?sid=crimes#/burglary',                                       category: 'Sidebar' },
        { label: 'Crimes - Hustling',      path: '/loader.php?sid=crimes#/hustling',                                       category: 'Sidebar' },
        { label: 'Crimes - Disposal',      path: '/loader.php?sid=crimes#/disposal',                                       category: 'Sidebar' },
        { label: 'Crimes - Cracking',      path: '/loader.php?sid=crimes#/cracking',                                       category: 'Sidebar' },
        { label: 'Crimes - Forgery',       path: '/loader.php?sid=crimes#/forgery',                                        category: 'Sidebar' },
        { label: 'Crimes - Scamming',      path: '/loader.php?sid=crimes#/scamming',                                       category: 'Sidebar' },
        { label: 'Crimes - Arson',         path: '/page.php?sid=crimes#/arson',                                            category: 'Sidebar' },
        { label: 'Missions',               path: '/loader.php?sid=missions',                                               category: 'Sidebar' },
        { label: 'Newspaper',              path: '/newspaper.php#/',                                                       category: 'Sidebar' },
        { label: 'Newspaper - Job Listing',path: '/joblist.php',                                                           category: 'Sidebar' },
        { label: 'Newspaper - Freebies',   path: '/freebies.php',                                                          category: 'Sidebar' },
        { label: 'Newspaper - Classifieds',path: '/newspaper_class.php',                                                   category: 'Sidebar' },
        { label: 'Newspaper - Personals',  path: '/personals.php',                                                         category: 'Sidebar' },
        { label: 'Newspaper - Bounties',   path: '/bounties.php',                                                          category: 'Sidebar' },
        { label: 'Newspaper - Comics',     path: '/comics.php',                                                            category: 'Sidebar' },
        { label: 'Newspaper - Archives',   path: '/newspaper.php#/archive',                                                category: 'Sidebar' },
        { label: 'Newspaper - All Ads',    path: '/messageinc2.php#!p=viewall',                                            category: 'Sidebar' },
        { label: 'Newspaper - Place Add',  path: '/messageinc2.php#!p=main',                                               category: 'Sidebar' },
        { label: 'Newspaper - Tell Your Story', path: '/newspaper.php#/tell_your_story',                                   category: 'Sidebar' },
        { label: 'Jail',                   path: '/jailview.php',                                                          category: 'Sidebar' },
        { label: 'Hall of Fame',           path: '/halloffame.php',                                                        category: 'Sidebar' },
        { label: 'Hospital',               path: '/hospitalview.php',                                                      category: 'Sidebar' },
        { label: 'Recruit Citizens',       path: '/bringafriend.php',                                                      category: 'Sidebar' },
        { label: 'Calendar',               path: '/calendar.php',                                                          category: 'Sidebar' },

        //  City 
        { label: 'Auction House',          path: '/amarket.php',                                                           category: 'City' },
        { label: 'Bank',                   path: '/bank.php',                                                              category: 'City' },
        { label: 'Bazaar Directory',       path: '/page.php?sid=bazaar',                                                   category: 'City' },
        { label: "Big Al's Gun Shop",      path: '/bigalgunshop.php',                                                      category: 'City' },
        { label: "Big Al's Bunker",        path: '/page.php?sid=bunker',                                                   category: 'City' },
        { label: "Bits n Bobs",            path: '/shops.php?step=bitsnbobs',                                              category: 'City' },
        { label: 'Chronicle Archives',     path: '/archives.php#/',                                                        category: 'City' },
        { label: 'Church',                 path: '/church.php',                                                            category: 'City' },
        { label: 'City Hall',              path: '/citystats.php',                                                         category: 'City' },
        { label: 'Community',              path: '/fans.php',                                                              category: 'City' },
        { label: 'Cyber Force',            path: '/shops.php?step=cyberforce',                                             category: 'City' },
        { label: 'Docks',                  path: '/shops.php?step=docks',                                                  category: 'City' },
        { label: 'Donator House',          path: '/donator.php',                                                           category: 'City' },
        { label: 'Dump',                   path: '/dump.php',                                                              category: 'City' },
        { label: 'Estate Agents',          path: '/estateagents.php',                                                      category: 'City' },
        { label: 'Forums',                 path: '/forums.php',                                                            category: 'City' },
        { label: 'Property Rental Market', path: '/properties.php?step=rentalmarket',                                      category: 'City' },
        { label: 'Property Selling Market', path: '/properties.php?step=sellingmarket',                                    category: 'City' },
        { label: 'Item Market',            path: '/page.php?sid=ItemMarket',                                               category: 'City' },
        { label: 'Jewellery Store',        path: '/shops.php?step=jewelry',                                                category: 'City' },
        { label: 'Loan Shark',             path: '/loan.php',                                                              category: 'City' },
        { label: 'Message Inc.',           path: '/messageinc.php',                                                        category: 'City' },
        { label: 'Museum',                 path: '/museum.php',                                                            category: 'City' },
        { label: 'Nikeh Sports Shop',      path: '/shops.php?step=nikeh',                                                  category: 'City' },
        { label: 'Pawn Shop',              path: '/shops.php?step=pawnshop',                                               category: 'City' },
        { label: 'Print Store',            path: '/shops.php?step=printstore',                                             category: 'City' },
        { label: 'Pharmacy',               path: '/shops.php?step=pharmacy',                                               category: 'City' },
        { label: 'Player Committee',       path: '/committee.php#/step=main',                                              category: 'City' },
        { label: 'Points Building',        path: '/points.php',                                                            category: 'City' },
        { label: 'Points Market',          path: '/pmarket.php',                                                           category: 'City' },
        { label: 'Post Office',            path: '/shops.php?step=postoffice',                                             category: 'City' },
        { label: 'Raceway',                path: '/loader.php?sid=racing',                                                 category: 'City' },
        { label: 'Recycling Centre',       path: '/shops.php?step=recyclingcenter',                                        category: 'City' },
        { label: 'Torn City Staff',        path: '/staff.php',                                                             category: 'City' },
        { label: 'Stock Market',           path: '/page.php?sid=stocks',                                                   category: 'City' },
        { label: 'Super Store',            path: '/shops.php?step=super',                                                  category: 'City' },
        { label: 'Sweet Shop',             path: '/shops.php?step=candy',                                                  category: 'City' },
        { label: 'TC Clothing',            path: '/shops.php?step=clothes',                                                category: 'City' },
        { label: 'Token Shop',             path: '/token_shop.php',                                                        category: 'City' },
        { label: 'Travel Agency',          path: '/travelagency.php',                                                      category: 'City' },

        //  Casino 
        { label: 'Casino',                 path: '/casino.php',                                                            category: 'Casino' },
        { label: 'Slots',                  path: '/page.php?sid=slots',                                                    category: 'Casino' },
        { label: 'Slots - Last Rolls',     path: '/page.php?sid=slotsLastRolls',                                           category: 'Casino' },
        { label: 'Slots - Stats',          path: '/page.php?sid=slotsStats',                                               category: 'Casino' },
        { label: 'Roulette',               path: '/page.php?sid=roulette',                                                 category: 'Casino' },
        { label: 'Roulette - Last Spins',  path: '/page.php?sid=rouletteLastSpins',                                        category: 'Casino' },
        { label: 'Roulette - Stats',       path: '/page.php?sid=rouletteStatistics',                                       category: 'Casino' },
        { label: 'High Low',               path: '/page.php?sid=highlow',                                                  category: 'Casino' },
        { label: 'High Low - Last Games',  path: '/page.php?sid=highlowLastGames',                                         category: 'Casino' },
        { label: 'High Low - Stats',       path: '/page.php?sid=highlowStats',                                             category: 'Casino' },
        { label: 'Keno',                   path: '/page.php?sid=keno',                                                     category: 'Casino' },
        { label: 'Keno - Last Games',      path: '/page.php?sid=kenoLastGames',                                            category: 'Casino' },
        { label: 'Keno - Stats',           path: '/page.php?sid=kenoStatistics',                                           category: 'Casino' },
        { label: 'Craps',                  path: '/page.php?sid=craps',                                                    category: 'Casino' },
        { label: 'Craps - Last Rolls',     path: '/page.php?sid=crapsLastRolls',                                           category: 'Casino' },
        { label: 'Craps - Stats',          path: '/page.php?sid=crapsStats',                                               category: 'Casino' },
        { label: 'Bookie',                 path: '/page.php?sid=bookie#/your-bets',                                        category: 'Casino' },
        { label: 'Bookie - Stats',         path: '/page.php?sid=bookie#/stats/football',                                   category: 'Casino' },
        { label: 'Lottery',                path: '/page.php?sid=lottery',                                                  category: 'Casino' },
        { label: 'Lottery - Tickets Bought', path: '/page.php?sid=lotteryTicketsBought',                                   category: 'Casino' },
        { label: 'Lottery - Previous Winners', path: '/page.php?sid=lotteryPreviousWinners',                               category: 'Casino' },
        { label: 'Blackjack',              path: '/page.php?sid=blackjack',                                                category: 'Casino' },
        { label: 'Blackjack - Last Games', path: '/page.php?sid=blackjackLastGames',                                       category: 'Casino' },
        { label: 'Blackjack - Stats',      path: '/page.php?sid=blackjackStatistics',                                      category: 'Casino' },
        { label: 'Russian Roulette',       path: '/page.php?sid=russianRoulette#/',                                        category: 'Casino' },
        { label: 'Russian Roulette - Last Games', path: '/page.php?sid=russianRouletteLastGames',                          category: 'Casino' },
        { label: 'Russian Roulette - Stats', path: '/page.php?sid=russianRouletteStatistics',                              category: 'Casino' },
        { label: 'Wheels (Spin The Wheel)', path: '/page.php?sid=spinTheWheel',                                            category: 'Casino' },
        { label: 'Wheels - Last Spins',    path: '/page.php?sid=spinTheWheelLastSpins',                                    category: 'Casino' },
        { label: 'Poker',                  path: '/page.php?sid=holdem',                                                   category: 'Casino' },
        { label: 'Poker - Stats',          path: '/page.php?sid=holdemStats',                                              category: 'Casino' },

        //  NPCs 
        { label: 'Duke',                   path: '/profiles.php?XID=4',                                                    category: 'NPCs' },
        { label: 'Leslie',                 path: '/profiles.php?XID=15',                                                   category: 'NPCs' },
        { label: 'Jimmy',                  path: '/profiles.php?XID=19',                                                   category: 'NPCs' },
        { label: 'Fernando',               path: '/profiles.php?XID=20',                                                   category: 'NPCs' },
        { label: 'Tiny',                   path: '/profiles.php?XID=21',                                                   category: 'NPCs' },
        { label: 'Scrooge',                path: '/profiles.php?XID=10',                                                   category: 'NPCs' },
        { label: 'Easter Bunny',           path: '/profiles.php?XID=17',                                                   category: 'NPCs' },
        { label: "M'aol",                  path: '/profiles.php?XID=23',                                                   category: 'NPCs' },
        { label: "Ladso'myna",             path: '/profiles.php?XID=104',                                                  category: 'NPCs' },
        { label: "Asmol'yand",             path: '/profiles.php?XID=102',                                                  category: 'NPCs' },
        { label: "Sylo'nadam",             path: '/profiles.php?XID=103',                                                  category: 'NPCs' },
        { label: "Dyno'salam",             path: '/profiles.php?XID=100',                                                  category: 'NPCs' },
        { label: "Nol'dasaym",             path: '/profiles.php?XID=101',                                                  category: 'NPCs' },

        //  Faction 
        { label: 'Your Faction',           path: '/factions.php?step=your&type=1#/',                                       category: 'Faction' },
        { label: 'Faction - Info',         path: '/factions.php?step=your&type=1#/tab=info',                               category: 'Faction' },
        { label: 'Faction - Territory',    path: '/factions.php?step=your&type=5#/tab=territory',                          category: 'Faction' },
        { label: 'Faction - Rank',         path: '/factions.php?step=your&type=12#/tab=rank',                              category: 'Faction' },
        { label: "Faction - OC's",         path: '/factions.php?step=your&type=12#/tab=crimes',                            category: 'Faction' },
        { label: 'Faction - Upgrades',     path: '/factions.php?step=your&type=12#/tab=upgrades',                          category: 'Faction' },
        { label: 'Faction - Armory',       path: '/factions.php?step=your&type=12#/tab=armoury',                           category: 'Faction' },
        { label: 'Faction - Controls',     path: '/factions.php?step=your&type=12#/tab=controls&option=members',           category: 'Faction' },
        { label: 'Ranked Warfare',         path: '/page.php?sid=factionWarfare#/ranked',                                   category: 'Faction' },

        //  Other 
        { label: 'Authentication Page',    path: '/authenticate.php',                                                      category: 'Other' },
        { label: 'Staff List',             path: '/staff.php',                                                             category: 'Other' },
        { label: 'Staff Applications',     path: '/staff.php#/p=help.app',                                                 category: 'Other' },
        { label: 'Credits',                path: '/credits.php',                                                           category: 'Other' },
        { label: 'Rules',                  path: '/rules.php',                                                             category: 'Other' },
        { label: 'Player Report',          path: '/playerreport.php',                                                      category: 'Other' },
        { label: "Users Online",           path: '/usersonline.php',                                                       category: 'Other' },
        { label: 'User Search',            path: '/page.php?sid=UserList',                                                 category: 'Other' },
        { label: 'Keepsakes',              path: '/page.php?sid=keepsakes',                                                category: 'Other' },
        { label: 'Attacking Page',         path: '/loader.php?sid=attack&user2ID=17',                                      category: 'Other' },
        { label: 'Community Events Page',  path: '/forums.php#/p=forums&f=62&b=0&a=0',                                     category: 'Other' },

        //  Christmas Town 
        { label: 'Christmas Town',              path: '/christmas_town.php#/',                                             category: 'Christmas Town' },
        { label: 'Christmas Town - My Maps',    path: '/christmas_town.php#/mymaps',                                       category: 'Christmas Town' },
        { label: 'Christmas Town - Map Editor', path: '/christmas_town.php#/mapeditor',                                    category: 'Christmas Town' },
        { label: 'Christmas Town - Parameters', path: '/christmas_town.php#/parametereditor',                              category: 'Christmas Town' },
        { label: 'Christmas Town - NPC Editor', path: '/christmas_town.php#/npceditor',                                    category: 'Christmas Town' },


    ]; // { label: '', path: '', category: ''}

    const CATEGORY_COLORS = {
        'Personal':       '#a78bfa',
        'Items':          '#34d399',
        'Sidebar':        '#60a5fa',
        'City':           '#f59e0b',
        'Casino':         '#f87171',
        'NPCs':           '#fb923c',
        'Faction':        '#c084fc',
        'Other':          '#94a3b8',
        'Temporary':      '#facc15',
        'Christmas Town': '#4ade80',
        'Unlikely':       '#64748b',
    };

    let overlay = null;
    let input = null;
    let list = null;
    let selectedIndex = 0;
    let currentMatches = [];

    function fuzzyMatch(str, query) {
        str = str.toLowerCase();
        query = query.toLowerCase();
        let si = 0, qi = 0;
        while (si < str.length && qi < query.length) {
            if (str[si] === query[qi]) qi++;
            si++;
        }
        return qi === query.length;
    }

    function fuzzyScore(str, query) {
        str = str.toLowerCase();
        query = query.toLowerCase();
        let score = 0, qi = 0, consecutive = 0, lastMatch = -1;
        for (let i = 0; i < str.length && qi < query.length; i++) {
            if (str[i] === query[qi]) {
                score += (100 - i);
                if (lastMatch === i - 1) { consecutive++; score += consecutive * 5; }
                else consecutive = 0;
                lastMatch = i;
                qi++;
            }
        }
        return score;
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const lower = text.toLowerCase();
        const qLow  = query.toLowerCase();
        let result = '', qi = 0;
        for (let i = 0; i < text.length; i++) {
            if (qi < qLow.length && lower[i] === qLow[qi]) {
                result += `<mark style="background:transparent;color:#a78bfa;font-weight:700;">${text[i]}</mark>`;
                qi++;
            } else {
                result += text[i];
            }
        }
        return result;
    }

    function buildStyles() {
        if (document.getElementById('quicknav-styles')) return;
        const s = document.createElement('style');
        s.id = 'quicknav-styles';
        s.textContent = `
            #quicknav-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:2147483647;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
            #quicknav-box{background:#1e1e2e;border:1px solid #3a3a52;border-radius:12px;width:560px;max-width:94vw;box-shadow:0 24px 64px rgba(0,0,0,.7);overflow:hidden;display:flex;flex-direction:column;}
            #quicknav-input-wrap{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #2a2a3e;flex-shrink:0;}
            #quicknav-search-icon{color:#7c7c9e;font-size:18px;flex-shrink:0;}
            #quicknav-input{flex:1;background:transparent;border:none;outline:none;color:#e0e0f0;font-size:16px;caret-color:#a78bfa;}
            #quicknav-input::placeholder{color:#3a3a5a;}
            #quicknav-count{font-size:11px;color:#4a4a6a;white-space:nowrap;}
            #quicknav-list{overflow-y:auto;max-height:380px;padding:4px 0;scrollbar-width:thin;scrollbar-color:#3a3a52 transparent;}
            .quicknav-category-header{padding:6px 16px 2px;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#4a4a6a;}
            .quicknav-item{display:flex;align-items:center;gap:10px;padding:8px 16px;cursor:pointer;}
            .quicknav-item:hover,.quicknav-item.selected{background:#2a2a42;}
            .quicknav-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
            .quicknav-label{flex:1;color:#e0e0f0;font-size:14px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
            .quicknav-path{font-size:11px;color:#4a4a6a;font-family:monospace;flex-shrink:0;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
            .quicknav-empty{padding:28px 16px;text-align:center;color:#4a4a6a;font-size:14px;}
            #quicknav-footer{border-top:1px solid #2a2a3e;padding:8px 16px;display:flex;gap:14px;align-items:center;flex-shrink:0;}
            .quicknav-hint{font-size:11px;color:#4a4a6a;display:flex;align-items:center;gap:4px;}
            .quicknav-hint kbd{background:#2a2a3e;border:1px solid #3a3a52;border-radius:3px;padding:1px 5px;font-size:10px;color:#6a6a8e;}
        `;
        document.head.appendChild(s);
    }

    function renderList(query) {
        list.innerHTML = '';
        selectedIndex = 0;

        if (!query) {
            currentMatches = [...SITES];
        } else {
            currentMatches = SITES
                .filter(s => fuzzyMatch(s.label, query) || fuzzyMatch(s.path, query) || fuzzyMatch(s.category, query))
                .sort((a, b) => {
                    const sa = Math.max(fuzzyScore(a.label, query), fuzzyScore(a.path, query));
                    const sb = Math.max(fuzzyScore(b.label, query), fuzzyScore(b.path, query));
                    return sb - sa;
                });
        }

        document.getElementById('quicknav-count').textContent =
            currentMatches.length === SITES.length
                ? `${SITES.length} pages`
                : `${currentMatches.length} / ${SITES.length}`;

        if (currentMatches.length === 0) {
            list.innerHTML = `<div class="quicknav-empty">No pages found for "<strong>${escHtml(query)}</strong>"</div>`;
            return;
        }

        // Group by category when no query, flat list when searching
        if (!query) {
            const grouped = {};
            currentMatches.forEach(s => {
                (grouped[s.category] = grouped[s.category] || []).push(s);
            });
            let flatIndex = 0;
            Object.entries(grouped).forEach(([cat, sites]) => {
                const header = document.createElement('div');
                header.className = 'quicknav-category-header';
                header.textContent = cat;
                list.appendChild(header);
                sites.forEach(site => {
                    list.appendChild(makeItem(site, flatIndex++, query));
                });
            });
        } else {
            currentMatches.forEach((site, i) => {
                list.appendChild(makeItem(site, i, query));
            });
        }
    }

    function makeItem(site, index, query) {
        const item = document.createElement('div');
        item.className = 'quicknav-item' + (index === 0 ? ' selected' : '');
        const color = CATEGORY_COLORS[site.category] || '#94a3b8';
        item.innerHTML = `
            <span class="quicknav-dot" style="background:${color};"></span>
            <span class="quicknav-label">${highlightMatch(site.label, query)}</span>
            <span class="quicknav-path">${escHtml(site.path)}</span>
        `;
        if (hoverToSelect === true) item.addEventListener('mouseenter', () => setSelected(index));
        item.addEventListener('click', () => navigate(site.path));
        return item;
    }

    function escHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function setSelected(index) {
        const items = list.querySelectorAll('.quicknav-item');
        items.forEach(el => el.classList.remove('selected'));
        selectedIndex = Math.max(0, Math.min(index, items.length - 1));
        if (items[selectedIndex]) {
            items[selectedIndex].classList.add('selected');
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function navigate(path) {
        window.location.href = window.location.origin + path;
        close();
    }

    function open() {
        if (overlay) return;
        buildStyles();

        overlay = document.createElement('div');
        overlay.id = 'quicknav-overlay';
        overlay.innerHTML = `
            <div id="quicknav-box">
                <div id="quicknav-input-wrap">
                    <span id="quicknav-search-icon">🔍</span>
                    <input id="quicknav-input" type="text" placeholder="Search ${SITES.length} Torn pages..." autocomplete="off" spellcheck="false" />
                    <span id="quicknav-count"></span>
                </div>
                <div id="quicknav-list"></div>
                <div id="quicknav-footer">
                    <span class="quicknav-hint"><kbd>↑↓</kbd> Navigate</span>
                    <span class="quicknav-hint"><kbd>Enter</kbd> Go</span>
                    <span class="quicknav-hint"><kbd>Esc</kbd> Close</span>
                    <span class="quicknav-hint" style="margin-left:auto;color:#3a3a5a;">Ctrl+Shift+F</span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        input = document.getElementById('quicknav-input');
        list  = document.getElementById('quicknav-list');

        renderList('');
        setTimeout(() => input.focus(), 30);

        input.addEventListener('input', () => renderList(input.value.trim()));
        input.addEventListener('keydown', e => {
            if (e.key === 'ArrowDown')      { e.preventDefault(); setSelected(selectedIndex + 1); }
            else if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(selectedIndex - 1); }
            else if (e.key === 'Enter')     { if (currentMatches[selectedIndex]) navigate(currentMatches[selectedIndex].path); }
            else if (e.key === 'Escape')    close();
        });
        overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    }

    function close() {
        overlay && overlay.remove();
        overlay = null; input = null; list = null;
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            overlay ? close() : open();
        }
    });

})();
