function Get_True_CPI(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	if (t === "ob") {
		n = CookieMonster.secondsLeft(Game.ObjectsById[e], "ob");
		r = Game.ObjectsById[e].price;
		i = CookieMonster.holdIs[e]
	}
	if (t === "up") {
		n = CookieMonster.secondsLeft(Game.UpgradesById[e], "up");
		r = Game.UpgradesById[e].basePrice;
		for (var s = 0; s < CookieMonster.upgradeCount; s++) {
			if (_cup(s, e, false)) {
				i = CookieMonster.manageTooltips(s, e, false, true);
				break;
			}
		}
	}
	var o = r / i;
	Game.ObjectsById.forEach(function (s, u) {
		var a = s.price;
		var f = CookieMonster.holdIs[u];
		var l = CookieMonster.secondsLeft(s, "ob");
		if (l < n && (t === "up" || u !== e)) {
			var c = n - l;
			var h = f * c;
			var p = r - a + h;
			var d = p / i;
			if (d > o) {
				o = d;
			}
		}
	});

	return o;
}

function Test_True_CPI(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	var s = 0;
	if (t === "ob") {
		n = CookieMonster.secondsLeft(e, "ob");
		i = Game.ObjectsById[e].price;
		s = CookieMonster.holdIs[e];
	}
	if (t === "up") {
		n = CookieMonster.secondsLeft(e, "up");
		i = Game.UpgradesById[e].basePrice;
		for (var o = 0; o < CookieMonster.upgradeCount; o++) {
			if (_cup(o, e, false)) {
				s = CookieMonster.manageTooltips(o, e, false, true);
				break;
			}
		}
	}
	var u = CookieMonster.organizeObjectList();
	var a = i;
	var f = a / s;
	var l = f;
	var c = s;
	u.forEach(function (o, f) {
		if (i > o.price && (t === "up" || o.id !== e)) {
			var h = o.price;
			var p = CookieMonster.holdIs[o.id];
			var d = CookieMonster.holdCPI[o.id];
			if (c === 0) {
				c = p
			}
			if (l === 0) {
				l = d
			}
			var v = CookieMonster.secondsLeft(o.id, "ob");
			var m = 0;
			var g = u[f + 1];
			if (g.id !== u.length && (CookieMonster.holdCPI[g.id] < l || g.id === e)) {
				m = CookieMonster.secondsLeft(g.id, "ob");
				l = CookieMonster.holdCPI[g.id];
				c = p
			}
			if (v < n - r) {
				var y = m - v;
				r += y;
				var b = c * y;
				if (y > 0) {
					s -= c;
					a = a - h + b
				}
			}
		}
	});
	f = a / s;
	return f;
}