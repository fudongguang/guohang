define(['../global/global'], function (g) {

	var testRecursive = function(obj){
		for(k in obj){
			obj[k]();
		}
	};

//	测试storage.js
	var testStroage = {
		testSession: function () {
			test("cookieSession", function () {
				g.cookie.setSession('test', 111);
				equal(111, g.cookie.get('test'));
			});
		},

		testLocal: function () {
			asyncTest("cookieLocal", function () {
				g.cookie.removeAll();
				expect(1)
				g.cookie.setLocal('test', 111);
				setTimeout(function () {
					equal(111, g.cookie.get('test'));
					start();
				}, 12 * 1000)
			});

		},

		testOther: function () {
			asyncTest("setLocalMaxSeconds && appointTime && remove", function () {
				expect(5);
				g.cookie.setLocalMaxSeconds('testa', 111, 3);

				setTimeout(function () {
					equal(111, g.cookie.get('testa'));
				}, 1000);

				setTimeout(function () {
					notEqual(111, g.cookie.get('testa'));

				}, 5000);
				setTimeout(function () {
					g.cookie.setSession('test', 111);
					g.cookie.remove('test');
					ok(true, g.cookie.get('test'));

				}, 6000);


				setTimeout(function () {
					g.cookie.setSession('test', 111);
					g.cookie.setLocal('test2', 1112);
					g.cookie.removeAll();
					equal('', g.cookie.get('test'));
					equal('', g.cookie.get('test2'));
					start();
				}, 7000)

			});
		}
	};


	testRecursive(testStroage);

//测试common.js
	var testCommon = {
		testMix:function(){
			test("com.mix", function () {

				var a={a:'a',b:'b'};
				var b ={b:'b',c:'c'};

				g.mix(a,b);

				equal('a', a.a);
				equal('b', a.b);
				equal('c', a.c);
			});
		},

		testClon:function(){
			var a = [
				{a: 'a', b: ['a', 'b']},
				{b: 'b'},
				[
					{a: 'sdf'},
					['b', 'c',{a:'aa'}]
				]
			];
			var b = com.clon(a);

			test("com.clon", function () {
				equal(true, com.isArray(b));
				equal(true, com.isObject(b[0]));
				equal('a', b[0]['a']);
				equal(true, com.isArray(b[0]['b']));
				equal('a', b[0]['b'][0]);
				equal('b', b[0]['b'][1]);

				equal(true, com.isObject(b[1]));
				equal('b', b[1]['b']);

				equal(true, com.isArray(b[2]));
				equal(true, com.isObject(b[2][0]));
				equal('sdf', b[2][0]['a']);
				equal(true, com.isArray(b[2][1]));
				equal('b', b[2][1][0]);
				equal('c', b[2][1][1]);
				equal(true, com.isObject(b[2][1][2]));
				equal('aa', b[2][1][2]['a']);
			});

			var c = {a:'sdf'};
			var d = com.clon(c);
			test("com.clon.eq", function () {
				equal(true, com.isObject(d));
				equal('sdf', d['a']);
				equal(false, c==d);
			});
		},

		testQuery:function(){
			test("com.query", function () {
				var a = 'http://baidu.com?v=a';
				var  b = com.query('v',a);
				equal('a', b);

				a = 'http://baidu.com?v=aa#c';
				b = com.query('v',a);
				equal('aa', b);

				a = 'http://baidu.com?v=aa&d=3#c';
				b = com.query('d',a);
				equal(3, b);
			});
		}
	};

	testRecursive(testCommon);

});

