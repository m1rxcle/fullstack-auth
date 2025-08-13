import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */

	/*  experimental: {
    missingSuspenseWithCSRBailout: false,
  }, */
	env: {
		SERVER_URL: process.env.SERVER_URL,
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatar.yandex.net'
			}
		]
	}
}

export default nextConfig
