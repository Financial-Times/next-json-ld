module.exports = {
	files: {
		allow: [
			'.husky/pre-commit',
			'.husky/pre-push'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'5922b3ba\\x2dafce\\x2d11e6\\x2da37c\\x2df4a01f1b0fa1', // test/fixtures/article.json:2|15|17|18|230|340|370|371|405|412
			'7624cbaa\\x2dafd9\\x2d11e6\\x2d9c37\\x2d5787335499a0', // test/fixtures/article.json:8|234|404|411
			'fbcc1bc6\\x2d8f0b\\x2d11e6\\x2d8df8\\x2dd3778b55a923', // test/fixtures/article.json:9
			'5a432053\\x2dbaba\\x2d3767\\x2d8d65\\x2daa213bceb508', // test/fixtures/article.json:121
			'73cc33b5\\x2dd0cb\\x2d3815\\x2d8347\\x2dbc49e1ddbd5c', // test/fixtures/article.json:127
			'610adb0b\\x2d0e71\\x2d373d\\x2d9034\\x2df972d38eeba1', // test/fixtures/article.json:133
			'423f0857\\x2de5b5\\x2d3256\\x2da8b8\\x2d857e2378f433', // test/fixtures/article.json:139
			'7508c6c4\\x2da67d\\x2d3c7a\\x2d9a3a\\x2d207132cffffb', // test/fixtures/article.json:145
			'7ab48168\\x2d61a4\\x2d36b9\\x2d80cd\\x2dda79994c719d', // test/fixtures/article.json:151
			'323a905b\\x2dd080\\x2d3580\\x2d8f0e\\x2d8fb1ba01b5b1', // test/fixtures/article.json:157
			'53c4d038\\x2d8eb7\\x2d3b7b\\x2dadbe\\x2dcf59d91a1894', // test/fixtures/article.json:163|205
			'dbb0bdae\\x2d1f0c\\x2d11e4\\x2db0cb\\x2db2227cce2b54', // test/fixtures/article.json:169
			'f2aad41c\\x2d527a\\x2d3188\\x2db3cc\\x2ddabbe8f08b5d', // test/fixtures/article.json:175
			'dac173c8\\x2d79d1\\x2d39fc\\x2db2cc\\x2d840df7dac7fe', // test/fixtures/article.json:181
			'9b40e89c\\x2de87b\\x2d3d4f\\x2db72c\\x2d2cf7511d2146', // test/fixtures/article.json:187
			'05bfed9c\\x2de2aa\\x2d314d\\x2d99c0\\x2dd864f1c91428', // test/fixtures/article.json:193
			'88d2670e\\x2d84e0\\x2d3f25\\x2d9857\\x2d7a3ce3f56b44', // test/fixtures/article.json:199|217
			'98815f9a\\x2d0c35\\x2d3824\\x2d98fb\\x2df134965f56b7', // test/fixtures/article.json:211
			'71016d74\\x2dd302\\x2d37c9\\x2dbdda\\x2df575df249b65', // test/fixtures/article.json:223
			'de7a0c50\\x2de087\\x2d4db3\\x2d9cb3\\x2ded1d3c1a4b8b', // test/fixtures/article_b.json:2|3|10|72|73|471|472|473|549|552|687
			'1fe160d4\\x2d8d2e\\x2d4a25\\x2da523\\x2da3807c5b70f9', // test/fixtures/article_b.json:42|43|47|51|61|63|501|678|718
			'cbb1fe40\\x2d860d\\x2d4013\\x2dbfcf\\x2db75ee6e30206', // test/fixtures/article_b.json:60|96|107|110
			'fc1f2e10\\x2df7e6\\x2d4901\\x2d8eb4\\x2d426c098b67aa', // test/fixtures/article_b.json:81
			'6a112bc2\\x2dde49\\x2d4956\\x2dbe12\\x2dc835b7eab4a6', // test/fixtures/article_b.json:88|92|93
			'3a2a5551\\x2daade\\x2d4f9f\\x2d99ed\\x2db170c2a654ba', // test/fixtures/article_b.json:114
			'07c22cdf\\x2decc9\\x2d4692\\x2d8511\\x2d185eb2fb3e0a', // test/fixtures/article_b.json:129|131|141|142|572|574|584|585
			'1248b3d3\\x2d1d4c\\x2d4454\\x2daf23\\x2dc0b4707ed412', // test/fixtures/article_b.json:145|147|588|590
			'433acaac\\x2df1b9\\x2d4925\\x2db80c\\x2d4fb312c256d8', // test/fixtures/article_b.json:161|163|173|174|454|456|466|467|486|490|491|554|556|566|567|604|606|616|617, test/types/breadcrumb.spec.js:35|65|87
			'6b32f2c1\\x2dda43\\x2d4e19\\x2d80b9\\x2d8aef4ab640d7', // test/fixtures/article_b.json:177|179|620|622
			'8988aca5\\x2d9dfd\\x2d478d\\x2dbf36\\x2dd7a3e20f85e7', // test/fixtures/article_b.json:193|195|636|638
			'a39a4558\\x2df562\\x2d4dca\\x2d8774\\x2d000246e6eebe', // test/fixtures/article_b.json:210|212|224|225
			'c3a8b3a6\\x2dc579\\x2d499b\\x2d9194\\x2ded42a34ed5f2', // test/fixtures/article_b.json:228|230
			'1a887deb\\x2db9a7\\x2d4495\\x2d945e\\x2dff64e02fbe3b', // test/fixtures/article_b.json:244|246|430|432|656|658
			'a9a245b2\\x2df5f1\\x2d4c75\\x2da7d4\\x2d9d558899ad07', // test/fixtures/article_b.json:259|445|671
			'a579350c\\x2d61ce\\x2d4c00\\x2d97ca\\x2dddaa2e0cacf6', // test/fixtures/article_b.json:266|268|279|280|412|414|425|426
			'19d3b36c\\x2dc928\\x2d44b3\\x2db908\\x2ded2cd185704d', // test/fixtures/article_b.json:283|285
			'3c48aded\\x2d9a6c\\x2d41f4\\x2d854b\\x2da87a6b713b2b', // test/fixtures/article_b.json:299|301|311|312
			'6374b579\\x2df67d\\x2d4970\\x2da7cd\\x2d1ab5e41a551a', // test/fixtures/article_b.json:315|317
			'82645c31\\x2d4426\\x2d4ef5\\x2d99c9\\x2d9df6e0940c00', // test/fixtures/article_b.json:331|333
			'c47f4dfc\\x2d6879\\x2d4e95\\x2daccf\\x2dca8cbe6a1f69', // test/fixtures/article_b.json:347|349
			'c91b1fad\\x2d1097\\x2d468b\\x2dbe82\\x2d9a8ff717d54c', // test/fixtures/article_b.json:363|365
			'e05846a6\\x2d3cf5\\x2d48e5\\x2d8907\\x2d89a307e4795e', // test/fixtures/article_b.json:379|381
			'e58e66fe\\x2d7cc6\\x2d4382\\x2db781\\x2d1161bae8b905' // test/fixtures/article_b.json:395|397
		]
	}
};
