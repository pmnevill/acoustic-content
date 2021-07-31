export const DOMAIN_NAME = 'https://content-eu-4.content-cms.com';
export const CONTENT_HUB_ID = '859f2008-a40a-4b92-afd0-24bb44d10124';

const DELIVERY_URL = 'delivery/v1';
export const BASE_URL = `${DOMAIN_NAME}/api/${CONTENT_HUB_ID}`;
export const BASE_DELIVERY_URL = `${BASE_URL}/${DELIVERY_URL}`;
export const BASE_RENDER_URL = `${BASE_DELIVERY_URL}/content`;