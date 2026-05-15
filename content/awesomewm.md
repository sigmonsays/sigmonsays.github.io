---
title: awesome window manager
date: 2026/05/15
tags: [ "awesomewm" ]
---

# Contents

<!-- mtoc-start -->

* [History](#history)
* [Motivation](#motivation)
* [Tools](#tools)
* [Current Config](#current-config)
* [EOF](#eof)

<!-- mtoc-end -->


# History

I experimented switching from i3 to awesomewm around 2023 but went back to i3 because it was taking too much time to figure
out a config that worked. I insisted on using polybar instead of the wibar because polybar was already done. That ended up
proving wrong, since a lot of things just didn't work right.

Fast forward to 2026, with the advent of AI, specifically claude, I was able to quickly nail out the remaining pieces
in the lua config with the help of claude, which gave me the extra support needed.

Once I decided to drop polybar and switch to wibar, thinks came together quickly.

Missing features

- fix firefox picture in picture drag to move behavior (claude)
- mouse middle click switch focus to new window (claude)
- hide workspaces if no windows on them (except for currently selected)
- mouse battery monitor
- a working network widget
- a working weather widget
- center new window when it's the only window on the workspace (claude)
- fixed workspace mapping bugs (claude)
- remove dead code (claude)
- theming - added a white line on left edge of taglist and window list in wibox (claude)

# Motivation

The primary motivation for switching from i3 to awesome was i3 bugs and a key missing feature.

- moving windows - i3 had issues with dragging windows around.  Sometimes other windows would bounce around (steam).
- missing minimize feature - lack of minimize really hurt me in certain cases, sometimes I just needed a window gone.
- flexibility - at this point, being able to control every detail in lua is a superior experience

# Tools

- rofi
- xscreensaver
- xsecurelock
- thunar

# Current Config

```lua

pcall(require, "luarocks.loader")

-- Standard awesome library
local gears = require("gears")
local awful = require("awful")
require("awful.autofocus")

require("remember-geometry")

-- Widget and layout library
local wibox = require("wibox")

-- Theme handling library
local beautiful = require("beautiful")

-- Notification library
local naughty = require("naughty")
local menubar = require("menubar")
local hotkeys_popup = require("awful.hotkeys_popup")

-- calendar and volume control
local deficient = require("deficient")

local calendar_widget = deficient.calendar({})

-- Scratchpad
local scratch = require("scratch")
local screen_width = awful.screen.focused().geometry.width
local screen_height = awful.screen.focused().geometry.height

local has_fdo, freedesktop = pcall(require, "freedesktop")

-- {{{ Error handling
-- Check if awesome encountered an error during startup and fell back to
-- another config (This code will only ever execute for the fallback config)
if awesome.startup_errors then
	naughty.notify({
		preset = naughty.config.presets.critical,
		title = "Oops, there were errors during startup!",
		text = awesome.startup_errors,
	})
end

-- Handle runtime errors after startup
do
	local in_error = false
	awesome.connect_signal("debug::error", function(err)
		-- Make sure we don't go into an endless error loop
		if in_error then
			return
		end
		in_error = true

		naughty.notify({
			preset = naughty.config.presets.critical,
			title = "Oops, an error happened!",
			text = tostring(err),
		})
		in_error = false
	end)
end
-- }}}

-- {{{ Variable definitions
-- Themes define colours, icons, font and wallpapers.
beautiful.init(gears.filesystem.get_themes_dir() .. "default/theme.lua")

-- note: set fonts after init'ing the theme
beautiful.font = "Sans 12"
beautiful.menu_width = 200
beautiful.border_width = 2
beautiful.border_normal = "#1a3a5c"
beautiful.border_focus = "#2a6099"

-- This is used later as the default terminal and editor to run.
local terminal = "wezterm"
local home = os.getenv("HOME")
local confdir = home .. "/.config/awesome"
local editor = os.getenv("EDITOR") or "editor"
local editor_cmd = terminal .. " -e " .. editor

-- Default modkey.
-- Usually, Mod4 is the key with a logo between Control and Alt.
-- If you do not like this or do not have such a key,
-- I suggest you to remap Mod4 to another key using xmodmap or other tools.
-- However, you can use another modifier like Mod1, but it may interact with others.
local modkey = "Mod1"

-- Table of layouts to cover with awful.layout.inc, order matters.
awful.layout.layouts = {
	awful.layout.suit.floating,
	awful.layout.suit.tile,
	awful.layout.suit.tile.left,
	awful.layout.suit.tile.bottom,
	awful.layout.suit.tile.top,
	awful.layout.suit.fair,
	awful.layout.suit.fair.horizontal,
	awful.layout.suit.spiral,
	awful.layout.suit.spiral.dwindle,
	awful.layout.suit.max,
	awful.layout.suit.max.fullscreen,
	awful.layout.suit.magnifier,
	awful.layout.suit.corner.nw,
}
-- }}}

-- given a screen object, return its "name" from the outputs
local function get_screen_name(the_screen)
	for s in screen do
		for screen_name, _ in pairs(s.outputs) do
			if the_screen.index == s.index then
				return screen_name
			end
		end
	end
end

local left_screen = "DP-2"
local right_screen = "DP-4"
local function get_screen(i)
	for s in screen do
		for screen_name, _ in pairs(s.outputs) do
			if i == 1 and screen_name == left_screen then
				return s
			end
			if i == 2 and screen_name == right_screen then
				return s
			end
		end
	end
end

-- given a screen object, return the side it's on ('left' or 'right'), or nil if unknown
local function get_screen_side(the_screen)
	local screen_name = get_screen_name(the_screen)
	if screen_name == left_screen then return "left" end
	if screen_name == right_screen then return "right" end
	return nil
end

-- {{{ Menu
-- Create a launcher widget and a main menu
local myawesomemenu = {
	{
		"hotkeys",
		function()
			hotkeys_popup.show_help(nil, awful.screen.focused())
		end,
	},
	{ "manual", terminal .. " -e man awesome" },
	{ "edit config", editor_cmd .. " " .. awesome.conffile },
	{ "restart", awesome.restart },
	{
		"quit",
		function()
			awesome.quit()
		end,
	},
}

local menu_awesome = { "awesome", myawesomemenu, beautiful.awesome_icon }
local menu_terminal = { "open terminal", terminal }

local mymainmenu
if has_fdo then
	mymainmenu = freedesktop.menu.build({
		before = { menu_awesome },
		after = { menu_terminal },
	})
else
	mymainmenu = awful.menu({
		items = {
			menu_awesome,
			menu_terminal,
		},
	})
end

-- Menubar configuration
menubar.utils.terminal = terminal -- Set the terminal for applications that require it
-- }}}

-- {{{ Wibar

-- script to get my ip
local mynetstatus = awful.widget.watch(confdir .. "/netstatus.sh", 5)

-- mouse status widget
local mymousestatus = awful.widget.watch(confdir .. "/mouse.sh", 5)

-- Create a textclock widget
local mytextclock = wibox.widget.textclock()
calendar_widget:attach(mytextclock)

-- weather widget
local myweather = awful.widget.watch(confdir .. "/weather.sh", 300)

-- volume
local myvolume = deficient.volume_control({}).widget

local mynetspeed = deficient.net_speed({ interface = "enp3s0", timeout = 300 }).widget

-- Create a wibox for each screen and add it
local taglist_buttons = gears.table.join(
	awful.button({}, 1, function(t)
		t:view_only()
	end),
	awful.button({ modkey }, 1, function(t)
		if client.focus then
			client.focus:move_to_tag(t)
		end
	end),
	awful.button({}, 3, awful.tag.viewtoggle),
	awful.button({ modkey }, 3, function(t)
		if client.focus then
			client.focus:toggle_tag(t)
		end
	end),
	awful.button({}, 4, function(t)
		awful.tag.viewnext(t.screen)
	end),
	awful.button({}, 5, function(t)
		awful.tag.viewprev(t.screen)
	end)
)

local tasklist_buttons = gears.table.join(
	awful.button({}, 1, function(c)
		if c == client.focus then
			c.minimized = true
		else
			c:emit_signal("request::activate", "tasklist", { raise = true })
		end
	end),
	awful.button({}, 3, function()
		awful.menu.client_list({ theme = { width = 250 } })
	end),
	awful.button({}, 4, function()
		awful.client.focus.byidx(1)
	end),
	awful.button({}, 5, function()
		awful.client.focus.byidx(-1)
	end)
)

local function set_wallpaper(s)
	local side = get_screen_side(s)
	if not side then return end
	gears.wallpaper.maximized(home .. "/.pictures/wallpaper-" .. side .. ".jpg", s, true)
end

-- Re-set wallpaper when a screen's geometry changes (e.g. different resolution)
screen.connect_signal("property::geometry", set_wallpaper)

-- Shared widget template for taglist and tasklist items:
-- a white left-edge accent bar (4px) beside a text label.
local label_widget_template = {
	{
		{
			widget = wibox.widget.separator,
			orientation = "vertical",
			color = "#ffffff",
			forced_width = 4,
		},
		{
			{
				id = "text_role",
				widget = wibox.widget.textbox,
			},
			left = 6,
			right = 8,
			widget = wibox.container.margin,
		},
		layout = wibox.layout.fixed.horizontal,
	},
	id = "background_role",
	widget = wibox.container.background,
}

awful.screen.connect_for_each_screen(function(s)
	-- Wallpaper
	set_wallpaper(s)

	-- Create a promptbox for each screen
	s.mypromptbox = awful.widget.prompt()

	-- Create an imagebox widget which will contain an icon indicating which layout we're using.
	-- We need one layoutbox per screen.
	s.mylayoutbox = awful.widget.layoutbox(s)
	local inc_layout = function() awful.layout.inc(1) end
	local dec_layout = function() awful.layout.inc(-1) end
	s.mylayoutbox:buttons(gears.table.join(
		awful.button({}, 1, inc_layout),
		awful.button({}, 3, dec_layout),
		awful.button({}, 4, inc_layout),
		awful.button({}, 5, dec_layout)
	))

	-- Create a taglist widget
	-- Show tags that have clients, or are currently selected (so the active
	-- workspace is always visible even when empty).
	s.mytaglist = awful.widget.taglist({
		screen = s,
		filter = function(t)
			return awful.widget.taglist.filter.noempty(t) or t.selected
		end,
		buttons = taglist_buttons,
		widget_template = label_widget_template,
	})

	-- Create a tasklist widget
	s.mytasklist = awful.widget.tasklist({
		screen = s,
		filter = awful.widget.tasklist.filter.currenttags,
		buttons = tasklist_buttons,
		widget_template = label_widget_template,
	})

	-- Create the wibox
	s.mywibox = awful.wibar({
		position = "top",
		screen = s,
		height = 32,
	})

	-- Add widgets to the wibox
	s.mywibox:setup({
		widget = wibox.container.margin,
		left = 6,
		right = 6,
		top = 2,
		bottom = 2,
		{
			layout = wibox.layout.align.horizontal,
			{ -- Left widgets
				layout = wibox.layout.fixed.horizontal,
				spacing = 6,
				s.mytaglist,
				s.mypromptbox,
			},

			-- Middle widget
			s.mytasklist,

			{ -- Right widgets
				layout = wibox.layout.fixed.horizontal,
				spacing = 6,
				mynetspeed,
				mynetstatus,
				mymousestatus,
				wibox.widget.systray(),
				myvolume,
				mytextclock,
				myweather,
				s.mylayoutbox,
			},
		},
	})
end)
-- }}}

awful.tag({ "1", "2", "3", "4", "5" }, 1, awful.layout.layouts[1])
awful.tag({ "6", "7", "8", "9", "0" }, 2, awful.layout.layouts[1])

-- {{{ Mouse bindings
root.buttons(gears.table.join(
	awful.button({}, 3, function()
		mymainmenu:toggle()
	end),
	awful.button({}, 4, awful.tag.viewnext),
	awful.button({}, 5, awful.tag.viewprev)
))
-- }}}

local cl_menu = nil

local function show_window_list()
	if cl_menu then
		cl_menu:hide()
		cl_menu = nil
	else
		local client_list = {}
		local tag = awful.tag.selected()
		local clients = tag:clients()
		for i = 1, #clients do
			local cl = clients[i]
			local prefix = cl.minimized and "_ " or "* "
			if not awful.rules.match(cl, { class = "Conky" }) then
				client_list[#client_list + 1] = {
					prefix .. cl.name,
					function()
						cl.minimized = not cl.minimized
					end,
					cl.icon,
				}
			end
		end
		cl_menu = awful.menu({ items = client_list, theme = { width = 300 } })
		cl_menu:show()
	end
end

-- {{{ Key bindings
local globalkeys = gears.table.join(
	awful.key({ modkey }, "s", hotkeys_popup.show_help, { description = "show help", group = "awesome" }),
	awful.key({ modkey }, "Left", awful.tag.viewprev, { description = "view previous", group = "tag" }),
	awful.key({ modkey }, "Right", awful.tag.viewnext, { description = "view next", group = "tag" }),
	awful.key({ modkey }, "Escape", awful.tag.history.restore, { description = "go back", group = "tag" }),

	awful.key({ modkey }, "j", function()
		awful.client.focus.byidx(1)
	end, { description = "focus next by index", group = "client" }),
	awful.key({ modkey }, "k", function()
		awful.client.focus.byidx(-1)
	end, { description = "focus previous by index", group = "client" }),

	awful.key({ modkey }, "w", show_window_list, { description = "show minimized window list", group = "client" }),

	-- Layout manipulation
	awful.key({ modkey, "Shift" }, "j", function()
		awful.client.swap.byidx(1)
	end, { description = "swap with next client by index", group = "client" }),

	awful.key({ modkey, "Shift" }, "k", function()
		awful.client.swap.byidx(-1)
	end, { description = "swap with previous client by index", group = "client" }),

	awful.key({ modkey, "Control" }, "j", function()
		awful.screen.focus_relative(1)
	end, { description = "focus the next screen", group = "screen" }),

	awful.key({ modkey, "Control" }, "k", function()
		awful.screen.focus_relative(-1)
	end, { description = "focus the previous screen", group = "screen" }),

	awful.key({ modkey }, "u", awful.client.urgent.jumpto, { description = "jump to urgent client", group = "client" }),

	awful.key({ modkey }, "Tab", function()
		awful.client.focus.history.previous()
		if client.focus then
			client.focus:raise()
		end
	end, { description = "go back", group = "client" }),

	-- Standard program
	awful.key({ modkey }, "Return", function()
		awful.spawn(terminal)
	end, { description = "open a terminal", group = "launcher" }),
	awful.key({ modkey, "Control" }, "r", awesome.restart, { description = "reload awesome", group = "awesome" }),
	awful.key({ modkey, "Shift" }, "q", awesome.quit, { description = "quit awesome", group = "awesome" }),

	awful.key({ modkey }, "l", function()
		awful.tag.incmwfact(0.05)
	end, { description = "increase master width factor", group = "layout" }),
	awful.key({ modkey }, "h", function()
		awful.tag.incmwfact(-0.05)
	end, { description = "decrease master width factor", group = "layout" }),
	awful.key({ modkey, "Shift" }, "h", function()
		awful.tag.incnmaster(1, nil, true)
	end, { description = "increase the number of master clients", group = "layout" }),
	awful.key({ modkey, "Shift" }, "l", function()
		awful.tag.incnmaster(-1, nil, true)
	end, { description = "decrease the number of master clients", group = "layout" }),
	awful.key({ modkey, "Control" }, "h", function()
		awful.tag.incncol(1, nil, true)
	end, { description = "increase the number of columns", group = "layout" }),
	awful.key({ modkey, "Control" }, "l", function()
		awful.util.spawn("screensavertool blanklock")
	end, { description = "lock screen (and blank)", group = "special" }),

	awful.key({ modkey, "Control" }, "b", function()
		awful.util.spawn("screensavertool blank")
	end, { description = "blank screen", group = "special" }),

	awful.key({ modkey }, "space", function()
		awful.layout.inc(1)
	end, { description = "select next", group = "layout" }),
	awful.key({ modkey, "Shift" }, "space", function()
		awful.layout.inc(-1)
	end, { description = "select previous", group = "layout" }),

	awful.key({ modkey, "Control" }, "n", function()
		local c = awful.client.restore()
		-- Focus restored client
		if c then
			c:emit_signal("request::activate", "key.unminimize", { raise = true })
		end
	end, { description = "restore minimized", group = "client" }),

	awful.key({ modkey }, "d", function()
		awful.util.spawn("rofi -show run")
	end, { description = "run prompt", group = "launcher" }),

	-- Prompt
	awful.key({ modkey }, "x", function()
		awful.prompt.run({
			prompt = "Run Lua code: ",
			textbox = awful.screen.focused().mypromptbox.widget,
			exe_callback = awful.util.eval,
			history_path = awful.util.get_cache_dir() .. "/history_eval",
		})
	end, { description = "lua execute prompt", group = "awesome" }),
	-- Menubar
	awful.key({ modkey }, "p", function()
		menubar.show()
	end, { description = "show the menubar", group = "launcher" }),

	-- Scratchpad
	awful.key({ modkey }, "grave", function()
		scratch.toggle("wezterm start --class scratch", { instance = "scratch" })
	end, { description = "show the scratchpad", group = "special" })
)

local clientkeys = gears.table.join(
	awful.key({ modkey }, "f", function(_)
		awful.util.spawn("rofi -show window")
	end, { description = "show rofi window", group = "client" }),
	awful.key({ modkey }, "q", function(c)
		c:kill()
	end, { description = "close", group = "client" }),
	awful.key(
		{ modkey, "Control" },
		"space",
		awful.client.floating.toggle,
		{ description = "toggle floating", group = "client" }
	),
	awful.key({ modkey, "Control" }, "Return", function(c)
		c:swap(awful.client.getmaster())
	end, { description = "move to master", group = "client" }),
	awful.key({ modkey }, "o", function(c)
		c:move_to_screen()
	end, { description = "move to screen", group = "client" }),
	awful.key({ modkey }, "t", function(c)
		c.ontop = not c.ontop
	end, { description = "toggle keep on top", group = "client" }),
	awful.key({ modkey }, "n", function(c)
		-- The client currently has the input focus, so it cannot be
		-- minimized, since minimized clients can't have the focus.
		c.minimized = true
	end, { description = "minimize", group = "client" }),
	awful.key({ modkey }, "m", function(c)
		c.maximized = not c.maximized
		c:raise()
	end, { description = "(un)maximize", group = "client" }),
	awful.key({ modkey, "Control" }, "m", function(c)
		c.maximized_vertical = not c.maximized_vertical
		c:raise()
	end, { description = "(un)maximize vertically", group = "client" }),
	awful.key({ modkey, "Shift" }, "m", function(c)
		c.maximized_horizontal = not c.maximized_horizontal
		c:raise()
	end, { description = "(un)maximize horizontally", group = "client" })
)

-- scr is an integer of which screen to use
-- arguments
--    i   the workspace number
--    scr the screen number
local function setup_workspace_binding(i, scr)
	local keycode = i == 0 and "#19" or "#" .. (i + 9)
	local offset = scr == 1 and 0 or 5
	local tag_index = (i == 0) and 5 or (i - offset)

	local function get_tag()
		local s = get_screen(scr)
		return s and s.tags[tag_index]
	end

	globalkeys = gears.table.join(
		globalkeys,
		-- View tag only.
		awful.key({ modkey }, keycode, function()
			local tag = get_tag()
			if tag then
				tag:view_only()
				awful.screen.focus(get_screen(scr))
			end
		end, { description = "view tag #" .. i .. " on screen " .. scr, group = "tag" }),

		-- Move client to tag.
		-- Uses the target screen (scr) rather than the client's current screen,
		-- so e.g. alt+shift+6 from the left screen correctly moves to tag 6 on the right.
		awful.key({ modkey, "Shift" }, keycode, function()
			if client.focus then
				local tag = get_tag()
				if tag then
					client.focus:move_to_tag(tag)
				end
			end
		end, { description = "move focused client to tag #" .. i, group = "tag" }),

		-- Toggle tag on focused client.
		awful.key({ modkey, "Control", "Shift" }, keycode, function()
			if client.focus then
				local tag = get_tag()
				if tag then
					client.focus:toggle_tag(tag)
				end
			end
		end, { description = "toggle focused client on tag #" .. i, group = "tag" })
	)
end

for i = 1, 5 do
	setup_workspace_binding(i, 1)
end
for i = 6, 9 do
	setup_workspace_binding(i, 2)
end
setup_workspace_binding(0, 2)

-- Picture-in-Picture: plain left-click drags, right-click resizes
local pip_buttons = gears.table.join(
	awful.button({}, 1, function(c)
		c:emit_signal("request::activate", "mouse_click", { raise = true })
		awful.mouse.client.move(c)
	end),
	awful.button({}, 3, function(c)
		c:emit_signal("request::activate", "mouse_click", { raise = true })
		awful.mouse.client.resize(c)
	end)
)

local clientbuttons = gears.table.join(
	awful.button({}, 1, function(c)
		c:emit_signal("request::activate", "mouse_click", { raise = true })
	end),
	awful.button({}, 2, function(c)
		c:emit_signal("request::activate", "mouse_click", { raise = true })
	end),
	awful.button({ modkey }, 1, function(c)
		c:emit_signal("request::activate", "mouse_click", { raise = true })
		awful.mouse.client.move(c)
	end),
	awful.button({ modkey }, 3, function(c)
		c:emit_signal("request::activate", "mouse_click", { raise = true })
		awful.mouse.client.resize(c)
	end)
)

-- Set keys
root.keys(globalkeys)
-- }}}

-- {{{ Rules
-- Rules to apply to new clients (through the "manage" signal).
awful.rules.rules = {
	-- All clients will match this rule.
	{
		rule = {},
		properties = {
			border_width = beautiful.border_width,
			border_color = beautiful.border_normal,
			focus = awful.client.focus.filter,
			raise = true,
			keys = clientkeys,
			buttons = clientbuttons,
			screen = awful.screen.preferred,
			placement = awful.placement.no_overlap + awful.placement.no_offscreen,
		},
	},

	-- Floating clients.
	{
		rule_any = {
			instance = {
				"DTA", -- Firefox addon DownThemAll.
				"copyq", -- Includes session name in class.
				"pinentry",
			},
			class = {
				"Arandr",
				"Blueman-manager",
				"Gpick",
				"Kruler",
				"MessageWin", -- kalarm.
				"Sxiv",
				"Tor Browser", -- Needs a fixed window size to avoid fingerprinting by screen size.
				"Wpa_gui",
				"veromix",
				"xtightvncviewer",
			},

			-- Note that the name property shown in xprop might be set slightly after creation of the client
			-- and the name shown there might not match defined rules here.
			name = {
				"Event Tester", -- xev.
			},
			role = {
				"AlarmWindow", -- Thunderbird's calendar.
				"ConfigManager", -- Thunderbird's about:config.
				"pop-up", -- e.g. Google Chrome's (detached) Developer Tools.
			},
		},
		properties = { floating = true },
	},

	-- Add titlebars to normal clients and dialogs
	{ rule_any = { type = { "normal", "dialog" } }, properties = { titlebars_enabled = true } },

	-- Firefox Picture-in-Picture: left-click drags, right-click resizes
	{
		rule_any = {
			name = { "Picture-in-Picture" },
		},
		properties = {
			floating = true,
			ontop = true,
			buttons = pip_buttons,
		},
	},

	-- Scratchpad
	{
		rule_any = {
			instance = { "scratch" },
			class = { "scratch" },
			icon_name = { "scratchpad_urxvt" },
		},
		properties = {
			skip_taskbar = false,
			floating = true,
			ontop = false,
			minimized = true,
			sticky = false,
			width = screen_width * 0.7,
			height = screen_height * 0.75,
		},
		callback = function(c)
			awful.placement.centered(c, { honor_padding = true, honor_workarea = true })
			gears.timer.delayed_call(function()
				c.urgent = false
			end)
		end,
	},
}
-- }}}

-- {{{ Signals
-- Signal function to execute when a new client appears.
client.connect_signal("manage", function(c)
	if awesome.startup and not c.size_hints.user_position and not c.size_hints.program_position then
		-- Prevent clients from being unreachable after screen count changes.
		awful.placement.no_offscreen(c)
	end

	-- Center and float a window if it's the only one on the tag
	if not awesome.startup then
		local tag = c.first_tag
		if tag then
			local clients = tag:clients()
			if #clients == 1 then
				c.floating = true
				awful.placement.centered(c, { honor_padding = true, honor_workarea = true })
			end
		end
	end
end)

-- Let fullscreen windows work
-- see https://github.com/awesomeWM/awesome/issues/3156
client.connect_signal("property::fullscreen", function(c)
	if c.fullscreen then
		gears.timer.delayed_call(function()
			if c.valid then
				c:geometry(c.screen.geometry)
			end
		end)
	end
end)

-- Add a titlebar if titlebars_enabled is set to true in the rules.
client.connect_signal("request::titlebars", function(c)
	-- buttons for the titlebar
	local buttons = gears.table.join(
		awful.button({}, 1, function()
			c:emit_signal("request::activate", "titlebar", { raise = true })
			awful.mouse.client.move(c)
		end),
		awful.button({}, 3, function()
			c:emit_signal("request::activate", "titlebar", { raise = true })
			awful.mouse.client.resize(c)
		end)
	)

	awful.titlebar(c):setup({
		{ -- Left
			awful.titlebar.widget.iconwidget(c),
			buttons = buttons,
			layout = wibox.layout.fixed.horizontal,
		},
		{ -- Middle
			{ -- Title
				align = "center",
				widget = awful.titlebar.widget.titlewidget(c),
			},
			buttons = buttons,
			layout = wibox.layout.flex.horizontal,
		},
		{ -- Right
			-- awful.titlebar.widget.floatingbutton (c),
			awful.titlebar.widget.minimizebutton(c),
			awful.titlebar.widget.maximizedbutton(c),
			awful.titlebar.widget.stickybutton(c),
			awful.titlebar.widget.ontopbutton(c),
			awful.titlebar.widget.closebutton(c),
			layout = wibox.layout.fixed.horizontal(),
		},
		layout = wibox.layout.align.horizontal,
	})
end)

client.connect_signal("focus", function(c)
	c.border_color = beautiful.border_focus
end)
client.connect_signal("unfocus", function(c)
	c.border_color = beautiful.border_normal
end)
-- }}}

gears.timer.start_new(60, function()
	collectgarbage()
	return true
end)
```

# EOF
