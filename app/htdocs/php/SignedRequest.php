<?php
class SignedRequest {

	public static function base64URLDecode($input) {
		return base64_decode(strtr($input, '-_', '+/'));
	}

	public static function parse($signedRequest, $appSecret) {
		list($encoded_sig, $payload) = explode('.', $signedRequest, 2);

		//decode the data
		$sig = self::base64URLDecode($encoded_sig);
		$data = json_decode(self::base64URLDecode($payload), true);

		//confirm the signature
		$expected_sig = hash_hmac('sha256', $payload, $appSecret, $raw = true);
		if ($sig !== $expected_sig) {
			error_log('Bad Signed JSON signature!');
			return null;
		}

		return $data;
	}
}
