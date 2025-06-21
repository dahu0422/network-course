/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://vgoqfwjwkkrsihpwydlu.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg'),
      new URL('https://vgoqfwjwkkrsihpwydlu.supabase.co/storage/v1/object/public/cabin-images//cabin-002.jpg'),
      new URL('https://vgoqfwjwkkrsihpwydlu.supabase.co/storage/v1/object/public/cabin-images//cabin-003.jpg'),
      new URL('https://vgoqfwjwkkrsihpwydlu.supabase.co/storage/v1/object/public/cabin-images//cabin-004.jpg'),
      new URL('https://vgoqfwjwkkrsihpwydlu.supabase.co/storage/v1/object/public/cabin-images//cabin-005.jpg'),
      new URL('https://vgoqfwjwkkrsihpwydlu.supabase.co/storage/v1/object/public/cabin-images//cabin-006.jpg'),
    ],
  },
};

export default nextConfig;
