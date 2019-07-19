!(function(e) {
	var t = {};
	function n(r) {
		if (t[r]) return t[r].exports;
		var a = (t[r] = { i: r, l: !1, exports: {} });
		return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
	}
	(n.m = e),
		(n.c = t),
		(n.d = function(e, t, r) {
			n.o(e, t) ||
				Object.defineProperty(e, t, { enumerable: !0, get: r });
		}),
		(n.r = function(e) {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, {
					value: 'Module'
				}),
				Object.defineProperty(e, '__esModule', { value: !0 });
		}),
		(n.t = function(e, t) {
			if ((1 & t && (e = n(e)), 8 & t)) return e;
			if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if (
				(n.r(r),
				Object.defineProperty(r, 'default', {
					enumerable: !0,
					value: e
				}),
				2 & t && 'string' != typeof e)
			)
				for (var a in e)
					n.d(
						r,
						a,
						function(t) {
							return e[t];
						}.bind(null, a)
					);
			return r;
		}),
		(n.n = function(e) {
			var t =
				e && e.__esModule
					? function() {
							return e.default;
					  }
					: function() {
							return e;
					  };
			return n.d(t, 'a', t), t;
		}),
		(n.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(n.p = ''),
		n((n.s = 3));
})([
	,
	,
	,
	function(e, t, n) {
		'use strict';
		n.r(t);
		n(4), n(5);
	},
	function(e, t) {},
	function(e, t) {
		!(function() {
			document.getElementById('y-menu-button').addEventListener(
				'click',
				function(e) {
					e.preventDefault(), a(), r.addEventListener('click', o, !1);
				},
				!1
			);
			let e = document.getElementsByClassName('y-layer')[0],
				t = document.getElementsByClassName('y-menu')[0],
				n = document.getElementsByClassName('Menu-button')[0],
				r = document.getElementsByClassName('cross')[0];
			function a() {
				e.classList.toggle('show'),
					t.classList.toggle('show'),
					n.classList.toggle('show'),
					r.classList.toggle('show');
				let a = document.getElementsByClassName('menu-items')[0]
					.clientHeight;
				document.getElementsByClassName('line')[0].style.height =
					a - 20 + 'px';
			}
			function o() {
				a(),
					e.removeEventListener('click', o, !1),
					r.removeEventListener('click', o, !1);
			}
			const gl = document.getElementById('canvasgl').getContext('webgl');
			gl.clearColor(0.5, 0, 0, 0.5);
			gl.clear(gl.COLOR_BUFFER_BIT);
			const s = 100,
				i = [0.5, 0.5],
				l = document.getElementById('canvasgl'),
				c = twgl.getContext(l, { depth: !1, alpha: !1, antialias: !1 }),
				u = [0, 1, 2].map(e =>
					twgl.createProgramInfo(c, [vInitStars, fInitStars(e)])
				),
				f = [0, 1, 2].map(e =>
					twgl.createProgramInfo(c, [vPhysicsStars, fPhysicsStars(e)])
				),
				m = twgl.createProgramInfo(c, [vDrawStars, fDrawStars]),
				d = [0, 1].map(e =>
					twgl.createProgramInfo(c, [
						vInitParticles,
						fInitParticles(e)
					])
				),
				g = [0, 1].map(e =>
					twgl.createProgramInfo(c, [
						vPhysicsParticles,
						fPhysicsParticles(e)
					])
				),
				v = twgl.createProgramInfo(c, [vDrawParticles, fDrawParticles]);
			twgl.resizeCanvasToDisplaySize(c.canvas),
				c.viewport(
					0,
					0,
					c.canvas.clientWidth / 2,
					c.canvas.clientHeight / 2
				),
				twgl.setDefaults({ textureColor: [1, 1, 1, 0] });

			let w = [0, 1, 2].map(e =>
					twgl.createTexture(c, {
						src: `./img/landing/logo${e}.png`,
						crossOrigin: 'anonymous',
						flipY: !0,
						wrap: c.CLAMP_TO_EDGE
					})
				),
				h = 200,
				p = 512;
			c.canvas.clientHeight < c.canvas.clientWidth
				? ((p = 768),
				  (h = 300),
				  c.canvas.clientWidth > 1200 && ((h = 500), (p = 1024)))
				: (c.canvas.clientWidth > 600 && ((h = 200), (p = 1024)),
				  c.canvas.clientWidth >= 700 && ((h = 300), (p = 1024)));

			let b;
			if (c.canvas.clientWidth < 900) b = [0.5, 0.5];
			else b = [1, 1];
			let E = [0, 1, 2].map(() =>
					twgl.createFramebufferInfo(c, void 0, 32, 32)
				),
				y = [0, 1, 2].map(() =>
					twgl.createFramebufferInfo(c, void 0, 32, 32)
				),
				I = [0, 1, 2].map(() =>
					twgl.createFramebufferInfo(c, void 0, 32, 32)
				),
				_ = [0, 1].map(() =>
					twgl.createFramebufferInfo(c, void 0, p, p)
				),
				P = [0, 1].map(() =>
					twgl.createFramebufferInfo(c, void 0, p, p)
				),
				A = [0, 1].map(() =>
					twgl.createFramebufferInfo(c, void 0, p, p)
				);
			const B = twgl.createBufferInfoFromArrays(c, {
					a_position: {
						data: [1, 1, 1, -1, -1, -1, -1, 1],
						numComponents: 2
					}
				}),
				L = [];
			for (let e = 0; e < 32; e++)
				for (let t = 0; t < 32; t++)
					L.push((e + 0.5) / 32), L.push((t + 0.5) / 32);
			const x = [];
			for (let e = 0; e < p; e++)
				for (let t = 0; t < p; t++)
					x.push((e + 0.5) / p), x.push((t + 0.5) / p);
			const F = twgl.createBufferInfoFromArrays(c, {
					a_texcoord: { data: L, numComponents: 2 }
				}),
				C = twgl.createBufferInfoFromArrays(c, {
					a_texcoord: { data: x, numComponents: 2 }
				});
			[0, 1, 2].forEach(e => {
				[E, y].forEach(t => {
					c.useProgram(u[e].program),
						twgl.setBuffersAndAttributes(c, u[e], B),
						twgl.bindFramebufferInfo(c, t[e]),
						twgl.drawBufferInfo(c, B, c.TRIANGLE_FAN);
				});
			}),
				[0, 1].forEach(e => {
					[_, P].forEach(t => {
						c.useProgram(d[e].program),
							twgl.setBuffersAndAttributes(c, d[e], B),
							twgl.setUniforms(d[e], {
								logo_center: [0.5, 0.5],
								logo_size: b.map(e => e * 0.5)
							}),
							twgl.bindFramebufferInfo(c, t[e]),
							twgl.drawBufferInfo(c, B, c.TRIANGLE_FAN);
					});
				});
			let T,
				S,
				N,
				H = 0,
				M = 0,
				O = 0,
				W = 1,
				k = 0,
				D = 0,
				j = 0;
			function z() {
				0 < k && k < 0.5 && (D = j), (k = 1), (j = (j + 1) % 3);
			}
			!(function e(t) {
				var b;
				var n;
				var h1, h2;

				if (c.canvas.clientHeight < 143) {
					h2 = 0.7;
				} else {
					h2 = 0.5;
				}
				if (c.canvas.clientWidth <= 420) {
					h1 = 0.4;
					h = 0.87;
				} else if (c.canvas.clientWidth <= 720) {
					h1 = 0.45;
					h = 0.55;
				} else {
					h1 = 0.55;
					h = 0.4;
				}
				(n = t / 100),
					twgl.resizeCanvasToDisplaySize(
						c.canvas,
						window.devicePixelRatio || 1
					),
					c.viewport(
						0,
						0,
						c.canvas.clientWidth,
						c.canvas.clientHeight
					),
					(b = [h, h1]),
					(N = s / c.canvas.width),
					(T = n - H),
					(H = n),
					k >= 0 && (k -= T / 4) <= 0 && (D = j),
					[0, 1, 2].forEach(e => {
						c.useProgram(f[e].program),
							twgl.setBuffersAndAttributes(c, f[e], B),
							twgl.setUniforms(f[e], {
								u_prev: E.map(e => e.attachments[0]),
								u_curr: y.map(e => e.attachments[0]),
								mouse_pos: i,
								mouse_leaved: W,
								dt: T
							}),
							twgl.bindFramebufferInfo(c, I[e]),
							twgl.drawBufferInfo(c, B, c.TRIANGLE_FAN);
					}),
					[0, 1].forEach(e => {
						c.useProgram(g[e].program),
							twgl.setBuffersAndAttributes(c, g[e], B),
							twgl.setUniforms(g[e], {
								u_prev: _.map(e => e.attachments[0]),
								u_curr: P.map(e => e.attachments[0]),
								logo_center: [
									0.5 -
										0.05 *
											(i[0] -
												0.5 +
												0.3 * Math.sin((3 * n) / 50)),
									h2 -
										0.05 *
											(i[1] -
												0.5 +
												0.3 * Math.sin((2 * n) / 50))
								],
								logo_size: b.map(e => e * 0.5),
								mouse_pos: i,
								mouse_radius: N,
								mouse_boiler: M,
								mouse_gravity: O,
								explosion_timer: k,
								dt: T
							}),
							twgl.bindFramebufferInfo(c, A[e]),
							twgl.drawBufferInfo(c, B, c.TRIANGLE_FAN);
					}),
					c.useProgram(m.program),
					twgl.setBuffersAndAttributes(c, m, F),
					twgl.setUniforms(m, {
						u_curr: y.map(e => e.attachments[0]),
						second_draw: 0
					}),
					twgl.bindFramebufferInfo(c, null),
					twgl.drawBufferInfo(c, F, c.POINTS),
					c.useProgram(v.program),
					twgl.setBuffersAndAttributes(c, v, C),
					twgl.setUniforms(v, {
						u_logotex: [w[D], w[j]],
						u_curr: P.map(e => e.attachments[0]),
						point_size:
							3 *
							Math.max(
								(b[0] * c.canvas.clientWidth) / p,
								(b[1] * c.canvas.clientHeight) / p,
								0.8
							),
						explosion_timer: k
					}),
					twgl.bindFramebufferInfo(c, null),
					twgl.drawBufferInfo(c, C, c.POINTS),
					[0, 1, 2].forEach(e => {
						(S = E[e]), (E[e] = y[e]), (y[e] = I[e]), (I[e] = S);
					}),
					[0, 1].forEach(e => {
						(S = _[e]), (_[e] = P[e]), (P[e] = A[e]), (A[e] = S);
					}),
					requestAnimationFrame(e);
			})(0),
				l.addEventListener('mousemove', e => {
					(W = 0),
						(i[0] = e.offsetX / c.canvas.clientWidth),
						(i[1] = 1 - e.offsetY / c.canvas.clientHeight);
				}),
				l.addEventListener('mouseleave', () => {
					(W = 1), (M = 0), (O = 0), (i[0] = 0.5), (i[1] = 0.5);
				}),
				l.addEventListener('mousedown', e => {
					0 == e.button ? (O = 1) : (M = 1),
						(i[0] = e.offsetX / c.canvas.clientWidth),
						(i[1] = 1 - e.offsetY / c.canvas.clientHeight);
				}),
				l.addEventListener('mouseup', e => {
					(M = 0), (O = 0), 2 == e.button && z();
				}),
				l.addEventListener('touchstart', e => {
					(O = 1),
						(i[0] = e.touches[0].clientX / c.canvas.clientWidth),
						(i[1] = 0.5);
				}),
				l.addEventListener('touchend', e => {
					(M = 0), (O = 0);
				});
			let G = 0;
			// l.addEventListener("wheel", e => {
			//   G < 4 && z(),
			//     2 == G &&
			//       (setTimeout(function() {
			//         G < 10 && (G = 0);
			//       }, 500),
			//       setTimeout(function() {
			//         G = 0;
			//       }, 2e3)),
			//     (G += 1);
			// }),
			l.addEventListener('contextmenu', e => e.preventDefault()),
				l.addEventListener('webglcontextlost', () =>
					alert('WebGL context lost!')
				);
		})();
	}
]);
